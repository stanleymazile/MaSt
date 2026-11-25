import { useCallback, useEffect, useState } from "react";
import { ARTICLES, RUBRIQUES, SOUS_PAR_RUBRIQUE, SOUS_RUBRIQUES, TOP_IDS } from "./data/articles";
import { TELEPHONES } from "./data/telephones";
import {
  appliquerDonneesArticle,
  appliquerDonneesTelephone,
  appliquerSeo,
  cheminArticle,
  cheminRubrique,
  cheminSousRubrique,
  cheminTelephone,
  DESC_DEFAUT,
  retirerDonneesArticle,
  retirerDonneesTelephone,
  SITE_URL,
} from "./seo";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import SearchOverlay from "./components/SearchOverlay";
import Hero from "./components/Hero";
import ArticleCard from "./components/ArticleCard";
import FicheCard from "./components/FicheCard";
import TopLectures from "./components/TopLectures";
import Newsletter from "./components/Newsletter";
import ArticleView, { TitreSection } from "./components/ArticleView";
import TelephoneView, { TelephonesListe } from "./components/Telephones";
import ProduitsVitrine from "./components/Produits";
import Footer from "./components/Footer";
import Partager from "./components/Partager";
import { useLang } from "./i18n/lang";
import { texteArticle, texteTelephone } from "./i18n/contenu";

const RUBRIQUES_CARTES: { id: string; nom: string; desc: string }[] = [
  { id: "cine", nom: "Cinéma", desc: "Sorties, critiques et notes presse & spectateurs" },
  { id: "tech", nom: "Tech", desc: "Smartphones, objets connectés et innovations" },
  { id: "ia", nom: "IA", desc: "Modèles, agents et usages qui changent la donne" },
  { id: "sport", nom: "Sport", desc: "Foot, F1 et grands rendez-vous décryptés" },
  { id: "jeux", nom: "Jeux", desc: "GTA, consoles et les sorties qui comptent" },
  { id: "telephones", nom: "Téléphones", desc: "Les fiches caractéristiques des modèles récents, points forts et points faibles" },
  { id: "business", nom: "Business", desc: "Économie, bourse et les nouveaux produits qui innovent" },
];

/** Lit la route courante (/ , /rubrique/:id , /rubrique/:id/:sous , /article/:id , /telephone/:id) pour ouvrir directement la bonne vue. */
function lireRoute(): {
  rubrique: string;
  sousRubrique: string | null;
  articleId: string | null;
  telephoneId: string | null;
} {
  const p = window.location.pathname;
  const mTel = p.match(/^\/telephone\/([\w-]+)\/?$/);
  if (mTel && TELEPHONES.some((t) => t.id === mTel[1])) {
    return { rubrique: "telephones", sousRubrique: null, articleId: null, telephoneId: mTel[1] };
  }
  const mArt = p.match(/^\/article\/([\w-]+)\/?$/);
  if (mArt && ARTICLES.some((a) => a.id === mArt[1])) {
    const art = ARTICLES.find((a) => a.id === mArt[1])!;
    return { rubrique: art.rubrique, sousRubrique: art.branche ?? null, articleId: art.id, telephoneId: null };
  }
  const mRub = p.match(/^\/rubrique\/([\w-]+)(?:\/([\w-]+))?\/?$/);
  if (mRub && mRub[1] in RUBRIQUES) {
    const sous = mRub[2] && mRub[2] in SOUS_RUBRIQUES ? mRub[2] : null;
    return { rubrique: mRub[1], sousRubrique: sous, articleId: null, telephoneId: null };
  }
  return { rubrique: "toutes", sousRubrique: null, articleId: null, telephoneId: null };
}

function cheminVue(rubrique: string, sousRubrique: string | null): string {
  return sousRubrique ? cheminSousRubrique(rubrique, sousRubrique) : cheminRubrique(rubrique);
}

export default function App() {
  const [routeInitiale] = useState(lireRoute);
  const [rubrique, setRubrique] = useState(routeInitiale.rubrique);
  const [sousRubrique, setSousRubrique] = useState<string | null>(routeInitiale.sousRubrique);
  const [articleId, setArticleId] = useState<string | null>(routeInitiale.articleId);
  const [telephoneId, setTelephoneId] = useState<string | null>(routeInitiale.telephoneId);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [rechercheOuverte, setRechercheOuverte] = useState(false);
  const [notes, setNotes] = useState<Record<string, number>>({});

  const articleOuvert = articleId ? (ARTICLES.find((a) => a.id === articleId) ?? null) : null;
  const telephoneOuvert = telephoneId ? (TELEPHONES.find((t) => t.id === telephoneId) ?? null) : null;

  const defilerHaut = useCallback((fluide: boolean) => {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: fluide && !reduit ? "smooth" : "auto" });
  }, []);

  const allerRubrique = useCallback(
    (r: string, sous: string | null = null) => {
      setRubrique(r);
      setSousRubrique(sous);
      setArticleId(null);
      setTelephoneId(null);
      setMenuOuvert(false);
      window.history.pushState(null, "", cheminVue(r, sous));
      defilerHaut(true);
    },
    [defilerHaut],
  );

  const ouvrirArticle = useCallback(
    (id: string) => {
      setRechercheOuverte(false);
      setTelephoneId(null);
      setArticleId(id);
      window.history.pushState(null, "", cheminArticle(id));
      defilerHaut(false);
    },
    [defilerHaut],
  );

  const ouvrirTelephone = useCallback(
    (id: string) => {
      setRechercheOuverte(false);
      setArticleId(null);
      setRubrique("telephones");
      setSousRubrique(null);
      setTelephoneId(id);
      window.history.pushState(null, "", cheminTelephone(id));
      defilerHaut(false);
    },
    [defilerHaut],
  );

  const retourGrille = useCallback(() => {
    setArticleId(null);
    window.history.pushState(null, "", cheminVue(rubrique, sousRubrique));
    defilerHaut(true);
  }, [defilerHaut, rubrique, sousRubrique]);

  const retourTelephones = useCallback(() => {
    setTelephoneId(null);
    window.history.pushState(null, "", cheminRubrique("telephones"));
    defilerHaut(true);
  }, [defilerHaut]);

  /* Boutons précédent / suivant du navigateur */
  useEffect(() => {
    const onPop = () => {
      const r = lireRoute();
      setRubrique(r.rubrique);
      setSousRubrique(r.sousRubrique);
      setArticleId(r.articleId);
      setTelephoneId(r.telephoneId);
      defilerHaut(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [defilerHaut]);

  const { lang, t } = useLang();

  /* Titre, description et URL canonique propres à chaque vue, dans la langue choisie */
  useEffect(() => {
    if (telephoneOuvert) {
      const telT = texteTelephone(telephoneOuvert, lang);
      retirerDonneesArticle();
      appliquerSeo({
        titre: t("seo_telephone", { marque: telephoneOuvert.marque, modele: telephoneOuvert.modele }),
        description: t("seo_telephone_desc", {
          resume: telT.resume,
          marque: telephoneOuvert.marque,
          modele: telephoneOuvert.modele,
        }),
        chemin: cheminTelephone(telephoneOuvert.id),
        image: telephoneOuvert.imageUrl,
      });
      appliquerDonneesTelephone(telephoneOuvert);
    } else if (articleOuvert) {
      const txt = texteArticle(articleOuvert, lang);
      retirerDonneesTelephone();
      appliquerSeo({
        titre: `${txt.titre} — MaSt`,
        description: txt.chapo,
        chemin: cheminArticle(articleOuvert.id),
        type: "article",
        image: articleOuvert.imageUrl,
      });
      appliquerDonneesArticle(articleOuvert);
    } else if (sousRubrique) {
      retirerDonneesTelephone();
      retirerDonneesArticle();
      appliquerSeo({
        titre: t("seo_rubrique", { nom: t(`sous_${sousRubrique}`) }),
        description: t("seo_rubrique_desc", { nom: t(`sous_${sousRubrique}`) }),
        chemin: cheminSousRubrique(rubrique, sousRubrique),
      });
    } else if (rubrique !== "toutes") {
      retirerDonneesArticle();
      retirerDonneesTelephone();
      appliquerSeo(
        rubrique === "telephones"
          ? {
              titre: t("seo_telephones_titre"),
              description: t("seo_telephones_desc"),
              chemin: cheminRubrique(rubrique),
            }
          : {
              titre: t("seo_rubrique", { nom: t(`rub_${rubrique}`) }),
              description: t("seo_rubrique_desc", { nom: t(`rub_${rubrique}`) }),
              chemin: cheminRubrique(rubrique),
            },
      );
    } else {
      retirerDonneesArticle();
      retirerDonneesTelephone();
      appliquerSeo({ titre: t("seo_accueil_titre"), description: t("seo_accueil_desc"), chemin: "/" });
    }
  }, [articleOuvert, telephoneOuvert, rubrique, sousRubrique, lang, t]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOuvert(false);
        setRechercheOuverte(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const allerNewsletter = useCallback(() => {
    setArticleId(null);
    setTelephoneId(null);
    window.history.pushState(null, "", cheminVue(rubrique, sousRubrique));
    setTimeout(() => {
      document.getElementById("champ-email")?.focus({ preventScroll: false });
      document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }, [rubrique, sousRubrique]);

  const une = ARTICLES[0];
  const topArticles = TOP_IDS.map((id) => ARTICLES.find((a) => a.id === id)!).filter(Boolean);
  const grille = ARTICLES.filter(
    (a) =>
      (rubrique === "toutes" || a.rubrique === rubrique) && (!sousRubrique || a.branche === sousRubrique),
  );
  const titreGrille = sousRubrique
    ? t(`sous_${sousRubrique}`)
    : rubrique === "toutes"
      ? t("dernieres_news")
      : t(`rub_${rubrique}`);
  const estVitrineProduits = rubrique === "business" && sousRubrique === "nouveaux-produits";
  const partageUrl = SITE_URL + (rubrique === "toutes" ? "/" : cheminVue(rubrique, sousRubrique));
  const partageTitre =
    rubrique === "toutes"
      ? t("seo_accueil_titre")
      : rubrique === "telephones" && !sousRubrique
        ? t("seo_telephones_titre")
        : t("seo_rubrique", { nom: titreGrille });
  const puceClasse = (actif: boolean) =>
    `inline-flex min-h-9 items-center rounded-full px-3.5 font-display text-[13px] font-bold uppercase tracking-[0.4px] no-underline transition-colors ${
      actif ? "bg-accent text-white" : "bg-fond-alt text-texte hover:text-accent"
    }`;

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        rubrique={rubrique}
        onRubrique={allerRubrique}
        onMenu={() => setMenuOuvert(true)}
        onRecherche={() => setRechercheOuverte(true)}
        onAccueil={() => allerRubrique("toutes")}
      />
      <SideMenu ouvert={menuOuvert} onFermer={() => setMenuOuvert(false)} onRubrique={allerRubrique} />
      <SearchOverlay
        ouvert={rechercheOuverte}
        onFermer={() => setRechercheOuverte(false)}
        onOuvrirArticle={ouvrirArticle}
      />

      <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 pb-14">
        {telephoneOuvert ? (
          <TelephoneView
            key={telephoneOuvert.id}
            tel={telephoneOuvert}
            onRetour={retourTelephones}
            onAccueil={() => allerRubrique("toutes")}
            onOuvrir={ouvrirTelephone}
          />
        ) : articleOuvert ? (
          <ArticleView
            key={articleOuvert.id}
            article={articleOuvert}
            note={notes[articleOuvert.id] ?? 0}
            onNoter={(id, n) => setNotes((prev) => ({ ...prev, [id]: n }))}
            onRetour={retourGrille}
            onAccueil={() => allerRubrique("toutes")}
            onOuvrir={ouvrirArticle}
          />
        ) : (
          <>
            {rubrique === "toutes" && <Hero article={une} onOuvrir={ouvrirArticle} />}

            <div className="flex justify-end pt-4">
              <Partager titre={partageTitre} url={partageUrl} />
            </div>

            <div className="mt-2 grid grid-cols-1 gap-7 min-[980px]:grid-cols-[1fr_330px]">
              <div>
                {SOUS_PAR_RUBRIQUE[rubrique] && (
                  <div className="flex flex-wrap gap-2 pt-5">
                    <a
                      href={cheminRubrique(rubrique)}
                      onClick={(e) => {
                        e.preventDefault();
                        allerRubrique(rubrique);
                      }}
                      className={puceClasse(!sousRubrique)}
                    >
                      {t("tous")}
                    </a>
                    {SOUS_PAR_RUBRIQUE[rubrique].map((s) => (
                      <a
                        key={s.id}
                        href={cheminSousRubrique(rubrique, s.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          allerRubrique(rubrique, s.id);
                        }}
                        className={puceClasse(sousRubrique === s.id)}
                      >
                        {t(`sous_${s.id}`)}
                      </a>
                    ))}
                  </div>
                )}
                {rubrique === "telephones" ? (
                  <TelephonesListe onOuvrir={ouvrirTelephone} />
                ) : (
                  <>
                    <TitreSection
                      action={
                        <button
                          type="button"
                          onClick={() => allerRubrique("toutes")}
                          className="inline-flex min-h-9 items-center font-display text-[13.5px] font-bold normal-case tracking-normal underline decoration-accent decoration-[3px]"
                        >
                          {t("tout_voir")}
                        </button>
                      }
                    >
                      {titreGrille}
                    </TitreSection>
                    {estVitrineProduits ? (
                      <ProduitsVitrine />
                    ) : grille.length > 0 ? (
                      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
                        {grille.map((a) => (
                          <ArticleCard key={a.id} article={a} onOuvrir={ouvrirArticle} />
                        ))}
                      </div>
                    ) : (
                      <p className="py-[26px] text-texte-doux">{t("aucun_article")}</p>
                    )}
                  </>
                )}
              </div>
              <aside className="pt-0 min-[980px]:pt-[92px]">
                <TopLectures articles={topArticles} onOuvrir={ouvrirArticle} />
              </aside>
            </div>

            {rubrique === "toutes" && texteArticle(une, lang).fiche && (
              <>
                <TitreSection>{t("verdict_section")}</TitreSection>
                <FicheCard fiche={texteArticle(une, lang).fiche!} />
              </>
            )}

            {rubrique === "toutes" && (
              <>
                <TitreSection>{t("explorer")}</TitreSection>
                <div className="grid grid-cols-2 gap-4 min-[860px]:grid-cols-4">
              {RUBRIQUES_CARTES.map((r) => (
                <a
                  key={r.id}
                  href={cheminRubrique(r.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    allerRubrique(r.id);
                  }}
                  className="flex min-h-[118px] flex-col gap-1.5 rounded-lg bg-noir p-[20px_18px] text-white no-underline transition-colors hover:bg-anthracite"
                >
                  <span className="font-display text-[23px] font-black uppercase text-accent-clair">{t(`rub_${r.id}`)}</span>
                  <span className="text-[13.5px] text-[#d8d8d8]">{t(`carte_${r.id}`)}</span>
                </a>
              ))}
                </div>
              </>
            )}

            <Newsletter />
          </>
        )}
      </main>

      <Footer onRubrique={allerRubrique} onNewsletter={allerNewsletter} />
    </div>
  );
}
