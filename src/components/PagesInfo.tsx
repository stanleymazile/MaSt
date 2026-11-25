/** Pages d'information de MaSt : À propos, Politique éditoriale, Mentions légales.
 * Contenu en français (langue source du site), affiché tel quel dans toutes les langues,
 * comme les articles non encore traduits. */

export interface SectionInfo {
  titre: string;
  paragraphes: string[];
}

export interface PageInfoData {
  titre: string;
  description: string;
  intro: string;
  sections: SectionInfo[];
}

export const PAGES_INFO: Record<string, PageInfoData> = {
  "a-propos": {
    titre: "À propos de MaSt",
    description:
      "MaSt est un média d'actualité en ligne : cinéma, séries, tech, intelligence artificielle, sport, jeux et business, sélectionnés et décryptés chaque jour par la Rédaction MaSt.",
    intro:
      "MaSt est un média d'actualité en ligne qui sélectionne et décrypte chaque jour l'essentiel du cinéma, des séries, de la tech, de l'intelligence artificielle, du sport, des jeux et du business.",
    sections: [
      {
        titre: "Ce que nous couvrons",
        paragraphes: [
          "Sept rubriques : Cinéma (box-office, coulisses), Séries, Tech, IA, Sport, Jeux (jeu vidéo et jeu de société) et Business (économie, bourse, nouveaux produits).",
          "MaSt publie aussi des fiches caractéristiques des téléphones récents : spécifications complètes vérifiées, prix de lancement, points forts et points faibles, pour aider à choisir sans se tromper.",
          "Le site est disponible en sept langues : français, anglais, espagnol, portugais, allemand, italien et créole haïtien.",
        ],
      },
      {
        titre: "Notre rédaction",
        paragraphes: [
          "MaSt est fondé et dirigé par Stanley Mazile. Les articles sont signés « Rédaction MaSt » : ils sont préparés à partir d'une veille quotidienne, puis relus et validés par la rédaction avant publication.",
          "Chaque fait important — chiffre, date, citation — est vérifié à la source, et les sources sont citées en fin d'article. Les photos sont des images libres de droits, principalement issues de Wikimedia Commons, et créditées sous chaque visuel.",
        ],
      },
      {
        titre: "Nous contacter",
        paragraphes: [
          "Une question, une correction, une proposition de partenariat : écrivez à mazilepost@gmail.com. MaSt est aussi sur Facebook (page « MazilePost »), où chaque article du jour est relayé.",
        ],
      },
    ],
  },
  "politique-editoriale": {
    titre: "Politique éditoriale",
    description:
      "La politique éditoriale de MaSt : vérification des faits à la source, corrections, images libres de droits créditées, usage encadré de l'intelligence artificielle et publicité séparée du contenu.",
    intro:
      "Cette page explique comment la Rédaction MaSt choisit, vérifie et publie ses articles. Elle engage la rédaction envers ses lecteurs.",
    sections: [
      {
        titre: "Vérification des faits",
        paragraphes: [
          "Chaque information importante est vérifiée à la source avant publication : chiffres de box-office, résultats sportifs, annonces officielles des entreprises et des institutions. Quand une information n'a pas pu être confirmée, elle n'est pas publiée.",
          "Les sources utilisées sont citées en fin d'article, afin que chaque lecteur puisse vérifier par lui-même.",
        ],
      },
      {
        titre: "Corrections",
        paragraphes: [
          "Une erreur peut toujours subsister. Dès qu'une erreur nous est signalée (mazilepost@gmail.com) ou que nous la constatons, nous corrigeons l'article concerné. La correction fait partie du travail normal d'une rédaction.",
        ],
      },
      {
        titre: "Images",
        paragraphes: [
          "MaSt n'utilise que des images libres de droits, principalement issues de Wikimedia Commons. Le crédit de chaque photo est indiqué dans la légende, sous l'image.",
        ],
      },
      {
        titre: "Intelligence artificielle",
        paragraphes: [
          "La rédaction utilise des outils d'intelligence artificielle pour la veille, la recherche d'informations et la préparation des articles. L'IA ne publie jamais seule : chaque article est relu, vérifié et validé par la rédaction avant sa mise en ligne.",
        ],
      },
      {
        titre: "Publicité et indépendance",
        paragraphes: [
          "Le site est financé en partie par la publicité (Google AdSense), affichée dans des emplacements distincts des articles. Aucun annonceur ni partenaire n'intervient dans le choix des sujets ni dans leur traitement : la rédaction choisit librement ce qu'elle publie.",
        ],
      },
    ],
  },
  "mentions-legales": {
    titre: "Mentions légales",
    description:
      "Mentions légales du site MaSt (mazilepost.web.app) : éditeur, directeur de la publication, hébergement, propriété intellectuelle et données personnelles.",
    intro: "Les informations légales du site MaSt, accessible à l'adresse https://mazilepost.web.app.",
    sections: [
      {
        titre: "Éditeur",
        paragraphes: [
          "MaSt est un média d'actualité en ligne édité par Stanley Mazile (Haïti). Directeur de la publication : Stanley Mazile. Contact : mazilepost@gmail.com.",
        ],
      },
      {
        titre: "Hébergement",
        paragraphes: [
          "Le site est hébergé par Firebase Hosting, un service de Google. Son code source est hébergé sur GitHub (dépôt public stanleymazile/MaSt).",
        ],
      },
      {
        titre: "Propriété intellectuelle",
        paragraphes: [
          "Les textes publiés sur MaSt sont la propriété de la Rédaction MaSt, sauf mention contraire. Les citations courtes sont autorisées avec un lien vers l'article d'origine.",
          "Les photographies proviennent de Wikimedia Commons et restent sous la licence libre indiquée par leur crédit, mentionné sous chaque image.",
        ],
      },
      {
        titre: "Données personnelles",
        paragraphes: [
          "MaSt ne propose pas de compte utilisateur et ne collecte pas de données de navigation pour son propre compte. L'adresse e-mail transmise via le formulaire de newsletter est utilisée uniquement pour l'envoi de cette newsletter et n'est jamais cédée à des tiers.",
          "La publicité diffusée par Google AdSense peut déposer des cookies publicitaires ; ils peuvent être gérés ou refusés dans les paramètres du navigateur.",
        ],
      },
      {
        titre: "Responsabilité",
        paragraphes: [
          "Malgré le soin apporté à la vérification, une erreur peut subsister dans un article. Signalez-la à mazilepost@gmail.com : elle sera corrigée dans les meilleurs délais.",
        ],
      },
    ],
  },
  "politique-confidentialite": {
    titre: "Politique de confidentialité",
    description:
      "Politique de confidentialité de MaSt : aucune donnée de compte, e-mail de newsletter utilisé uniquement pour l'envoi, cookies publicitaires Google AdSense et vos droits.",
    intro:
      "MaSt est un site d'actualité en lecture libre : il ne demande ni compte, ni inscription pour être lu. Cette page explique les seules données qui peuvent être traitées et pourquoi.",
    sections: [
      {
        titre: "Données que nous recevons",
        paragraphes: [
          "Aucun compte utilisateur n'existe sur MaSt : nous ne collectons ni nom, ni mot de passe, ni historique de lecture nominatif.",
          "Si vous écrivez à la rédaction (mazilepost@gmail.com) ou si vous vous inscrivez à la newsletter, nous recevons votre adresse e-mail. Elle sert uniquement à vous répondre ou à vous envoyer la newsletter, et n'est jamais vendue ni cédée à des tiers.",
          "Vos notes sur les articles (étoiles) sont enregistrées uniquement dans votre navigateur (stockage local) : elles ne quittent pas votre appareil.",
        ],
      },
      {
        titre: "Publicité et cookies",
        paragraphes: [
          "MaSt affiche des publicités fournies par Google AdSense. Google et ses partenaires peuvent déposer des cookies pour mesurer l'audience publicitaire et, selon vos réglages Google, personnaliser les annonces.",
          "Vous pouvez refuser ou supprimer ces cookies à tout moment dans les paramètres de votre navigateur, et gérer la personnalisation des annonces dans les paramètres de votre compte Google (Mon activité / Paramètres des annonces). Le site reste entièrement lisible sans ces cookies.",
        ],
      },
      {
        titre: "Hébergement et journaux techniques",
        paragraphes: [
          "Le site est hébergé par Firebase Hosting (Google). Comme tout hébergeur, Google peut traiter des journaux techniques de connexion (adresse IP, navigateur, pages demandées) pour la sécurité et le fonctionnement du service.",
        ],
      },
      {
        titre: "Vos droits",
        paragraphes: [
          "Vous pouvez demander l'accès, la rectification ou la suppression des données vous concernant (en pratique : votre adresse e-mail si vous nous avez écrit ou si vous êtes inscrit à la newsletter) en écrivant à mazilepost@gmail.com. La désinscription de la newsletter est possible à tout moment sur simple demande.",
        ],
      },
    ],
  },
  contact: {
    titre: "Contact",
    description:
      "Contacter la Rédaction MaSt : question, correction, information à partager ou partenariat — écrivez à mazilepost@gmail.com ou retrouvez MaSt sur Facebook (page MazilePost).",
    intro:
      "Une question, une correction, une information à partager ou un partenariat : la Rédaction MaSt vous répond par e-mail.",
    sections: [
      {
        titre: "Nous écrire",
        paragraphes: [
          "Adresse unique pour tout : mazilepost@gmail.com. Pour signaler une erreur dans un article, indiquez son titre ou son lien : la correction sera faite au plus vite, comme le prévoit notre politique éditoriale.",
          "Pour une proposition d'information ou un témoignage, décrivez les faits et vos sources : la rédaction vérifie avant toute publication.",
        ],
      },
      {
        titre: "Réseaux sociaux",
        paragraphes: [
          "MaSt est sur Facebook : la page « MazilePost » relaie chaque article du jour, avec son visuel et son lien. C'est aussi un moyen simple de réagir et de partager les articles.",
        ],
      },
      {
        titre: "Partenariats et publicité",
        paragraphes: [
          "Écoles, institutions, organisations ou annonceurs : pour un partenariat ou une présence publicitaire aux côtés de MaSt, écrivez à mazilepost@gmail.com avec l'objet « Partenariat ».",
        ],
      },
    ],
  },
};

/** Écran affiché pour une adresse qui ne correspond à aucun contenu (vraie 404 applicative). */
export function PageIntrouvable() {
  return (
    <article className="mx-auto max-w-[760px] pt-10 text-center">
      <p className="m-0 font-display text-[64px] font-black leading-none text-accent">404</p>
      <h1 className="mt-3 font-display text-[30px] font-black">Page introuvable</h1>
      <p className="mx-auto mt-3 max-w-[52ch] text-[16px] leading-[1.65] text-texte-doux">
        L'article ou la page que vous cherchez n'existe pas, ou plus, à cette adresse. Les dernières actualités de MaSt
        sont sur la page d'accueil.
      </p>
      <p className="mt-6">
        <a
          href="/"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 font-display text-[15px] font-bold text-white no-underline transition-colors hover:bg-accent-fonce"
        >
          Retour à l'accueil
        </a>
      </p>
    </article>
  );
}

export default function PageInfo({ page }: { page: string }) {
  const data = PAGES_INFO[page];
  if (!data) return null;
  return (
    <article className="mx-auto max-w-[760px] pt-8">
      <h1 className="m-0 font-display text-[34px] font-black leading-[1.12] min-[640px]:text-[40px]">{data.titre}</h1>
      <p className="mt-4 text-[17px] leading-[1.65] text-texte-doux">{data.intro}</p>
      {data.sections.map((s) => (
        <section key={s.titre} className="mt-8">
          <h2 className="m-0 font-display text-[21px] font-extrabold">{s.titre}</h2>
          {s.paragraphes.map((p, i) => (
            <p key={i} className="mt-2.5 text-[15.5px] leading-[1.7]">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
