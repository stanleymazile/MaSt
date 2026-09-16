import React from 'react';
import { Share2, Bookmark } from 'lucide-react';
import travelSearchHero from '../assets/images/travel_search_hero_1788635618448.jpg';

interface TravelSearchSectionProps {
  onShare: (title: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const TravelSearchSection: React.FC<TravelSearchSectionProps> = ({
  onShare,
  isBookmarked,
  onToggleBookmark,
}) => {
  const articleTitle = "3 new ways to plan and book travel in Search";

  return (
    <article id="travel-search-article">
      <h1 className="font-google-sans text-[32px] sm:text-[38px] leading-[1.2] font-normal text-[#202124] dark:text-[#f1f3f4] mb-5 tracking-tight">
        3 new ways to plan and book travel in Search
      </h1>

      <div className="flex justify-between items-center text-sm text-[#5f6368] dark:text-[#9aa0a6] mb-5">
        <div className="flex items-center gap-2">
          <span>Aug 27, 2026</span>
          <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
          <span>4 min read</span>
          {onToggleBookmark && (
            <>
              <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
              <button
                id="bookmark-article-travel-btn"
                onClick={onToggleBookmark}
                className={`p-1 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center ${
                  isBookmarked
                    ? 'text-[#1a73e8] dark:text-[#8ab4f8] bg-[#e8f0fe] dark:bg-[#1a3860]'
                    : 'text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] hover:bg-[#f1f3f4] dark:hover:bg-[#303134]'
                }`}
                title={isBookmarked ? 'Retirer des favoris' : 'Enregistrer'}
                aria-label={isBookmarked ? 'Retirer des favoris' : 'Enregistrer'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </>
          )}
        </div>
        <button
          id="share-article-1-btn"
          onClick={() => onShare(articleTitle)}
          className="p-1 rounded-full text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#f1f3f4] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors cursor-pointer"
          aria-label="Share article"
          title="Share article"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l6.96-4.05c.53.49 1.22.8 2.04.8 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66 0 1.61 1.31 2.91 2.92 2.91 1.61 0 2.92-1.3 2.92-2.91s-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
      </div>

      {/* Hero Image - Placé juste avant le résumé (format Google Discover 16:9) */}
      <div className="mb-6">
        <div className="w-full aspect-[16/9] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#dadce0] dark:border-[#3c4043] shadow-xs bg-neutral-100 dark:bg-neutral-800 relative">
          <img
            src={travelSearchHero}
            alt="3 new ways to plan and book travel in Search"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full shadow-xs">
            Search & Travel
          </div>
        </div>
      </div>

      {/* Excerpt (Résumé de l'article) */}
      <p className="text-[19px] sm:text-[20px] leading-[1.5] text-[#202124] dark:text-[#e8eaed] mb-7 font-normal">
        Our latest upgrades for AI Mode in Search can help you track flight prices, view points or miles rates, and book your dream hotel.
      </p>

      {/* Author block */}
      <div className="border-y border-[#dadce0] dark:border-[#3c4043] py-4 mb-8">
        <div className="font-google-sans font-medium text-[#202124] dark:text-[#f1f3f4]">James Byers</div>
        <div className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">Group Product Manager, Search</div>
      </div>

      {/* Content */}
      <div className="text-[17px] leading-[1.65] text-[#3c4043] dark:text-[#bdc1c6] space-y-6">
        <p>
          Planning a trip comes with lots of moving parts and countless options to consider. With{' '}
          <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
            AI Mode in Search
          </a>
          , you can already get real-time data to compare flights and hotels, find the best recommendations across the web, and{' '}
          <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
            craft the perfect itinerary
          </a>
          . Now, we're upgrading that experience with new ways to track flight prices, view points or miles rates, and book your dream hotel, right in AI Mode.
        </p>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Ask AI Mode to track flight prices for you.
        </h2>

        <p>
          Today, we're bringing <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Google Flights' popular price tracking feature</a> directly into <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">AI Mode</a>, letting you set up <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">price alerts</a> as you chat, without breaking your flow. Describe where and when you want to fly and AI Mode will show you the best options available with the latest prices from more than 300 partner airlines and travel sites. If you're ready to book, you can build your full itinerary in AI Mode and buy your tickets through the airline's website or your preferred booking platform.
        </p>
      </div>
    </article>
  );
};
