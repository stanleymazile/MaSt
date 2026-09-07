import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { TravelSearchSection } from './components/TravelSearchSection';
import { GeminiTranscribeSection } from './components/GeminiTranscribeSection';
import { AstraMentalHealthSection } from './components/AstraMentalHealthSection';
import { VibeCodingSection } from './components/VibeCodingSection';
import { GenericArticleSection } from './components/GenericArticleSection';
import { AuthorProfilePage } from './components/AuthorProfilePage';
import { NewsPage } from './components/NewsPage';
import { RecommendedForYou } from './components/RecommendedForYou';
import { NewsletterBox } from './components/NewsletterBox';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { ShareModal } from './components/ShareModal';
import { VideoModal } from './components/VideoModal';
import { FullScreenMenu } from './components/FullScreenMenu';
import { ContactModal } from './components/ContactModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { ArticleClaps } from './components/ArticleClaps';
import { ALL_ARTICLES } from './data/articles';
import { useSEO } from './hooks/useSEO';
import { useAuth } from './context/AuthContext';
import { Bookmark } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mast_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [currentView, setCurrentView] = useState<'home' | 'article' | 'author' | 'news'>('home');
  const [newsFilter, setNewsFilter] = useState<string>('all');
  const [activeArticleId, setActiveArticleId] = useState<string>('travel-in-search');
  const [currentTopic, setCurrentTopic] = useState<string>('Search & Travel');

  // Dynamic Google Discover & Rich SEO Meta Management
  useSEO({ currentView, activeArticleId, newsFilter });

  // Initialize view from URL query param if present (?article=... or ?author=... or ?view=news) and support back/forward buttons
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorParam = params.get('author');
    const articleParam = params.get('article');
    const viewParam = params.get('view');
    const topicParam = params.get('topic');

    if (authorParam === 'stanley-mazile') {
      setCurrentView('author');
    } else if (viewParam === 'news' || params.get('news') === 'true') {
      setCurrentView('news');
      if (topicParam) setNewsFilter(topicParam);
    } else if (articleParam && ALL_ARTICLES.some((a) => a.id === articleParam)) {
      setCurrentView('article');
      setActiveArticleId(articleParam);
      const matchingArticle = ALL_ARTICLES.find((a) => a.id === articleParam);
      if (matchingArticle) {
        setCurrentTopic(matchingArticle.topic);
      }
    }

    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorP = urlParams.get('author');
      const articleId = urlParams.get('article');
      const viewP = urlParams.get('view');
      const topicP = urlParams.get('topic');

      if (authorP === 'stanley-mazile') {
        setCurrentView('author');
      } else if (viewP === 'news' || urlParams.get('news') === 'true') {
        setCurrentView('news');
        if (topicP) setNewsFilter(topicP);
      } else if (articleId && ALL_ARTICLES.some((a) => a.id === articleId)) {
        setCurrentView('article');
        setActiveArticleId(articleId);
        const matchingArticle = ALL_ARTICLES.find((a) => a.id === articleId);
        if (matchingArticle) {
          setCurrentTopic(matchingArticle.topic);
        }
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Global (English)');
  const [isAudioPlayerActive, setIsAudioPlayerActive] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [shareModalData, setShareModalData] = useState<{ isOpen: boolean; title: string }>({
    isOpen: false,
    title: '',
  });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  const { toggleBookmark, isBookmarked } = useAuth();

  // Sync theme with HTML document class and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mast_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToNews = (filter: string = 'all') => {
    setCurrentView('news');
    setNewsFilter(filter);
    if (typeof window !== 'undefined') {
      const query = filter && filter !== 'all' ? `?view=news&topic=${encodeURIComponent(filter)}` : '?view=news';
      window.history.pushState({}, '', query);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'article' | 'news', filterOrStoryId?: string) => {
    if (view === 'news') {
      handleNavigateToNews(filterOrStoryId || 'all');
      return;
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'article') {
      const targetId = filterOrStoryId || 'astra-sante-mentale';
      setActiveArticleId(targetId);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `?article=${targetId}`);
      }
      const matchingArticle = ALL_ARTICLES.find((a) => a.id === targetId);
      if (matchingArticle) {
        setCurrentTopic(matchingArticle.topic);
      }
    } else {
      if (typeof window !== 'undefined' && window.location.search) {
        window.history.pushState({}, '', window.location.pathname);
      }
    }
  };

  const handleNavigateToArticle = (articleId?: string) => {
    handleNavigate('article', articleId);
  };

  const handleNavigateToAuthor = () => {
    setCurrentView('author');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '?author=stanley-mazile');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNewsletter = () => {
    const el = document.getElementById('newsletter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = el.querySelector('input');
      if (input) input.focus();
    }
  };

  const handleListenArticle = () => {
    setIsAudioPlayerActive(true);
    setIsAudioPlaying(true);
  };

  const handleShare = (title: string) => {
    setShareModalData({ isOpen: true, title });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#202124] text-[#3c4043] dark:text-[#e8eaed] font-sans selection:bg-[#d2e3fc] selection:text-[#174ea6] flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Top Fixed / Sticky Navigation Header */}
        <Header
          onNavigateHome={handleNavigateHome}
          onOpenNewsletter={handleOpenNewsletter}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {currentView === 'home' ? (
          /* HOME VIEW */
          <main>
            <HomePage
              onNavigateToArticle={handleNavigateToArticle}
              onNavigateToNews={handleNavigateToNews}
            />
          </main>
        ) : currentView === 'author' ? (
          /* AUTHOR PROFILE VIEW */
          <main>
            <AuthorProfilePage
              onBack={handleNavigateHome}
              onNavigateToArticle={handleNavigateToArticle}
            />
          </main>
        ) : currentView === 'news' ? (
          /* NEWS VIEW WITH THEMATIC FILTERS */
          <main>
            <NewsPage
              onBack={handleNavigateHome}
              onNavigateToArticle={handleNavigateToArticle}
              onNavigateToAuthor={handleNavigateToAuthor}
              initialFilter={newsFilter}
            />
          </main>
        ) : (
          /* ARTICLE VIEW */
          <main className="max-w-[680px] mx-auto px-5 py-6 pb-16">
            {/* Breadcrumbs Navigation & Bookmark Action */}
            {(() => {
              const currentArticle = ALL_ARTICLES.find((a) => a.id === activeArticleId) || ALL_ARTICLES[0];
              const isAstra = activeArticleId === 'astra-sante-mentale';
              const isVibeCoding = activeArticleId === 'vibe-coding-intention';
              const category = isAstra || isVibeCoding
                ? 'Actualités'
                : activeArticleId === 'travel-in-search'
                ? 'Actualités'
                : 'Affiliations';
              const subCategory = isAstra || isVibeCoding
                ? 'IA / intelligence artificielle'
                : activeArticleId === 'travel-in-search'
                ? 'Search & Travel'
                : activeArticleId === 'gemini-3.5-transcribe'
                ? 'Produit'
                : currentArticle.topic;

              return (
                <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
                  <nav
                    id="breadcrumbs-nav"
                    className="flex items-center gap-2 text-sm font-google-sans text-[#1a73e8] dark:text-[#8ab4f8] flex-wrap"
                    aria-label="Breadcrumbs"
                  >
                    <button
                      onClick={handleNavigateHome}
                      className="hover:underline text-[#1a73e8] dark:text-[#8ab4f8] font-medium cursor-pointer"
                    >
                      Home
                    </button>
                    <span className="text-[#5f6368] dark:text-[#9aa0a6] select-none">&rsaquo;</span>
                    <button
                      onClick={() => {
                        if (category === 'Actualités') {
                          handleNavigateToNews();
                        } else {
                          handleNavigateHome();
                        }
                      }}
                      className="hover:underline text-[#1a73e8] dark:text-[#8ab4f8] cursor-pointer"
                    >
                      {category}
                    </button>
                    <span className="text-[#5f6368] dark:text-[#9aa0a6] select-none">&rsaquo;</span>
                    <span className="text-[#5f6368] dark:text-[#9aa0a6]">
                      {subCategory}
                    </span>
                  </nav>

                  {/* Bookmark Button linked to Firebase Firestore */}
                  <button
                    onClick={() => toggleBookmark(activeArticleId, currentArticle.title)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer shrink-0 ${
                      isBookmarked(activeArticleId)
                        ? 'bg-[#e8f0fe] dark:bg-[#1a3860] text-[#1a73e8] dark:text-[#8ab4f8] border-[#1a73e8]/40'
                        : 'bg-white dark:bg-[#202124] text-[#5f6368] dark:text-[#9aa0a6] border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f1f3f4] dark:hover:bg-[#303134]'
                    }`}
                    title={isBookmarked(activeArticleId) ? 'Retirer des favoris Firestore' : 'Enregistrer dans Firebase Firestore'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(activeArticleId) ? 'fill-current' : ''}`} />
                    <span>{isBookmarked(activeArticleId) ? 'Enregistré' : 'Enregistrer'}</span>
                  </button>
                </div>
              );
            })()}

            {/* SINGLE ARTICLE VIEW - Chaque article est affiché seul dans sa propre page */}
            <div className="mb-8">
              {activeArticleId === 'vibe-coding-intention' ? (
                <VibeCodingSection
                  onShare={handleShare}
                  onNavigateToAuthor={handleNavigateToAuthor}
                />
              ) : activeArticleId === 'astra-sante-mentale' ? (
                <AstraMentalHealthSection
                  onShare={handleShare}
                  onNavigateToAuthor={handleNavigateToAuthor}
                />
              ) : activeArticleId === 'travel-in-search' ? (
                <TravelSearchSection onShare={handleShare} />
              ) : activeArticleId === 'gemini-3.5-transcribe' ? (
                <GeminiTranscribeSection
                  onListenArticle={handleListenArticle}
                  onOpenVideoDemo={() => setIsVideoModalOpen(true)}
                />
              ) : (
                <GenericArticleSection
                  article={
                    ALL_ARTICLES.find((a) => a.id === activeArticleId) || ALL_ARTICLES[0]
                  }
                  onShare={handleShare}
                  onListenArticle={handleListenArticle}
                  onNavigateToAuthor={handleNavigateToAuthor}
                />
              )}
            </div>

            {/* Real-time Firestore Claps / Recommandations */}
            <ArticleClaps articleId={activeArticleId} />

            {/* RECOMMENDED FOR YOU (Dynamically suggests other articles based on the current topic) */}
            <RecommendedForYou
              currentTopic={currentTopic}
              currentArticleId={activeArticleId}
              onSelectArticle={(id) => handleNavigateToArticle(id)}
              onTopicChange={(newTopic) => setCurrentTopic(newTopic)}
            />

            {/* NEWSLETTER SUBSCRIPTION BOX */}
            <div id="newsletter-section">
              <NewsletterBox />
            </div>
          </main>
        )}
      </div>

      {/* FOOTER */}
      <Footer />

      {/* Fullscreen Google News Menu (matches user request exactly) */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        onOpenNewsletter={handleOpenNewsletter}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Bookmarks Drawer (Firebase Firestore) */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        onNavigateToArticle={handleNavigateToArticle}
      />

      {/* Floating Audio Player */}
      {isAudioPlayerActive && (
        <AudioPlayer
          isPlaying={isAudioPlaying}
          onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
          onClose={() => {
            setIsAudioPlayerActive(false);
            setIsAudioPlaying(false);
          }}
          title="Introducing Gemini 3.5 Transcribe"
        />
      )}

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalData.isOpen}
        onClose={() => setShareModalData({ isOpen: false, title: '' })}
        title={shareModalData.title}
      />

      {/* Interactive Video / Transcribe Live Demo Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
