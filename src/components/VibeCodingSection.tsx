import React from 'react';
import vibeCodingHeroImage from '../assets/images/vibe_coding_hero_1788638245466.jpg';

interface VibeCodingSectionProps {
  onShare: (title: string) => void;
}

export const VibeCodingSection: React.FC<VibeCodingSectionProps> = ({ onShare }) => {
  const articleTitle = "Le Vibe Coding : L’avenir du développement piloté par l’intention";

  const sourcesList = [
    "AI on the new from the Google I/O 2026 Developer Keynote",
    "New Google AI Studio Integrations & Antigravity",
    "Firebase Realtime Database",
    "Full-stack apps faster with Google AI Studio and Firebase",
    "Try the upgraded coding agent in Gemini AI Studio",
    "Build across the Google ecosystem",
    "Rolled Antigravity apps in Google AI Studio",
    "AI Studio unlocks full stack vibe coding with Cloud Run, Firebase, and Cloud SQL",
    "Powering full-stack vibe coding with Gemini CLI"
  ];

  return (
    <article id="vibe-coding-article">
      <h1 className="font-google-sans text-[32px] sm:text-[38px] leading-[1.2] font-normal text-[#202124] dark:text-[#f1f3f4] mb-5 tracking-tight">
        Le Vibe Coding : L’avenir du développement piloté par l’intention
      </h1>

      <div className="flex justify-between items-center text-sm text-[#5f6368] dark:text-[#9aa0a6] mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span>Sep 5, 2026</span>
          <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
          <span>4 min de lecture</span>
        </div>
        <button
          id="share-article-vibe-coding-btn"
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
        Le <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">vibe coding</a> représente un changement de paradigme dans la création de logiciels. Plutôt que d’écrire manuellement un code complexe, cette approche permet aux humains de se concentrer sur la <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">vision et l’architecture</a> tandis que l’IA génère le code et ajuste les détails en continu.
      </p>

      {/* Author block */}
      <div className="border-y border-[#dadce0] dark:border-[#3c4043] py-4 mb-8">
        <div>
          <div className="font-google-sans font-medium text-[#202124] dark:text-[#f1f3f4] text-base">Stanley Mazile</div>
          <div className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">Psychologue et développeur web/mobile</div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full rounded-2xl overflow-hidden mb-8 border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
        <img
          src={vibeCodingHeroImage}
          alt="Le Vibe Coding : L’avenir du développement piloté par l’intention"
          referrerPolicy="no-referrer"
          className="w-full h-auto max-h-[520px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-[17px] leading-[1.65] text-[#3c4043] dark:text-[#bdc1c6] space-y-6">
        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Qu’est-ce que le Vibe Coding ?
        </h2>

        <p>
          Le terme <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">« vibe code »</a> désigne un flux de travail où l’utilisateur peut simplement « discuter » avec une IA pour lui demander de créer une application, souvent en <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">langage naturel</a>. L’objectif est de transformer une idée en produit sans avoir besoin de maîtriser chaque aspect technique.
        </p>

        <p>
          Cette approche s’appuie sur un <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">agent de codage autonome</a> capable de comprendre les intentions de l’utilisateur et de produire du code. Des outils comme <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Google Antigravity</a> et le nouveau <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Google AI Studio</a> permettent aux développeurs de déléguer certaines tâches à l’IA et de se concentrer davantage sur les aspects créatifs et fonctionnels.
        </p>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Une plateforme « Full Stack » automatisée
        </h2>

        <p>
          L’un des grands avantages du vibe coding est la possibilité de gérer des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">projets full-stack complexes</a> de manière plus automatisée.
        </p>

        <ul className="list-disc pl-5 space-y-3 my-4">
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Détection proactive des besoins :</b> l’<a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">agent d’analyse</a> peut identifier les besoins et proposer des améliorations d'architecture.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Intégration de bases de données :</b> l’IA peut automatiquement configurer et connecter une base de données avec <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Firebase</a> ou <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Cloud SQL</a>.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Déploiement simplifié :</b> les applications peuvent être préparées et déployées plus rapidement via <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Cloud Run</a>.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Automatisation et sécurité :</b> l’IA peut surveiller et améliorer les aspects de sécurité, tout en appliquant les bonnes pratiques nécessaires sur le projet avec la <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Gemini CLI</a>.
          </li>
        </ul>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Développement multi-plateforme et évolutif
        </h2>

        <p>
          Le vibe coding ne se limite pas à la création de sites web. Il peut également permettre de développer des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">applications Android, iOS</a> et d’autres types de logiciels d'entreprise.
        </p>

        <p>
          Grâce à cette approche, un développeur peut passer rapidement de la conception d’une idée à la production d’un produit fonctionnel. L’IA peut générer une grande partie du code nécessaire, tout en laissant au développeur la possibilité de contrôler et d’ajuster le résultat.
        </p>

        <p>
          De plus, des outils comme <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Google Workspace</a> peuvent être intégrés afin de faciliter la gestion des projets et des données.
        </p>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Accessibilité pour tous
        </h2>

        <p>
          Selon le contenu présenté, le vibe coding est particulièrement intéressant pour les personnes qui souhaitent créer des applications sans nécessairement être des experts en programmation.
        </p>

        <p>
          Cette approche permet notamment de réduire les barrières techniques et de rendre le développement logiciel plus accessible aux <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">entrepreneurs, aux créateurs et aux petites équipes</a>.
        </p>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Sources de l’article
        </h2>

        <ul className="list-disc pl-5 space-y-2 my-4">
          {sourcesList.map((source, index) => (
            <li key={index} className="text-[15px] leading-[1.5]">
              <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
                {source}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
