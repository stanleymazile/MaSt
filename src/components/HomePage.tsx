import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import geminiTranscribeHero from '../assets/images/gemini_transcribe_hero_1788635604741.jpg';
import travelSearchHero from '../assets/images/travel_search_hero_1788635618448.jpg';
import pixelHardwareHero from '../assets/images/pixel_hardware_hero_1788635630337.jpg';
import astraHeroImage from '../assets/images/astra_mental_health_1788636271516.jpg';
import vibeCodingHeroImage from '../assets/images/vibe_coding_hero_1788638245466.jpg';
import geminiOmniFlashImg from '../assets/images/gemini_omni_flash_1788743908500.jpg';
interface HomePageProps {
  onNavigateToArticle: (articleId?: string) => void;
  onNavigateToNews?: (filter?: string) => void;
  onOpenNewsletterModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToArticle, onNavigateToNews }) => {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const carouselItems = [
    {
      id: 'vibe-coding-intention',
      image: vibeCodingHeroImage,
      bannerText: 'IA',
      bannerGradient: 'from-[#d2e3fc] to-[#aecbfa]',
      bannerTextColor: 'text-[#185abc]',
      category: 'IA / intelligence artificielle',
      author: 'Stanley Mazile',
      title: 'Le Vibe Coding : L’avenir du développement piloté par l’intention',
      desc: 'Le vibe coding représente un changement de paradigme dans la création de logiciels. Plutôt que d’écrire manuellement un code complexe, une approche permet aux humains de se concentrer sur la vision et l’architecture tandis que l’IA génère le code et ajuste les détails.',
    },
    {
      id: 'astra-sante-mentale',
      image: astraHeroImage,
      bannerText: 'IA',
      bannerGradient: 'from-[#d2e3fc] to-[#aecbfa]',
      bannerTextColor: 'text-[#185abc]',
      category: 'IA / intelligence artificielle',
      author: 'Stanley Mazile',
      title: 'Comment Astra protège-t-il la santé mentale ?',
      desc: 'GPT-6 Astra intègre plusieurs mécanismes et protocoles de sécurité pour protéger la santé mentale de ses utilisateurs, avec une attention particulière portée aux mineurs.',
    },
    {
      id: 'travel-in-search',
      image: travelSearchHero,
      bannerText: 'Travel in Search AI Mode',
      bannerGradient: 'from-[#c2e7ff] to-[#7fcfff]',
      bannerTextColor: 'text-[#004a77]',
      category: 'Search & Travel',
      author: 'Google Search Team',
      title: '3 new ways to plan and book travel in Search',
      desc: 'Our latest upgrades for AI Mode in Search can help you track flight prices, view points or miles rates, and book your dream hotel.',
    }
  ];

  // Topic filter state
  const [activeFilter, setActiveFilter] = useState('All News');
  const filters = [
    'All News',
    'Android',
    'Chrome',
    'Pixel',
    'Search',
    'Gemini App',
    'Gemini Notebook'
  ];

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // All latest articles list
  const allLatestArticles = [
    {
      id: 'limits-gemini-notebook',
      tags: ['Gemini Notebook'],
      topicCategory: 'Gemini Notebook',
      title: "We're introducing flexible usage limits for Gemini Notebook.",
      author: 'By Yulsu Shin\nProduct Manager, Gemini Notebook',
    },
    {
      id: 'expert-intelligence',
      tags: ['Gemini Notebook', 'Google Play'],
      topicCategory: 'Gemini Notebook',
      title: 'Expert Intelligence: a new way for you to engage with trusted content',
      author: 'By Steven Johnson\nEditorial Director, Google Labs',
    },
    {
      id: 'america-250-years',
      tags: ['Company Announcements', 'Public Policy'],
      topicCategory: 'All News',
      title: 'Celebrating 250 years of America, from its history to its future',
      author: '',
    },
    {
      id: 'google-flow-creative-control',
      tags: ['Google Labs'],
      topicCategory: 'Gemini App',
      title: 'Google Flow brings new creative control features to enhance video editing.',
      author: '',
    },
    {
      id: 'gemini-omni-1-1-flash',
      tags: ['Developer Tools', 'Gemini Models'],
      topicCategory: 'Gemini App',
      title: 'Gemini Omni 1.1 Flash lets you build with more control',
      author: 'By Anish Nangia\nProduct Manager, Google DeepMind',
    },
    {
      id: 'demand-gen-drop',
      tags: ['Google Ads', 'YouTube'],
      topicCategory: 'All News',
      title: "Reach your audience in new ways with August's Demand Gen Drop.",
      author: '',
    },
    {
      id: 'travel-search-update',
      tags: ['Search', 'Travel', 'AI'],
      topicCategory: 'Search',
      title: '3 new ways to plan and book travel in Search',
      author: 'By James Byers\nGroup Product Manager, Search',
    },
    {
      id: 'khan-academy-partnership',
      tags: ['Learning & Education'],
      topicCategory: 'All News',
      title: 'Partnering with Khan Academy on building AI tools for classrooms',
      author: 'By Jam Carter\nHead of Technology at Google.org',
    },
    {
      id: 'android-rambler',
      tags: ['Android', 'Gemini App'],
      topicCategory: 'Android',
      title: 'Rambler on Android brings voice dictation to everyday notes',
      author: 'By Sarah Jones\nAndroid Engineering Lead',
    },
    {
      id: 'chrome-voice-update',
      tags: ['Chrome', 'AI'],
      topicCategory: 'Chrome',
      title: 'Talk to type in Chrome: dictate web replies with AI precision',
      author: 'By David Lin\nChrome Product Director',
    },
    {
      id: 'pixel-fall-features',
      tags: ['Pixel', 'Hardware'],
      topicCategory: 'Pixel',
      title: 'Top 10 new camera features in Pixel 11 and Pro series',
      author: 'By Alex Rivera\nPixel Camera Team',
    }
  ];

  const [visibleCount, setVisibleCount] = useState(8);

  const filteredArticles = allLatestArticles.filter((item) => {
    if (activeFilter === 'All News') return true;
    return item.topicCategory === activeFilter || item.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNextSlide();
    } else if (diff < -45) {
      handlePrevSlide();
    }
    setTouchStartX(null);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const activeItem = carouselItems[currentSlide];

  return (
    <div id="home-page-container" className="max-w-[680px] mx-auto px-5 py-5 pb-16 font-sans">
      {/* 1. Hero Featured Carousel Item (Full Screen on Mobile) */}
      <div
        id="featured-carousel-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="-mx-5 -mt-5 sm:mx-0 sm:mt-0 h-[calc(100svh-65px)] sm:h-auto min-h-[520px] sm:min-h-0 bg-[#eef4ff] dark:bg-[#1a273b] border-y sm:border border-transparent dark:border-[#3c4043] rounded-none sm:rounded-[24px] overflow-hidden mb-6 flex flex-col justify-between transition-all duration-300 shadow-xs"
      >
        {/* Banner Image Area */}
        <div className="w-full h-[46%] sm:h-[220px] min-h-[190px] relative overflow-hidden shrink-0 group bg-[#1a273b]">
          <img
            key={activeItem.id}
            src={activeItem.image}
            alt={activeItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient overlay to enhance contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Floating Pill on image */}
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs sm:text-sm font-medium border border-white/20 shadow-xs">
              {activeItem.bannerText}
            </span>
          </div>

          {/* Mobile slide badge */}
          <div className="absolute top-4 right-4 sm:hidden bg-black/50 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 z-10">
            {currentSlide + 1} / {carouselItems.length}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-6 bg-[#eef4ff] dark:bg-[#1a273b]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
              <span className="text-[13px] font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                {activeItem.category}
              </span>
              {activeItem.author && (
                <>
                  <span className="text-[#dadce0] dark:text-[#5f6368] text-xs">•</span>
                  <span className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] font-medium">
                    Par {activeItem.author}
                  </span>
                </>
              )}
            </div>
            <h2 className="font-google-sans text-[22px] xs:text-[25px] sm:text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] leading-[1.25] mb-2 sm:mb-3">
              {activeItem.title}
            </h2>
            <p className="text-[14px] xs:text-[15px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 sm:mb-5 leading-relaxed line-clamp-3 sm:line-clamp-none">
              {activeItem.desc}
            </p>
          </div>

          <div>
            {/* CTA & Mobile Carousel Navigation */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <button
                onClick={() => onNavigateToArticle(activeItem.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer"
              >
                Lire l'article <span className="text-base">&rarr;</span>
              </button>

              {/* Mobile Quick Carousel Controls */}
              <div className="flex sm:hidden items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="w-9 h-9 rounded-full bg-white/90 dark:bg-[#303134] text-[#202124] dark:text-[#e8eaed] flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-9 h-9 rounded-full bg-white/90 dark:bg-[#303134] text-[#202124] dark:text-[#e8eaed] flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Slide Progress Indicator */}
            <div className="sm:hidden w-full h-1 bg-[#d2e3fc] dark:bg-[#3c4043] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1a73e8] dark:bg-[#8ab4f8] rounded-full transition-all duration-300"
                style={{
                  width: `${100 / carouselItems.length}%`,
                  marginLeft: `${(currentSlide * 100) / carouselItems.length}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Carousel Controls */}
      <div className="hidden sm:flex items-center gap-4 mb-10">
        <button
          onClick={handlePrevSlide}
          className="w-9 h-9 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] active:bg-[#dadce0] dark:bg-[#303134] dark:hover:bg-[#3c4043] flex items-center justify-center cursor-pointer transition-colors text-[#202124] dark:text-[#e8eaed] focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="w-9 h-9 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] active:bg-[#dadce0] dark:bg-[#303134] dark:hover:bg-[#3c4043] flex items-center justify-center cursor-pointer transition-colors text-[#202124] dark:text-[#e8eaed] focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex-1 h-1 bg-[#e0e0e0] dark:bg-[#3c4043] rounded-[2px] overflow-hidden relative">
          <div
            className="h-full bg-[#3c4043] dark:bg-[#8ab4f8] rounded-[2px] transition-all duration-300"
            style={{
              width: `${100 / carouselItems.length}%`,
              marginLeft: `${(currentSlide * 100) / carouselItems.length}%`,
            }}
          />
        </div>
      </div>

      {/* Section 1: Dernières actualités */}
      <h2 className="font-google-sans text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] mt-9 mb-5">
        Dernières actualités
      </h2>

      {/* Actualité 1: Gemini 3.5 Transcribe */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[200px] rounded-[12px] overflow-hidden mb-4 relative group">
          <img
            src={geminiTranscribeHero}
            alt="Introducing Gemini 3.5 Transcribe"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 bg-[#1a73e8] text-white text-xs font-medium px-3 py-1 rounded-full shadow-xs">
            Nouveau
          </div>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] inline-block">
            Gemini models
          </span>
          <span className="text-[#dadce0] dark:text-[#5f6368] text-xs">•</span>
          <span className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] font-medium">
            Par Google DeepMind Team
          </span>
        </div>
        <h3 className="font-google-sans text-[19px] sm:text-[20px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          Introducing Gemini 3.5 Transcribe
        </h3>
        <p className="text-[14px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 line-clamp-2">
          Notre modèle speech-to-text le plus intelligent, conçu pour convertir l'audio brut en texte structuré, précis et contextuellement enrichi à travers de multiples langues.
        </p>
        <button
          onClick={() => onNavigateToArticle('gemini-3.5-transcribe')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer"
        >
          Lire l'article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Actualité 2: Gemini Omni 1.1 Flash */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[200px] rounded-[12px] overflow-hidden mb-4 relative group">
          <img
            src={geminiOmniFlashImg}
            alt="Gemini Omni 1.1 Flash lets you build with more control"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 bg-[#1a73e8] text-white text-xs font-medium px-3 py-1 rounded-full shadow-xs">
            Nouveau
          </div>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] inline-block">
            Developer Tools
          </span>
          <span className="text-[#dadce0] dark:text-[#5f6368] text-xs">•</span>
          <span className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] font-medium">
            Par Anish Nangia & Elisa Fortis
          </span>
        </div>
        <h3 className="font-google-sans text-[19px] sm:text-[20px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          Gemini Omni 1.1 Flash lets you build with more control
        </h3>
        <p className="text-[14px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 line-clamp-2">
          Modes à latence inférieure à 100 ms, guidage précis des tokens et streaming multimodal natif pour concevoir des applications et agents interactifs d'avant-garde.
        </p>
        <button
          onClick={() => onNavigateToArticle('gemini-omni-1-1-flash')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer"
        >
          Lire l'article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Actualité 3: National Parks */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[180px] rounded-[12px] overflow-hidden mb-4 bg-[#e0e0e0] dark:bg-[#3c4043]">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="#edb879" />
            <path
              d="M100 180 C 120 80, 200 80, 220 180"
              stroke="#8c4a16"
              strokeWidth="30"
              fill="none"
              strokeLinecap="round"
            />
            {/* Mountain silhouette */}
            <path d="M220 180 L280 110 L340 180 Z" fill="#d99b59" opacity="0.6" />
            <circle cx="330" cy="50" r="22" fill="#fff5ea" opacity="0.8" />
          </svg>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] inline-block">
            Search & Travel
          </span>
          <span className="text-[#dadce0] dark:text-[#5f6368] text-xs">•</span>
          <span className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] font-medium">
            Par Google Maps & Search Team
          </span>
        </div>
        <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          Celebrate 110 years of national parks with Maps, Search, and Gemini
        </h3>
        <p className="text-[14px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 line-clamp-2">
          Découvrez comment Ask Maps, le mode IA dans la recherche et la vue immersive de Gemini vous aident à explorer sentiers, patrimoine et campings.
        </p>
        <button
          onClick={() => onNavigateToArticle('national-parks')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer"
        >
          Lire l'article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Voir plus d'actualités */}
      <div className="mt-4 mb-2">
        <button
          onClick={() => onNavigateToNews && onNavigateToNews()}
          className="inline-flex items-center gap-2 font-google-sans text-[15px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer group"
        >
          <span>Voir plus d'actualités</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Section 2: Affiliations */}
      <h2 className="font-google-sans text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] mt-9 mb-5">
        Affiliations
      </h2>

      {/* Hardware Card 1: Pixel */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[180px] rounded-[12px] overflow-hidden mb-4 bg-[#f4b4a6] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <rect width="100%" height="100%" fill="#f4b4a6" />
            {/* Phone & Watch vector silhouette */}
            <g transform="translate(140, 30)">
              <rect x="0" y="0" width="70" height="135" rx="14" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
              <rect x="6" y="8" width="58" height="119" rx="8" fill="#202124" />
              <circle cx="35" cy="18" r="3" fill="#ffffff" />
            </g>
            <g transform="translate(230, 60)">
              <rect x="0" y="-20" width="40" height="115" rx="6" fill="#3c4043" />
              <circle cx="20" cy="38" r="32" fill="#202124" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
              <circle cx="20" cy="38" r="28" fill="#1a73e8" opacity="0.4" />
              <text x="20" y="42" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="'Google Sans', sans-serif" fontWeight="bold">10:08</text>
            </g>
            <text
              x="50"
              y="105"
              fontFamily="'Google Sans', 'Roboto', sans-serif"
              fontSize="20"
              fontWeight="bold"
              fill="#b3402e"
            >
              Google Pixel
            </text>
          </svg>
        </div>
        <span className="text-[13px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mb-1 inline-block">
          Pixel
        </span>
        <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          Pixel 11 phones and Pixel Watch 5 are now on shelves
        </h3>
        <p className="text-[14px] text-[#5f6368] dark:text-[#bdc1c6] mb-4">
          Find them at the Google Store and...
        </p>
        <button
          onClick={() => onNavigateToArticle('pixel-11')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer"
        >
          Read article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Hardware Card 2: Fitbit Pokémon Sleep */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[180px] rounded-[12px] overflow-hidden mb-4 bg-[#1b2e63] flex items-center justify-center relative">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <rect width="100%" height="100%" fill="#1b2e63" />
            <circle cx="300" cy="50" r="24" fill="#f4b400" />
            <circle cx="292" cy="45" r="22" fill="#1b2e63" />
            {/* Stars */}
            <circle cx="80" cy="40" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="150" cy="80" r="2.5" fill="#ffffff" opacity="0.9" />
            <circle cx="220" cy="30" r="1.5" fill="#ffffff" opacity="0.7" />
            <circle cx="350" cy="120" r="2" fill="#ffffff" opacity="0.8" />
            {/* Fitbit Band Illustration */}
            <g transform="translate(150, 45)">
              <rect x="0" y="0" width="100" height="110" rx="20" fill="#29396e" stroke="#3d529a" strokeWidth="2" />
              <rect x="15" y="15" width="70" height="80" rx="12" fill="#0d1b3e" />
              <text x="50" y="55" textAnchor="middle" fill="#8ab4f8" fontSize="11" fontFamily="'Google Sans', sans-serif">Fitbit Sleep</text>
              <text x="50" y="75" textAnchor="middle" fill="#f4b400" fontSize="13" fontWeight="bold" fontFamily="'Google Sans', sans-serif">Zzz... 92%</text>
            </g>
          </svg>
        </div>
        <span className="text-[13px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mb-1 inline-block">
          Fitbit
        </span>
        <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          Introducing the Fitbit Air Special Edition Pokémon Sleep
        </h3>
        <p className="text-[14px] text-[#5f6368] dark:text-[#bdc1c6] mb-4">
          Level up your sleep routine with...
        </p>
        <button
          onClick={() => onNavigateToArticle('fitbit-pokemon')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer"
        >
          Read article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Newsletter Banner Card */}
      <div className="bg-[#fff8e1] dark:bg-[#2c2817] rounded-[20px] p-5 sm:p-6 my-9 border border-[#ffe082]/60 dark:border-[#ffe082]/30 shadow-xs transition-colors">
        <h3 className="font-google-sans text-[20px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2">
          Get the latest news from Google in your inbox
        </h3>
        <p className="text-[13px] text-[#5f6368] dark:text-[#bdc1c6] mb-4">
          Sign up for our newsletters with product updates, event information, special offers, and more.
        </p>

        {isSubscribed ? (
          <div className="bg-[#e6f4ea] dark:bg-[#1e3a24] text-[#137333] dark:text-[#81c995] px-4 py-2.5 rounded-full text-xs font-medium inline-flex items-center gap-2 mb-3">
            <Check className="w-4 h-4" />
            Thank you for subscribing! Check your inbox soon.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="email"
              required
              placeholder="Email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-[#dadce0] dark:border-[#5f6368] rounded-full text-sm text-[#202124] dark:text-[#e8eaed] outline-none bg-white dark:bg-[#202124] focus:border-[#1a73e8] dark:focus:border-[#8ab4f8]"
            />
            <button
              type="submit"
              className="bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] dark:hover:bg-[#a8c7fa] text-white px-5 py-2.5 rounded-full font-google-sans text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] leading-[1.4]">
          Your information will be used in accordance with{' '}
          <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">
            Google's privacy policy
          </a>
          . You may opt out at any time.
        </p>
      </div>

      {/* Section 3: Informations */}
      <h2 className="font-google-sans text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] mt-9 mb-5">
        Informations
      </h2>

      {/* Tip 1: Home decor */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[180px] rounded-[12px] overflow-hidden mb-4 bg-[#d7aefb] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <rect width="100%" height="100%" fill="#d7aefb" />
            {/* Living room lamp + plant minimalist decor */}
            <g transform="translate(180, 40)">
              <ellipse cx="20" cy="115" rx="35" ry="10" fill="#9334e6" opacity="0.3" />
              <rect x="18" y="30" width="4" height="85" fill="#5b1c8f" />
              <path d="M0 30 L40 30 L30 5 L10 5 Z" fill="#8430ce" />
              <circle cx="20" cy="18" r="6" fill="#fde293" />
            </g>
            <text x="35" y="110" fontFamily="'Google Sans', sans-serif" fontSize="18" fontWeight="500" fill="#4a1575">
              Google Lens & Search
            </text>
          </svg>
        </div>
        <span className="text-[13px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mb-1 inline-block">
          Search
        </span>
        <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          5 ways to upgrade your home decor with Google Search
        </h3>
        <button
          onClick={() => onNavigateToArticle('home-decor')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer mt-3"
        >
          Read article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Tip 2: Gemini for macOS */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[180px] rounded-[12px] overflow-hidden mb-4 bg-[#34a853] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <rect width="100%" height="100%" fill="#34a853" />
            {/* Voice waveform icon */}
            <g transform="translate(150, 60)">
              <rect x="0" y="20" width="8" height="40" rx="4" fill="#ffffff" opacity="0.9" />
              <rect x="18" y="5" width="8" height="70" rx="4" fill="#ffffff" />
              <rect x="36" y="25" width="8" height="30" rx="4" fill="#ffffff" opacity="0.9" />
              <rect x="54" y="0" width="8" height="80" rx="4" fill="#ffffff" />
              <rect x="72" y="15" width="8" height="50" rx="4" fill="#ffffff" opacity="0.9" />
              <rect x="90" y="30" width="8" height="20" rx="4" fill="#ffffff" opacity="0.8" />
            </g>
          </svg>
        </div>
        <span className="text-[13px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mb-1 inline-block">
          Gemini App
        </span>
        <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          How to use intelligent dictation in Gemini for macOS
        </h3>
        <button
          onClick={() => onNavigateToArticle('gemini-mac-dictation')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer mt-3"
        >
          Read article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Tip 3: SAT prep test */}
      <div className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] overflow-hidden mb-6 p-4 transition-colors">
        <div className="w-full h-[180px] rounded-[12px] overflow-hidden mb-4 bg-[#fbbc04] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <rect width="100%" height="100%" fill="#fbbc04" />
            {/* Exam paper & check marks */}
            <g transform="translate(150, 40)">
              <rect x="0" y="0" width="100" height="120" rx="8" fill="#ffffff" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))" />
              <rect x="16" y="20" width="68" height="8" rx="4" fill="#e8eaed" />
              <rect x="16" y="36" width="50" height="8" rx="4" fill="#e8eaed" />
              <circle cx="22" cy="62" r="6" fill="#34a853" />
              <rect x="36" y="58" width="48" height="8" rx="4" fill="#dadce0" />
              <circle cx="22" cy="82" r="6" fill="#34a853" />
              <rect x="36" y="78" width="40" height="8" rx="4" fill="#dadce0" />
            </g>
          </svg>
        </div>
        <span className="text-[13px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mb-1 inline-block">
          Gemini App
        </span>
        <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3]">
          Keep your SAT prep on track with practice tests in Gemini
        </h3>
        <button
          onClick={() => onNavigateToArticle('sat-prep')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[14px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer mt-3"
        >
          Read article <span className="text-base">&rarr;</span>
        </button>
      </div>

      {/* Section 4: The latest */}
      <h2 className="font-google-sans text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] mt-10 mb-2">
        The latest
      </h2>

      <div className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6] mb-3">
        Sort by topic:
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none no-scrollbar">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-[20px] border text-[13px] whitespace-nowrap cursor-pointer font-google-sans transition-all shrink-0 ${
                isActive
                  ? 'bg-[#e8f0fe] dark:bg-[#1a3258] border-[#1a73e8] dark:border-[#8ab4f8] text-[#1a73e8] dark:text-[#8ab4f8] font-medium shadow-xs'
                  : 'bg-white dark:bg-[#2d2e30] border-[#dadce0] dark:border-[#3c4043] text-[#3c4043] dark:text-[#bdc1c6] hover:bg-[#f8f9fa] dark:hover:bg-[#35363a]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Article List Items */}
      <div className="divide-y divide-[#f1f3f4] dark:divide-[#3c4043]">
        {displayedArticles.map((article) => (
          <div key={article.id} className="py-5 first:pt-0">
            <div className="flex flex-wrap gap-2 mb-2">
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="bg-[#f1f3f4] dark:bg-[#303134] px-2.5 py-1 rounded-[12px] text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.35]">
              <button
                onClick={() => onNavigateToArticle(article.id)}
                className="text-left text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors cursor-pointer"
              >
                {article.title}
              </button>
            </h3>
            {article.author && (
              <div className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] whitespace-pre-line leading-relaxed">
                {article.author}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Explore More Articles Button */}
      {visibleCount < filteredArticles.length && (
        <div className="text-center my-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#202124] dark:border-[#5f6368] rounded-[24px] bg-white dark:bg-[#2d2e30] font-google-sans text-[15px] font-medium text-[#202124] dark:text-[#e8eaed] hover:bg-[#f8f9fa] dark:hover:bg-[#35363a] transition-colors cursor-pointer"
          >
            Explore more articles
            <ChevronDown className="w-4 h-4 text-[#202124] dark:text-[#e8eaed]" />
          </button>
        </div>
      )}
    </div>
  );
};
