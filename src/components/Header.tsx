import React, { useState, useRef, useEffect } from 'react';
import { Search, X, LogIn } from 'lucide-react';
import { PreferencesDropdown } from './PreferencesDropdown';
import { NewsThemesTicker } from './NewsThemesTicker';
import { useAuth } from '../context/AuthContext';

const LANGUAGES = [
  { code: 'fr', label: 'Français (France)', flag: '🇫🇷' },
  { code: 'en', label: 'Global (English)', flag: '🌐' },
  { code: 'es', label: 'Español (España)', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch (Deutschland)', flag: '🇩🇪' },
  { code: 'ja', label: '日本語 (日本)', flag: '🇯🇵' },
  { code: 'pt', label: 'Português (Brasil)', flag: '🇧🇷' },
];

interface HeaderProps {
  onNavigateHome: () => void;
  onOpenNewsletter: () => void;
  onOpenMenu: () => void;
  onOpenBookmarks?: () => void;
  selectedLanguage?: string;
  onSelectLanguage?: (lang: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  activeTheme?: string;
  onSelectTheme?: (themeId: string) => void;
  isHome?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onOpenNewsletter,
  onOpenMenu,
  onOpenBookmarks,
  selectedLanguage = 'Global (English)',
  onSelectLanguage,
  theme = 'light',
  onToggleTheme,
  activeTheme = 'all',
  onSelectTheme,
  isHome = false,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const { user, bookmarks, signInWithGoogle } = useAuth();

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };
    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0d47a1] text-white shadow-sm transition-colors duration-200">
      {/* Compact Top Navigation Bar */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 max-w-[680px] mx-auto">
        {/* Left Side: Menu + Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            id="header-menu-btn"
            onClick={onOpenMenu}
            className="p-1 rounded-full hover:bg-white/15 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Ouvrir le menu de navigation"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <button
            onClick={onNavigateHome}
            id="header-logo"
            className="font-google-sans text-[18px] sm:text-[19px] font-medium text-white hover:text-blue-100 transition-colors tracking-tight cursor-pointer"
          >
            MaSt
          </button>
        </div>

        {/* Right Side: Search + More Preferences Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#093270] border border-white/25 rounded-full px-2.5 py-1 transition-all w-36 sm:w-52">
                <Search className="w-3.5 h-3.5 text-blue-100 mr-1.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm text-white focus:outline-none w-full placeholder-blue-100/70"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-blue-100 hover:text-white ml-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="header-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Search articles"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            )}
          </div>

          {/* Language Selector Button (Globe in SVG) */}
          <div className="relative" ref={languageMenuRef}>
            <button
              id="header-language-btn"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center text-white transition-all cursor-pointer ${
                isLanguageMenuOpen
                  ? 'bg-white/30 text-white ring-2 ring-white/50'
                  : 'bg-white/15 hover:bg-white/25'
              }`}
              aria-label="Sélectionner la langue"
              title={`Langue actuelle: ${selectedLanguage}`}
            >
              {/* Globe SVG */}
              <svg
                className="w-4 h-4 text-white shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>

            {/* Menu déroulant des langues */}
            {isLanguageMenuOpen && (
              <div
                id="header-language-dropdown"
                className="absolute top-10 sm:top-11 right-0 w-56 bg-white dark:bg-[#2d2e30] rounded-2xl p-2 shadow-[0_8px_24px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-[#dadce0]/80 dark:border-[#3c4043] z-50 text-xs text-[#3c4043] dark:text-[#e8eaed] animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-1.5 font-semibold text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-[#3c4043] mb-1 flex items-center justify-between">
                  <span>Langue</span>
                  <span className="text-[10px] font-normal text-gray-400">Language</span>
                </div>
                <div className="space-y-0.5 max-h-64 overflow-y-auto">
                  {LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang.label;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onSelectLanguage?.(lang.label);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#e8f0fe] dark:bg-[#1a3860] text-[#1a73e8] dark:text-[#8ab4f8] font-medium'
                            : 'hover:bg-gray-100 dark:hover:bg-[#383a3e]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </span>
                        {isSelected && (
                          <svg
                            className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#8ab4f8] shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Google Sign-In with Firebase */}
          {user ? (
            <button
              id="header-user-btn"
              onClick={onOpenBookmarks}
              className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] cursor-pointer"
              title={`${user.displayName || user.email} (Connecté à Firebase)`}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Utilisateur'}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-white/25 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-google-sans text-xs font-medium">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Firebase Online Dot */}
              <span
                className="absolute bottom-0 right-0 w-2 h-2 bg-[#1e8e3e] border-2 border-[#0d47a1] rounded-full"
                title="Firebase Firestore synchronisé"
              />
            </button>
          ) : (
            <button
              id="header-login-btn"
              onClick={() => signInWithGoogle()}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/25 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer"
              title="Se connecter avec Google pour synchroniser sur Firebase"
            >
              <LogIn className="w-3 h-3" />
              <span>Connexion</span>
            </button>
          )}

          {/* More options 3 dots button with Preferences & Links Dropdown */}
          <div className="relative dropdown-container">
            <button
              id="header-more-btn"
              onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="More options"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Google Preferences & Links Menu */}
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
                onOpenNewsletter();
              }}
            />
          </div>
        </div>
      </div>
    </header>

    {/* Fil Déroulant qui contient tous les thèmes des actualités (défile normalement avec la page) */}
    {onSelectTheme && (
      <NewsThemesTicker
        activeTheme={activeTheme}
        onSelectTheme={onSelectTheme}
        onNavigateHome={onNavigateHome}
        isHome={isHome}
      />
    )}
  </>
);
};


