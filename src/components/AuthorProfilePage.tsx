import React from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Mail, Award, CheckCircle2 } from 'lucide-react';
import stanleyAvatar from '../assets/images/stanley_mazile_author_1788742131016.jpg';
import vibeCodingHero from '../assets/images/vibe_coding_hero_1788638245466.jpg';
import astraHero from '../assets/images/astra_mental_health_1788636271516.jpg';

interface AuthorProfilePageProps {
  onBack: () => void;
  onNavigateToArticle: (articleId: string) => void;
}

export const AuthorProfilePage: React.FC<AuthorProfilePageProps> = ({
  onBack,
  onNavigateToArticle,
}) => {
  const authorArticles = [
    {
      id: 'vibe-coding-intention',
      title: 'Le Vibe Coding : L’avenir du développement piloté par l’intention',
      excerpt:
        'Le vibe coding représente un changement de paradigme dans la création de logiciels. Plutôt que d’écrire manuellement un code complexe, cette approche permet aux créateurs de se concentrer sur la vision et l’architecture pendant que l’IA produit le code.',
      date: '2026',
      readTime: '4 min de lecture',
      tag: 'IA / intelligence artificielle',
      image: vibeCodingHero,
    },
    {
      id: 'astra-sante-mentale',
      title: 'Comment Astra protège-t-il la santé mentale ?',
      excerpt:
        'Analyse des mécanismes éthiques et des protocoles de sécurité déployés dans les modèles d’IA pour préserver le bien-être psychologique des utilisateurs et des mineurs.',
      date: '2026',
      readTime: '5 min de lecture',
      tag: 'Santé mentale & IA',
      image: astraHero,
    },
  ];

  return (
    <div className="max-w-[680px] mx-auto px-5 py-6 pb-16">
      {/* Bouton Retour */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-google-sans text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux articles
        </button>
      </div>

      {/* Profil Auteur Card */}
      <section className="bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0] dark:border-[#3c4043] rounded-3xl p-6 sm:p-8 mb-10 transition-colors shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative shrink-0">
            <img
              src={stanleyAvatar}
              alt="Stanley Mazile"
              referrerPolicy="no-referrer"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#1a73e8] dark:border-[#8ab4f8] shadow-md"
            />
            <div
              className="absolute bottom-1 right-1 bg-[#1a73e8] text-white p-1.5 rounded-full shadow-xs"
              title="Auteur vérifié"
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 flex-wrap">
              <h1 className="font-google-sans text-2xl sm:text-3xl font-medium text-[#202124] dark:text-[#f1f3f4]">
                Stanley Mazile
              </h1>
              <span className="text-xs bg-[#e8f0fe] dark:bg-[#1a3860] text-[#1a73e8] dark:text-[#8ab4f8] font-medium px-2.5 py-0.5 rounded-full border border-[#1a73e8]/20">
                Auteur & Expert
              </span>
            </div>

            <p className="text-[#1a73e8] dark:text-[#8ab4f8] font-medium text-base mb-3">
              Psychologue & Développeur Web / Mobile
            </p>

            <p className="text-[15px] leading-relaxed text-[#5f6368] dark:text-[#bdc1c6] mb-5">
              Spécialisé dans l’intersection entre les sciences cognitives, la psychologie et les nouvelles
              technologies d’intelligence artificielle. Auteur d’analyses sur l’impact des grands modèles
              de langage, le vibe coding et la protection de la santé mentale dans l’écosystème numérique.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-[#5f6368] dark:text-[#9aa0a6] pt-3 border-t border-[#dadce0] dark:border-[#3c4043]/60 flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <BookOpen className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
                {authorArticles.length} publications majeures
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
                Recherche & Pratique clinique
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Publications de l'auteur */}
      <section>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#dadce0] dark:border-[#3c4043]">
          <h2 className="font-google-sans text-xl font-medium text-[#202124] dark:text-[#f1f3f4]">
            Articles rédigés par Stanley Mazile
          </h2>
          <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6] font-medium">
            {authorArticles.length} articles
          </span>
        </div>

        <div className="space-y-6">
          {authorArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigateToArticle(article.id)}
              className="group bg-[#f8f9fa] dark:bg-[#2d2e30] border border-[#dadce0]/80 dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] rounded-2xl p-5 transition-all cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#1a73e8] dark:text-[#8ab4f8] font-medium mb-1.5">
                    <span>{article.tag}</span>
                    <span className="text-[#dadce0] dark:text-[#5f6368]">•</span>
                    <span className="text-[#5f6368] dark:text-[#9aa0a6]">{article.readTime}</span>
                  </div>

                  <h3 className="font-google-sans text-lg font-medium text-[#202124] dark:text-[#f1f3f4] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#5f6368] dark:text-[#bdc1c6] line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                    <span>Consulter l'article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
