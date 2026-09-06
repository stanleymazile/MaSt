import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';

export interface UserBookmark {
  id: string;
  articleId: string;
  articleTitle: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  bookmarks: UserBookmark[];
  isBookmarked: (articleId: string) => boolean;
  toggleBookmark: (articleId: string, articleTitle: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isFirebaseReady: boolean;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(true);

  // Listen to Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error('Firebase Auth State error:', error);
        setAuthError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen to user bookmarks when logged in
  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
    const unsubscribe = onSnapshot(
      bookmarksRef,
      (snapshot) => {
        const items: UserBookmark[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          items.push({
            id: docSnap.id,
            articleId: data.articleId,
            articleTitle: data.articleTitle,
            createdAt: data.createdAt,
          });
        });
        setBookmarks(items);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/bookmarks`);
        } catch {
          // Handled and logged by handleFirestoreError
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Échec de la connexion';
      console.warn('Google sign-in error:', message);
      setAuthError(message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setBookmarks([]);
    } catch (err: unknown) {
      console.error('Sign-out error:', err);
    }
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.some((b) => b.articleId === articleId);
  };

  const toggleBookmark = async (articleId: string, articleTitle: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    const bookmarkId = `bm_${articleId.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    const docRef = doc(db, 'users', user.uid, 'bookmarks', bookmarkId);

    if (isBookmarked(articleId)) {
      try {
        await deleteDoc(docRef);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/bookmarks/${bookmarkId}`);
      }
    } else {
      const payload = {
        userId: user.uid,
        articleId,
        articleTitle,
        createdAt: new Date().toISOString(),
      };
      try {
        await setDoc(docRef, payload);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/bookmarks/${bookmarkId}`);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        bookmarks,
        isBookmarked,
        toggleBookmark,
        signInWithGoogle,
        signOut,
        isFirebaseReady,
        authError,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
