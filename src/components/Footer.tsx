import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('Global (English)');

  const languages = [
    'Global (English)',
    'Français (France)',
    'Español (España)',
    'Deutsch (Deutschland)',
    '日本語 (日本)',
    'Português (Brasil)',
  ];

  const moreGoogleLinks = [
    'About Google',
    'Google Products',
    'Google Blog',
    'Google News Initiative',
    'Google.org',
    'Google AI Research',
    'Careers',
  ];

  return (
    <footer className="bg-[#f8f9fa] dark:bg-[#202124] py-10 px-5 mt-10 border-t border-[#dadce0] dark:border-[#3c4043] font-sans transition-colors">
      <div className="max-w-[680px] mx-auto">
        <div className="flex items-baseline gap-2 mb-6">
          <span className="font-google-sans text-[22px] font-medium text-[#202124] dark:text-[#f1f3f4] tracking-tight">
            MaSt
          </span>
          <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6] font-normal">
            by Mazile Stanley
          </span>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <a href="#" className="text-[#202124] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[15px] transition-colors">
            Privacy
          </a>
          <a href="#" className="text-[#202124] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[15px] transition-colors">
            Terms
          </a>
          <a href="#" className="text-[#202124] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] text-[15px] transition-colors">
            Help
          </a>
        </div>

        {/* Dropdown 1: More of Google */}
        <div className="border-b border-[#dadce0] dark:border-[#3c4043]">
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="w-full flex items-center justify-between py-3 text-[15px] text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors cursor-pointer text-left font-normal"
          >
            <span>More of Google</span>
            <svg
              className={`w-[18px] h-[18px] fill-[#5f6368] dark:fill-[#9aa0a6] transition-transform ${isMoreOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </button>
          {isMoreOpen && (
            <div className="pb-3 pl-2 flex flex-col gap-2 text-sm text-[#5f6368] dark:text-[#9aa0a6] animate-in fade-in duration-150">
              {moreGoogleLinks.map((link, idx) => (
                <a key={idx} href="#" className="hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors py-1">
                  {link}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown 2: Language selector */}
        <div className="border-b border-[#dadce0] dark:border-[#3c4043] mb-8">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-full flex items-center justify-between py-3 text-[15px] text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors cursor-pointer text-left font-normal"
          >
            <span>{selectedLang}</span>
            <svg
              className={`w-[18px] h-[18px] fill-[#5f6368] dark:fill-[#9aa0a6] transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </button>
          {isLangOpen && (
            <div className="pb-3 pl-2 flex flex-col gap-1 text-sm text-[#5f6368] dark:text-[#9aa0a6] animate-in fade-in duration-150">
              {languages.map((lang, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLang(lang);
                    setIsLangOpen(false);
                  }}
                  className={`text-left py-1.5 px-2 rounded hover:bg-[#e8eaed] dark:hover:bg-[#303134] transition-colors ${
                    selectedLang === lang ? 'text-[#1a73e8] dark:text-[#8ab4f8] font-medium' : ''
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 mt-8">
          {/* Instagram */}
          <a href="#" aria-label="Instagram" className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a href="#" aria-label="X" className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* YouTube */}
          <a href="#" aria-label="YouTube" className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" aria-label="LinkedIn" className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
