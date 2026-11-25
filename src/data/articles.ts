import { afficheFilm, articleF1, articleIa, articleSeries, articleSport, articleTech, heroCine } from "./images";

export interface Fiche {
  affiche: string;
  titre: string;
  sortie: string;
  detail: string;
  casting: string;
  presse: number;
  spectateurs: number;
}

export interface Article {
  id: string;
  rubrique: string;
  tag: string;
  titre: string;
  chapo: string;
  image: string;
  legende: string;
  auteur: string;
  date: string;
  dateIso: string;
  lecture: string;
  fiche?: Fiche;
  corps: string[];
}

export const RUBRIQUES: Record<string, string> = {
  cine: "Cinéma",
  series: "Séries",
  tech: "Tech",
  ia: "IA",
  sport: "Sport",
  streaming: "Streaming",
};

export const NAV_RUBRIQUES: { id: string; label: string }[] = [
  { id: "toutes", label: "News" },
  { id: "cine", label: "Cinéma" },
  { id: "series", label: "Séries" },
  { id: "tech", label: "Tech" },
  { id: "ia", label: "IA" },
  { id: "sport", label: "Sport" },
  { id: "streaming", label: "Streaming" },
];

export const ARTICLES: Article[] = [
  {
    id: "jackal-saison-2",
    rubrique: "series",
    tag: "Séries",
    titre: "Notée 4,4 sur 5, l'une des meilleures séries d'espionnage du moment aura bien une saison 2",
    chapo: "Lancée il y a deux ans presque jour pour jour, The Day of the Jackal est bientôt de retour. Eddie Redmayne est prêt à rempiler pour une toute nouvelle mission du Chacal.",
    image: heroCine,
    legende: "The Day of the Jackal — le thriller d'espionnage qui a relancé le mythe du Chacal.",
    auteur: "Rédaction MaSt",
    date: "21 novembre 2026",
    dateIso: "2026-11-21",
    lecture: "4 min de lecture",
    fiche: {
      affiche: afficheFilm,
      titre: "The Day of the Jackal",
      sortie: "2024-11-07",
      detail: "Série : The Day of the Jackal",
      casting: "Eddie Redmayne, Úrsula Corberó, Charles Dance",
      presse: 3.8,
      spectateurs: 4.4,
    },
    corps: [
      "<p>Lancée il y a deux ans presque jour pour jour, <a href='#'>The Day of the Jackal</a> est bientôt de retour. L'adaptation du roman de <a href='#'>Frederick Forsyth</a> (la troisième après le film de <a href='#'>Fred Zinnemann</a> de 1973 et la version plus libre avec <a href='#'>Bruce Willis</a>) met en scène <a href='#'>Eddie Redmayne</a> dans la peau du tueur à gages surnommé « Le Chacal ».</p>",
      "<h2>Inspiré d'un fait divers français</h2>",
      "<p>La série offre une version modernisée du roman paru au début des années 70. Dans le livre, le Chacal s'inspire de l'attentat du Petit-Clamart perpétré contre Charles de Gaulle et imagine un tueur engagé par l'OAS pour assassiner le Général. Dans la série, le Chacal est engagé pour éliminer un homme politique allemand, sur fond de tensions géopolitiques.</p>",
      "<p>Ce mélange d'action et de thriller a été l'une des raisons du succès rencontré par la série. La performance d'Eddie Redmayne n'y est pas non plus étrangère, et l'acteur oscarisé est désormais prêt à rempiler pour une toute nouvelle mission. Après seulement deux ans d'attente (un délai raisonnable pour une production de streaming), The Day of the Jackal est sur le point de revenir sur nos écrans.</p>",
      "<blockquote>Un tueur méthodique, une traque à travers l'Europe : la saison 2 promet de monter encore d'un cran.</blockquote>",
      "<p>En face de lui, l'agente Bianca, incarnée par Lashana Lynch dans la première saison, a fait du Chacal une obsession. Reste à savoir quelle forme prendra leur affrontement dans cette nouvelle salve d'épisodes — et si le tueur solitaire trouvera enfin un adversaire à sa mesure. Réponse à l'écran très bientôt : MaSt suivra le dossier épisode par épisode.</p>",
    ],
  },
  {
    id: "ia-agents",
    rubrique: "ia",
    tag: "IA",
    titre: "Assistants vocaux, agents autonomes : l'IA conversationnelle change de braquet",
    chapo: "On ne « discute » plus seulement avec l'IA : on lui délègue des tâches entières. Décryptage d'un basculement qui touche le grand public comme les développeurs.",
    image: articleIa,
    legende: "L'IA conversationnelle passe du chatbot à l'agent capable d'agir.",
    auteur: "Rédaction MaSt",
    date: "21 novembre 2026",
    dateIso: "2026-11-21",
    lecture: "5 min de lecture",
    corps: [
      "<p>Il y a encore peu, un assistant IA servait surtout à répondre à des questions et à rédiger des textes. La nouvelle génération fait un pas de plus : elle enchaîne des actions — chercher une information, préparer un document, organiser un planning — avec une autonomie croissante, tout en demandant validation aux moments sensibles.</p>",
      "<h2>De la réponse à l'action</h2>",
      "<p>Le changement est d'abord une question d'interface : la voix devient naturelle, les échanges se font en continu, et l'assistant garde le contexte d'une conversation à l'autre. Pour l'utilisateur, la frontière entre « poser une question » et « confier une mission » s'estompe.</p>",
      "<p>Côté développeurs, les outils de génération de code et les environnements assistés par IA — le fameux « vibe coding » — transforment la façon de prototyper : on décrit l'intention, l'IA propose une implémentation, l'humain relit et corrige. Les gains sont réels sur les tâches répétitives, beaucoup moins sur l'architecture et les choix de fond.</p>",
      "<blockquote>La bonne question n'est plus « que sait faire l'IA ? » mais « que suis-je prêt à lui déléguer, et sous quel contrôle ? »</blockquote>",
      "<h2>Les limites à garder en tête</h2>",
      "<p>Erreurs factuelles présentées avec assurance, biais dans les réponses, questions de confidentialité : les garde-fous restent indispensables. Vérifier les sources, garder la main sur les décisions engageantes et traiter l'IA comme un copilote — pas comme un pilote — reste la règle d'or que MaSt applique à sa propre rédaction.</p>",
    ],
  },
  {
    id: "smartphones-pliants",
    rubrique: "tech",
    tag: "Tech",
    titre: "Smartphones pliants : le format qui cherche encore son public",
    chapo: "Plus fins, plus solides, mieux pensés : les pliants ont corrigé leurs défauts de jeunesse. Reste un obstacle de taille — leur prix.",
    image: articleTech,
    legende: "Le pliant « livre » s'impose comme le format de référence du segment.",
    auteur: "Rédaction MaSt",
    date: "20 novembre 2026",
    dateIso: "2026-11-20",
    lecture: "4 min de lecture",
    corps: [
      "<p>À leur arrivée, les smartphones pliants cumulaient les handicaps : pli visible au milieu de l'écran, épaisseur record, fragilité et tarifs stratosphériques. Plusieurs générations plus tard, le tableau a changé : charnières affinées, écrans bien mieux protégés et formats qui tiennent enfin dans une poche comme un téléphone classique une fois refermés.</p>",
      "<h2>Deux formats, deux usages</h2>",
      "<p>Le modèle « coquillage », qui se replie en carré compact, joue la carte du style et de la poche. Le modèle « livre », qui déploie une petite tablette, vise la productivité : deux applications côte à côte, lecture confortable, multitâche réel. C'est ce second format qui concentre aujourd'hui l'essentiel des innovations.</p>",
      "<p>Le logiciel suit, lentement : les applications vraiment pensées pour le grand écran déplié restent minoritaires, et c'est souvent le système qui « étire » l'interface plutôt qu'il ne la réinvente.</p>",
      "<h2>Le vrai frein : le prix</h2>",
      "<p>Tant qu'un pliant coûtera le prix d'un très bon smartphone classique plus une tablette, il restera un produit de passionnés. La démocratisation passera par la baisse des coûts de production des écrans flexibles — un mouvement déjà amorcé, que MaSt continuera de suivre test après test.</p>",
    ],
  },
  {
    id: "foot-europe",
    rubrique: "sport",
    tag: "Sport",
    titre: "Soirées européennes : pourquoi le milieu de terrain décide de tout",
    chapo: "Pressing, transitions, second ballon : derrière le spectacle des grandes affiches, les matchs se gagnent (et se perdent) dans l'entrejeu. Analyse.",
    image: articleSport,
    legende: "L'intensité du pressing européen ne laisse aucun répit au porteur du ballon.",
    auteur: "Rédaction MaSt",
    date: "20 novembre 2026",
    dateIso: "2026-11-20",
    lecture: "5 min de lecture",
    corps: [
      "<p>On retient les buteurs, on célèbre les gardiens héroïques. Mais les entraîneurs le répètent à chaque conférence de presse : une grande soirée européenne se construit au milieu. C'est là que se règlent le rythme, la hauteur du bloc et la capacité à ressortir proprement sous pression.</p>",
      "<h2>Le pressing, une affaire collective</h2>",
      "<p>Presser haut ne signifie plus seulement courir : les équipes les mieux organisées déclenchent leur pressing sur des signaux précis — une passe vers le latéral, un contrôle dos au jeu — et ferment les lignes de passe avant même de courir vers le ballon. Résultat : des récupérations dans les trente derniers mètres, là où chaque ballon gagné vaut une occasion.</p>",
      "<h2>Les transitions, l'arme fatale</h2>",
      "<p>À l'inverse, les équipes qui acceptent de subir misent tout sur la transition : trois passes, dix secondes, et l'attaquant se présente face au but. Ce contraste de styles explique pourquoi tant de matchs « déséquilibrés » sur le papier restent indécis jusqu'au bout.</p>",
      "<blockquote>Le milieu de terrain moderne doit tout faire : récupérer, orienter, presser — et parfois finir les actions.</blockquote>",
      "<p>Le profil du milieu « complet » n'a donc jamais été aussi recherché sur le marché des transferts. Prochain épisode de notre série d'analyses : le rôle devenu central des latéraux inversés.</p>",
    ],
  },
  {
    id: "f1-aero",
    rubrique: "sport",
    tag: "Sport",
    titre: "Formule 1 : pourquoi l'aérodynamique fait (presque) tout",
    chapo: "Un dixième de seconde se joue parfois dans un détail d'aileron. Plongée dans la science invisible qui sépare le podium du milieu de grille.",
    image: articleF1,
    legende: "Chaque surface d'une F1 est sculptée pour dompter l'air.",
    auteur: "Rédaction MaSt",
    date: "19 novembre 2026",
    dateIso: "2026-11-19",
    lecture: "4 min de lecture",
    corps: [
      "<p>À plus de 300 km/h, une Formule 1 génère assez d'appui aérodynamique pour — en théorie — rouler au plafond. Cet appui est le nerf de la guerre : il permet de passer les virages rapides à des vitesses défiant l'instinct, mais chaque gramme de traînée coûte de la vitesse de pointe en ligne droite.</p>",
      "<h2>Le plancher, pièce maîtresse</h2>",
      "<p>Depuis le retour de l'effet de sol, c'est sous la voiture que tout se joue : le plancher génère l'essentiel de l'appui en accélérant l'air sous le châssis. Un réglage de hauteur de caisse d'un millimètre peut changer le comportement de la monoplace — et expliquer des écarts incompréhensibles entre deux voitures jumelles.</p>",
      "<h2>Soufflerie, CFD et corrélation</h2>",
      "<p>Les équipes partagent leur temps entre soufflerie, simulations numériques et essais piste, avec un ennemi commun : la corrélation. Quand les chiffres de l'usine ne correspondent pas à ceux du circuit, le développement part dans le mur — parfois pour toute une saison.</p>",
      "<p>C'est cette course invisible, menée par des centaines d'ingénieurs, qui explique la hiérarchie que les spectateurs découvrent le dimanche. MaSt la racontera tout au long de la saison, Grand Prix après Grand Prix.</p>",
    ],
  },
  {
    id: "series-espionnage",
    rubrique: "streaming",
    tag: "Streaming",
    titre: "Le retour en force des séries d'espionnage sur les plateformes",
    chapo: "Tueurs solitaires, agents doubles et guerres de l'ombre : le thriller d'espionnage est devenu la valeur sûre du streaming. Décryptage d'un phénomène.",
    image: articleSeries,
    legende: "Le salon est devenu la première salle des thrillers d'espionnage.",
    auteur: "Rédaction MaSt",
    date: "19 novembre 2026",
    dateIso: "2026-11-19",
    lecture: "4 min de lecture",
    corps: [
      "<p>Il fut un temps où l'espionnage appartenait au grand écran. Les plateformes ont changé la donne : le format série permet de déployer ce que le cinéma devait compresser — la patience d'une filature, la psychologie d'un agent double, les ramifications d'une opération clandestine.</p>",
      "<h2>Le temps long, allié du suspense</h2>",
      "<p>Sur huit ou dix épisodes, une traque devient un jeu d'échecs : chaque saison de <span class='surligne'>The Day of the Jackal</span> ou de ses consœurs installe ses pièces lentement, avant des finales où tout s'accélère. Les spectateurs, eux, ont pris goût à ces constructions au cordeau, qu'ils dévorent en quelques soirées.</p>",
      "<h2>Des budgets de cinéma</h2>",
      "<p>Tournages dans plusieurs capitales européennes, cascades pratiques, casting de cinéma : les plateformes alignent des moyens comparables à ceux d'un blockbuster. La frontière entre « série » et « film en dix heures » n'a jamais été aussi floue — pour le plus grand plaisir des amateurs du genre.</p>",
    ],
  },
  {
    id: "cine-franchises",
    rubrique: "cine",
    tag: "Cinéma",
    titre: "Box-office : les franchises tiennent-elles toujours le haut de l'affiche ?",
    chapo: "Suites, reboots et univers partagés dominent les sorties… mais le public montre des signes de fatigue. État des lieux d'un modèle qui cherche son second souffle.",
    image: afficheFilm,
    legende: "Les grandes franchises restent les locomotives des salles obscures.",
    auteur: "Rédaction MaSt",
    date: "18 novembre 2026",
    dateIso: "2026-11-18",
    lecture: "5 min de lecture",
    corps: [
      "<p>Regardez le calendrier des sorties : la majorité des grosses affiches portent un numéro, un sous-titre ou un nom d'univers connu. Pour les studios, la logique est implacable — une marque installée réduit le risque dans un marché où chaque blockbuster engage des budgets colossaux.</p>",
      "<h2>La fatigue des suites</h2>",
      "<p>Mais les signes de lassitude se multiplient : des épisodes accueillis tièdement, des spectateurs qui attendent la sortie en streaming, et des succès surprises venus de films originaux portés par le bouche-à-oreille. La rareté redevient un argument : quand chaque semaine apporte « l'épisode de trop », l'événement se dilue.</p>",
      "<h2>Ce qui marche encore</h2>",
      "<p>Les franchises qui s'en sortent sont celles qui traitent chaque film comme une œuvre à part entière : un point de vue d'auteur, une vraie prise de risque formelle, et le respect du temps du spectateur. La marque attire dans la salle ; seule la qualité fait revenir pour l'épisode suivant.</p>",
      "<blockquote>Une franchise n'est pas une garantie : c'est une promesse. Et une promesse se tient à chaque film.</blockquote>",
      "<p>MaSt suivra la question dans ses critiques et ses fiches notées, où les notes des spectateurs racontent souvent une autre histoire que celle des campagnes marketing.</p>",
    ],
  },
  {
    id: "ia-cinema",
    rubrique: "ia",
    tag: "IA",
    titre: "L'IA s'invite sur les plateaux : ce que la vidéo générative change pour le cinéma",
    chapo: "Prévisualisation, effets spéciaux, doublage : les outils de vidéo générative s'installent dans la chaîne de production. Entre fascination et inquiétudes, les studios tâtonnent.",
    image: heroCine,
    legende: "La prévisualisation assistée par IA accélère déjà le travail des équipes de tournage.",
    auteur: "Rédaction MaSt",
    date: "18 novembre 2026",
    dateIso: "2026-11-18",
    lecture: "5 min de lecture",
    corps: [
      "<p>Générer une rue de nuit sous la pluie, tester un décor avant de le construire, visualiser un plan impossible à tourner : la vidéo générative est entrée dans les studios par la porte de la prévisualisation, là où elle fait gagner des semaines de travail sans apparaître à l'écran.</p>",
      "<h2>Un outil, pas un auteur</h2>",
      "<p>Les professionnels interrogés par MaSt convergent : ces outils excellent pour explorer des pistes, beaucoup moins pour porter une intention. Un plan généré peut être spectaculaire et parfaitement creux ; la mise en scène reste une affaire de choix, donc d'humains.</p>",
      "<h2>Les questions qui fâchent</h2>",
      "<p>Droits des images d'entraînement, emploi des techniciens d'effets visuels, mention au générique : les débats sont vifs et légitimes. Les syndicats réclament des cadres clairs, et plusieurs productions ont déjà choisi la transparence en annonçant leurs usages.</p>",
      "<p>Une chose est sûre : la technologie ne repartira pas. La question est de savoir quelles règles le cinéma se donnera — un débat que MaSt couvrira des deux côtés de la caméra.</p>",
    ],
  },
  {
    id: "tech-maison",
    rubrique: "tech",
    tag: "Tech",
    titre: "Maison connectée : enfin un langage commun pour tous vos objets",
    chapo: "Ampoules, serrures, enceintes et thermostats commencent à se parler sans passer par dix applications différentes. Ce que ça change concrètement, pièce par pièce.",
    image: articleTech,
    legende: "L'interopérabilité devient l'argument numéro un de la maison connectée.",
    auteur: "Rédaction MaSt",
    date: "17 novembre 2026",
    dateIso: "2026-11-17",
    lecture: "4 min de lecture",
    corps: [
      "<p>Le scénario était connu de tous les early adopters : une application pour les ampoules, une autre pour la serrure, une troisième pour le thermostat — et des objets qui s'ignoraient superbement. Les standards d'interopérabilité récents changent la donne : les objets récents se reconnaissent et coopèrent, quel que soit leur fabricant.</p>",
      "<h2>Des scénarios enfin simples</h2>",
      "<p>« Je pars » éteint les lumières, baisse le chauffage et verrouille la porte, depuis n'importe quel assistant. « Cinéma » tamise le salon et allume le vidéoprojecteur. Cette simplicité, promise depuis dix ans, devient enfin la norme plutôt que l'exception réservée aux bidouilleurs.</p>",
      "<h2>Vie privée : le point de vigilance</h2>",
      "<p>Plus la maison est connectée, plus elle en sait sur vos habitudes. MaSt recommande de privilégier les fonctionnements locaux (sans cloud) quand ils existent, de segmenter son réseau Wi-Fi et de vérifier les politiques de mise à jour avant tout achat — notre guide complet arrive très bientôt.</p>",
    ],
  },
];

export const FIL_INFO: string[] = [
  "The Day of the Jackal : la saison 2 se précise, Eddie Redmayne prêt à rempiler",
  "IA : les agents autonomes s'installent dans les assistants du quotidien",
  "Tech : les smartphones pliants passent la barre des formats grand public",
  "Sport : l'analyse MaSt — le milieu de terrain, clé des soirées européennes",
  "F1 : l'aérodynamique, la course invisible derrière chaque Grand Prix",
];

/** Sélection « Les plus lus » de la page d'accueil, dans l'ordre du design. */
export const TOP_IDS: string[] = ["jackal-saison-2", "ia-agents", "foot-europe", "smartphones-pliants", "series-espionnage"];
