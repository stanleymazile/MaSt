#!/usr/bin/env node
/**
 * Pré-rendu statique SEO de MaSt (exécuté après `vite build`).
 *
 * Le site est une application React : sans ce script, toutes les routes servent
 * le même index.html et les robots qui ne lisent pas le JavaScript (partages
 * WhatsApp/Facebook/X, Google Discover…) ne voient que les métadonnées de
 * l'accueil. Ce script génère, pour chaque route connue, un fichier HTML
 * (dist/article/<id>.html, dist/telephone/<id>.html, dist/rubrique/…, pages
 * d'info) qui reprend le gabarit de dist/index.html avec le titre, la
 * description, l'URL canonique, les balises Open Graph/Twitter et les données
 * structurées propres à la page. L'application React démarre ensuite
 * normalement et réinjecte les mêmes valeurs (les scripts JSON-LD portent les
 * mêmes identifiants que ceux de src/seo.ts : ils sont mis à jour, pas doublés).
 *
 * Le script génère aussi, dans dist/, le sitemap.xml (dates lastmod réelles
 * déduites des articles, extension images), le news-sitemap.xml (articles des
 * dernières 48 h, pour Google Actualités / Discover) et le rss.xml : ces trois
 * fichiers restent ainsi toujours synchronisés avec les données, sans
 * maintenance manuelle.
 *
 * Aucune dépendance : les données sont lues dans les fichiers sources
 * TypeScript par expressions régulières sur les champs simples.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://mazilepost.web.app";
const IMAGE_PARTAGE = "https://raw.githubusercontent.com/stanleymazile/MaSt/main/og-image.png";

function lire(chemin) {
  return readFileSync(join(RACINE, chemin), "utf-8");
}

/** Déséchappe une chaîne capturée dans un littéral TypeScript entre guillemets doubles. */
function desechapper(brut) {
  try {
    return JSON.parse(`"${brut}"`);
  } catch {
    return brut.replace(/\\"/g, '"');
  }
}

function champ(bloc, nom) {
  const m = bloc.match(new RegExp(`\\n    ${nom}: "((?:[^"\\\\]|\\\\.)*)"`));
  return m ? desechapper(m[1]) : null;
}

function decouperBlocs(src, marqueur) {
  return src
    .split(marqueur)
    .slice(1)
    .map((b) => b.split("\n  }")[0]);
}

/** Lit un Record<string, string> simple (RUBRIQUES, SOUS_RUBRIQUES). */
function lireRecord(src, nomExport) {
  const debut = src.indexOf(`export const ${nomExport}`);
  const fin = src.indexOf("};", debut);
  const bloc = src.slice(debut, fin);
  const record = {};
  for (const m of bloc.matchAll(/"?([\w-]+)"?:\s*"((?:[^"\\]|\\.)*)"/g)) {
    record[m[1]] = desechapper(m[2]);
  }
  return record;
}

function echapperHtml(valeur) {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Même logique que extrairePrix dans src/seo.ts. */
function extrairePrix(prix) {
  const trouvailles = [...prix.matchAll(/(\d[\d\s\u202F]*)\s*(€|\$)/g)].map((m) => ({
    montant: m[1].replace(/[\s\u202F]/g, ""),
    devise: m[2] === "€" ? "EUR" : "USD",
  }));
  if (trouvailles.length === 0) return null;
  return trouvailles.find((t) => t.devise === "EUR") ?? trouvailles[0];
}

/** Construit une page pré-rendue à partir du gabarit dist/index.html. */
function construirePage(gabarit, { titre, description, chemin, type = "website", image = IMAGE_PARTAGE, ldJson = null, ldId = null, publishedTime = null }) {
  const url = SITE + chemin;
  let html = gabarit;
  html = html.replace(/<title>.*?<\/title>/, `<title>${echapperHtml(titre)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${echapperHtml(description)}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${echapperHtml(titre)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${echapperHtml(description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${type}" />`);
  html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${echapperHtml(image)}" />`);
  if (image !== IMAGE_PARTAGE) {
    // Les dimensions/type de l'image par défaut ne valent pas pour les photos d'articles.
    html = html.replace(/\s*<meta property="og:image:(?:type|width|height|alt)" content="[^"]*" \/>/g, "");
  }
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${echapperHtml(titre)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${echapperHtml(description)}" />`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${echapperHtml(image)}" />`);
  let injection = "";
  if (publishedTime) {
    injection += `\n    <meta property="article:published_time" content="${publishedTime}" />`;
  }
  if (ldJson) {
    injection += `\n    <script type="application/ld+json" id="${ldId}">${JSON.stringify(ldJson)}</script>`;
  }
  if (injection) {
    html = html.replace("</head>", `${injection}\n  </head>`);
  }
  return html;
}

function ecrire(cheminFichier, contenu) {
  const cible = join(RACINE, "dist", cheminFichier);
  mkdirSync(dirname(cible), { recursive: true });
  writeFileSync(cible, contenu, "utf-8");
  // Copie « index de répertoire » : Firebase sert /article/<id> depuis
  // dist/article/<id>/index.html. La forme <id>.html seule n'est pas résolue
  // sans l'option cleanUrls — écartée car elle redirigerait aussi les fichiers
  // de vérification Google (google*.html), ce qui peut casser la Search Console.
  const sansExtension = cheminFichier.replace(/\.html$/, "");
  const cibleIndex = join(RACINE, "dist", sansExtension, "index.html");
  mkdirSync(dirname(cibleIndex), { recursive: true });
  writeFileSync(cibleIndex, contenu, "utf-8");
}

function main() {
  const gabaritPath = join(RACINE, "dist", "index.html");
  if (!existsSync(gabaritPath)) {
    console.error("prerendre : dist/index.html introuvable — lancer `vite build` d'abord.");
    process.exit(1);
  }
  const gabarit = readFileSync(gabaritPath, "utf-8");

  const srcArticles = lire("src/data/articles.ts");
  const rubriques = lireRecord(srcArticles, "RUBRIQUES");
  const sousRubriques = lireRecord(srcArticles, "SOUS_RUBRIQUES");

  let total = 0;

  // --- Articles ---
  const blocsArticles = decouperBlocs(srcArticles, '\n  {\n    id: "');
  if (blocsArticles.length === 0) {
    console.error("prerendre : aucun article lu dans articles.ts — abandon.");
    process.exit(1);
  }
  const donneesArticles = [];
  for (const b of blocsArticles) {
    const id = b.split('"', 1)[0];
    const titre = champ(b, "titre");
    const chapo = champ(b, "chapo");
    const dateIso = champ(b, "dateIso");
    const tag = champ(b, "tag");
    const imageUrl = champ(b, "imageUrl") ?? IMAGE_PARTAGE;
    donneesArticles.push({ id, titre, chapo, tag, dateIso, imageUrl, rubrique: champ(b, "rubrique"), branche: champ(b, "branche") });
    const url = `${SITE}/article/${id}`;
    const ld = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: titre,
      description: chapo,
      datePublished: dateIso,
      dateModified: dateIso,
      inLanguage: "fr-FR",
      articleSection: tag,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: [imageUrl],
      author: { "@type": "Person", name: "Stanley Mazile", jobTitle: "Fondateur et rédacteur en chef", url: `${SITE}/a-propos` },
      publisher: { "@type": "Organization", name: "MaSt", logo: { "@type": "ImageObject", url: IMAGE_PARTAGE } },
    };
    ecrire(
      `article/${id}.html`,
      construirePage(gabarit, {
        titre: `${titre} — MaSt`,
        description: chapo,
        chemin: `/article/${id}`,
        type: "article",
        image: imageUrl,
        ldJson: ld,
        ldId: "ld-article",
        publishedTime: dateIso,
      }),
    );
    total++;
  }

  // --- Téléphones ---
  const srcTels = lire("src/data/telephones.ts");
  const blocsTels = decouperBlocs(srcTels, '\n  {\n    id: "');
  const donneesTels = [];
  for (const b of blocsTels) {
    const id = b.split('"', 1)[0];
    const marque = champ(b, "marque");
    const modele = champ(b, "modele");
    const resume = champ(b, "resume");
    const prixTexte = champ(b, "prix");
    const imageUrl = champ(b, "imageUrl");
    donneesTels.push({ id, marque, modele, imageUrl });
    const url = `${SITE}/telephone/${id}`;
    const prix = prixTexte ? extrairePrix(prixTexte) : null;
    const ld = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${marque} ${modele}`,
      description: resume,
      brand: { "@type": "Brand", name: marque },
      url,
      ...(imageUrl ? { image: imageUrl } : {}),
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
    };
    ecrire(
      `telephone/${id}.html`,
      construirePage(gabarit, {
        titre: `${marque} ${modele} — fiche caractéristiques, prix, points forts et points faibles | MaSt`,
        description: `${resume}. Caractéristiques complètes du ${marque} ${modele} : écran, processeur, caméras, batterie, prix et notre avis.`,
        chemin: `/telephone/${id}`,
        image: imageUrl ?? IMAGE_PARTAGE,
        ldJson: ld,
        ldId: "ld-produit",
      }),
    );
    total++;
  }

  // --- Rubriques et sous-rubriques ---
  for (const [id, nom] of Object.entries(rubriques)) {
    const specifique =
      id === "telephones"
        ? {
            titre: "Téléphones — fiches caractéristiques des modèles récents | MaSt",
            description:
              "Les fiches caractéristiques MaSt des téléphones récents : écran, processeur, caméras, batterie, prix, points forts et points faibles, vérifiés modèle par modèle.",
          }
        : {
            titre: `${nom} — actualité et décryptages | MaSt`,
            description: `Toute l'actualité ${nom} sur MaSt : news, décryptages et analyses, sélectionnés et vérifiés chaque jour.`,
          };
    ecrire(`rubrique/${id}.html`, construirePage(gabarit, { ...specifique, chemin: `/rubrique/${id}` }));
    total++;
  }
  const blocSousPar = srcArticles.slice(srcArticles.indexOf("export const SOUS_PAR_RUBRIQUE"));
  for (const m of blocSousPar.matchAll(/(\w+): \[([^\]]*)\]/g)) {
    const rub = m[1];
    for (const s of m[2].matchAll(/id: "([\w-]+)"/g)) {
      const sous = s[1];
      const nom = sousRubriques[sous] ?? sous;
      ecrire(
        `rubrique/${rub}/${sous}.html`,
        construirePage(gabarit, {
          titre: `${nom} — actualité et décryptages | MaSt`,
          description: `Toute l'actualité ${nom} sur MaSt : news, décryptages et analyses, sélectionnés et vérifiés chaque jour.`,
          chemin: `/rubrique/${rub}/${sous}`,
        }),
      );
      total++;
    }
  }

  // --- Pages d'information ---
  const srcPages = lire("src/components/PagesInfo.tsx");
  for (const cle of ["a-propos", "politique-editoriale", "mentions-legales", "politique-confidentialite", "contact"]) {
    const m = srcPages.match(new RegExp(`"?${cle}"?: \\{\\s*titre: "((?:[^"\\\\]|\\\\.)*)",\\s*description:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    if (!m) {
      console.error(`prerendre : page ${cle} illisible dans PagesInfo.tsx — abandon.`);
      process.exit(1);
    }
    ecrire(
      `${cle}.html`,
      construirePage(gabarit, {
        titre: `${desechapper(m[1])} — MaSt`,
        description: desechapper(m[2]),
        chemin: `/${cle}`,
      }),
    );
    total++;
  }

  // --- Sitemap, sitemap Actualités et flux RSS (générés depuis les données) ---
  const echapperXml = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const dateMax = (liste) => liste.reduce((acc, d) => (d && d > acc ? d : acc), "");
  const derniereDate = dateMax(donneesArticles.map((a) => a.dateIso));
  const dateRubrique = (rub) => dateMax(donneesArticles.filter((a) => a.rubrique === rub).map((a) => a.dateIso));
  const dateBranche = (br) => dateMax(donneesArticles.filter((a) => a.branche === br).map((a) => a.dateIso));

  const entrees = [];
  const entree = (loc, lastmod, image) => {
    let x = `  <url>\n    <loc>${loc}</loc>\n`;
    if (lastmod) x += `    <lastmod>${lastmod}</lastmod>\n`;
    if (image) {
      x += `    <image:image>\n      <image:loc>${echapperXml(image.loc)}</image:loc>\n      <image:title>${echapperXml(image.titre)}</image:title>\n    </image:image>\n`;
    }
    return x + "  </url>";
  };
  entrees.push(entree(`${SITE}/`, derniereDate, null));
  for (const id of Object.keys(rubriques)) {
    entrees.push(entree(`${SITE}/rubrique/${id}`, id === "streaming" ? "" : dateRubrique(id), null));
  }
  for (const m of blocSousPar.matchAll(/(\w+): \[([^\]]*)\]/g)) {
    for (const s of m[2].matchAll(/id: "([\w-]+)"/g)) {
      entrees.push(entree(`${SITE}/rubrique/${m[1]}/${s[1]}`, dateBranche(s[1]), null));
    }
  }
  for (const a of donneesArticles) {
    entrees.push(entree(`${SITE}/article/${a.id}`, a.dateIso, { loc: a.imageUrl, titre: a.titre }));
  }
  for (const t of donneesTels) {
    entrees.push(entree(`${SITE}/telephone/${t.id}`, "", t.imageUrl ? { loc: t.imageUrl, titre: `${t.marque} ${t.modele}` } : null));
  }
  for (const cle of ["a-propos", "politique-editoriale", "mentions-legales", "politique-confidentialite", "contact"]) {
    entrees.push(entree(`${SITE}/${cle}`, "", null));
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entrees.join("\n")}\n</urlset>\n`;
  writeFileSync(join(RACINE, "dist", "sitemap.xml"), sitemap, "utf-8");

  // Sitemap Google Actualités : articles publiés dans les dernières 48 h.
  const maintenant = Date.now();
  const recents = donneesArticles.filter((a) => {
    const t = new Date(`${a.dateIso}T07:00:00Z`).getTime();
    return maintenant - t >= 0 && maintenant - t <= 48 * 3600 * 1000;
  });
  const newsEntrees = recents.map(
    (a) =>
      `  <url>\n    <loc>${SITE}/article/${a.id}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>MaSt</news:name>\n        <news:language>fr</news:language>\n      </news:publication>\n      <news:publication_date>${a.dateIso}T07:00:00+00:00</news:publication_date>\n      <news:title>${echapperXml(a.titre)}</news:title>\n    </news:news>\n  </url>`,
  );
  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${newsEntrees.join("\n")}\n</urlset>\n`;
  writeFileSync(join(RACINE, "dist", "news-sitemap.xml"), newsSitemap, "utf-8");

  // Flux RSS 2.0 (mêmes règles que l'ancien générateur Python).
  const rfc822 = (iso) => new Date(`${iso}T07:00:00Z`).toUTCString();
  const tries = [...donneesArticles].sort((x, y) => (y.dateIso || "").localeCompare(x.dateIso || ""));
  const items = tries.map(
    (a) =>
      `    <item>\n      <title>${echapperXml(a.titre)}</title>\n      <link>${SITE}/article/${a.id}</link>\n      <guid isPermaLink="true">${SITE}/article/${a.id}</guid>\n      <pubDate>${rfc822(a.dateIso)}</pubDate>\n      <category>${echapperXml(a.tag)}</category>\n      <description>${echapperXml(a.chapo)}</description>\n    </item>`,
  );
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>MaSt</title>\n    <link>${SITE}/</link>\n    <description>MaSt — l'actualité cinéma, séries, tech, IA, sport, jeux et business, sélectionnée et décryptée chaque jour.</description>\n    <language>fr-FR</language>\n    <lastBuildDate>${rfc822(derniereDate)}</lastBuildDate>\n    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />\n${items.join("\n")}\n  </channel>\n</rss>\n`;
  writeFileSync(join(RACINE, "dist", "rss.xml"), rss, "utf-8");

  console.log(`prerendre : ${total} pages pré-rendues (${blocsArticles.length} articles, ${blocsTels.length} téléphones, rubriques, sous-rubriques, 5 pages d'info) + sitemap.xml (${entrees.length} URL), news-sitemap.xml (${recents.length} articles), rss.xml (${items.length} articles).`);
}

main();
