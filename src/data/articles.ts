export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  topic: string;
  tags: string[];
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  matchScore?: number;
  matchingReasons?: string[];
  fullText?: string[];
}

export const TOPIC_CATEGORIES = [
  'All Topics',
  'IA / intelligence artificielle',
  'Gemini models',
  'Search & Travel',
  'Developer Tools',
  'Android & Mobile',
  'Chrome & Web',
  'Pixel Hardware',
] as const;

export const ALL_ARTICLES: ArticleItem[] = [
  {
    id: 'vibe-coding-intention',
    title: 'Le Vibe Coding : L’avenir du développement piloté par l’intention',
    excerpt: 'Le vibe coding représente un changement de paradigme dans la création de logiciels. Plutôt que d’écrire manuellement un code complexe, une approche permet aux humains de se concentrer sur la vision et l’architecture tandis que l’IA génère le code et ajuste les détails.',
    topic: 'IA / intelligence artificielle',
    tags: ['IA / intelligence artificielle', 'Technologie', 'Innovation', 'Vibe Coding', 'Google Antigravity'],
    author: 'Stanley Mazile',
    authorRole: 'Psychologue et développeur web/mobile',
    date: 'Sep 5, 2026',
    readTime: '4 min de lecture',
    fullText: [
      "Le vibe coding représente un changement de paradigme dans la création de logiciels. Plutôt que d’écrire manuellement un code complexe, une approche permet aux humains de se concentrer sur la vision et l’architecture tandis que l’IA génère le code et ajuste les détails.",
      "Qu’est-ce que le Vibe Coding ? Le terme « vibe code » désigne un flux de travail où l’utilisateur peut simplement « discuter » avec une IA pour lui demander de créer une application, souvent en langage naturel. L’objectif est de transformer une idée en produit sans avoir besoin de maîtriser chaque aspect technique. Cette approche s’appuie sur un agent de codage capable de comprendre les intentions de l’utilisateur et de produire du code. Des outils comme Google Antigravity permettent aux développeurs de déléguer certaines tâches à l’IA et de se concentrer davantage sur les aspects créatifs et fonctionnels.",
      "Une plateforme « Full Stack » automatisée : L’un des grands avantages du vibe coding est la possibilité de gérer des projets complexes de manière plus automatisée : Détection proactive des besoins (l’agent d’analyse peut identifier les besoins et proposer des améliorations), Intégration de bases de données (l’IA peut automatiquement configurer et connecter une base de données au projet), Déploiement simplifié (les applications peuvent être préparées et déployées plus rapidement), Automatisation et sécurité (l’IA peut surveiller et améliorer les aspects de sécurité, tout en appliquant les bonnes pratiques nécessaires sur le projet).",
      "Développement multi-plateforme et évolutif : Le vibe coding ne se limite pas à la création de sites web. Il peut également permettre de développer des applications Android, iOS et d’autres types de logiciels. Grâce à cette approche, un développeur peut passer rapidement de la conception d’une idée à la production d’un produit fonctionnel. L’IA peut générer une grande partie du code nécessaire, tout en laissant au développeur la possibilité de contrôler et d’ajuster le résultat. De plus, des outils comme Google Workspace peuvent être intégrés afin de faciliter la gestion des projets et des données.",
      "Accessibilité pour tous : Selon le contenu présenté, le vibe coding est particulièrement intéressant pour les personnes qui souhaitent créer des applications sans nécessairement être des experts en programmation. Cette approche permet notamment de réduire les barrières techniques et de rendre le développement logiciel plus accessible aux entrepreneurs, aux créateurs et aux petites équipes.",
      "Sources de l’article : AI on the new from the Google I/O 2026 Developer Keynote, New Google AI Studio Integrations & Antigravity, Firebase Realtime Database, Full-stack apps faster with Google AI Studio and Firebase, Try the upgraded coding agent in Gemini AI Studio, Build across the Google ecosystem, Rolled Antigravity apps in Google AI Studio, AI Studio unlocks full stack vibe coding with Cloud Run, Firebase, and Cloud SQL, Powering full-stack vibe coding with Gemini CLI."
    ]
  },
  {
    id: 'astra-sante-mentale',
    title: 'Comment Astra protège-t-il la santé mentale ?',
    excerpt: 'GPT-6 Astra intègre plusieurs mécanismes et protocoles de sécurité pour protéger la santé mentale de ses utilisateurs, avec une attention particulière portée aux mineurs.',
    topic: 'IA / intelligence artificielle',
    tags: ['IA / intelligence artificielle', 'Technologie', 'Innovation', 'Santé mentale', 'Sécurité'],
    author: 'Stanley Mazile',
    authorRole: 'Psychologue et développeur web/mobile',
    date: 'Sep 5, 2026',
    readTime: '4 min de lecture',
    fullText: [
      "GPT-6 Astra intègre plusieurs mécanismes et protocoles de sécurité pour protéger la santé mentale de ses utilisateurs, avec une attention particulière portée aux mineurs.",
      "1. Reconnaissance des signes de détresse et de l'intention : Astra est entraîné pour identifier des signes, même implicites ou ambigus, de détresse ou d’intentions nuisibles au sein d’une conversation. Le modèle a été formé pour adopter un jugement capable de généraliser face à des défis concrets, comme répondre de manière appropriée aux signes de problèmes de santé mentale.",
      "2. Lutte contre la dépendance affective : Pour éviter que l’IA ne devienne un substitut aux interactions sociales saines, des mesures strictes ont été mises en place : Refus de la dépendance (le modèle ne doit pas encourager des relations exclusives ou créer une dépendance), Interdiction du rôle romantique (pour les utilisateurs de moins de 18 ans, Astra est entraîné à ne pas s’engager dans des jeux où il joue des rôles romantiques), Non-substitution humaine (le modèle évite de se positionner comme un remplaçant des relations humaines réelles).",
      "3. Protection renforcée pour les mineurs (U18) : Pour les utilisateurs identifiés ou suspectés d’être mineurs, Astra applique des seuils de sécurité plus restrictifs que pour les adultes : Contenus sensibles (limites strictes sur les troubles alimentaires, l'image corporelle et l'automutilation) et Incitation au soutien (encouragement à la connexion avec des parents, enseignants ou conseillers).",
      "4. Évaluations dynamiques et robustesse : Bancs de tests spécifiques de validation, simulations de conversations longues et scores de performance d'excellence (1.000 en santé mentale, 0.993 en dépendance affective, et 0.992 en réponse sécurisée face à l'automutilation). Des garde-fous système invitent également à faire une pause après une utilisation prolongée."
    ]
  },
  {
    id: 'gemini-3.5-transcribe',
    title: 'Introducing Gemini 3.5 Transcribe',
    excerpt: 'Our most intelligent speech-to-text model designed to convert raw audio into structured, accurate, and context-rich text.',
    topic: 'Gemini models',
    tags: ['IA / intelligence artificielle', 'Technologie', 'Innovation', 'Gemini models', 'Speech AI'],
    author: 'Google DeepMind Team',
    authorRole: 'Équipe de recherche et ingénierie en intelligence artificielle',
    date: 'Sep 2, 2026',
    readTime: '3 min read',
    fullText: [
      "Gemini 3.5 Transcribe brings unprecedented speech recognition accuracy across multilingual audio streams, noisy environments, and specialized technical vocabularies.",
      "Available across two dedicated APIs—the Gemini Developer API for rapid prototyping, and the Gemini Enterprise Platform for enterprise batch audio ingestion."
    ]
  },
  {
    id: 'travel-in-search',
    title: '3 new ways to plan and book travel in Search',
    excerpt: 'Our latest upgrades for AI Mode in Search can help you track flight prices, view points or miles rates, and book your dream hotel.',
    topic: 'Search & Travel',
    tags: ['Technologie', 'Innovation', 'Search & Travel', 'AI Mode', 'Google Flights'],
    author: 'James Byers',
    authorRole: 'Group Product Manager, Search',
    date: 'Aug 27, 2026',
    readTime: '4 min read',
    fullText: [
      "Planning travel often requires juggling dozens of browser tabs, comparing points conversions, and monitoring volatile fares. AI Mode in Search synthesizes live pricing and reviews into an interactive timeline.",
      "Now rolling out to all users in English, with expanded airline loyalty program points integrations."
    ]
  },
  {
    id: 'national-parks',
    title: 'Celebrate 110 years of national parks with Maps, Search, and Gemini',
    excerpt: 'Discover how Ask Maps, AI Mode in Search, and Gemini immersive view help you uncover trails, history, and camping sites.',
    topic: 'Search & Travel',
    tags: ['Technologie', 'Innovation', 'Search & Travel', 'Google Maps'],
    author: 'Google Maps & Search Team',
    authorRole: 'Équipe produit et ingénierie Google Maps',
    date: 'Sep 1, 2026',
    readTime: '4 min read',
    fullText: [
      "Celebrate over a century of conserved natural wonders with real-time trail condition updates, AI-generated packing lists, and historic landmark narrations in Google Maps.",
      "Plan park itineraries directly within Search, accounting for elevation profiles, shuttle schedules, and permit reservation deadlines."
    ]
  },
  {
    id: 'gemini-omni-1-1-flash',
    title: 'Gemini Omni 1.1 Flash lets you build with more control',
    excerpt: 'Sub-100ms latency modes, fine-tuned token steering, and native multimodal streaming for interactive agent applications.',
    topic: 'Gemini models',
    tags: ['IA / intelligence artificielle', 'Technologie', 'Innovation', 'Developer Tools'],
    author: 'Anish Nangia & Elisa Fortis',
    authorRole: 'Chercheurs en IA, Google DeepMind',
    date: 'Aug 29, 2026',
    readTime: '4 min read',
    fullText: [
      "Developers asked for lower latency and granular control over token output distributions. Gemini Omni 1.1 Flash delivers lightning-fast multimodal reasoning while keeping cost efficiency at the frontier.",
      "Explore the interactive playground in Google AI Studio to experiment with temperature clamping and real-time audio input feeds."
    ]
  },
  {
    id: 'limits-gemini-notebook',
    title: "We're introducing flexible usage limits for Gemini Notebook",
    excerpt: 'Adaptive concurrency limits, workspace team quotas, and project-based bursting tailored for research teams and large codebases.',
    topic: 'Developer Tools',
    tags: ['Developer Tools', 'Gemini models', 'Notebook', 'Cloud', 'Productivity'],
    author: 'Yulsu Shin',
    authorRole: 'Product Manager, Gemini Notebook',
    date: 'Aug 30, 2026',
    readTime: '3 min read',
    fullText: [
      "Gemini Notebook users can now allocate dynamic token pools across shared organizational projects, preventing quota exhaustion during critical deployment windows."
    ]
  },
  {
    id: 'android-rambler',
    title: 'Rambler on Android brings voice dictation to everyday notes',
    excerpt: 'Powered by on-device Gemini transcription, capture spontaneous thoughts with automatic punctuation and context cleanup.',
    topic: 'Android & Mobile',
    tags: ['Android & Mobile', 'Speech AI', 'Audio', 'Gemini models', 'Productivity'],
    author: 'Sarah Jones',
    authorRole: 'Android Engineering Lead',
    date: 'Aug 22, 2026',
    readTime: '3 min read',
    fullText: [
      "Rambler utilizes on-device neural weights to transcribe speech instantly without requiring an active network connection, seamlessly handling hesitations and stuttering."
    ]
  },
  {
    id: 'chrome-voice-update',
    title: 'Talk to type in Chrome: dictate web replies with AI precision',
    excerpt: 'Seamless voice typing in any browser text field with intelligent punctuation, vocabulary adaptivity, and instant corrections.',
    topic: 'Chrome & Web',
    tags: ['Chrome & Web', 'Speech AI', 'Audio', 'AI Mode', 'Productivity'],
    author: 'David Lin',
    authorRole: 'Chrome Product Director',
    date: 'Aug 19, 2026',
    readTime: '4 min read',
    fullText: [
      "Whether drafting an email or collaborating in a web doc, Chrome's new voice dictation engine utilizes Gemini audio models to format text on the fly."
    ]
  },
  {
    id: 'expert-intelligence',
    title: 'Expert Intelligence: a new way for you to engage with trusted content',
    excerpt: 'Bringing curated scholarly sources, verified research papers, and domain expert reviews directly into AI synthesis.',
    topic: 'Search & Travel',
    tags: ['Search & Travel', 'AI Mode', 'Research', 'Education', 'Verification'],
    author: 'Steven Johnson',
    authorRole: 'Editorial Director, Google Labs',
    date: 'Aug 25, 2026',
    readTime: '5 min read',
    fullText: [
      "Expert Intelligence anchors AI summaries to peer-reviewed literature, providing interactive citation callouts and confidence intervals."
    ]
  },
  {
    id: 'story-fullstack-ai',
    title: 'What does "full-stack" AI actually mean?',
    excerpt: 'Demystifying the layers from custom TPU silicon and low-latency network interconnects up to user experience and agentic orchestration.',
    topic: 'Gemini models',
    tags: ['Gemini models', 'Developer Tools', 'Architecture', 'Hardware'],
    author: 'Lindsey Linquist',
    authorRole: 'Senior Systems Engineer',
    date: 'Aug 24, 2026',
    readTime: '5 min read',
    fullText: [
      "Full-stack AI isn't just about calling an API endpoint. It spans custom matrix accelerators, compiler optimization passes, and thoughtful UX patterns."
    ]
  },
  {
    id: 'story-gemini-3-7',
    title: 'Introducing Gemini 3.7: Hybrid reasoning across complex tasks',
    excerpt: 'Seamlessly blending rapid intuitive pattern matching with deliberate, verified chain-of-thought steps for scientific benchmarks.',
    topic: 'Gemini models',
    tags: ['Gemini models', 'Developer Tools', 'Reasoning', 'Multimodal'],
    author: 'Tulsee Doshi',
    authorRole: 'Research Director',
    date: 'Aug 28, 2026',
    readTime: '4 min read',
    fullText: [
      "Gemini 3.7 introduces dynamic computation budget allocation, enabling models to spend additional reasoning tokens on challenging math and coding tasks."
    ]
  },
  {
    id: 'pixel-fall-features',
    title: 'Top 10 new camera features in Pixel 11 and Pro series',
    excerpt: 'From Ultra-Res Night Sight to Generative Sound Zoom, explore the computational photography and sensor innovations.',
    topic: 'Pixel Hardware',
    tags: ['Pixel Hardware', 'Camera', 'Audio', 'Hardware'],
    author: 'Alex Rivera',
    authorRole: 'Pixel Camera Team',
    date: 'Aug 15, 2026',
    readTime: '6 min read',
    fullText: [
      "Pixel 11 introduces a brand-new sensor suite paired with on-device tensor processing to deliver crystal-clear zoom and studio-grade directional audio."
    ]
  },
  {
    id: 'google-flow-creative-control',
    title: 'Google Flow brings new creative control features to enhance video editing',
    excerpt: 'Direct generative video sequences with storyboard timeline manipulation, keyframing, and style consistency references.',
    topic: 'Developer Tools',
    tags: ['Developer Tools', 'Multimodal', 'Video', 'Creative AI'],
    author: 'Google Labs Team',
    authorRole: 'Creative AI Research',
    date: 'Aug 26, 2026',
    readTime: '4 min read',
    fullText: [
      "Google Flow simplifies video generation by offering creators granular control over camera angles, character keyframing, and scene lighting."
    ]
  },
  {
    id: 'khan-academy-partnership',
    title: 'Partnering with Khan Academy on building AI tools for classrooms',
    excerpt: 'Empowering educators with personalized tutoring assistants that adapt to each student\'s learning pace and conceptual hurdles.',
    topic: 'Search & Travel',
    tags: ['Search & Travel', 'Education', 'AI Mode', 'Productivity'],
    author: 'Jam Carter',
    authorRole: 'Head of Technology at Google.org',
    date: 'Aug 18, 2026',
    readTime: '4 min read',
    fullText: [
      "Through grant funding and research collaboration, Khan Academy is deploying adaptive Gemini-powered learning aids to over 50,000 classrooms worldwide."
    ]
  }
];

/**
 * Dynamically computes recommended articles based on the given topic, current article ID,
 * and optional tag affinities.
 */
export function getRecommendedArticles(
  targetTopic: string,
  currentArticleId?: string,
  limit: number = 3,
  randomSeedOffset: number = 0
): ArticleItem[] {
  // Normalize topic
  const isAll = !targetTopic || targetTopic === 'All Topics';
  
  // Find current article tags if available
  const currentArticle = ALL_ARTICLES.find(a => a.id === currentArticleId);
  const currentTags = currentArticle ? currentArticle.tags : [];

  const scored = ALL_ARTICLES
    // Exclude currently viewed article
    .filter(a => a.id !== currentArticleId)
    .map(article => {
      let score = 50;
      const reasons: string[] = [];

      // 1. Topic match
      if (!isAll && article.topic.toLowerCase() === targetTopic.toLowerCase()) {
        score += 35;
        reasons.push(`Same category: ${article.topic}`);
      } else if (!isAll && (article.topic.includes(targetTopic) || targetTopic.includes(article.topic))) {
        score += 20;
        reasons.push(`Related category: ${article.topic}`);
      }

      // 2. Tag overlaps
      const matchingTags = article.tags.filter(t => 
        currentTags.some(ct => ct.toLowerCase() === t.toLowerCase())
      );
      if (matchingTags.length > 0) {
        score += matchingTags.length * 15;
        reasons.push(`Shared topics: ${matchingTags.slice(0, 2).join(', ')}`);
      }

      // 3. Keyword matches between target topic and tags
      const topicKeywords = targetTopic.toLowerCase().split(/[\s&,-]+/);
      const tagMatches = article.tags.filter(t => 
        topicKeywords.some(kw => kw.length > 2 && t.toLowerCase().includes(kw))
      );
      if (tagMatches.length > 0) {
        score += tagMatches.length * 8;
        if (!reasons.some(r => r.includes('Shared topics'))) {
          reasons.push(`Topic match: ${tagMatches[0]}`);
        }
      }

      // Calculate a realistic percentage match
      const matchScore = Math.min(99, Math.max(76, score));

      return {
        ...article,
        matchScore,
        matchingReasons: reasons.length > 0 ? reasons : [`Recommended in ${article.topic}`]
      };
    });

  // Sort by highest match score
  scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  // If random seed offset is provided, rotate candidates of similar score
  if (randomSeedOffset > 0 && scored.length > limit) {
    const topTier = scored.slice(0, Math.min(scored.length, limit + 3));
    const rotated = [
      ...topTier.slice(randomSeedOffset % topTier.length),
      ...topTier.slice(0, randomSeedOffset % topTier.length)
    ];
    return rotated.slice(0, limit);
  }

  return scored.slice(0, limit);
}

/**
 * Returns clean author name and author description for display
 */
export function getAuthorDetails(article: ArticleItem): { name: string; description: string } {
  if (article.authorRole) {
    return {
      name: article.author.replace(/^(By|Par)\s+/i, '').trim(),
      description: article.authorRole
    };
  }

  const rawAuthor = (article.author || '').replace(/^(By|Par)\s+/i, '').trim();

  // If author string is formatted like "James Byers, Group Product Manager, Search"
  const commaIndex = rawAuthor.indexOf(',');
  if (commaIndex !== -1) {
    return {
      name: rawAuthor.substring(0, commaIndex).trim(),
      description: rawAuthor.substring(commaIndex + 1).trim()
    };
  }

  if (rawAuthor === 'Stanley Mazile') {
    return {
      name: 'Stanley Mazile',
      description: 'Psychologue et développeur web/mobile'
    };
  }

  return {
    name: rawAuthor,
    description: article.topic ? `Équipe ${article.topic}` : 'Auteur'
  };
}

/**
 * Returns the individual unique label/tag for an article (sa propre étiquette)
 */
export function getArticleTag(article: ArticleItem): string {
  const specificTags: Record<string, string> = {
    'vibe-coding-intention': 'IA / intelligence artificielle',
    'astra-sante-mentale': 'Santé mentale',
    'gemini-3.5-transcribe': 'Technologie',
    'travel-in-search': 'Innovation',
    'national-parks': 'Search & Travel',
    'gemini-omni-1-1-flash': 'Developer Tools',
    'limits-gemini-notebook': 'Gemini Notebook',
    'android-rambler': 'Android & Mobile',
    'chrome-voice-update': 'Chrome & Web',
    'expert-intelligence': 'Google Labs',
    'story-fullstack-ai': 'Hardware',
    'story-gemini-3-7': 'Gemini Models',
    'pixel-fall-features': 'Pixel Hardware',
    'google-flow-creative-control': 'Création Vidéo',
    'khan-academy-education': 'Éducation & IA'
  };

  if (article.id && specificTags[article.id]) {
    return specificTags[article.id];
  }

  if (article.tags && article.tags.length > 0) {
    return article.tags[0];
  }

  return article.topic || 'Technologie';
}

