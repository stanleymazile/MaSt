import { afficheFilm, articleBond, articleCrackgate, articleF1, articleIa, articleJensen, articleSeries, articleSport, articleTech, heroCine } from "./images";

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
    id: "jensen-huang-retour-nvidia",
    rubrique: "ia",
    tag: "IA",
    titre: "Onze jours après sa chute, Jensen Huang reprend déjà les rênes de Nvidia",
    chapo: "Démissionnaire le 12 novembre sur fond de scandale, le fondateur de Nvidia a été réinstallé à l'unanimité par son conseil d'administration, lundi 23 novembre, avec l'appui appuyé de la Maison-Blanche. En onze jours d'absence, plus de 1 000 milliards de dollars de capitalisation s'étaient envolés — et Wall Street a salué son retour par une envolée historique.",
    image: articleJensen,
    legende: "Jensen Huang, cofondateur de Nvidia, lors d'une discussion à l'université Stanford, le 30 avril 2026. (Photo : Anders Eidesvik, CC BY 4.0, via Wikimedia Commons)",
    auteur: "Rédaction MaSt",
    date: "24 novembre 2026",
    dateIso: "2026-11-24",
    lecture: "5 min de lecture",
    corps: [
      "<p>Le feuilleton n'aura duré que onze jours. Lundi 23 novembre, Nvidia a annoncé la réintégration de Jensen Huang comme président, directeur général et membre du conseil d'administration, avec effet immédiat. Le conseil a voté à l'unanimité, se disant satisfait de la franchise et de la capacité de leadership du fondateur, et assurant — après avoir reçu des éléments de hauts responsables du gouvernement américain — ne voir aucun risque pour la sécurité nationale dans son retour. Le 12 novembre, Jensen Huang avait pourtant démissionné, emporté par des révélations sur ses liaisons extraconjugales, dont l'une avec une femme d'affaires que les autorités américaines soupçonnent d'espionnage au profit de la Chine — ce que Pékin dément.</p>",
      "<p>Le revirement est d'autant plus spectaculaire que le conseil d'administration avait publiquement exclu tout retour une semaine plus tôt. Le 17 novembre, lors de la présentation des résultats trimestriels, son président affirmait encore que la démission avait été acceptée à l'unanimité et qu'il n'était pas question de réintégrer le PDG déchu. Entre-temps, la pression est venue de partout : une pétition de soutien a rassemblé environ 175 000 signatures en trois jours, les investisseurs ont fait chuter le titre, et la Maison-Blanche s'est directement invitée dans le dossier.</p>",
      "<h2>Trump et Vance en première ligne</h2>",
      "<p>Selon la presse américaine et Le Monde, le président Donald Trump et le vice-président J. D. Vance sont intervenus personnellement au cours du week-end des 21 et 22 novembre pour convaincre le conseil d'administration de changer d'avis. Donald Trump a lui-même expliqué sur CNBC avoir plaidé directement la cause de Jensen Huang auprès du conseil, minimisant les risques pour la sécurité nationale. Une implication aussi directe d'un président américain dans la gouvernance d'une entreprise cotée reste exceptionnelle — et elle a suscité des critiques d'élus des deux camps au Congrès, où Jensen Huang doit être auditionné début décembre sur les contrôles américains des exportations de puces vers la Chine.</p>",
      "<blockquote>« J'ai hâte de me remettre au travail », a déclaré Jensen Huang, cité par Le Figaro, à son retour au siège de Nvidia, où les salariés l'ont accueilli par une ovation.</blockquote>",
      "<h2>Un marché qui ne jure que par lui</h2>",
      "<p>La réaction des marchés dit tout de la place qu'occupe Jensen Huang dans l'écosystème de l'IA. Pendant ses onze jours d'absence, Nvidia a perdu plus de 1 000 milliards de dollars de valeur boursière et le Nasdaq a frôlé le marché baissier. L'annonce de son retour a fait bondir l'action Nvidia de plus de 25 % dans les échanges d'avant-séance, tandis que le Nasdaq Composite s'envolait de 6,5 % — sa meilleure journée depuis 19 mois, selon CNN. Les sociétés liées à l'infrastructure IA ont suivi le mouvement, à l'image de CoreWeave, en hausse de 22 % lundi après avoir perdu 35 % pendant l'éviction du PDG. Pour les analystes cités par CNN, ce retour rassure sur le rôle central de Nvidia dans le financement de l'industrie : investissements dans les start-up, garanties d'emprunts et construction de centres de données à coups de centaines de milliards.</p>",
      "<h2>Des résultats qui plaident pour lui</h2>",
      "<p>Le paradoxe de cette crise, c'est que la machine Nvidia n'a jamais aussi bien tourné. Publiés le 17 novembre, en pleine tempête, les résultats du troisième trimestre ont dépassé toutes les attentes : un chiffre d'affaires de 115,8 milliards de dollars, en hausse de 103 % sur un an, dont 107,6 milliards pour la seule division centres de données, et un bénéfice ajusté de 2,68 dollars par action. Le groupe a même relevé ses perspectives, visant environ 130 milliards de dollars de ventes au trimestre suivant et une croissance de 75 % pour l'exercice à venir. De quoi alimenter le sentiment, résumé par un universitaire cité par CNN, que « Nvidia est trop gros pour échouer, et Jensen Huang trop gros pour être viré ». Reste une question, que ni les chiffres ni l'euphorie boursière ne règlent : de retour aux commandes, mais sous surveillance renforcée du Congrès et de son propre conseil, le « parrain de l'IA » pourra-t-il diriger avec la même liberté qu'avant ?</p>",
      "<p><strong>Sources :</strong> <a href='https://www.lemonde.fr/economie/article/2026/11/24/le-come-back-spectaculaire-de-jensen-huang-a-la-tete-de-nvidia-sous-la-pression-de-donald-trump-et-des-marches-financiers_6814669_3234.html'>Le Monde</a> ; <a href='https://www.rappler.com/technology/nvidia-reinstates-jensen-huang-ceo-november-23-2026/'>Reuters via Rappler</a> ; <a href='https://www.cnn.com/2026/11/24/investing/nvidia-jensen-huang-ai-financing-boom'>CNN</a> ; <a href='https://www.businesstimes.com.sg/international/global/nvidia-boosts-forecast-while-quashing-idea-huangs-return'>Bloomberg via The Business Times</a> ; <a href='https://www.lefigaro.fr/secteur/high-tech/j-ai-hate-de-me-remettre-au-travail-les-coulisses-de-l-invraisemblable-retour-de-jensen-huang-chez-nvidia-20261123'>Le Figaro</a>. Photo : Anders Eidesvik, <a href='https://commons.wikimedia.org/wiki/File:Jensen_huang_stanford_2026-04-30_017.jpg'>Wikimedia Commons</a>, licence CC BY 4.0.</p>",
    ],
  },
  {
    id: "robert-pattinson-nouveau-james-bond",
    rubrique: "cine",
    tag: "Cinéma",
    titre: "Son nom est Pattinson… Robert Pattinson : l'ancien vampire de « Twilight » devient le nouveau James Bond",
    chapo: "C'est officiel : Amazon MGM Studios a annoncé, lundi 16 novembre, que Robert Pattinson incarnera James Bond dans le 26e film de la saga, réalisé par Denis Villeneuve. À 40 ans, l'acteur de « Twilight » et de « The Batman » succède à Daniel Craig et devient le septième 007 de la série officielle — le premier de l'ère Amazon.",
    image: articleBond,
    legende: "Robert Pattinson au Festival de Venise, le 5 septembre 2026, lors de la présentation du film « Primetime ». (Photo : Colleen Sturtevant, CC BY-SA 4.0, via Wikimedia Commons)",
    auteur: "Rédaction MaSt",
    date: "24 novembre 2026",
    dateIso: "2026-11-24",
    lecture: "5 min de lecture",
    corps: [
      "<p>Le suspense durait depuis cinq ans, il a pris fin d'un seul coup. Lundi 16 novembre, Amazon MGM Studios a officialisé le nom du successeur de Daniel Craig : Robert Pattinson sera le nouveau James Bond. L'annonce a été faite sur Instagram, avec une vidéo montrant l'acteur émergeant dans le rôle sur le thème classique de 007, et une première photo officielle de Pattinson en smoking, arme à la main, selon USA Today. Sur X, le studio a publié un message laconique — « Identité confirmée » — accompagné d'une courte vidéo de l'acteur avec un revolver, rapporte la RTS. À 40 ans, le Britannique devient le septième acteur à incarner l'agent secret dans la série officielle, après Sean Connery, George Lazenby, Roger Moore, Timothy Dalton, Pierce Brosnan et Daniel Craig, qui avait tiré sa révérence en 2021 avec « Mourir peut attendre », au terme de quinze ans et cinq films dans le rôle.</p>",
      "<h2>« L'honneur d'une vie »</h2>",
      "<blockquote>« James Bond est l'un des personnages les plus légendaires de l'histoire du cinéma, et se voir confier le rôle de 007 est l'honneur d'une vie. Dire que ce rôle est un rêve devenu réalité est un euphémisme. » — Robert Pattinson, dans le communiqué d'Amazon MGM Studios</blockquote>",
      "<p>Denis Villeneuve, qui réalisera ce 26e opus, a salué un choix qui s'est imposé à lui : « Nous étions entourés de talents extraordinaires, mais il ne peut y avoir qu'un seul 007. Je suis fou de joie d'accueillir Robert Pattinson comme notre nouveau James Bond », a déclaré le cinéaste, cité par Entertainment Weekly, estimant que l'acteur possède « l'âme intemporelle de 007 » tout en lui apportant « un esprit complètement nouveau ». Le réalisateur de « Dune » ne cache pas son rapport quasi religieux à la franchise : « Je suis un fan inconditionnel de Bond. Pour moi, c'est un territoire sacré. J'ai l'intention d'honorer la tradition et d'ouvrir la voie à de nombreuses nouvelles missions », avait-il confié, propos rapportés par USA Today.</p>",
      "<h2>Un casting passé au crible, avec Jeff Bezos dans la boucle</h2>",
      "<p>En coulisses, la sélection a été menée comme une opération secrète. Jeff Bezos, fondateur d'Amazon, a reconnu avoir été « fortement impliqué » dans le choix, comme le rapporte NME. Lors d'une conférence organisée par Semafor, il a expliqué qu'Amazon avait réduit une première liste, puis fait passer des essais filmés à cinq acteurs, chacun interprétant trois scènes en costume complet et sur les décors, selon Rappler. La décision n'aurait été prise que le vendredi précédant l'annonce, et c'est Denis Villeneuve en personne qui aurait appelé Robert Pattinson le dimanche matin pour lui annoncer la nouvelle, d'après le Hollywood Reporter cité par L'Internaute. Parmi les autres noms en lice figuraient notamment Callum Turner et Jack Lowden. Selon Puck News, rapporté par Polygon, Pattinson se serait engagé pour trois films — un terme qui n'a toutefois pas été confirmé officiellement par le studio.</p>",
      "<h2>Le premier Bond de l'ère Amazon</h2>",
      "<p>Ce film ne marquera pas seulement l'arrivée d'un nouvel acteur : ce sera le premier James Bond produit depuis qu'Amazon MGM Studios a pris le contrôle créatif de la franchise en 2025, dans le cadre d'une coentreprise avec Michael Wilson et Barbara Broccoli, les producteurs historiques qui ont passé la main. Le scénario est signé Steven Knight, le créateur de « Peaky Blinders », et la production est assurée par Amy Pascal et David Heyman, avec Tanya Lapointe comme productrice exécutive. Le film, sans titre pour l'instant et simplement surnommé « Bond 26 », n'a pas de date de sortie : la presse spécialisée évoque un début de production en 2027 et une sortie possible en 2028, un calendrier que le studio n'a pas confirmé.</p>",
      "<p>Pour Robert Pattinson, c'est l'aboutissement d'une trajectoire singulière : révélé adolescent dans « Harry Potter », star planétaire de la saga « Twilight », il a ensuite passé une décennie à fuir les blockbusters pour tourner avec des auteurs exigeants, avant de revenir aux franchises par la grande porte avec « The Batman » en 2022 — dont la suite est attendue en 2028, ce qui ferait de lui l'un des très rares acteurs à porter simultanément deux rôles aussi iconiques. Son année 2026 a déjà été l'une des plus denses de sa carrière, avec « The Drama » aux côtés de Zendaya, « The Odyssey » de Christopher Nolan et « Primetime ». Et c'est avec Denis Villeneuve qu'il bouclera l'année : il tient un rôle dans « Dune : Partie 3 », attendu en décembre, avant de retrouver le cinéaste canadien derrière la caméra de 007.</p>",
      "<p>Reste désormais à découvrir le titre du film, le reste de la distribution et la voix qui interprétera la chanson du générique. Mais l'essentiel est déjà là : après des années de rumeurs, James Bond a un visage — et c'est celui que personne n'attendait vraiment il y a encore quelques mois.</p>",
      "<p><strong>Sources :</strong> <a href='https://www.rts.ch/info/culture/cinema/2026/article/james-bond-robert-pattinson-choisi-pour-incarner-007-29417724.html'>RTS</a> ; <a href='https://www.usatoday.com/story/entertainment/movies/2026/11/16/james-bond-robert-pattinson-cast-new-movie/92379158007/'>USA Today</a> ; <a href='https://ew.com/every-james-bond-actor-in-order-12258273'>Entertainment Weekly</a> ; <a href='https://www.rappler.com/entertainment/celebrities/amazon-bezos-robert-pattinson-james-bond/'>Rappler</a> ; <a href='https://www.nme.com/news/film/jeff-bezos-robert-pattinson-james-bond-screen-test-amazon-3976313'>NME</a> ; <a href='https://www.linternaute.com/cinema/star-cinema/11314647-robert-pattinson-est-james-bond-pourquoi-l-acteur-a-ete-choisi-face-a-jack-lowden-et-callum-turner/'>L'Internaute</a>. Photo : Colleen Sturtevant, <a href='https://commons.wikimedia.org/wiki/File:Robert_Pattinson_Venice_Film_Festival_(3x4_cropped).jpg'>Wikimedia Commons</a>, licence CC BY-SA 4.0.</p>",
    ],
  },
  {
    id: "iphone-duo-crackgate-ecran-fissure",
    rubrique: "tech",
    tag: "Tech",
    titre: "« Crackgate » : à 1 999 dollars, l'iPhone pliable d'Apple se fissure dès les premières heures",
    chapo: "Lancé le 23 octobre, l'iPhone Duo, premier smartphone pliable d'Apple, devait être le produit de l'année. Mais pour un « petit nombre » d'acheteurs — selon les mots mêmes d'Apple —, l'écran interne s'est fissuré dès les premières heures d'utilisation, toujours au même endroit, le long de la charnière.",
    image: articleCrackgate,
    legende: "Le dos d'un iPhone Duo à moitié plié, avec son double module photo. (Photo : SimonWaldherr, CC BY 4.0, via Wikimedia Commons)",
    auteur: "Rédaction MaSt",
    date: "24 novembre 2026",
    dateIso: "2026-11-24",
    lecture: "5 min de lecture",
    corps: [
      "<p>Le lancement était historique : le 9 septembre 2026, le nouveau PDG d'Apple, John Ternus, dévoilait l'iPhone Duo, le premier smartphone pliable de la marque. Mis en vente le 23 octobre dans environ 70 pays, l'appareil — écran interne de 7,6 pouces une fois déplié, écran externe de 5,4 pouces, puce A20 Pro et boîtier en titane — est affiché à partir de 1 999 dollars. Mais dès les premières heures, les réseaux sociaux se sont remplis de photos montrant la même défaillance : une bande de pixels blancs et une fissure sur l'écran interne, le long du pli. Sur les forums, le surnom est déjà trouvé : « Crackgate ».</p>",
      "<h2>Toujours le même point de rupture</h2>",
      "<p>Le plus troublant, c'est la régularité du phénomène. Selon les témoignages recueillis par la presse spécialisée, les écrans cassent au même endroit — côté droit, environ un centimètre sous le milieu du pli —, souvent en quelques heures d'utilisation, parfois avec un craquement audible au moment d'ouvrir ou de fermer le téléphone. Un acheteur australien raconte ainsi que son écran a cédé six heures seulement après l'achat : il a senti quelque chose au niveau de la charnière en dépliant l'appareil, avant d'entendre le craquement et de voir l'écran se briser le long du pli. Apple Store lui a remplacé l'appareil sur-le-champ.</p>",
      "<p>Du côté des réparateurs, on pointe la mécanique. Dans une vidéo de démontage publiée par iFixit, le technicien Shahram Mokhtari relève que les dégâts apparaissent toujours au même point de la charnière, là où convergent plusieurs arêtes et où une barre centrale de support pourrait ne pas se rétracter correctement lors de la fermeture, concentrant la pression sur la dalle OLED flexible. Apple, elle, n'a confirmé aucune cause. Il faut dire que la machine est d'une complexité rare : la charnière compte plus de 100 composants, et l'écran pliable est constitué de 10 couches ultrafines qui glissent les unes contre les autres.</p>",
      "<h2>Apple reconnaît le problème, mais pas de rappel</h2>",
      "<p>Le 26 octobre, trois jours après le lancement, Apple a fini par réagir publiquement dans une déclaration transmise à Bloomberg :</p>",
      "<blockquote>« Nous avons connaissance d'un problème affectant l'écran interne d'un petit nombre d'iPhone Duo. Si les utilisateurs rencontrent des problèmes avec l'écran de leur iPhone Duo, ils peuvent contacter AppleCare pour un remplacement. » (Apple, déclaration rapportée par Bloomberg)</blockquote>",
      "<p>Quelques jours plus tard, la marque est allée plus loin en interne : dans une note obtenue par MacRumors et adressée aux Apple Store et aux centres de services agréés, elle demande aux techniciens d'inspecter les appareils concernés et de les réparer ou remplacer selon les procédures habituelles — sans exiger d'abonnement AppleCare+. En revanche, à ce stade, Apple n'a annoncé ni rappel ni programme de réparation public, et n'a pas précisé combien d'appareils sont touchés. Un détail qui compte : hors garantie, le remplacement de l'écran interne est estimé à 999 dollars par 9to5Mac — la moitié du prix de l'appareil.</p>",
      "<h2>Un produit en rupture de stock… et sous pression</h2>",
      "<p>Le paradoxe, c'est que l'iPhone Duo est introuvable : épuisé dès les précommandes, avec des délais de livraison repoussés à janvier, il peine à sortir des usines — la presse a fait état de rendements de production d'environ 60 % seulement. Le PDG John Ternus a lui-même reconnu cette semaine qu'Apple n'était pas en mesure de prédire quand elle pourrait répondre à la demande. Pour Francisco Jeronimo, vice-président chez IDC, cité par Moneycontrol, la gestion de ce défaut jouera directement sur la confiance des acheteurs envers les pliables, compte tenu du prix de 1 999 dollars. Premier produit majeur de l'ère Ternus, l'iPhone Duo devait prouver qu'Apple pouvait encore surprendre. Il le fait — mais pas comme prévu.</p>",
      "<p><strong>Sources :</strong> <a href='https://www.cultofmac.com/news/iphone-duo-screens-crack-immediately'>Cult of Mac</a> ; <a href='https://www.macobserver.com/news/apple-issues-internal-memo-over-iphone-duo-display-failures/'>MacObserver</a> ; <a href='https://www.moneycontrol.com/technology/iphone-duo-inner-display-cracking-at-same-spot-near-fold-apple-confirms-issue-on-some-units-article-14062590.html'>Moneycontrol</a> ; <a href='https://www.thedailystar.net/news/technology/news/iphone-duo-users-report-screen-cracks-apples-first-foldable-handset-4309501'>The Daily Star (The Guardian)</a> ; <a href='https://en.wikipedia.org/wiki/IPhone_Duo'>Wikipédia — iPhone Duo</a>. Photo : SimonWaldherr, <a href='https://commons.wikimedia.org/wiki/File:IPhone_Duo_07.jpg'>Wikimedia Commons</a>, licence CC BY 4.0.</p>",
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
];

export const FIL_INFO: string[] = [
  "Nvidia : onze jours après sa démission, Jensen Huang est réintégré à la tête du groupe",
  "James Bond : Robert Pattinson devient le nouveau 007 de Denis Villeneuve",
  "« Crackgate » : l'iPhone pliable d'Apple à 1 999 $ se fissure dès les premières heures",
  "The Day of the Jackal : la saison 2 se précise, Eddie Redmayne prêt à rempiler",
  "IA : les agents autonomes s'installent dans les assistants du quotidien",
  "Tech : les smartphones pliants passent la barre des formats grand public",
  "Sport : l'analyse MaSt — le milieu de terrain, clé des soirées européennes",
  "F1 : l'aérodynamique, la course invisible derrière chaque Grand Prix",
];

/** Sélection « Les plus lus » de la page d'accueil, dans l'ordre du design. */
export const TOP_IDS: string[] = ["jackal-saison-2", "ia-agents", "foot-europe", "smartphones-pliants", "series-espionnage"];
