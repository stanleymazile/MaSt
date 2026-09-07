import { useEffect } from 'react';
import { ALL_ARTICLES, getAuthorDetails } from '../data/articles';

interface UseSEOProps {
  currentView: 'home' | 'article' | 'author' | 'news';
  activeArticleId?: string;
  newsFilter?: string;
}

const ARTICLE_IMAGES: Record<string, string> = {
  'vibe-coding-intention': '/images/vibe-coding.jpg',
  'astra-sante-mentale': '/images/astra-mental-health.jpg',
  'travel-in-search': '/images/travel-search.jpg',
  'gemini-3.5-transcribe': '/images/gemini-transcribe.jpg',
  'pixel-fall-features': '/images/pixel-hardware.jpg',
  'pixel-11': '/images/pixel-hardware.jpg',
  'national-parks': '/images/travel-search.jpg',
  'gemini-omni-1-1-flash': '/images/gemini-transcribe.jpg',
};

const DEFAULT_IMAGE = '/images/vibe-coding.jpg';
const BASE_TITLE = 'Remix Remix Google Product & AI Updates';
const DEFAULT_DESCRIPTION =
  "Actualités et analyses approfondies sur l'IA, Google Antigravity, le Vibe Coding, la santé mentale avec Astra, Gemini 3.5 et le hardware Pixel.";

function updateMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function useSEO({ currentView, activeArticleId }: UseSEOProps) {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-araympj4han3tdukfqkqc6-282407272927.us-east1.run.app';

    // Ensure Google Discover directive is active
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'googlebot-news', 'index, follow');

    if (currentView === 'author') {
      const authorTitle = 'Stanley Mazile | Auteur, Psychologue et Développeur - MaSt';
      const authorDesc =
        'Profil de Stanley Mazile : Psychologue et développeur web/mobile. Découvrez ses publications sur le Vibe Coding, l’IA, et la protection de la santé mentale.';
      const authorUrl = `${origin}/?author=stanley-mazile`;
      const authorImg = `${origin}/images/stanley-mazile.jpg`;

      document.title = authorTitle;
      updateMetaTag('name', 'description', authorDesc);
      updateCanonicalLink(authorUrl);

      updateMetaTag('property', 'og:type', 'profile');
      updateMetaTag('property', 'og:title', authorTitle);
      updateMetaTag('property', 'og:description', authorDesc);
      updateMetaTag('property', 'og:url', authorUrl);
      updateMetaTag('property', 'og:image', authorImg);

      updateMetaTag('name', 'twitter:card', 'summary');
      updateMetaTag('name', 'twitter:title', authorTitle);
      updateMetaTag('name', 'twitter:description', authorDesc);
      updateMetaTag('name', 'twitter:image', authorImg);
      return;
    }

    if (currentView === 'news') {
      const newsTitle = 'Actualités Tech & IA | MaSt';
      const newsDesc =
        'Découvrez toutes les actualités sur l’intelligence artificielle, Gemini, le vibe coding, la technologie et les outils de développement.';
      const newsUrl = `${origin}/?view=news`;

      document.title = newsTitle;
      updateMetaTag('name', 'description', newsDesc);
      updateCanonicalLink(newsUrl);

      updateMetaTag('property', 'og:type', 'website');
      updateMetaTag('property', 'og:title', newsTitle);
      updateMetaTag('property', 'og:description', newsDesc);
      updateMetaTag('property', 'og:url', newsUrl);

      updateMetaTag('name', 'twitter:card', 'summary_large_image');
      updateMetaTag('name', 'twitter:title', newsTitle);
      updateMetaTag('name', 'twitter:description', newsDesc);
      return;
    }

    if (currentView === 'home' || !activeArticleId) {
      document.title = BASE_TITLE;
      updateMetaTag('name', 'description', DEFAULT_DESCRIPTION);
      updateCanonicalLink(`${origin}/`);

      const fullImageUrl = `${origin}${DEFAULT_IMAGE}`;
      updateMetaTag('property', 'og:type', 'website');
      updateMetaTag('property', 'og:title', BASE_TITLE);
      updateMetaTag('property', 'og:description', DEFAULT_DESCRIPTION);
      updateMetaTag('property', 'og:url', `${origin}/`);
      updateMetaTag('property', 'og:image', fullImageUrl);
      updateMetaTag('property', 'og:image:width', '1200');
      updateMetaTag('property', 'og:image:height', '675');
      updateMetaTag('property', 'og:image:alt', 'Le Vibe Coding et les innovations technologiques Google');

      updateMetaTag('name', 'twitter:card', 'summary_large_image');
      updateMetaTag('name', 'twitter:title', BASE_TITLE);
      updateMetaTag('name', 'twitter:description', DEFAULT_DESCRIPTION);
      updateMetaTag('name', 'twitter:image', fullImageUrl);

      // JSON-LD for Homepage
      const homeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${origin}/#website`,
            url: `${origin}/`,
            name: 'MaSt | Google Product & AI Updates',
            description: DEFAULT_DESCRIPTION,
            inLanguage: 'fr-FR',
            publisher: {
              '@type': 'NewsMediaOrganization',
              name: 'MaSt',
              url: `${origin}/`,
              founder: {
                '@type': 'Person',
                name: 'Stanley Mazile',
                jobTitle: 'Psychologue et développeur web/mobile',
              },
            },
          },
        ],
      };

      let script = document.getElementById('schema-structured-data');
      if (!script) {
        script = document.createElement('script');
        script.id = 'schema-structured-data';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(homeSchema);
      return;
    }

    // Article View
    const article = ALL_ARTICLES.find((a) => a.id === activeArticleId);
    if (!article) return;

    const author = getAuthorDetails(article);
    const title = `${article.title} - MaSt`;
    const description = article.excerpt;
    const articleUrl = `${origin}/?article=${article.id}`;
    const relativeImage = ARTICLE_IMAGES[article.id] || DEFAULT_IMAGE;
    const fullImageUrl = `${origin}${relativeImage}`;
    const isFrench = article.id === 'vibe-coding-intention' || article.id === 'astra-sante-mentale';

    document.title = title;
    updateMetaTag('name', 'description', description);
    updateCanonicalLink(articleUrl);

    // OpenGraph
    updateMetaTag('property', 'og:type', 'article');
    updateMetaTag('property', 'og:title', article.title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', articleUrl);
    updateMetaTag('property', 'og:image', fullImageUrl);
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '675');
    updateMetaTag('property', 'og:image:alt', article.title);
    updateMetaTag('property', 'article:published_time', '2026-09-05T08:00:00+00:00');
    updateMetaTag('property', 'article:modified_time', '2026-09-05T14:00:00+00:00');
    updateMetaTag('property', 'article:author', author.name || 'Stanley Mazile');
    updateMetaTag('property', 'article:section', article.topic || 'Technologie');

    // Twitter
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', article.title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', fullImageUrl);

    // News keywords for Google Discover
    if (article.tags && article.tags.length > 0) {
      updateMetaTag('name', 'news_keywords', article.tags.join(', '));
    }

    // Article Schema.org JSON-LD (NewsArticle specification for Google Discover)
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      headline: article.title.length > 110 ? article.title.substring(0, 107) + '...' : article.title,
      description: article.excerpt,
      image: [fullImageUrl],
      datePublished: '2026-09-05T08:00:00+00:00',
      dateModified: '2026-09-05T14:00:00+00:00',
      author: {
        '@type': 'Person',
        name: author.name || 'Stanley Mazile',
        jobTitle: author.description || 'Psychologue et développeur web/mobile',
      },
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: 'MaSt',
        url: `${origin}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${origin}/images/vibe-coding.jpg`,
          width: 1200,
          height: 675,
        },
      },
      articleSection: article.topic,
      keywords: article.tags?.join(', ') || 'IA, Technologie, Google',
      inLanguage: isFrench ? 'fr-FR' : 'en-US',
      isAccessibleForFree: true,
    };

    let script = document.getElementById('schema-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'schema-structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(articleSchema);
  }, [currentView, activeArticleId]);
}
