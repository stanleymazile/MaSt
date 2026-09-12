import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface NewsThemeItem {
  id: string;
  label: string;
  shortLabel?: string;
  badge?: string;
}

export const NEWS_THEMES: NewsThemeItem[] = [
  { id: 'all', label: 'Toutes les actualités', shortLabel: 'Tout' },
  { id: 'IA / intelligence artificielle', label: 'IA & Intelligence Artificielle', shortLabel: 'IA' },
  { id: 'Innovation', label: 'Innovation' },
  { id: 'Technologie', label: 'Technologie' },
  { id: 'Science', label: 'Science' },
  { id: 'Recherche', label: 'Recherche' },
  { id: 'Santé mentale', label: 'Santé mentale' },
  { id: 'Vibe Coding', label: 'Vibe Coding' },
  { id: 'Gemini models', label: 'Gemini models' },
  { id: 'Developer Tools', label: 'Developer Tools' },
  { id: 'Search & Travel', label: 'Search & Travel' },
  { id: 'Android & Mobile', label: 'Android & Mobile' },
  { id: 'Chrome & Web', label: 'Chrome & Web' },
  { id: 'Pixel Hardware', label: 'Pixel Hardware' },
];

interface NewsThemesTickerProps {
  activeTheme?: string;
  onSelectTheme: (themeId: string) => void;
  onNavigateHome?: () => void;
  isHome?: boolean;
}

export const NewsThemesTicker: React.FC<NewsThemesTickerProps> = ({
  activeTheme = 'all',
  onSelectTheme,
  onNavigateHome,
  isHome = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 250);
    }
  };

  // Mouse Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      id="news-themes-ticker-bar"
      className="w-full bg-[#edf0f4] dark:bg-[#26292e] border-t border-[#d8dce2] dark:border-[#383c42] border-b border-[#d8dce2] dark:border-[#383c42] py-1.5 px-3 sm:px-4 select-none relative overflow-hidden transition-colors"
      aria-label="Fil déroulant des thèmes d'actualités"
    >
      <div className="max-w-[680px] mx-auto flex items-center gap-2 relative">
        {/* Bouton Accueil */}
        <button
          onClick={onNavigateHome}
          id="ticker-home-btn"
          className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-150 shrink-0 cursor-pointer ${
            isHome
              ? 'bg-[#1a73e8] text-white shadow-xs border border-[#185abc] ring-1 ring-blue-400/40 font-semibold'
              : 'bg-white dark:bg-[#32363d] text-[#3c4043] dark:text-[#e8eaed] hover:text-[#111827] dark:hover:text-white hover:bg-[#f8f9fa] dark:hover:bg-[#3d424b] border border-[#d1d5db] dark:border-[#484f58] shadow-xs'
          }`}
          title="Retourner à l'accueil"
          aria-label="Accueil"
        >
          <span>Accueil</span>
        </button>

        {/* Séparateur vertical discret */}
        <div className="h-4 w-px bg-[#cbd1d9] dark:bg-[#484f58] shrink-0" />

        {/* Bouton défilement gauche (desktop) */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="hidden sm:flex items-center justify-center absolute left-28 z-10 w-6 h-6 rounded-full bg-white dark:bg-[#32363d] border border-[#cbd1d9] dark:border-[#484f58] text-[#4b5563] dark:text-[#d1d5db] hover:text-[#111827] dark:hover:text-white hover:bg-[#f3f4f6] dark:hover:bg-[#3c4149] shadow-md transition-all cursor-pointer"
            aria-label="Faire défiler vers la gauche"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Conteneur du fil déroulant */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 scroll-smooth cursor-grab active:cursor-grabbing text-xs w-full"
        >
          {NEWS_THEMES.map((theme) => {
            const isSelected =
              !isHome &&
              (activeTheme === theme.id ||
                (theme.id === 'all' && (!activeTheme || activeTheme === 'all')));

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-[12px] font-medium transition-all duration-150 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a73e8] text-white shadow-xs border border-[#185abc] ring-1 ring-blue-400/40 font-semibold'
                    : 'bg-white dark:bg-[#32363d] text-[#3c4043] dark:text-[#e8eaed] hover:text-[#111827] dark:hover:text-white hover:bg-[#f8f9fa] dark:hover:bg-[#3d424b] border border-[#d1d5db] dark:border-[#484f58] shadow-xs'
                }`}
                title={`Filtrer par ${theme.label}`}
              >
                {theme.label}
              </button>
            );
          })}
        </div>

        {/* Bouton défilement droit (desktop) */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="hidden sm:flex items-center justify-center absolute right-0 z-10 w-6 h-6 rounded-full bg-white dark:bg-[#32363d] border border-[#cbd1d9] dark:border-[#484f58] text-[#4b5563] dark:text-[#d1d5db] hover:text-[#111827] dark:hover:text-white hover:bg-[#f3f4f6] dark:hover:bg-[#3c4149] shadow-md transition-all cursor-pointer"
            aria-label="Faire défiler vers la droite"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
