/** Constantes et utilitaires SEO du site MaSt. */

export const SITE_URL = "https://mazilepost.web.app";
export const NOM_SITE = "MaSt";
export const DESC_DEFAUT =
  "MaSt — l'actualité cinéma, séries, tech, IA, sport, jeux et business, plus les fiches caractéristiques des téléphones récents, sélectionnée et décryptée chaque jour.";
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

export function cheminTelephone(id: string): string {
  return `/telephone/${id}`;
}

const ID_LD_PRODUIT = "ld-produit";

/** Extrait un prix exploitable (montant + devise) du champ prix libre des fiches téléphones. Préfère l'euro quand les deux devises sont présentes. */
export function extrairePrix(prix: string): { montant: string; devise: string } | null {
  const trouvailles = [...prix.matchAll(/(\d[\d\s\u202F]*)\s*(€|\$)/g)].map((m) => ({
    montant: m[1].replace(/[\s\u202F]/g, ""),
    devise: m[2] === "€" ? "EUR" : "USD",
  }));
  if (trouvailles.length === 0) return null;
  return trouvailles.find((t) => t.devise === "EUR") ?? trouvailles[0];
}

/** Injecte les données structurées Product d'une fiche téléphone ouverte. */
export function appliquerDonneesTelephone(tel: {
  marque: string;
  modele: string;
  resume: string;
  id: string;
  prix: string;
  imageUrl?: string;
}) {
  let script = document.getElementById(ID_LD_PRODUIT) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = ID_LD_PRODUIT;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  const url = SITE_URL + cheminTelephone(tel.id);
  const prix = extrairePrix(tel.prix);
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${tel.marque} ${tel.modele}`,
    description: tel.resume,
    brand: { "@type": "Brand", name: tel.marque },
    url,
    ...(tel.imageUrl ? { image: tel.imageUrl } : {}),
    ...(prix
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: prix.montant,
            priceCurrency: prix.devise,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  });
}

/** Retire les données structurées Product quand on quitte une fiche téléphone. */
export function retirerDonneesTelephone() {
  document.getElementById(ID_LD_PRODUIT)?.remove();
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
  imageUrl?: string;
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
    image: [article.imageUrl ?? IMAGE_PARTAGE],
    author: { "@type": "Person", name: "Stanley Mazile", jobTitle: "Fondateur et rédacteur en chef", url: SITE_URL + "/auteur/stanley-mazile" },
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
export function appliquerSeo(opts: { titre: string; description: string; chemin: string; type?: string; image?: string; noindex?: boolean }) {
  const url = SITE_URL + opts.chemin;
  const image = opts.image ?? IMAGE_PARTAGE;
  document.title = opts.titre;
  fixerMetaParNom(
    "robots",
    opts.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  );
  fixerMetaParNom("description", opts.description);
  fixerMetaParPropriete("og:title", opts.titre);
  fixerMetaParPropriete("og:description", opts.description);
  fixerMetaParPropriete("og:url", url);
  fixerMetaParPropriete("og:type", opts.type ?? "website");
  fixerMetaParPropriete("og:image", image);
  fixerMetaParNom("twitter:title", opts.titre);
  fixerMetaParNom("twitter:description", opts.description);
  fixerMetaParNom("twitter:image", image);
  let canonique = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonique) {
    canonique = document.createElement("link");
    canonique.setAttribute("rel", "canonical");
    document.head.appendChild(canonique);
  }
  canonique.setAttribute("href", url);
}
