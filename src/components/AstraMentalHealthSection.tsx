import React from 'react';
import astraHeroImage from '../assets/images/astra_mental_health_1788636271516.jpg';

interface AstraMentalHealthSectionProps {
  onShare: (title: string) => void;
}

export const AstraMentalHealthSection: React.FC<AstraMentalHealthSectionProps> = ({ onShare }) => {
  const articleTitle = "Comment Astra protège-t-il la santé mentale ?";

  return (
    <article id="astra-mental-health-article">
      <h1 className="font-google-sans text-[32px] sm:text-[38px] leading-[1.2] font-normal text-[#202124] dark:text-[#f1f3f4] mb-5 tracking-tight">
        Comment Astra protège-t-il la santé mentale ?
      </h1>

      <div className="flex justify-between items-center text-sm text-[#5f6368] dark:text-[#9aa0a6] mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span>Sep 5, 2026</span>
          <span className="text-[#dadce0] dark:text-[#5f6368]">|</span>
          <span>4 min de lecture</span>
        </div>
        <button
          id="share-article-astra-btn"
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
        Le modèle <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">GPT-6 Astra</a> intègre plusieurs mécanismes et protocoles de sécurité pour protéger la <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">santé mentale</a> de ses utilisateurs, avec une attention particulière portée à la <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">protection des mineurs</a>. Voici les principaux axes identifiés dans les sources :
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
          src={astraHeroImage}
          alt="Comment Astra protège-t-il la santé mentale ?"
          referrerPolicy="no-referrer"
          className="w-full h-auto max-h-[520px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-[17px] leading-[1.65] text-[#3c4043] dark:text-[#bdc1c6] space-y-6">
        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          1. Reconnaissance des signes de détresse et de l’intention
        </h2>

        <p>
          Astra est entraîné pour identifier des signes, même implicites ou ambigus, de <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">détresse ou d’intentions nuisibles</a> au sein d’une conversation. Le modèle a été formé pour adopter un jugement capable de généraliser face à des défis concrets, comme répondre de manière appropriée aux <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">signes de détresse psychologique</a>.
        </p>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          2. Lutte contre la dépendance affective
        </h2>

        <p>
          Pour éviter que l’IA ne devienne un substitut aux <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">interactions sociales saines</a>, des mesures strictes ont été mises en place :
        </p>

        <ul className="list-disc pl-5 space-y-3 my-4">
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Refus de la dépendance :</b> le modèle ne doit pas encourager des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">relations exclusives</a> ou créer une dépendance.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Interdiction du rôle romantique :</b> pour les utilisateurs de moins de 18 ans, Astra est entraîné à ne pas s’engager dans des jeux où il joue des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">rôles romantiques</a>.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Non-substitution humaine :</b> le modèle évite de se positionner comme un remplaçant des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">relations humaines réelles</a>.
          </li>
        </ul>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          3. Protection renforcée pour les mineurs (U18)
        </h2>

        <p>
          Pour les utilisateurs identifiés ou suspectés d’être mineurs, Astra applique des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">seuils de sécurité plus restrictifs</a> que pour les adultes :
        </p>

        <ul className="list-disc pl-5 space-y-3 my-4">
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Contenus sensibles :</b> il applique des limites strictes sur les sujets liés aux troubles alimentaires, à l’image corporelle et à l’<a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">automutilation</a>.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Incitation au soutien :</b> lorsqu’il détecte qu’un adolescent a besoin d’aide, il est conçu pour renforcer les limites saines et encourager la connexion avec des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">personnes de confiance</a> (parents, enseignants, conseillers).
          </li>
        </ul>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          4. Évaluations dynamiques et robustesse
        </h2>

        <p>
          <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">OpenAI</a> utilise des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">bancs de tests spécifiques</a> pour valider ces protections :
        </p>

        <ul className="list-disc pl-5 space-y-3 my-4">
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Simulations adverses :</b> le modèle est testé via des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">simulations de conversations longues et complexes</a> pour s’assurer que sa conformité aux règles de sécurité ne se dégrade pas au fil de l’échange.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Scores de performance :</b> sur les bancs de tests de santé mentale et de dépendance affective, Astra obtient des scores d’excellence (respectivement <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">1.000 et 0.993 en taux de conformité</a> aux politiques de sécurité).
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Automutilation :</b> le <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">taux de réponse sécurisée</a> face à des requêtes liées à l’automutilation atteint 0.992 dans les tests de production standards.
          </li>
        </ul>

        <p>
          Enfin, des <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">garde-fous au niveau du système</a>, tels que des invitations à faire une pause après une utilisation prolongée, complètent les protections directement intégrées au modèle.
        </p>
      </div>
    </article>
  );
};
