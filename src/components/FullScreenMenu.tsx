import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Bookmark, User as UserIcon, LogIn, LogOut } from 'lucide-react';
import { PreferencesDropdown } from './PreferencesDropdown';
import { useAuth } from '../context/AuthContext';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'article' | 'news', filter?: string) => void;
  onOpenNewsletter: () => void;
  onOpenContact?: () => void;
  onOpenBookmarks?: () => void;
  selectedLanguage?: string;
  onSelectLanguage?: (lang: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenNewsletter,
  onOpenContact,
  onOpenBookmarks,
  selectedLanguage = 'Global (English)',
  onSelectLanguage,
  theme = 'light',
  onToggleTheme,
}) => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isActualitesOpen, setIsActualitesOpen] = useState(false);
  const [isAffiliationsOpen, setIsAffiliationsOpen] = useState(false);
  const { user, bookmarks, signInWithGoogle, signOut } = useAuth();

  if (!isOpen) return null;

  const actualitesSubItems = [
    { label: 'Toutes les actualités', filter: 'all' },
    { label: 'Innovation', filter: 'Innovation' },
    { label: 'IA / intelligence artificielle', filter: 'IA / intelligence artificielle' },
    { label: 'Éducation', filter: 'Éducation' },
    { label: 'Gemini models', filter: 'Gemini models' },
    { label: 'Developer Tools', filter: 'Developer Tools' },
    { label: 'Technologie', filter: 'Technologie' },
    { label: 'Santé mentale', filter: 'Santé mentale' },
  ];

  const affiliationsSubItems = [
    { label: 'Educa-Psy', filter: 'Educa-Psy' },
    { label: 'NHYSA', filter: 'NHYSA' },
    { label: 'Entreprise', filter: 'Entreprise' },
    { label: 'Produit', filter: 'Produit' },
  ];

  const handleActualitesClick = (filter: string = 'all') => {
    onNavigate('news', filter);
    onClose();
  };

  const handleAffiliationsClick = (filter: string) => {
    onNavigate('home', filter);
    onClose();
  };

  return (
    <div
      id="google-news-menu-backdrop"
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex justify-start animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="google-news-fullscreen-menu"
        className="w-full sm:max-w-[420px] bg-[#185abc] text-[#f1f3f4] h-full shadow-2xl flex flex-col justify-between border-r border-white/20 animate-in slide-in-from-left duration-200 relative overflow-hidden transition-colors"
        style={{ fontFamily: "'Google Sans', sans-serif" }}
      >
        {/* En-tête du menu / sidebar */}
        <header className="flex items-center justify-between px-5 py-4 w-full relative shrink-0 border-b border-white/20">
          <div className="flex items-center gap-5">
            <button
              onClick={onClose}
              className="p-2 -ml-2 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
              aria-label="Fermer le menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <span className="text-[20px] font-medium text-white tracking-tight">
              MaSt
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                onClose();
                onNavigate('home');
              }}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Rechercher"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Options"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>

              {/* Dropdown in Sidebar Menu */}
              <PreferencesDropdown
                isOpen={isPreferencesOpen}
                onClose={() => setIsPreferencesOpen(false)}
                currentLanguage={selectedLanguage}
                onSelectLanguage={onSelectLanguage}
                theme={theme}
                onToggleTheme={onToggleTheme}
                onOpenImages={() => {
                  window.open('https://images.google.com', '_blank');
                }}
                onOpenRSS={() => {
                  onClose();
                  onOpenNewsletter();
                }}
              />
            </div>
          </div>
        </header>

        {/* Liste des liens de navigation */}
        <nav className="flex flex-col px-6 py-4 w-full z-10 overflow-y-auto flex-1 gap-3.5 scrollbar-none">
          {/* 1. ACTUALITÉS */}
          <div className="flex flex-col border-b border-white/20 pb-3">
            <button
              onClick={() => setIsActualitesOpen(!isActualitesOpen)}
              className="flex items-center justify-between text-white hover:text-blue-100 text-[20px] font-normal transition-colors text-left group cursor-pointer py-1.5"
            >
              <span>Actualités</span>
              <div className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <ChevronDown
                  className={`w-5 h-5 text-white/80 transition-transform duration-200 ${
                    isActualitesOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </div>
            </button>

            {isActualitesOpen && (
              <div className="flex flex-col pl-3 pt-2 pb-1 gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {actualitesSubItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleActualitesClick(item.filter)}
                    className="flex items-center justify-between text-left py-2 px-3 rounded-[12px] text-[15px] text-white/85 hover:text-white hover:bg-white/15 transition-all cursor-pointer group"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-white transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. AFFILIATIONS */}
          <div className="flex flex-col border-b border-white/20 pb-3">
            <button
              onClick={() => setIsAffiliationsOpen(!isAffiliationsOpen)}
              className="flex items-center justify-between text-white hover:text-blue-100 text-[20px] font-normal transition-colors text-left group cursor-pointer py-1.5"
            >
              <span>Affiliations</span>
              <div className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <ChevronDown
                  className={`w-5 h-5 text-white/80 transition-transform duration-200 ${
                    isAffiliationsOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </div>
            </button>

            {isAffiliationsOpen && (
              <div className="flex flex-col pl-3 pt-2 pb-1 gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {affiliationsSubItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAffiliationsClick(item.filter)}
                    className="flex items-center justify-between text-left py-2 px-3 rounded-[12px] text-[15px] text-white/85 hover:text-white hover:bg-white/15 transition-all cursor-pointer group"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-white transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. INFORMATIONS */}
          <div className="border-b border-white/20 pb-3">
            <button
              onClick={() => {
                onNavigate('home', 'Informations');
                onClose();
              }}
              className="w-full flex items-center justify-between text-white hover:text-blue-100 text-[20px] font-normal transition-colors text-left group cursor-pointer py-1.5"
            >
              <span>Informations</span>
              <svg
                className="w-5 h-5 fill-white group-hover:fill-blue-100 group-hover:translate-x-1 transition-all"
                viewBox="0 0 24 24"
              >
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
              </svg>
            </button>
          </div>

          {/* 4. CONTACT */}
          <div className="border-b border-white/20 pb-3">
            <button
              onClick={() => {
                onClose();
                if (onOpenContact) {
                  onOpenContact();
                }
              }}
              className="w-full flex items-center justify-between text-white hover:text-blue-100 text-[20px] font-normal transition-colors text-left group cursor-pointer py-1.5"
            >
              <span>Contact</span>
              <svg
                className="w-5 h-5 fill-white group-hover:fill-blue-100 group-hover:translate-x-1 transition-all"
                viewBox="0 0 24 24"
              >
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
              </svg>
            </button>
          </div>

          {/* 5. NEWSLETTER */}
          <div className="border-b border-white/20 pb-3">
            <button
              onClick={() => {
                onClose();
                onOpenNewsletter();
              }}
              className="w-full flex items-center justify-between text-white hover:text-blue-100 text-[20px] font-normal transition-colors text-left group cursor-pointer py-1.5"
            >
              <span>Newsletter</span>
              <svg
                className="w-5 h-5 fill-white group-hover:fill-blue-100 group-hover:translate-x-1 transition-all"
                viewBox="0 0 24 24"
              >
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
              </svg>
            </button>
          </div>

          {/* 6. ARTICLES SAUVEGARDÉS (FIREBASE) */}
          <div className="border-b border-white/20 pb-3">
            <button
              onClick={() => {
                onClose();
                if (onOpenBookmarks) {
                  onOpenBookmarks();
                }
              }}
              className="w-full flex items-center justify-between text-white hover:text-blue-100 text-[20px] font-normal transition-colors text-left group cursor-pointer py-1.5"
            >
              <div className="flex items-center gap-2.5">
                <span>Articles sauvegardés</span>
                {bookmarks.length > 0 && (
                  <span className="bg-white text-[#185abc] text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {bookmarks.length}
                  </span>
                )}
              </div>
              <Bookmark className="w-5 h-5 text-white/90 group-hover:text-white" />
            </button>
          </div>

          {/* Firebase Authentication Status Box */}
          <div className="pt-2">
            {user ? (
              <div className="p-3 bg-[#134896] rounded-2xl border border-white/25 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-white/30" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-xs font-medium text-white truncate">{user.displayName || user.email}</p>
                    <p className="text-[10px] text-emerald-300">Connecté à Firebase</p>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-1.5 text-xs text-red-200 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="w-full flex items-center justify-center gap-2 p-2.5 bg-[#134896] hover:bg-[#0f3b7d] text-white rounded-2xl border border-white/25 text-sm font-medium transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Connexion Google (Firebase)</span>
              </button>
            )}
          </div>
        </nav>

        {/* Décoration d'arrière-plan en bas à gauche */}
        <div
          className="absolute -bottom-20 -left-20 w-[260px] h-[260px] bg-white/5 rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Bouton Newsletter en bas */}
        <div className="w-full px-6 pb-8 pt-3 relative z-10 shrink-0 border-t border-white/20">
          <button
            onClick={() => {
              onClose();
              onOpenNewsletter();
            }}
            className="w-full py-3.5 bg-white hover:bg-[#f1f3f4] active:bg-[#e8eaed] text-[#185abc] rounded-[30px] font-semibold text-[16px] text-center shadow-md transition-colors cursor-pointer"
          >
            Newsletter
          </button>
        </div>
      </div>
    </div>
  );
};

