import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  Search,
  X,
  Bookmark,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ALL_ARTICLES, ArticleItem } from '../data/articles';
import { useAuth } from '../context/AuthContext';
import vibeCodingHero from '../assets/images/vibe_coding_hero_1788638245466.jpg';
import astraHero from '../assets/images/astra_mental_health_1788636271516.jpg';
import geminiTranscribeHero from '../assets/images/gemini_transcribe_hero_1788635604741.jpg';
import travelSearchHero from '../assets/images/travel_search_hero_1788635618448.jpg';
import pixelHardwareHero from '../assets/images/pixel_hardware_hero_1788635630337.jpg';
import geminiOmniFlashImg from '../assets/images/gemini_omni_flash_1788743908500.jpg';

interface NewsPageProps {
  onBack: () => void;
  onNavigateToArticle: (articleId: string) => void;
  onNavigateToAuthor?: () => void;
  initialFilter?: string;
}

// Map known articles to their visual assets
const ARTICLE_IMAGES: Record<string, string> = {
  'vibe-coding-intention': vibeCodingHero,
  'astra-sante-mentale': astraHero,
  'gemini-3.5-transcribe': geminiTranscribeHero,
  'travel-in-search': travelSearchHero,
  'pixel-fall-features': pixelHardwareHero,
  'pixel-11': pixelHardwareHero,
  'gemini-omni-1-1-flash': geminiOmniFlashImg,
};

// Available thematic filters
const THEMATIC_FILTERS = [
  { id: 'all', label: 'Toutes les actualités' },
  { id: 'IA / intelligence artificielle', label: 'IA & Intelligence Artificielle' },
  { id: 'Gemini models', label: 'Gemini models' },
  { id: 'Developer Tools', label: 'Developer Tools' },
  { id: 'Search & Travel', label: 'Search & Travel' },
  { id: 'Android & Mobile', label: 'Android & Mobile' },
  { id: 'Chrome & Web', label: 'Chrome & Web' },
  { id: 'Pixel Hardware', label: 'Pixel Hardware' },
  { id: 'Innovation', label: 'Innovation' },
  { id: 'Santé mentale', label: 'Santé mentale' },
];

export const NewsPage: React.FC<NewsPageProps> = ({
  onBack,
  onNavigateToArticle,
  onNavigateToAuthor,
  initialFilter = 'all',
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { toggleBookmark, isBookmarked } = useAuth();
  const filtersContainerRef = useRef<HTMLDivElement>(null);

  const scrollFilters = (direction: 'left' | 'right') => {
    if (filtersContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      filtersContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Normalize helper for flexible thematic match
  const matchesThematic = (article: ArticleItem, theme: string): boolean => {
    if (theme === 'all') return true;
    const lowerTheme = theme.toLowerCase();

    // Check exact topic match
    if (article.topic.toLowerCase().includes(lowerTheme)) return true;

    // Check tags match
    if (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(lowerTheme))) {
      return true;
    }

    // Special match for IA
    if (lowerTheme === 'ia' || lowerTheme.includes('intelligence artificielle')) {
      if (
        article.topic.toLowerCase().includes('ia') ||
        article.topic.toLowerCase().includes('intelligence') ||
        (article.tags && article.tags.some((t) => t.toLowerCase().includes('ia')))
      ) {
        return true;
      }
    }

    // Special match for Innovation
    if (lowerTheme === 'innovation') {
      return article.tags?.some((t) => t.toLowerCase().includes('innovation')) || false;
    }

    // Special match for Santé mentale
    if (lowerTheme.includes('santé') || lowerTheme.includes('sante')) {
      return (
        article.title.toLowerCase().includes('santé') ||
        article.title.toLowerCase().includes('sante') ||
        (article.tags && article.tags.some((t) => t.toLowerCase().includes('santé')))
      );
    }

    return false;
  };

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const matchTheme = matchesThematic(article, selectedTheme);
      if (!matchTheme) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inTitle = article.title.toLowerCase().includes(q);
      const inExcerpt = article.excerpt.toLowerCase().includes(q);
      const inAuthor = article.author.toLowerCase().includes(q);
      const inTags = article.tags?.some((t) => t.toLowerCase().includes(q));

      return inTitle || inExcerpt || inAuthor || inTags;
    });
  }, [selectedTheme, searchQuery]);

  // Counts per thematic filter
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    THEMATIC_FILTERS.forEach((f) => {
      counts[f.id] = ALL_ARTICLES.filter((art) => matchesThematic(art, f.id)).length;
    });
    return counts;
  }, []);

  return (
    <div className="max-w-[680px] mx-auto px-5 py-6 pb-20">
      {/* Breadcrumbs */}
      <nav
        id="news-breadcrumbs"
        className="flex items-center gap-2 text-sm font-google-sans text-[#1a73e8] dark:text-[#8ab4f8] mb-6"
        aria-label="Breadcrumbs"
      >
        <button
          onClick={onBack}
          className="hover:underline text-[#1a73e8] dark:text-[#8ab4f8] font-medium cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Accueil
        </button>
        <span className="text-[#5f6368] dark:text-[#9aa0a6] select-none">&rsaquo;</span>
        <span className="text-[#202124] dark:text-[#f1f3f4] font-medium">Actualités</span>
        {selectedTheme !== 'all' && (
          <>
            <span className="text-[#5f6368] dark:text-[#9aa0a6] select-none">&rsaquo;</span>
            <span className="text-[#5f6368] dark:text-[#9aa0a6] truncate max-w-[200px]">
              {THEMATIC_FILTERS.find((f) => f.id === selectedTheme)?.label || selectedTheme}
            </span>
          </>
        )}
      </nav>

      {/* Titre & Sous-titre */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#e8f0fe] dark:bg-[#1a3860] text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Flux d'actualités
          </span>
          <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
            {filteredArticles.length} {filteredArticles.length > 1 ? 'articles disponibles' : 'article disponible'}
          </span>
        </div>
        <h1 className="font-google-sans text-[28px] sm:text-[32px] font-medium text-[#202124] dark:text-[#f1f3f4] tracking-tight leading-tight">
          Toutes les actualités
        </h1>
        <p className="text-[15px] text-[#5f6368] dark:text-[#bdc1c6] mt-2 leading-relaxed">
          Explorez l’ensemble des reportages, avancées en IA, outils de développement et innovations, filtrés par thématique.
        </p>
      </div>

      {/* Barre de Recherche */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une actualité, un mot-clé ou un auteur..."
          className="w-full pl-10 pr-10 py-2.5 bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0] dark:border-[#3c4043] rounded-[24px] text-[14px] text-[#202124] dark:text-[#f1f3f4] placeholder-[#5f6368] dark:placeholder-[#9aa0a6] focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#8ab4f8] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] p-1 rounded-full cursor-pointer"
            aria-label="Effacer la recherche"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filtres par thématique avec déroulement horizontal */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrer par thématique</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollFilters('left')}
              className="p-1 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer transition-colors"
              aria-label="Faire défiler vers la gauche"
              title="Faire défiler vers la gauche"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollFilters('right')}
              className="p-1 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer transition-colors"
              aria-label="Faire défiler vers la droite"
              title="Faire défiler vers la droite"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={filtersContainerRef}
          className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth no-scrollbar select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {THEMATIC_FILTERS.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            const count = filterCounts[theme.id] || 0;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a73e8] text-white shadow-xs dark:bg-[#8ab4f8] dark:text-[#202124]'
                    : 'bg-[#f1f3f4] dark:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] hover:bg-[#e8eaed] dark:hover:bg-[#3c4043] border border-transparent'
                }`}
              >
                <span>{theme.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white dark:bg-black/15 dark:text-[#202124]'
                      : 'bg-[#dadce0] dark:bg-[#3c4043] text-[#5f6368] dark:text-[#9aa0a6]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Liste des articles filtrés */}
      {filteredArticles.length === 0 ? (
        <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[24px] p-8 text-center my-6">
          <Sparkles className="w-10 h-10 text-[#5f6368] dark:text-[#9aa0a6] mx-auto mb-3 opacity-60" />
          <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2">
            Aucun article trouvé
          </h3>
          <p className="text-[14px] text-[#5f6368] dark:text-[#bdc1c6] mb-5 max-w-[400px] mx-auto">
            Aucune actualité ne correspond à vos critères de recherche pour cette thématique.
          </p>
          <button
            onClick={() => {
              setSelectedTheme('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[20px] bg-[#1a73e8] text-white text-[14px] font-medium hover:bg-[#1557b0] transition-colors cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredArticles.map((article) => {
            const articleImage = ARTICLE_IMAGES[article.id];
            const isStanley = article.author === 'Stanley Mazile';

            return (
              <article
                key={article.id}
                className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden p-5 transition-all hover:border-[#1a73e8]/50 dark:hover:border-[#8ab4f8]/50 shadow-xs group"
              >
                {/* Visual Banner if available */}
                {articleImage && (
                  <div
                    onClick={() => onNavigateToArticle(article.id)}
                    className="w-full h-[180px] sm:h-[210px] rounded-[14px] overflow-hidden mb-4 relative cursor-pointer"
                  >
                    <img
                      src={articleImage}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-[#1a73e8] text-white text-xs font-medium px-3 py-1 rounded-full shadow-xs">
                      {article.topic}
                    </div>
                  </div>
                )}

                {/* Metadata row */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                      {article.topic}
                    </span>
                    <span className="text-[#dadce0] dark:text-[#5f6368] text-xs">•</span>
                    {isStanley ? (
                      <button
                        onClick={onNavigateToAuthor}
                        className="text-[12px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
                      >
                        Par Stanley Mazile
                      </button>
                    ) : (
                      <span className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] font-medium">
                        Par {article.author}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[12px] text-[#5f6368] dark:text-[#9aa0a6]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h2
                  onClick={() => onNavigateToArticle(article.id)}
                  className="font-google-sans text-[20px] sm:text-[21px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3] cursor-pointer group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors"
                >
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[14px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-white dark:bg-[#202124] text-[#5f6368] dark:text-[#9aa0a6] border border-[#dadce0]/60 dark:border-[#3c4043] px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons: Read article & Bookmark */}
                <div className="flex items-center justify-between pt-2 border-t border-[#dadce0]/40 dark:border-[#3c4043]/40">
                  <button
                    onClick={() => onNavigateToArticle(article.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[13px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer"
                  >
                    Lire l'article <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleBookmark(article.id, article.title)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      isBookmarked(article.id)
                        ? 'bg-[#e8f0fe] dark:bg-[#1a3860] text-[#1a73e8] dark:text-[#8ab4f8] border-[#1a73e8]/40'
                        : 'bg-white dark:bg-[#202124] text-[#5f6368] dark:text-[#9aa0a6] border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f1f3f4] dark:hover:bg-[#303134]'
                    }`}
                    title={
                      isBookmarked(article.id)
                        ? 'Retirer des favoris'
                        : 'Enregistrer dans les favoris'
                    }
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${isBookmarked(article.id) ? 'fill-current' : ''}`}
                    />
                    <span>{isBookmarked(article.id) ? 'Enregistré' : 'Enregistrer'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
