import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { PreferencesDropdown } from './PreferencesDropdown';

interface HeaderProps {
  onNavigateHome: () => void;
  onOpenNewsletter: () => void;
  onOpenMenu: () => void;
  selectedLanguage?: string;
  onSelectLanguage?: (lang: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onOpenNewsletter,
  onOpenMenu,
  selectedLanguage = 'Global (English)',
  onSelectLanguage,
  theme = 'light',
  onToggleTheme,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#202124] border-b border-[#dadce0] dark:border-[#3c4043] transition-colors duration-200">
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 max-w-[680px] mx-auto">
        {/* Left Side: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            id="header-menu-btn"
            onClick={onOpenMenu}
            className="p-1 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#202124] dark:text-[#e8eaed] transition-colors focus:outline-none cursor-pointer"
            aria-label="Ouvrir le menu de navigation"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <button
            onClick={onNavigateHome}
            id="header-logo"
            className="font-google-sans text-[20px] font-medium text-[#202124] dark:text-[#f1f3f4] hover:opacity-90 transition-opacity tracking-tight cursor-pointer"
          >
            MaSt
          </button>
        </div>

        {/* Right Side: Search + More Preferences Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#f1f3f4] dark:bg-[#303134] rounded-full px-3 py-1.5 transition-all w-36 sm:w-52">
                <Search className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-[#202124] dark:text-[#e8eaed] focus:outline-none w-full placeholder-[#5f6368] dark:placeholder-[#9aa0a6]"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="header-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] dark:bg-[#303134] dark:hover:bg-[#3c4043] flex items-center justify-center text-[#202124] dark:text-[#e8eaed] transition-colors cursor-pointer"
                aria-label="Search articles"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            )}
          </div>

          {/* More options 3 dots button with Preferences & Links Dropdown */}
          <div className="relative dropdown-container">
            <button
              id="header-more-btn"
              onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
              className="w-10 h-10 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] dark:bg-[#303134] dark:hover:bg-[#3c4043] flex items-center justify-center text-[#3c4043] dark:text-[#e8eaed] transition-colors cursor-pointer"
              aria-label="More options"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
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
  );
};


