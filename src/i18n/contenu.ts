import { FIL_INFO, type Article, type Fiche } from "../data/articles";
import type { Telephone } from "../data/telephones";
import type { Produit } from "../data/produits";
import { CONTENU_I18N } from "./contenu-data";
import { LOCALES, type Lang } from "./lang";

/* Formes des traductions de contenu (générées depuis les JSON des traducteurs). */
export interface ArticleTrad {
  titre?: string;
  chapo?: string;
  tag?: string;
  legende?: string;
  corps?: string[];
  fiche?: Partial<Pick<Fiche, "titre" | "sortie" | "detail" | "casting" | "buzz" | "verdict">>;
}
export interface TelephoneTrad {
  resume?: string;
  annonce?: string;
  sortie?: string;
  prix?: string;
  reseau?: string;
  dimensions?: string;
  sim?: string;
  ecran?: string;
  os?: string;
  puce?: string;
  memoire?: string;
  cameraPrincipale?: string;
  cameraSelfie?: string;
  video?: string;
  batterie?: string;
  connectivite?: string;
  divers?: string;
  pointsForts?: string[];
  pointsFaibles?: string[];
  legendeImage?: string;
}
export interface ProduitTrad {
  categorie?: string;
  lancement?: string;
  accroche?: string;
  description?: string;
  innovation?: string;
  disponibilite?: string;
  legendeImage?: string;
}
export interface ContenuLang {
  filInfo: string[];
  articles: Record<string, ArticleTrad>;
  telephones: Record<string, TelephoneTrad>;
  produits: Record<string, ProduitTrad>;
}

function trad(lang: Lang): ContenuLang | undefined {
  return lang === "fr" ? undefined : CONTENU_I18N[lang];
}

/** Les lignes du fil d'actualité dans la langue choisie (français si pas de traduction). */
export function filInfo(lang: Lang): string[] {
  const f = trad(lang)?.filInfo;
  return f && f.length === FIL_INFO.length ? f : FIL_INFO;
}

export interface ArticleAffiche {
  titre: string;
  chapo: string;
  tag: string;
  legende: string;
  corps: string[];
  fiche?: Fiche;
}

/** Titre, chapo, corps… de l'article dans la langue choisie, avec repli français champ par champ. */
export function texteArticle(a: Article, lang: Lang): ArticleAffiche {
  const tr = trad(lang)?.articles[a.id];
  if (!tr) {
    return { titre: a.titre, chapo: a.chapo, tag: a.tag, legende: a.legende, corps: a.corps, fiche: a.fiche };
  }
  return {
    titre: tr.titre ?? a.titre,
    chapo: tr.chapo ?? a.chapo,
    tag: tr.tag ?? a.tag,
    legende: tr.legende ?? a.legende,
    corps: tr.corps ?? a.corps,
    fiche: a.fiche ? { ...a.fiche, ...(tr.fiche ?? {}) } : undefined,
  };
}

/** La fiche téléphone complète dans la langue choisie, avec repli français champ par champ. */
export function texteTelephone(tel: Telephone, lang: Lang): Telephone {
  const tr = trad(lang)?.telephones[tel.id];
  if (!tr) return tel;
  return {
    ...tel,
    resume: tr.resume ?? tel.resume,
    annonce: tr.annonce ?? tel.annonce,
    sortie: tr.sortie ?? tel.sortie,
    prix: tr.prix ?? tel.prix,
    reseau: tr.reseau ?? tel.reseau,
    dimensions: tr.dimensions ?? tel.dimensions,
    sim: tr.sim ?? tel.sim,
    ecran: tr.ecran ?? tel.ecran,
    os: tr.os ?? tel.os,
    puce: tr.puce ?? tel.puce,
    memoire: tr.memoire ?? tel.memoire,
    cameraPrincipale: tr.cameraPrincipale ?? tel.cameraPrincipale,
    cameraSelfie: tr.cameraSelfie ?? tel.cameraSelfie,
    video: tr.video ?? tel.video,
    batterie: tr.batterie ?? tel.batterie,
    connectivite: tr.connectivite ?? tel.connectivite,
    divers: tr.divers ?? tel.divers,
    pointsForts: tr.pointsForts ?? tel.pointsForts,
    pointsFaibles: tr.pointsFaibles ?? tel.pointsFaibles,
    legendeImage: tr.legendeImage ?? tel.legendeImage,
  };
}

/** Le produit complet dans la langue choisie, avec repli français champ par champ. */
export function texteProduit(p: Produit, lang: Lang): Produit {
  const tr = trad(lang)?.produits[p.id];
  if (!tr) return p;
  return {
    ...p,
    categorie: tr.categorie ?? p.categorie,
    lancement: tr.lancement ?? p.lancement,
    accroche: tr.accroche ?? p.accroche,
    description: tr.description ?? p.description,
    innovation: tr.innovation ?? p.innovation,
    disponibilite: tr.disponibilite ?? p.disponibilite,
    legendeImage: tr.legendeImage ?? p.legendeImage,
  };
}

/** « 24 novembre 2026 » → la même date dans la langue choisie, via Intl. */
export function dateLisible(dateIso: string, lang: Lang): string {
  try {
    return new Intl.DateTimeFormat(LOCALES[lang], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${dateIso}T12:00:00`));
  } catch {
    return dateIso;
  }
}

/** « 4 min » → « 4 min » / « 4 Min. » / « 4 minit » selon la langue. */
export function dureeLecture(lecture: string, t: (cle: string) => string): string {
  const n = parseInt(lecture, 10);
  return Number.isNaN(n) ? lecture : `${n} ${t("min")}`;
}
