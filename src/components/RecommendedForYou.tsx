import React, { useMemo } from 'react';
import { getRecommendedArticles, getAuthorDetails, getArticleTag } from '../data/articles';

interface RecommendedForYouProps {
  currentTopic: string;
  currentArticleId?: string;
  onSelectArticle?: (articleId: string) => void;
  onTopicChange?: (newTopic: string) => void;
}

export const RecommendedForYou: React.FC<RecommendedForYouProps> = ({
  currentTopic,
  currentArticleId,
  onSelectArticle,
}) => {
  // Calcul dynamique des articles recommandés (forme identique à The latest)
  const recommendations = useMemo(() => {
    return getRecommendedArticles(currentTopic || 'IA / intelligence artificielle', currentArticleId, 4);
  }, [currentTopic, currentArticleId]);

  const handleCardClick = (articleId: string) => {
    onSelectArticle?.(articleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="recommended-for-you-section"
      className="mt-14 pt-10 border-t border-[#dadce0] dark:border-[#3c4043]"
      aria-label="Articles recommandés"
    >
      {/* Section Header - Titre identique à The latest */}
      <h2 className="font-google-sans text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-4">
        Recommended for you
      </h2>

      {/* Article List Items - Forme identique à The latest (liste avec séparateurs divide-y) */}
      <div className="divide-y divide-[#f1f3f4] dark:divide-[#3c4043]">
        {recommendations.map((article) => {
          const author = getAuthorDetails(article);
          const ownTag = getArticleTag(article);

          return (
            <div key={article.id} className="py-5 first:pt-0">
              {/* Propre étiquette individuelle de l'article */}
              {ownTag && (
                <div className="mb-2">
                  <span className="bg-[#f1f3f4] dark:bg-[#303134] px-2.5 py-1 rounded-[12px] text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-medium inline-block">
                    {ownTag}
                  </span>
                </div>
              )}

              {/* Titre de l'article */}
              <h3 className="font-google-sans text-[18px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2 leading-[1.35]">
                <button
                  onClick={() => handleCardClick(article.id)}
                  className="text-left text-[#202124] dark:text-[#f1f3f4] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors cursor-pointer block w-full"
                >
                  {article.title}
                </button>
              </h3>

              {/* Nom de l'auteur avec sa description seulement */}
              {(author.name || author.description) && (
                <div className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] whitespace-pre-line leading-relaxed">
                  {author.name && (
                    <div className="font-medium text-[#202124] dark:text-[#f1f3f4]">
                      {author.name}
                    </div>
                  )}
                  {author.description && (
                    <div className="text-[#5f6368] dark:text-[#9aa0a6]">
                      {author.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

