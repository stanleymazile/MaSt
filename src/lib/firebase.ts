import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setLogLevel } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Suppress internal SDK verbose connection retry logs
setLogLevel('silent');
// Firebase configuration strictly resolving from environment variables (.env / secrets)
const activeConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mazilepost.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mazilepost',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mazilepost.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '24279729745',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:24279729745:web:7dc25790887a0ce69a9a70',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-X4JCH2BW7V',
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || '(default)',
};

// Initialize Firebase App
export const app = initializeApp(activeConfig);

// Initialize Firestore (handles custom databaseId or default)
export const db =
  activeConfig.firestoreDatabaseId && activeConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, activeConfig.firestoreDatabaseId)
    : getFirestore(app);

// Optional Google Analytics if measurementId is provided
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined' && activeConfig.measurementId) {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

// Initialize Firebase Auth
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Operation types for standard error handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errorMsg = error instanceof Error ? error.message : String(error);
  const isOfflineOrUnavailable =
    errorMsg.includes('unavailable') ||
    errorMsg.includes('could not reach') ||
    errorMsg.includes('offline') ||
    errorMsg.includes('client is offline');

  const errInfo: FirestoreErrorInfo = {
    error: errorMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };

  if (isOfflineOrUnavailable) {
    console.warn('Firestore offline/reconnecting:', JSON.stringify(errInfo));
  } else {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  }
  throw new Error(JSON.stringify(errInfo));
}

// Validation connection test (optional check)
export async function testConnection(): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'test', 'connection'));
    return snap.exists();
  } catch {
    return false;
  }
}
