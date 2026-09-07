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
  const [isActualitesOpen, setIsActualitesOpen] = useState(true);
  const [isAffiliationsOpen, setIsAffiliationsOpen] = useState(false);
  const { user, bookmarks, signInWithGoogle, signOut } = useAuth();

  if (!isOpen) return null;

  const actualitesSubItems = [
    { label: 'Toutes les actualités', filter: 'all' },
    { label: 'Innovation', filter: 'Innovation' },
    { label: 'IA / intelligence artificielle', filter: 'IA / intelligence artificielle' },
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
      id="google-news-fullscreen-menu"
      className="fixed inset-0 z-[100] bg-white dark:bg-[#202124] text-[#202124] dark:text-[#f1f3f4] flex flex-col justify-between overflow-hidden animate-in fade-in duration-200 transition-colors"
      style={{ fontFamily: "'Google Sans', sans-serif" }}
    >
      {/* En-tête du menu */}
      <header className="flex items-center justify-between px-5 py-4 w-full max-w-[680px] mx-auto relative shrink-0">
        <div className="flex items-center gap-5">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#202124] dark:text-[#f1f3f4] transition-colors cursor-pointer"
            aria-label="Fermer le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <span className="text-[20px] font-medium text-[#202124] dark:text-[#f1f3f4] tracking-tight">
            MaSt
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              onClose();
              onNavigate('home');
            }}
            className="w-10 h-10 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] dark:bg-[#303134] dark:hover:bg-[#3c4043] flex items-center justify-center text-[#202124] dark:text-[#f1f3f4] transition-colors cursor-pointer"
            aria-label="Rechercher"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
              className="w-10 h-10 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] dark:bg-[#303134] dark:hover:bg-[#3c4043] flex items-center justify-center text-[#3c4043] dark:text-[#f1f3f4] transition-colors cursor-pointer"
              aria-label="Options"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Dropdown in Fullscreen Menu */}
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
      <nav className="flex flex-col px-6 py-4 max-w-[680px] w-full mx-auto my-auto z-10 overflow-y-auto max-h-[calc(100vh-170px)] gap-3.5 scrollbar-none">
        {/* 1. ACTUALITÉS (avec sous-menus: Innovation, IA / intelligence artificielle, Technologie, Science, Recherche) */}
        <div className="flex flex-col border-b border-[#dadce0]/50 dark:border-[#3c4043]/50 pb-3">
          <button
            onClick={() => setIsActualitesOpen(!isActualitesOpen)}
            className="flex items-center justify-between text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[22px] font-normal transition-colors text-left group cursor-pointer py-1.5"
          >
            <span>Actualités</span>
            <div className="p-1 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors">
              <ChevronDown
                className={`w-5 h-5 text-[#5f6368] dark:text-[#9aa0a6] transition-transform duration-200 ${
                  isActualitesOpen ? 'rotate-180 text-[#1a73e8] dark:text-[#8ab4f8]' : ''
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
                  className="flex items-center justify-between text-left py-2 px-3 rounded-[12px] text-[16px] text-[#5f6368] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] hover:bg-[#f8f9fa] dark:hover:bg-[#303134] transition-all cursor-pointer group"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#1a73e8] dark:text-[#8ab4f8] transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. AFFILIATIONS (avec sous-menus: Educa-Psy, NHYSA, Entreprise, Produit) */}
        <div className="flex flex-col border-b border-[#dadce0]/50 dark:border-[#3c4043]/50 pb-3">
          <button
            onClick={() => setIsAffiliationsOpen(!isAffiliationsOpen)}
            className="flex items-center justify-between text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[22px] font-normal transition-colors text-left group cursor-pointer py-1.5"
          >
            <span>Affiliations</span>
            <div className="p-1 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors">
              <ChevronDown
                className={`w-5 h-5 text-[#5f6368] dark:text-[#9aa0a6] transition-transform duration-200 ${
                  isAffiliationsOpen ? 'rotate-180 text-[#1a73e8] dark:text-[#8ab4f8]' : ''
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
                  className="flex items-center justify-between text-left py-2 px-3 rounded-[12px] text-[16px] text-[#5f6368] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] hover:bg-[#f8f9fa] dark:hover:bg-[#303134] transition-all cursor-pointer group"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#1a73e8] dark:text-[#8ab4f8] transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. INFORMATIONS (remplace Company news) */}
        <div className="border-b border-[#dadce0]/50 dark:border-[#3c4043]/50 pb-3">
          <button
            onClick={() => {
              onNavigate('home', 'Informations');
              onClose();
            }}
            className="w-full flex items-center justify-between text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[22px] font-normal transition-colors text-left group cursor-pointer py-1.5"
          >
            <span>Informations</span>
            <svg
              className="w-5 h-5 fill-[#202124] dark:fill-[#f1f3f4] group-hover:fill-[#1a73e8] dark:group-hover:fill-[#8ab4f8] group-hover:translate-x-1 transition-all"
              viewBox="0 0 24 24"
            >
              <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
            </svg>
          </button>
        </div>

        {/* 4. CONTACT (remplace Feed) */}
        <div className="border-b border-[#dadce0]/50 dark:border-[#3c4043]/50 pb-3">
          <button
            onClick={() => {
              onClose();
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="w-full flex items-center justify-between text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[22px] font-normal transition-colors text-left group cursor-pointer py-1.5"
          >
            <span>Contact</span>
            <svg
              className="w-5 h-5 fill-[#202124] dark:fill-[#f1f3f4] group-hover:fill-[#1a73e8] dark:group-hover:fill-[#8ab4f8] group-hover:translate-x-1 transition-all"
              viewBox="0 0 24 24"
            >
              <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
            </svg>
          </button>
        </div>

        {/* 5. ARTICLES SAUVEGARDÉS (FIREBASE) */}
        <div>
          <button
            onClick={() => {
              onClose();
              if (onOpenBookmarks) {
                onOpenBookmarks();
              }
            }}
            className="w-full flex items-center justify-between text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[22px] font-normal transition-colors text-left group cursor-pointer py-1.5"
          >
            <div className="flex items-center gap-2.5">
              <span>Articles sauvegardés</span>
              {bookmarks.length > 0 && (
                <span className="bg-[#1a73e8] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {bookmarks.length}
                </span>
              )}
            </div>
            <Bookmark className="w-5 h-5 text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8]" />
          </button>
        </div>

        {/* Firebase Authentication Status Box */}
        <div className="pt-2">
          {user ? (
            <div className="p-3 bg-[#f8f9fa] dark:bg-[#282a2d] rounded-2xl border border-[#dadce0] dark:border-[#3c4043] flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="truncate">
                  <p className="text-xs font-medium truncate">{user.displayName || user.email}</p>
                  <p className="text-[10px] text-[#137333] dark:text-[#81c995]">Connecté à Firebase</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="p-1.5 text-xs text-[#d93025] hover:bg-[#fce8e6] dark:hover:bg-[#3c1e1e] rounded-lg transition-colors cursor-pointer"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-2 p-2.5 bg-[#f8f9fa] dark:bg-[#282a2d] hover:bg-[#e8f0fe] dark:hover:bg-[#1a3860] text-[#1a73e8] dark:text-[#8ab4f8] rounded-2xl border border-[#dadce0] dark:border-[#3c4043] text-sm font-medium transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Connexion Google (Firebase)</span>
            </button>
          )}
        </div>
      </nav>

      {/* Décoration d'arrière-plan en bas à gauche */}
      <div
        className="absolute -bottom-20 -left-20 w-[260px] h-[260px] bg-[#f1f3f4] dark:bg-[#303134] rounded-full pointer-events-none z-0 opacity-50"
        aria-hidden="true"
      />

      {/* Bouton Newsletter en bas */}
      <div className="w-full max-w-[680px] mx-auto px-6 pb-8 pt-3 relative z-10 shrink-0">
        <button
          onClick={() => {
            onClose();
            onOpenNewsletter();
          }}
          className="w-full py-4 bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#174ea6] dark:bg-[#8ab4f8] dark:text-[#202124] dark:hover:bg-[#a8c7fa] text-white rounded-[30px] font-medium text-[16px] text-center shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
        >
          Newsletter
        </button>
      </div>
    </div>
  );
};

