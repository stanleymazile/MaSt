import React from 'react';
import { X, Bookmark, ExternalLink, Trash2, LogIn, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToArticle: (articleId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToArticle,
}) => {
  const { user, bookmarks, toggleBookmark, signInWithGoogle, signOut, loading, authError, clearAuthError } = useAuth();

  if (!isOpen) return null;

  return (
    <div
      id="bookmarks-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="bookmarks-drawer-panel"
        className="w-full max-w-md bg-white dark:bg-[#202124] text-[#202124] dark:text-[#f1f3f4] h-full shadow-2xl flex flex-col justify-between border-l border-[#dadce0] dark:border-[#3c4043] animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#dadce0] dark:border-[#3c4043] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#e8f0fe] dark:bg-[#1a3860] flex items-center justify-center text-[#1a73e8] dark:text-[#8ab4f8]">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-google-sans text-lg font-medium">Articles sauvegardés</h2>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">Synchronisé avec Firebase Firestore</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* User Profile Card */}
          {user ? (
            <div className="bg-[#f8f9fa] dark:bg-[#282a2d] rounded-2xl p-4 border border-[#dadce0] dark:border-[#3c4043] flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full border border-[#dadce0] dark:border-[#5f6368]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-google-sans text-lg font-medium">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-google-sans text-sm font-medium truncate">{user.displayName || 'Utilisateur Google'}</p>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] truncate">{user.email}</p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#137333] dark:text-[#81c995]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Connecté à Firebase</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#f8f9fa] dark:bg-[#282a2d] rounded-2xl p-5 border border-[#dadce0] dark:border-[#3c4043] text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#e8f0fe] dark:bg-[#1a3860] flex items-center justify-center text-[#1a73e8] dark:text-[#8ab4f8] mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-google-sans text-base font-medium mb-1">Connexion Firebase</h3>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-4">
                Connectez-vous avec votre compte Google pour synchroniser vos articles favoris sur Firestore en temps réel.
              </p>
              <button
                onClick={() => signInWithGoogle()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white px-4 py-2.5 rounded-full font-google-sans text-sm font-medium transition-colors shadow-xs cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Se connecter avec Google
              </button>
            </div>
          )}

          {authError && (
            <div className="bg-[#fce8e6] dark:bg-[#3c1e1e] text-[#c5221f] dark:text-[#f28b82] text-xs p-3 rounded-xl flex items-center justify-between">
              <span>{authError}</span>
              <button onClick={clearAuthError} className="underline text-xs ml-2 cursor-pointer">OK</button>
            </div>
          )}

          {/* Bookmarks list */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-google-sans text-sm font-medium uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                Vos favoris ({bookmarks.length})
              </h3>
            </div>

            {bookmarks.length === 0 ? (
              <div className="py-10 text-center text-[#5f6368] dark:text-[#9aa0a6]">
                <Bookmark className="w-8 h-8 mx-auto stroke-1 mb-2 opacity-60" />
                <p className="text-sm">Aucun article sauvegardé pour le moment.</p>
                <p className="text-xs mt-1">Cliquez sur l'icône de favori sur n'importe quel article pour l'ajouter ici.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#202124] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] transition-colors flex items-center justify-between gap-3 group"
                  >
                    <button
                      onClick={() => {
                        onNavigateToArticle(bm.articleId);
                        onClose();
                      }}
                      className="text-left flex-1 min-w-0 cursor-pointer"
                    >
                      <h4 className="font-google-sans text-sm font-medium text-[#202124] dark:text-[#f1f3f4] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors truncate">
                        {bm.articleTitle}
                      </h4>
                      <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">
                        Ajouté le {new Date(bm.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </button>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          onNavigateToArticle(bm.articleId);
                          onClose();
                        }}
                        className="p-1.5 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#1a73e8] dark:text-[#8ab4f8] cursor-pointer"
                        title="Lire l'article"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(bm.articleId, bm.articleTitle)}
                        className="p-1.5 rounded-full hover:bg-[#fce8e6] dark:hover:bg-[#3c1e1e] text-[#5f6368] hover:text-[#d93025] dark:hover:text-[#f28b82] cursor-pointer transition-colors"
                        title="Retirer des favoris"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {user && (
          <div className="p-4 sm:p-5 border-t border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#1e1f21]">
            <button
              onClick={() => {
                signOut();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-[#d93025] dark:text-[#f28b82] hover:bg-[#fce8e6] dark:hover:bg-[#3c1e1e] rounded-full transition-colors cursor-pointer font-medium"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
