import React, { useEffect, useState } from 'react';
import { ThumbsUp, Sparkles } from 'lucide-react';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface ArticleClapsProps {
  articleId: string;
}

export const ArticleClaps: React.FC<ArticleClapsProps> = ({ articleId }) => {
  const [clapsCount, setClapsCount] = useState<number>(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const cleanId = articleId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const docRef = doc(db, 'article_reactions', cleanId);

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          setClapsCount(snap.data().clapsCount || 0);
        } else {
          setClapsCount(0);
        }
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.GET, `article_reactions/${cleanId}`);
        } catch {
          // Handled
        }
      }
    );

    return () => unsubscribe();
  }, [articleId]);

  const handleClap = async () => {
    setAnimating(true);
    setHasClapped(true);
    setTimeout(() => setAnimating(false), 500);

    const cleanId = articleId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const docRef = doc(db, 'article_reactions', cleanId);

    try {
      await setDoc(
        docRef,
        {
          articleId: cleanId,
          clapsCount: increment(1),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.WRITE, `article_reactions/${cleanId}`);
      } catch (e) {
        console.warn('Reaction update error:', e);
      }
    }
  };

  return (
    <div className="flex items-center gap-3 my-6 p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#282a2d] border border-[#dadce0] dark:border-[#3c4043] transition-colors">
      <button
        onClick={handleClap}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-google-sans text-sm font-medium transition-all transform cursor-pointer ${
          hasClapped
            ? 'bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a3860] dark:text-[#8ab4f8] shadow-xs'
            : 'bg-white dark:bg-[#303134] text-[#3c4043] dark:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] border border-[#dadce0] dark:border-[#5f6368]'
        } ${animating ? 'scale-110' : 'scale-100'}`}
        aria-label="Applaudir cet article"
      >
        <ThumbsUp className={`w-4 h-4 ${animating ? 'rotate-[-15deg]' : ''} transition-transform`} />
        <span>Recommander cet article</span>
      </button>

      <div className="flex items-center gap-1.5 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
        <Sparkles className="w-3.5 h-3.5 text-[#fbbc04]" />
        <span>
          <strong className="text-[#202124] dark:text-[#f1f3f4] font-medium">{clapsCount}</strong> recommandation{clapsCount > 1 ? 's' : ''} sur Firestore
        </span>
      </div>
    </div>
  );
};
