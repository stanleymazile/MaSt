import { useCallback, useEffect, useState } from "react";
import { ARTICLES, RUBRIQUES, TOP_IDS } from "./data/articles";
import { appliquerSeo, cheminArticle, cheminRubrique, DESC_DEFAUT } from "./seo";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import SearchOverlay from "./components/SearchOverlay";
import Hero from "./components/Hero";
import ArticleCard from "./components/ArticleCard";
import FicheCard from "./components/FicheCard";
import TopLectures from "./components/TopLectures";
import Newsletter from "./components/Newsletter";
import ArticleView, { TitreSection } from "./components/ArticleView";
import Footer from "./components/Footer";

const RUBRIQUES_CARTES: { id: string; nom: string; desc: string }[] = [
  { id: "cine", nom: "Cinéma", desc: "Sorties, critiques et notes presse & spectateurs" },
  { id: "tech", nom: "Tech", desc: "Smartphones, objets connectés et innovations" },
  { id: "ia", nom: "IA", desc: "Modèles, agents et usages qui changent la donne" },
  { id: "sport", nom: "Sport", desc: "Foot, F1 et grands rendez-vous décryptés" },
];

/** Lit la route courante (/ , /rubrique/:id , /article/:id) pour ouvrir directement la bonne vue. */
function lireRoute(): { rubrique: string; articleId: string | null } {
  const p = window.location.pathname;
  const mArt = p.match(/^\/article\/([\w-]+)\/?$/);
  if (mArt && ARTICLES.some((a) => a.id === mArt[1])) {
    const art = ARTICLES.find((a) => a.id === mArt[1])!;
    return { rubrique: art.rubrique, articleId: art.id };
  }
  const mRub = p.match(/^\/rubrique\/([\w-]+)\/?$/);
  if (mRub && mRub[1] in RUBRIQUES) return { rubrique: mRub[1], articleId: null };
  return { rubrique: "toutes", articleId: null };
}

export default function App() {
  const [routeInitiale] = useState(lireRoute);
  const [rubrique, setRubrique] = useState(routeInitiale.rubrique);
  const [articleId, setArticleId] = useState<string | null>(routeInitiale.articleId);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [rechercheOuverte, setRechercheOuverte] = useState(false);
  const [notes, setNotes] = useState<Record<string, number>>({});

  const articleOuvert = articleId ? (ARTICLES.find((a) => a.id === articleId) ?? null) : null;

  const defilerHaut = useCallback((fluide: boolean) => {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: fluide && !reduit ? "smooth" : "auto" });
  }, []);

  const allerRubrique = useCallback(
    (r: string) => {
      setRubrique(r);
      setArticleId(null);
      setMenuOuvert(false);
      window.history.pushState(null, "", cheminRubrique(r));
      defilerHaut(true);
    },
    [defilerHaut],
  );

  const ouvrirArticle = useCallback(
    (id: string) => {
      setRechercheOuverte(false);
      setArticleId(id);
      window.history.pushState(null, "", cheminArticle(id));
      defilerHaut(false);
    },
    [defilerHaut],
  );

  const retourGrille = useCallback(() => {
    setArticleId(null);
    window.history.pushState(null, "", cheminRubrique(rubrique));
    defilerHaut(true);
  }, [defilerHaut, rubrique]);

  /* Boutons précédent / suivant du navigateur */
  useEffect(() => {
    const onPop = () => {
      const r = lireRoute();
      setRubrique(r.rubrique);
      setArticleId(r.articleId);
      defilerHaut(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [defilerHaut]);

  /* Titre, description et URL canonique propres à chaque vue */
  useEffect(() => {
    if (articleOuvert) {
      appliquerSeo({
        titre: `${articleOuvert.titre} — MaSt`,
        description: articleOuvert.chapo,
        chemin: cheminArticle(articleOuvert.id),
        type: "article",
      });
    } else if (rubrique !== "toutes") {
      appliquerSeo({
        titre: `${RUBRIQUES[rubrique]} — actualité et décryptages | MaSt`,
        description: `Toute l'actualité ${RUBRIQUES[rubrique]} sur MaSt : news, décryptages et analyses, sélectionnés et vérifiés chaque jour.`,
        chemin: cheminRubrique(rubrique),
      });
    } else {
      appliquerSeo({ titre: "MaSt — Ciné, Tech, IA & Sport", description: DESC_DEFAUT, chemin: "/" });
    }
  }, [articleOuvert, rubrique]);

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
    window.history.pushState(null, "", cheminRubrique(rubrique));
    setTimeout(() => {
      document.getElementById("champ-email")?.focus({ preventScroll: false });
      document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }, [rubrique]);

  const une = ARTICLES[0];
  const topArticles = TOP_IDS.map((id) => ARTICLES.find((a) => a.id === id)!).filter(Boolean);
  const grille = ARTICLES.filter((a) => rubrique === "toutes" || a.rubrique === rubrique);
  const titreGrille = rubrique === "toutes" ? "Dernières news" : RUBRIQUES[rubrique];

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
        {articleOuvert ? (
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
            <Hero article={une} onOuvrir={ouvrirArticle} />

            <div className="mt-2 grid grid-cols-1 gap-7 min-[980px]:grid-cols-[1fr_330px]">
              <div>
                <TitreSection
                  action={
                    <button
                      type="button"
                      onClick={() => allerRubrique("toutes")}
                      className="inline-flex min-h-9 items-center font-display text-[13.5px] font-bold normal-case tracking-normal underline decoration-accent decoration-[3px]"
                    >
                      Tout voir
                    </button>
                  }
                >
                  {titreGrille}
                </TitreSection>
                {grille.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
                    {grille.map((a) => (
                      <ArticleCard key={a.id} article={a} onOuvrir={ouvrirArticle} />
                    ))}
                  </div>
                ) : (
                  <p className="py-[26px] text-texte-doux">Aucun article dans cette rubrique pour le moment.</p>
                )}
              </div>
              <aside className="pt-0 min-[980px]:pt-[92px]">
                <TopLectures articles={topArticles} onOuvrir={ouvrirArticle} />
              </aside>
            </div>

            {une.fiche && (
              <>
                <TitreSection>La fiche du moment</TitreSection>
                <FicheCard fiche={une.fiche} />
              </>
            )}

            <TitreSection>Explorer MaSt</TitreSection>
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
                  <span className="font-display text-[23px] font-black uppercase text-accent-clair">{r.nom}</span>
                  <span className="text-[13.5px] text-[#d8d8d8]">{r.desc}</span>
                </a>
              ))}
            </div>

            <Newsletter />
          </>
        )}
      </main>

      <Footer onRubrique={allerRubrique} onNewsletter={allerNewsletter} />
    </div>
  );
}
