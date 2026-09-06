import React from 'react';
import { Share2 } from 'lucide-react';

interface TravelSearchSectionProps {
  onShare: (title: string) => void;
}

export const TravelSearchSection: React.FC<TravelSearchSectionProps> = ({ onShare }) => {
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

      <p className="text-[19px] sm:text-[20px] leading-[1.5] text-[#202124] dark:text-[#e8eaed] mb-7 font-normal">
        Our latest upgrades for AI Mode in Search can help you track flight prices, view points or miles rates, and book your dream hotel.
      </p>

      {/* Author block */}
      <div className="border-y border-[#dadce0] dark:border-[#3c4043] py-4 mb-8">
        <div className="font-google-sans font-medium text-[#202124] dark:text-[#f1f3f4]">James Byers</div>
        <div className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">Group Product Manager, Search</div>
      </div>

      {/* Hero Image / Rich SVG Vector Graphics */}
      <div className="w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-[#e8f0fe] via-[#f1f5fd] to-white dark:from-[#1a2b47] dark:via-[#202938] dark:to-[#1e2022] p-4 sm:p-6 border border-[#e1eaf9] dark:border-[#3c4043] shadow-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 450"
          className="w-full h-auto drop-shadow-sm select-none"
        >
          {/* Background and Curves */}
          <rect width="100%" height="100%" rx="16" fill="#eef4ff" />
          <path
            d="M-50,200 Q200,100 400,250 T850,200"
            stroke="#d0e1fd"
            strokeWidth="4"
            strokeDasharray="6 6"
            fill="none"
          />

          {/* Plane icon locator */}
          <g transform="translate(450, 180)">
            <circle cx="0" cy="0" r="20" fill="#1a73e8" filter="drop-shadow(0 4px 6px rgba(26,115,232,0.3))" />
            <path d="M-6,-3 L6,-3 L0,8 Z" fill="white" />
          </g>

          {/* Search Query Bar */}
          <g filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))">
            <rect x="120" y="70" width="560" height="48" rx="24" fill="white" stroke="#e8eaed" />
            <circle cx="150" cy="94" r="12" fill="#e8f0fe" />
            <path d="M146 94 L154 94 M150 90 L150 98" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" />
            <text x="175" y="99" fontFamily="'Google Sans', 'Roboto', sans-serif" fontSize="14" fill="#3c4043">
              + help me find some nonstop flights from | <tspan fill="#1a73e8" fontWeight="500">Q AI Mode</tspan>
            </text>
            <rect x="535" y="78" width="130" height="32" rx="16" fill="#1a73e8" />
            <text x="600" y="98" fontFamily="'Google Sans', sans-serif" fontSize="11" fill="white" textAnchor="middle" fontWeight="500">
              Track flight prices
            </text>
          </g>

          {/* Flight Card Result */}
          <g filter="drop-shadow(0 6px 14px rgba(0,0,0,0.08))">
            <rect x="140" y="150" width="310" height="150" rx="12" fill="white" stroke="#dadce0" />
            <rect x="156" y="170" width="278" height="52" rx="8" fill="#f8f9fa" />
            <text x="170" y="192" fontFamily="'Google Sans', sans-serif" fontSize="12" fontWeight="700" fill="#202124">
              9:15 AM – 11:17 AM
            </text>
            <text x="325" y="192" fontFamily="'Roboto', sans-serif" fontSize="11" fill="#188038" fontWeight="500">
              Nonstop (2h 02m)
            </text>
            <text x="170" y="210" fontFamily="'Google Sans', sans-serif" fontSize="12" fontWeight="700" fill="#1a73e8">
              22.5K pts + $12
            </text>
            <text x="325" y="210" fontFamily="'Roboto', sans-serif" fontSize="11" fill="#5f6368">
              or $284 cash
            </text>

            <rect x="156" y="232" width="278" height="52" rx="8" fill="#ffffff" stroke="#f1f3f4" />
            <text x="170" y="254" fontFamily="'Google Sans', sans-serif" fontSize="12" fontWeight="700" fill="#202124">
              7:40 AM – 9:39 AM
            </text>
            <text x="325" y="254" fontFamily="'Roboto', sans-serif" fontSize="11" fill="#188038" fontWeight="500">
              Nonstop
            </text>
            <text x="170" y="272" fontFamily="'Google Sans', sans-serif" fontSize="12" fontWeight="700" fill="#1a73e8">
              23K pts + $12
            </text>
          </g>

          {/* Price Tracking Graph Box */}
          <g filter="drop-shadow(0 6px 14px rgba(0,0,0,0.08))">
            <rect x="480" y="150" width="200" height="110" rx="12" fill="white" stroke="#dadce0" />
            <text x="496" y="174" fontFamily="'Google Sans', sans-serif" fontSize="11" fontWeight="700" fill="#202124">
              Price History
            </text>
            <text x="615" y="174" fontFamily="'Roboto', sans-serif" fontSize="10" fill="#188038" fontWeight="500">
              $45 lower
            </text>
            <path
              d="M 496 230 L 530 215 L 560 225 L 610 195 L 660 185"
              fill="none"
              stroke="#1a73e8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="660" cy="185" r="4" fill="#1a73e8" />
          </g>

          {/* Hotel Result Card */}
          <g filter="drop-shadow(0 6px 14px rgba(0,0,0,0.08))">
            <rect x="480" y="275" width="200" height="120" rx="12" fill="white" stroke="#dadce0" />
            <text x="496" y="300" fontFamily="'Google Sans', sans-serif" fontSize="12" fontWeight="700" fill="#202124">
              4.8 ★★★★★
            </text>
            <text x="496" y="320" fontFamily="'Roboto', sans-serif" fontSize="11" fill="#5f6368">
              4-star boutique hotel
            </text>
            <rect x="496" y="340" width="100" height="28" rx="14" fill="#1a73e8" />
            <text x="546" y="358" fontFamily="'Google Sans', sans-serif" fontSize="11" fill="white" textAnchor="middle" fontWeight="500">
              Book hotel
            </text>
          </g>
        </svg>
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
