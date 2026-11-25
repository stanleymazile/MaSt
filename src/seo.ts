/** Constantes et utilitaires SEO du site MaSt. */

export const SITE_URL = "https://mazilepost.web.app";
export const NOM_SITE = "MaSt";
export const DESC_DEFAUT =
  "MaSt — l'actualité cinéma, séries, tech, intelligence artificielle et sport, sélectionnée et décryptée chaque jour.";
export const IMAGE_PARTAGE = "https://raw.githubusercontent.com/stanleymazile/MaSt/main/og-image.png";

export function cheminRubrique(id: string): string {
  return id === "toutes" ? "/" : `/rubrique/${id}`;
}

export function cheminArticle(id: string): string {
  return `/article/${id}`;
}

export function cheminSousRubrique(rubrique: string, sous: string): string {
  return `/rubrique/${rubrique}/${sous}`;
}

function fixerMetaParNom(nom: string, contenu: string) {
  let m = document.querySelector<HTMLMetaElement>(`meta[name="${nom}"]`);
  if (!m) {
    m = document.createElement("meta");
    m.setAttribute("name", nom);
    document.head.appendChild(m);
  }
  m.setAttribute("content", contenu);
}

function fixerMetaParPropriete(propriete: string, contenu: string) {
  let m = document.querySelector<HTMLMetaElement>(`meta[property="${propriete}"]`);
  if (!m) {
    m = document.createElement("meta");
    m.setAttribute("property", propriete);
    document.head.appendChild(m);
  }
  m.setAttribute("content", contenu);
}

const ID_LD_ARTICLE = "ld-article";

/** Injecte (ou met à jour) les données structurées NewsArticle de l'article ouvert — pensé pour Google Actualités. */
export function appliquerDonneesArticle(article: {
  titre: string;
  chapo: string;
  dateIso: string;
  tag: string;
  id: string;
}) {
  let script = document.getElementById(ID_LD_ARTICLE) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = ID_LD_ARTICLE;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  const url = SITE_URL + cheminArticle(article.id);
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.titre,
    description: article.chapo,
    datePublished: article.dateIso,
    dateModified: article.dateIso,
    inLanguage: "fr-FR",
    articleSection: article.tag,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [IMAGE_PARTAGE],
    author: { "@type": "Organization", name: "Rédaction MaSt", url: SITE_URL + "/" },
    publisher: {
      "@type": "Organization",
      name: NOM_SITE,
      logo: { "@type": "ImageObject", url: IMAGE_PARTAGE },
    },
  });
}

/** Retire les données structurées NewsArticle quand on quitte la vue article. */
export function retirerDonneesArticle() {
  document.getElementById(ID_LD_ARTICLE)?.remove();
}

/** Met à jour le titre, la description, l'URL canonique et les balises de partage pour la vue courante. */
export function appliquerSeo(opts: { titre: string; description: string; chemin: string; type?: string }) {
  const url = SITE_URL + opts.chemin;
  document.title = opts.titre;
  fixerMetaParNom("description", opts.description);
  fixerMetaParPropriete("og:title", opts.titre);
  fixerMetaParPropriete("og:description", opts.description);
  fixerMetaParPropriete("og:url", url);
  fixerMetaParPropriete("og:type", opts.type ?? "website");
  fixerMetaParNom("twitter:title", opts.titre);
  fixerMetaParNom("twitter:description", opts.description);
  let canonique = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonique) {
    canonique = document.createElement("link");
    canonique.setAttribute("rel", "canonical");
    document.head.appendChild(canonique);
  }
  canonique.setAttribute("href", url);
}
