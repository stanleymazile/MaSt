import React from 'react';
import { ArticleItem } from '../data/articles';
import stanleyAvatar from '../assets/images/stanley_mazile_author_1788742131016.jpg';

interface GenericArticleSectionProps {
  article: ArticleItem;
  onShare: (title: string) => void;
  onListenArticle?: () => void;
  onNavigateToAuthor?: () => void;
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

function renderTextWithBlueHighlights(text: string, tags: string[] = []): React.ReactNode {
  // Check for markdown links [label](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  if (markdownLinkRegex.test(text)) {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    text.replace(markdownLinkRegex, (match, label, url, offset) => {
      if (offset > lastIndex) {
        parts.push(highlightPlainTerms(text.substring(lastIndex, offset), tags));
      }
      parts.push(
        <a
          key={offset}
          href={url || '#'}
          className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium"
        >
          {label}
        </a>
      );
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < text.length) {
      parts.push(highlightPlainTerms(text.substring(lastIndex), tags));
    }
    return parts;
  }

  return highlightPlainTerms(text, tags);
}

function highlightPlainTerms(text: string, tags: string[] = []): React.ReactNode {
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
          className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export const GenericArticleSection: React.FC<GenericArticleSectionProps> = ({
  article,
  onShare,
  onListenArticle,
  onNavigateToAuthor,
}) => {
  const isStanleyAuthor = article.author === 'Stanley Mazile';
  const showAuthor = Boolean(article.author);
  const showTopic = article.topic && article.topic !== 'IA / intelligence artificielle';

  return (
    <article id={`article-${article.id}`}>
      {/* Title */}
      <h1 className="font-google-sans text-[32px] sm:text-[38px] leading-[1.2] font-normal text-[#202124] dark:text-[#f1f3f4] mb-5 tracking-tight">
        {article.title}
      </h1>

      {/* Metadata & Share */}
      <div className="flex justify-between items-center text-sm text-[#5f6368] dark:text-[#9aa0a6] mb-5">
        <div className="flex items-center gap-2">
          <span>{article.date}</span>
          <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
          <span>{article.readTime}</span>
          {onListenArticle && (
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

      {/* Excerpt */}
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
        {article.fullText ? (
          article.fullText.map((paragraph, idx) => (
            <p key={idx}>{renderTextWithBlueHighlights(paragraph, article.tags)}</p>
          ))
        ) : (
          <p>{renderTextWithBlueHighlights(article.excerpt, article.tags)}</p>
        )}
      </div>

      {/* Tags (excluding IA / intelligence artificielle per request) */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-6 border-t border-[#dadce0] dark:border-[#3c4043]">
          {article.tags
            .filter(tag => tag !== 'IA / intelligence artificielle')
            .map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[#f1f3f4] dark:bg-[#303134] text-[#5f6368] dark:text-[#9aa0a6] font-medium"
              >
                #{tag}
              </span>
            ))}
        </div>
      )}
    </article>
  );
};
