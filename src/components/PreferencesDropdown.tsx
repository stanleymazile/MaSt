import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Mail, MessageSquare } from 'lucide-react';

interface PreferencesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage?: (lang: string) => void;
  currentLanguage?: string;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenNewsletter?: () => void;
  onOpenContact?: () => void;
}

export const PreferencesDropdown: React.FC<PreferencesDropdownProps> = ({
  isOpen,
  onClose,
  onSelectLanguage,
  currentLanguage = 'Global (English)',
  theme = 'light',
  onToggleTheme,
  onOpenNewsletter,
  onOpenContact,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLanguageSubmenuOpen, setIsLanguageSubmenuOpen] = useState(false);

  const languages = [
    'Global (English)',
    'Français (France)',
    'Español (España)',
    'Deutsch (Deutschland)',
    '日本語 (日本)',
    'Português (Brasil)',
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      id="preferences-links-dropdown"
      className="absolute top-[52px] right-0 w-[290px] bg-white dark:bg-[#2d2e30] rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-[#dadce0]/60 dark:border-[#3c4043] flex flex-col gap-4 z-[100] animate-in fade-in zoom-in-95 duration-150 transition-colors"
      style={{ fontFamily: "'Google Sans', sans-serif" }}
    >
      {/* Section Preferences */}
      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-[#3c4043] dark:text-[#9aa0a6] mb-1">
          Preferences
        </span>

        {/* Theme toggle in dropdown */}
        <button
          id="dropdown-theme-toggle-btn"
          onClick={() => {
            onToggleTheme?.();
          }}
          className="flex items-center justify-between w-full p-3.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] active:bg-[#e8eaed] dark:bg-[#202124] dark:hover:bg-[#35363a] border-0 rounded-[16px] text-[15px] font-medium text-[#202124] dark:text-[#e8eaed] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#fbbc04] shrink-0" />
            ) : (
              <Moon className="w-5 h-5 text-[#5f6368] dark:text-[#9aa0a6] shrink-0" />
            )}
            <span>Theme</span>
          </div>
          <span className="text-xs font-normal text-[#5f6368] dark:text-[#9aa0a6] capitalize bg-white dark:bg-[#303134] px-2.5 py-1 rounded-full border border-[#dadce0]/60 dark:border-[#3c4043]">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Language selector */}
        <button
          onClick={() => setIsLanguageSubmenuOpen(!isLanguageSubmenuOpen)}
          className="flex items-center justify-between w-full p-3.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] active:bg-[#e8eaed] dark:bg-[#202124] dark:hover:bg-[#35363a] border-0 rounded-[16px] text-[15px] font-medium text-[#202124] dark:text-[#e8eaed] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            {/* Globe Icon */}
            <svg className="w-5 h-5 fill-current text-[#3c4043] dark:text-[#9aa0a6] shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="truncate">{currentLanguage}</span>
          </div>
          {/* Arrow Icon */}
          <svg
            className={`w-[18px] h-[18px] fill-current text-[#3c4043] dark:text-[#9aa0a6] shrink-0 transition-transform ${isLanguageSubmenuOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>

        {/* Submenu for Language Selection */}
        {isLanguageSubmenuOpen && (
          <div className="mt-1 bg-[#f1f3f4] dark:bg-[#202124] rounded-[14px] p-1.5 flex flex-col gap-0.5 animate-in fade-in duration-100 max-h-40 overflow-y-auto border border-[#dadce0]/50 dark:border-[#3c4043]">
            {languages.map((lang, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectLanguage?.(lang);
                  setIsLanguageSubmenuOpen(false);
                }}
                className={`text-left text-xs py-1.5 px-3 rounded-lg hover:bg-white dark:hover:bg-[#303134] transition-colors cursor-pointer ${
                  currentLanguage === lang
                    ? 'font-bold text-[#1a73e8] dark:text-[#8ab4f8] bg-white dark:bg-[#303134] shadow-xs'
                    : 'text-[#3c4043] dark:text-[#bdc1c6]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Section Links */}
      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-[#3c4043] dark:text-[#9aa0a6]">
          Services & Contact
        </span>

        {/* Newsletter Link */}
        <button
          id="dropdown-newsletter-btn"
          onClick={() => {
            onOpenNewsletter?.();
            onClose();
          }}
          className="flex items-center justify-between w-full p-3.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] active:bg-[#e8eaed] dark:bg-[#202124] dark:hover:bg-[#35363a] border-0 rounded-[16px] text-[15px] font-medium text-[#202124] dark:text-[#e8eaed] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#1a73e8] dark:text-[#8ab4f8] shrink-0" />
            <span>Newsletter</span>
          </div>
        </button>

        {/* Contact Link */}
        <button
          id="dropdown-contact-btn"
          onClick={() => {
            onOpenContact?.();
            onClose();
          }}
          className="flex items-center justify-between w-full p-3.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] active:bg-[#e8eaed] dark:bg-[#202124] dark:hover:bg-[#35363a] border-0 rounded-[16px] text-[15px] font-medium text-[#202124] dark:text-[#e8eaed] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-[#34a853] dark:text-[#81c995] shrink-0" />
            <span>Contact</span>
          </div>
        </button>
      </div>
    </div>
  );
};

