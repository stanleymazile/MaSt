import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { TravelSearchSection } from './components/TravelSearchSection';
import { GeminiTranscribeSection } from './components/GeminiTranscribeSection';
import { AstraMentalHealthSection } from './components/AstraMentalHealthSection';
import { VibeCodingSection } from './components/VibeCodingSection';
import { GenericArticleSection } from './components/GenericArticleSection';
import { RecommendedForYou } from './components/RecommendedForYou';
import { NewsletterBox } from './components/NewsletterBox';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { ShareModal } from './components/ShareModal';
import { VideoModal } from './components/VideoModal';
import { FullScreenMenu } from './components/FullScreenMenu';
import { ContactModal } from './components/ContactModal';
import { ALL_ARTICLES } from './data/articles';
import { useSEO } from './hooks/useSEO';

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

  const [currentView, setCurrentView] = useState<'home' | 'article'>('home');
  const [activeArticleId, setActiveArticleId] = useState<string>('travel-in-search');
  const [currentTopic, setCurrentTopic] = useState<string>('Search & Travel');

  // Dynamic Google Discover & Rich SEO Meta Management
  useSEO({ currentView, activeArticleId });

  // Initialize view from URL query param if present (?article=...) and support back/forward buttons
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleParam = params.get('article');
    if (articleParam && ALL_ARTICLES.some((a) => a.id === articleParam)) {
      setCurrentView('article');
      setActiveArticleId(articleParam);
      const matchingArticle = ALL_ARTICLES.find((a) => a.id === articleParam);
      if (matchingArticle) {
        setCurrentTopic(matchingArticle.topic);
      }
    }

    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const articleId = urlParams.get('article');
      if (articleId && ALL_ARTICLES.some((a) => a.id === articleId)) {
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

  const handleNavigate = (view: 'home' | 'article', filterOrStoryId?: string) => {
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
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {currentView === 'home' ? (
          /* HOME VIEW */
          <main>
            <HomePage onNavigateToArticle={handleNavigateToArticle} />
          </main>
        ) : (
          /* ARTICLE VIEW */
          <main className="max-w-[680px] mx-auto px-5 py-6 pb-16">
            {/* Breadcrumbs Navigation */}
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
                <nav
                  id="breadcrumbs-nav"
                  className="flex items-center gap-2 text-sm font-google-sans text-[#1a73e8] dark:text-[#8ab4f8] mb-6 flex-wrap"
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
                    onClick={handleNavigateHome}
                    className="hover:underline text-[#1a73e8] dark:text-[#8ab4f8] cursor-pointer"
                  >
                    {category}
                  </button>
                  <span className="text-[#5f6368] dark:text-[#9aa0a6] select-none">&rsaquo;</span>
                  <span className="text-[#5f6368] dark:text-[#9aa0a6]">
                    {subCategory}
                  </span>
                </nav>
              );
            })()}

            {/* SINGLE ARTICLE VIEW - Chaque article est affiché seul dans sa propre page */}
            <div className="mb-14">
              {activeArticleId === 'vibe-coding-intention' ? (
                <VibeCodingSection onShare={handleShare} />
              ) : activeArticleId === 'astra-sante-mentale' ? (
                <AstraMentalHealthSection onShare={handleShare} />
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
                />
              )}
            </div>

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
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
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
