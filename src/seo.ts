/** Constantes et utilitaires SEO du site MaSt. */

export const SITE_URL = "https://mazilepost.web.app";
export const NOM_SITE = "MaSt";
export const DESC_DEFAUT =
  "MaSt — l'actualité cinéma, séries, tech, intelligence artificielle et sport, sélectionnée et décryptée chaque jour.";
export const IMAGE_PARTAGE = `${SITE_URL}/og-image.png`;

export function cheminRubrique(id: string): string {
  return id === "toutes" ? "/" : `/rubrique/${id}`;
}

export function cheminArticle(id: string): string {
  return `/article/${id}`;
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
