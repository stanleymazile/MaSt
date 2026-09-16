import React from 'react';
import { Bookmark } from 'lucide-react';
import { ArticleItem } from '../data/articles';
import stanleyAvatar from '../assets/images/stanley_mazile_author.webp';
import vibeCodingHero from '../assets/images/vibe_coding_hero_1788638245466.jpg';
import astraHero from '../assets/images/astra_mental_health_1788636271516.jpg';
import geminiTranscribeHero from '../assets/images/gemini_transcribe_hero_1788635604741.jpg';
import travelSearchHero from '../assets/images/travel_search_hero_1788635618448.jpg';
import pixelHardwareHero from '../assets/images/pixel_hardware_hero_1788635630337.jpg';
import geminiOmniFlashImg from '../assets/images/gemini_omni_flash_1788743908500.jpg';
import gemini38LiveOfficialBlog from '../assets/images/gemini_38_live_official_blog.webp';

const ARTICLE_IMAGES: Record<string, string> = {
  'vibe-coding-intention': vibeCodingHero,
  'astra-sante-mentale': astraHero,
  'gemini-3-8-live': gemini38LiveOfficialBlog,
  'travel-in-search': travelSearchHero,
  'national-parks': travelSearchHero,
  'pixel-fall-features': pixelHardwareHero,
  'pixel-11': pixelHardwareHero,
  'pixel-hardware-ai': pixelHardwareHero,
  'gemini-omni-1-1-flash': geminiOmniFlashImg,
  'limits-gemini-notebook': geminiOmniFlashImg,
  'android-rambler': geminiTranscribeHero,
  'chrome-voice-update': geminiTranscribeHero,
  'gemini-3.5-transcribe': geminiTranscribeHero,
  'expert-intelligence': gemini38LiveOfficialBlog,
};

function getHeroImageForArticle(article: ArticleItem): string {
  if (ARTICLE_IMAGES[article.id]) {
    return ARTICLE_IMAGES[article.id];
  }
  const t = (article.topic || '').toLowerCase();
  if (t.includes('travel') || t.includes('search') || t.includes('parks')) return travelSearchHero;
  if (t.includes('pixel') || t.includes('hardware')) return pixelHardwareHero;
  if (t.includes('mobile') || t.includes('chrome') || t.includes('android')) return geminiTranscribeHero;
  if (t.includes('developer') || t.includes('flash')) return geminiOmniFlashImg;
  return gemini38LiveOfficialBlog;
}

interface GenericArticleSectionProps {
  article: ArticleItem;
  onShare: (title: string) => void;
  onListenArticle?: () => void;
  onNavigateToAuthor?: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

// Key Google / technology terms to highlight in blue like in 3 new ways to plan and book travel
const DEFAULT_KEY_TERMS = [
  'AI Mode in Search',
  'AI Mode',
  'Google Maps',
  'Ask Maps',
  'Google Flights',
  'Google AI Studio',
  'Google Antigravity',
  'Gemini 3.8 Live Extended Thinking',
  'Gemini 3.8 Live',
  'Gemini 3.5 Transcribe',
  'Gemini 3.7',
  'Gemini Omni 1.1 Flash',
  'Gemini Enterprise Agent Platform',
  'Gemini Notebook',
  'Google Labs',
  'Google DeepMind',
  'Rambler on Android',
  'Rambler',
  'Chirp 3',
  'Pixel 11',
  'Cloud Run',
  'Cloud SQL',
  'Firebase',
  'Google Workspace',
  'Khan Academy',
  'Expert Intelligence',
  'Google Flow',
  'Ultra-Res Night Sight',
  'Generative Sound Zoom',
  'FLEURS benchmark',
  'Artificial Analysis',
  'full-stack AI',
  'fine-tuned token steering',
  'multimodal reasoning'
];

function parseMarkdownFormatting(text: string, tags: string[] = [], allowLinks: boolean = true): React.ReactNode {
  // Support markdown bold **...**
  const boldRegex = /\*\*([^*]+)\*\*/g;
  if (boldRegex.test(text)) {
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    text.replace(boldRegex, (match, boldText, offset) => {
      if (offset > lastIdx) {
        parts.push(highlightPlainTerms(text.substring(lastIdx, offset), tags, allowLinks));
      }
      parts.push(
        <strong key={offset} className="font-bold text-[#202124] dark:text-[#f1f3f4]">
          {highlightPlainTerms(boldText, tags, allowLinks)}
        </strong>
      );
      lastIdx = offset + match.length;
      return match;
    });
    if (lastIdx < text.length) {
      parts.push(highlightPlainTerms(text.substring(lastIdx), tags, allowLinks));
    }
    return parts;
  }
  return highlightPlainTerms(text, tags, allowLinks);
}

function renderTextWithBlueHighlights(text: string, tags: string[] = []): React.ReactNode {
  // Check for markdown links [label](url)
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  if (markdownLinkRegex.test(text)) {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    text.replace(markdownLinkRegex, (match, label, url, offset) => {
      if (offset > lastIndex) {
        parts.push(parseMarkdownFormatting(text.substring(lastIndex, offset), tags));
      }
      parts.push(
        <a
          key={offset}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium inline-flex items-center gap-1 break-words"
        >
          <span>{parseMarkdownFormatting(label, tags, false)}</span>
          <svg className="w-3.5 h-3.5 inline-block opacity-75 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      );
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < text.length) {
      parts.push(parseMarkdownFormatting(text.substring(lastIndex), tags));
    }
    return parts;
  }

  // Also support bare URLs https://...
  const rawUrlRegex = /(https?:\/\/[^\s]+)/g;
  if (rawUrlRegex.test(text)) {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    text.replace(rawUrlRegex, (url, offset) => {
      if (offset > lastIndex) {
        parts.push(parseMarkdownFormatting(text.substring(lastIndex, offset), tags));
      }
      parts.push(
        <a
          key={offset}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium inline-flex items-center gap-1 break-all"
        >
          <span>{url}</span>
          <svg className="w-3.5 h-3.5 inline-block opacity-75 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      );
      lastIndex = offset + url.length;
      return url;
    });
    if (lastIndex < text.length) {
      parts.push(parseMarkdownFormatting(text.substring(lastIndex), tags));
    }
    return parts;
  }

  return parseMarkdownFormatting(text, tags);
}

function highlightPlainTerms(text: string, tags: string[] = [], allowLinks: boolean = true): React.ReactNode {
  if (!allowLinks) {
    return text;
  }

  const candidateTerms = Array.from(
    new Set([
      ...DEFAULT_KEY_TERMS,
      ...tags.filter(t => t !== 'IA / intelligence artificielle' && t.length > 3)
    ])
  ).sort((a, b) => b.length - a.length);

  if (candidateTerms.length === 0) return text;

  const escaped = candidateTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');

  const parts = text.split(regex);
  return parts.map((part, i) => {
    const isMatch = candidateTerms.some(term => term.toLowerCase() === part.toLowerCase());
    if (isMatch) {
      return (
        <a
          key={i}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function formatPhotoBadge(topic?: string): string {
  if (!topic) return '';
  const lower = topic.toLowerCase().trim();
  if (
    lower === 'ia' ||
    lower === 'ai' ||
    lower.includes('intelligence artificielle') ||
    lower.includes('gemini models')
  ) {
    return 'IA';
  }
  return topic;
}

export const GenericArticleSection: React.FC<GenericArticleSectionProps> = ({
  article,
  onShare,
  onListenArticle,
  onNavigateToAuthor,
  isBookmarked,
  onToggleBookmark,
}) => {
  const isStanleyAuthor = article.author === 'Stanley Mazile';
  const showAuthor = Boolean(article.author);
  const showTopic =
    article.topic && !article.topic.toLowerCase().includes('intelligence artificielle');

  const bodyParagraphs = article.fullText
    ? article.fullText.filter((p, idx) => idx !== 0 || p.trim() !== article.excerpt.trim())
    : null;

  return (
    <article id={`article-${article.id}`}>
      {/* Title */}
      <h1 className="font-google-sans text-[32px] sm:text-[38px] leading-[1.2] font-normal text-[#202124] dark:text-[#f1f3f4] mb-5 tracking-tight">
        {article.title}
      </h1>

      {/* Metadata & Share */}
      <div className="flex justify-between items-center text-sm text-[#5f6368] dark:text-[#9aa0a6] mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span>{article.date}</span>
          <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
          <span>{article.readTime}</span>
          {onToggleBookmark && (
            <>
              <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
              <button
                id={`bookmark-article-${article.id}-btn`}
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
          {onListenArticle && article.id !== 'gemini-3-8-live' && (
            <>
              <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
              <button
                onClick={onListenArticle}
                className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                Écouter
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => onShare(article.title)}
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
      {(() => {
        const heroImg = getHeroImageForArticle(article);
        if (!heroImg) return null;
        return (
          <div className="mb-6">
            <div className="w-full aspect-[16/9] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#dadce0] dark:border-[#3c4043] shadow-xs bg-neutral-100 dark:bg-neutral-800 relative">
              <img
                src={heroImg}
                alt={article.title}
                referrerPolicy="no-referrer"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
              {article.topic && (
                <div className="absolute bottom-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full shadow-xs">
                  {formatPhotoBadge(article.topic)}
                </div>
              )}
            </div>
            {article.id === 'gemini-3-8-live' ? (
              <div className="mt-2 text-xs text-[#5f6368] dark:text-[#9aa0a6] text-left flex items-center justify-between flex-wrap gap-1.5">
                <span>
                  Crédit photo et illustration : © Google LLC via{' '}
                  <a
                    href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    The Keyword (Blog officiel de Google)
                    <svg className="w-3 h-3 inline-block opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </span>
                <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] bg-[#f1f3f4] dark:bg-[#303134] px-2 py-0.5 rounded-sm">
                  Tous droits réservés © Google
                </span>
              </div>
            ) : null}
          </div>
        );
      })()}

      {/* Excerpt (Résumé de l'article) */}
      <p className="text-[19px] sm:text-[20px] leading-[1.5] text-[#202124] dark:text-[#e8eaed] mb-7 font-normal">
        {renderTextWithBlueHighlights(article.excerpt, article.tags)}
      </p>

      {/* Author block with profile photo and link */}
      {(showAuthor || showTopic) && (
        <div className="border-y border-[#dadce0] dark:border-[#3c4043] py-4 mb-8">
          {showAuthor && (
            isStanleyAuthor ? (
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={onNavigateToAuthor}
                  className="shrink-0 group focus:outline-hidden cursor-pointer"
                  aria-label="Voir le profil de l'auteur Stanley Mazile"
                >
                  <img
                    src={stanleyAvatar}
                    alt="Photo de profil de Stanley Mazile"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-[#dadce0] dark:border-[#5f6368] group-hover:ring-2 group-hover:ring-[#1a73e8] transition-all"
                  />
                </button>
                <div>
                  <button
                    type="button"
                    onClick={onNavigateToAuthor}
                    className="font-google-sans font-medium text-[#202124] dark:text-[#f1f3f4] text-base hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] hover:underline transition-colors text-left cursor-pointer"
                  >
                    Stanley Mazile
                  </button>
                  <div className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
                    Psychologue et développeur web/mobile
                  </div>
                </div>
              </div>
            ) : (
              <div className="font-google-sans font-medium text-[#202124] dark:text-[#f1f3f4]">
                {article.author}
              </div>
            )
          )}
          {showTopic && !isStanleyAuthor && (
            <div className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
              {article.topic}
            </div>
          )}
        </div>
      )}

      {/* Main Content with Blue Highlights */}
      <div className="text-[17px] leading-[1.65] text-[#3c4043] dark:text-[#bdc1c6] space-y-6 mb-10">
        {bodyParagraphs && bodyParagraphs.length > 0 ? (
          bodyParagraphs.map((paragraph, idx) => {
            const isSubheading =
              paragraph.startsWith('**') && paragraph.endsWith('**') && !paragraph.includes('\n');
            if (isSubheading) {
              const cleanHeading = paragraph.replace(/^\*\*|\*\*$/g, '');
              return (
                <h3
                  key={idx}
                  className="font-google-sans text-[20px] sm:text-[22px] font-bold text-[#202124] dark:text-[#f1f3f4] mt-7 mb-2 pt-1 tracking-tight"
                >
                  {renderTextWithBlueHighlights(cleanHeading, article.tags)}
                </h3>
              );
            }
            return (
              <p key={idx}>{renderTextWithBlueHighlights(paragraph, article.tags)}</p>
            );
          })
        ) : (
          null
        )}
      </div>

      {/* Tags (excluding IA / intelligence artificielle per request) */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-6 border-t border-[#dadce0] dark:border-[#3c4043]">
          {article.tags
            .filter(tag => !tag.toLowerCase().includes('intelligence artificielle') && tag.toLowerCase() !== 'ia')
            .map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[#f1f3f4] dark:bg-[#303134] text-[#5f6368] dark:text-[#9aa0a6] font-medium"
              >
                {tag}
              </span>
            ))}
        </div>
      )}
    </article>
  );
};
