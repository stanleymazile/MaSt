import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Check, Mail } from 'lucide-react';
import geminiTranscribeHero from '../assets/images/gemini_transcribe_hero_1788635604741.jpg';
import travelSearchHero from '../assets/images/travel_search_hero_1788635618448.jpg';
import pixelHardwareHero from '../assets/images/pixel_hardware_hero_1788635630337.jpg';
import astraHeroImage from '../assets/images/astra_mental_health_1788636271516.jpg';
import vibeCodingHeroImage from '../assets/images/vibe_coding_hero_1788638245466.jpg';
import geminiOmniFlashImg from '../assets/images/gemini_omni_flash_1788743908500.jpg';
import gemini38LiveOfficialBlog from '../assets/images/gemini_38_live_official_blog.webp';
interface HomePageProps {
  onNavigateToArticle: (articleId?: string) => void;
  onNavigateToNews?: (filter?: string) => void;
  onOpenNewsletterModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigateToArticle, 
  onNavigateToNews,
  onOpenNewsletterModal 
}) => {
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
      id: 'gemini-3-8-live',
      tags: ['Gemini models', 'IA / intelligence artificielle'],
      topicCategory: 'All News',
      title: "Google lance Gemini 3.8 Live : l'intelligence vocale passe à la vitesse supérieure",
      author: 'Par Stanley Mazile\nPsychologue et développeur web/mobile',
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
  const affiliationsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollAffiliations = (direction: 'left' | 'right') => {
    if (affiliationsCarouselRef.current) {
      const scrollAmount = affiliationsCarouselRef.current.clientWidth * 0.85;
      affiliationsCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredArticles = allLatestArticles.filter((item) => {
    if (activeFilter === 'All News') return true;
    return item.topicCategory === activeFilter || item.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

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

  return (
    <div id="home-page-container" className="max-w-[680px] mx-auto px-4 sm:px-5 py-4 sm:py-5 pb-16 font-sans overflow-x-hidden">
      {/* 1. Hero Featured Article: Vibe Coding - Google Discover Style */}
      <div
        id="featured-hero-article"
        className="w-full mb-3.5 group"
      >
        {/* Banner Image: occupe tout l'espace sur mobile (bord à bord, hauteur immersive) */}
        <div
          onClick={() => onNavigateToArticle('vibe-coding-intention')}
          className="-mx-4 sm:mx-0 -mt-4 sm:mt-0 w-[calc(100%+2rem)] sm:w-full h-[46vh] min-h-[260px] max-h-[500px] sm:h-auto sm:min-h-0 sm:max-h-none sm:aspect-[16/9] rounded-none relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer shadow-xs active:opacity-95"
        >
          <img
            src={vibeCodingHeroImage}
            alt="Le Vibe Coding : L’avenir du développement piloté par l’intention"
            referrerPolicy="no-referrer"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500 ease-out"
          />
          {/* Étiquette à l'intérieur de l'image en bas à gauche */}
          <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-medium px-3 py-1 rounded-full shadow-xs tracking-wide">
            IA
          </div>
        </div>

        {/* Titre et Date séparés de l'image */}
        <div className="mt-3.5 px-0.5">
          <h2
            onClick={() => onNavigateToArticle('vibe-coding-intention')}
            className="font-google-sans text-[20px] sm:text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] leading-[1.3] mb-2 cursor-pointer hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors"
          >
            Le Vibe Coding : L’avenir du développement piloté par l’intention
          </h2>
          <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#5f6368] dark:text-[#9aa0a6] font-normal">
            <span>5 septembre 2026</span>
          </div>
        </div>
      </div>

      {/* Lien vers la fenêtre modale d'inscription à la newsletter (aligné à gauche) */}
      <div className="mt-1 mb-3.5 text-left">
        <button
          onClick={() => onOpenNewsletterModal && onOpenNewsletterModal()}
          className="group inline-flex items-center gap-2 min-h-[44px] py-1.5 text-[13px] sm:text-[14px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:text-[#1557b0] dark:hover:text-[#aecbfa] transition-colors cursor-pointer active:opacity-70 focus:outline-none"
          aria-label="Inscrivez-vous à notre newsletter"
        >
          <Mail className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="hover:underline underline-offset-2">
            Inscrivez-vous à notre newsletter
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Section 1: Dernières actualités */}
      <h2 className="font-google-sans text-[22px] sm:text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] mt-4 mb-3">
        Dernières actualités
      </h2>

      {/* Actualité 1: Gemini 3.8 Live */}
      <div 
        onClick={() => onNavigateToArticle('gemini-3-8-live')}
        className="bg-[#faf7f2] dark:bg-[#282521] border border-[#ebe5dc] dark:border-[#3d3730] rounded-[16px] p-3.5 sm:p-4 mb-3.5 flex items-center justify-between gap-3.5 sm:gap-5 group cursor-pointer hover:bg-[#f4eee4] dark:hover:bg-[#302c26] shadow-xs transition-all"
      >
        {/* Titre et Date à gauche */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-[11px] sm:text-[12px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-1">
            IA / Intelligence Artificielle
          </div>
          <h3 
            className="font-google-sans text-[16px] sm:text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-1.5 leading-[1.3] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors line-clamp-2"
          >
            Google lance Gemini 3.8 Live : l'intelligence vocale passe à la vitesse supérieure
          </h3>
          <div className="text-[12px] sm:text-[13px] text-[#5f6368] dark:text-[#9aa0a6] font-normal">
            16 septembre 2026
          </div>
        </div>

        {/* Image carrée sans border-radius à droite (adaptée à tout écran mobile) */}
        <div className="w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-28 sm:h-28 aspect-square shrink-0 rounded-none overflow-hidden relative shadow-xs bg-neutral-100 dark:bg-neutral-800">
          <img
            src={gemini38LiveOfficialBlog}
            alt="Google lance Gemini 3.8 Live : l'intelligence vocale passe à la vitesse supérieure"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>
      </div>

      {/* Actualité 2: Gemini Omni 1.1 Flash */}
      <div 
        onClick={() => onNavigateToArticle('gemini-omni-1-1-flash')}
        className="bg-[#faf7f2] dark:bg-[#282521] border border-[#ebe5dc] dark:border-[#3d3730] rounded-[16px] p-3.5 sm:p-4 mb-3.5 flex items-center justify-between gap-3.5 sm:gap-5 group cursor-pointer hover:bg-[#f4eee4] dark:hover:bg-[#302c26] shadow-xs transition-all"
      >
        {/* Titre et Date à gauche */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-[11px] sm:text-[12px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-1">
            Developer Tools
          </div>
          <h3 
            className="font-google-sans text-[16px] sm:text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-1.5 leading-[1.3] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors line-clamp-2"
          >
            Gemini Omni 1.1 Flash lets you build with more control
          </h3>
          <div className="text-[12px] sm:text-[13px] text-[#5f6368] dark:text-[#9aa0a6] font-normal">
            29 août 2026
          </div>
        </div>

        {/* Image carrée sans border-radius à droite (adaptée à tout écran mobile) */}
        <div className="w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-28 sm:h-28 aspect-square shrink-0 rounded-none overflow-hidden relative shadow-xs bg-neutral-100 dark:bg-neutral-800">
          <img
            src={geminiOmniFlashImg}
            alt="Gemini Omni 1.1 Flash lets you build with more control"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>
      </div>

      {/* Actualité 3: National Parks */}
      <div 
        onClick={() => onNavigateToArticle('national-parks')}
        className="bg-[#faf7f2] dark:bg-[#282521] border border-[#ebe5dc] dark:border-[#3d3730] rounded-[16px] p-3.5 sm:p-4 mb-3.5 flex items-center justify-between gap-3.5 sm:gap-5 group cursor-pointer hover:bg-[#f4eee4] dark:hover:bg-[#302c26] shadow-xs transition-all"
      >
        {/* Titre et Date à gauche */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-[11px] sm:text-[12px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-1">
            Search & Travel
          </div>
          <h3 
            className="font-google-sans text-[16px] sm:text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-1.5 leading-[1.3] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors line-clamp-2"
          >
            Celebrate 110 years of national parks with Maps, Search, and Gemini
          </h3>
          <div className="text-[12px] sm:text-[13px] text-[#5f6368] dark:text-[#9aa0a6] font-normal">
            1 septembre 2026
          </div>
        </div>

        {/* Image carrée sans border-radius à droite (adaptée à tout écran mobile) */}
        <div className="w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-28 sm:h-28 aspect-square shrink-0 rounded-none overflow-hidden relative shadow-xs bg-neutral-100 dark:bg-neutral-800">
          <img
            src={travelSearchHero}
            alt="Celebrate 110 years of national parks with Maps, Search, and Gemini"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>
      </div>

      {/* Voir plus d'actualités */}
      <div className="mt-4 mb-2">
        <button
          onClick={() => onNavigateToNews && onNavigateToNews()}
          className="inline-flex items-center gap-2 min-h-[44px] py-2 font-google-sans text-[15px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer group active:opacity-75"
        >
          <span>Voir plus d'actualités</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Section 2: Affiliations - Carrousel interactif */}
      <div className="mt-9 mb-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-google-sans text-[22px] sm:text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4]">
              Affiliations
            </h2>
            <p className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">
              Découvrez nos produits, partenaires et solutions matérielles
            </p>
          </div>

          {/* Boutons de navigation du carrousel */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => scrollAffiliations('left')}
              className="p-2 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#3c4043] dark:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors cursor-pointer active:scale-95"
              aria-label="Faire défiler vers la gauche"
              title="Précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollAffiliations('right')}
              className="p-2 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#3c4043] dark:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors cursor-pointer active:scale-95"
              aria-label="Faire défiler vers la droite"
              title="Suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Conteneur défilable du carrousel */}
        <div
          ref={affiliationsCarouselRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Carte 1 : Google Pixel 11 */}
          <div className="w-[85%] sm:w-[320px] md:w-[340px] shrink-0 snap-start bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] p-4 flex flex-col justify-between transition-all hover:shadow-md">
            <div>
              <div className="w-full aspect-[16/9] rounded-[14px] overflow-hidden mb-3.5 bg-[#f4b4a6] flex items-center justify-center relative shadow-xs">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <rect width="100%" height="100%" fill="#f4b4a6" />
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
                  <text x="50" y="105" fontFamily="'Google Sans', 'Roboto', sans-serif" fontSize="20" fontWeight="bold" fill="#b3402e">
                    Google Pixel
                  </text>
                </svg>
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs">
                  Pixel Hardware
                </div>
              </div>
              <h3 className="font-google-sans text-[17px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3] line-clamp-2">
                Pixel 11 phones and Pixel Watch 5 are now on shelves
              </h3>
              <p className="text-[13px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 line-clamp-2">
                Find them at the Google Store and explore new AI camera features.
              </p>
            </div>
            <button
              onClick={() => onNavigateToArticle('pixel-fall-features')}
              className="inline-flex items-center justify-between w-full px-4 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[13px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer mt-auto"
            >
              <span>Lire l'article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Carte 2 : Fitbit Pokémon Sleep */}
          <div className="w-[85%] sm:w-[320px] md:w-[340px] shrink-0 snap-start bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] p-4 flex flex-col justify-between transition-all hover:shadow-md">
            <div>
              <div className="w-full aspect-[16/9] rounded-[14px] overflow-hidden mb-3.5 bg-[#1b2e63] flex items-center justify-center relative shadow-xs">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <rect width="100%" height="100%" fill="#1b2e63" />
                  <circle cx="300" cy="50" r="24" fill="#f4b400" />
                  <circle cx="292" cy="45" r="22" fill="#1b2e63" />
                  <circle cx="80" cy="40" r="2" fill="#ffffff" opacity="0.8" />
                  <circle cx="150" cy="80" r="2.5" fill="#ffffff" opacity="0.9" />
                  <circle cx="220" cy="30" r="1.5" fill="#ffffff" opacity="0.7" />
                  <circle cx="350" cy="120" r="2" fill="#ffffff" opacity="0.8" />
                  <g transform="translate(150, 45)">
                    <rect x="0" y="0" width="100" height="110" rx="20" fill="#29396e" stroke="#3d529a" strokeWidth="2" />
                    <rect x="15" y="15" width="70" height="80" rx="12" fill="#0d1b3e" />
                    <text x="50" y="55" textAnchor="middle" fill="#8ab4f8" fontSize="11" fontFamily="'Google Sans', sans-serif">Fitbit Sleep</text>
                    <text x="50" y="75" textAnchor="middle" fill="#f4b400" fontSize="13" fontWeight="bold" fontFamily="'Google Sans', sans-serif">Zzz... 92%</text>
                  </g>
                </svg>
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs">
                  Fitbit & Santé
                </div>
              </div>
              <h3 className="font-google-sans text-[17px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3] line-clamp-2">
                Introducing Fitbit Air Special Edition Pokémon Sleep
              </h3>
              <p className="text-[13px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 line-clamp-2">
                Level up your sleep routine with personalized tracking and night insights.
              </p>
            </div>
            <button
              onClick={() => onNavigateToArticle('astra-sante-mentale')}
              className="inline-flex items-center justify-between w-full px-4 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[13px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer mt-auto"
            >
              <span>Lire l'article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Carte 3 : Educa-Psy & Partenariat Éducatif */}
          <div className="w-[85%] sm:w-[320px] md:w-[340px] shrink-0 snap-start bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] p-4 flex flex-col justify-between transition-all hover:shadow-md">
            <div>
              <div className="w-full aspect-[16/9] rounded-[14px] overflow-hidden mb-3.5 bg-gradient-to-br from-[#1a73e8] to-[#174ea6] flex items-center justify-center relative shadow-xs p-4">
                <div className="text-center text-white">
                  <div className="w-10 h-10 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <span className="text-xl font-bold font-google-sans">EP</span>
                  </div>
                  <div className="font-google-sans font-bold text-[16px] tracking-wide">Educa-Psy & IA</div>
                  <div className="text-[11px] opacity-85 mt-0.5">Psychologie & Pédagogie</div>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs">
                  Educa-Psy
                </div>
              </div>
              <h3 className="font-google-sans text-[17px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3] line-clamp-2">
                Partenariat Educa-Psy : L'IA au service de l'éducation
              </h3>
              <p className="text-[13px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 line-clamp-2">
                Méthodes pédagogiques personnalisées et bien-être cognitif des apprenants.
              </p>
            </div>
            <button
              onClick={() => onNavigateToArticle('ia-education-apprentissage')}
              className="inline-flex items-center justify-between w-full px-4 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[13px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer mt-auto"
            >
              <span>Lire l'article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Carte 4 : NHYSA Solutions & Entreprise */}
          <div className="w-[85%] sm:w-[320px] md:w-[340px] shrink-0 snap-start bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-[20px] p-4 flex flex-col justify-between transition-all hover:shadow-md">
            <div>
              <div className="w-full aspect-[16/9] rounded-[14px] overflow-hidden mb-3.5 bg-gradient-to-br from-[#137333] to-[#0d5224] flex items-center justify-center relative shadow-xs p-4">
                <div className="text-center text-white">
                  <div className="w-10 h-10 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <span className="text-xl font-bold font-google-sans">NY</span>
                  </div>
                  <div className="font-google-sans font-bold text-[16px] tracking-wide">NHYSA Solutions</div>
                  <div className="text-[11px] opacity-85 mt-0.5">Ingénierie & Transformation</div>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs">
                  NHYSA
                </div>
              </div>
              <h3 className="font-google-sans text-[17px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.3] line-clamp-2">
                NHYSA : Solutions technologiques et ingénierie logicielle
              </h3>
              <p className="text-[13px] text-[#5f6368] dark:text-[#bdc1c6] mb-4 line-clamp-2">
                Conception d'outils cloud et d'architectures sur-mesure pour les entreprises.
              </p>
            </div>
            <button
              onClick={() => onNavigateToArticle('vibe-coding-intention')}
              className="inline-flex items-center justify-between w-full px-4 py-2.5 border border-[#202124] dark:border-[#8ab4f8] rounded-[20px] bg-transparent font-google-sans text-[13px] font-medium text-[#202124] dark:text-[#8ab4f8] hover:bg-[#202124] hover:text-white dark:hover:bg-[#8ab4f8] dark:hover:text-[#202124] transition-colors cursor-pointer mt-auto"
            >
              <span>Lire l'article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
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
        <div className="w-full aspect-[16/9] sm:aspect-[2/1] rounded-[14px] sm:rounded-[16px] overflow-hidden mb-4 bg-[#d7aefb] flex items-center justify-center relative shadow-xs">
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
          {/* Étiquette à l'intérieur de l'image en bas à gauche */}
          <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-full shadow-xs">
            Search
          </div>
        </div>
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
        <div className="w-full aspect-[16/9] sm:aspect-[2/1] rounded-[14px] sm:rounded-[16px] overflow-hidden mb-4 bg-[#34a853] flex items-center justify-center relative shadow-xs">
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
          {/* Étiquette à l'intérieur de l'image en bas à gauche */}
          <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-full shadow-xs">
            Gemini App
          </div>
        </div>
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
        <div className="w-full aspect-[16/9] sm:aspect-[2/1] rounded-[14px] sm:rounded-[16px] overflow-hidden mb-4 bg-[#fbbc04] flex items-center justify-center relative shadow-xs">
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
          {/* Étiquette à l'intérieur de l'image en bas à gauche */}
          <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-full shadow-xs">
            Gemini App
          </div>
        </div>
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
