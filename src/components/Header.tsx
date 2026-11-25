import { useEffect, useState } from "react";
import { Check, Languages, Menu, Search, User } from "lucide-react";
import { NAV_RUBRIQUES } from "../data/articles";
import { cheminRubrique } from "../seo";
import { LANGS, useLang } from "../i18n/lang";
import { filInfo } from "../i18n/contenu";
import { LogoTexte } from "./Logo";

interface HeaderProps {
  rubrique: string;
  onRubrique: (r: string) => void;
  onMenu: () => void;
  onRecherche: () => void;
  onAccueil: () => void;
}

const btnIcone =
  "inline-flex h-11 w-11 flex-none items-center justify-center rounded-full text-inherit transition-colors hover:bg-white/[0.18]";

/** Bouton langue de l'en-tête : menu déroulant avec les 7 langues du site. */
function BoutonLangue() {
  const { lang, setLang, t } = useLang();
  const [ouvert, setOuvert] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        className={btnIcone}
        onClick={() => setOuvert((o) => !o)}
        aria-label={t("langue")}
        aria-expanded={ouvert}
      >
        <Languages size={24} strokeWidth={2.2} />
      </button>
      {ouvert && (
        <>
          <div className="fixed inset-0 z-[65]" onClick={() => setOuvert(false)} aria-hidden="true" />
          <ul className="absolute right-0 z-[70] m-0 mt-1 w-52 list-none overflow-hidden rounded-lg border border-bordure bg-carte p-1 text-texte shadow-carte">
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l.code);
                    setOuvert(false);
                  }}
                  className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-[15px] transition-colors hover:bg-fond-alt ${
                    lang === l.code ? "font-bold text-accent-fonce dark:text-accent-clair" : ""
                  }`}
                  aria-current={lang === l.code ? "true" : undefined}
                >
                  <span>
                    {l.label} <span className="text-texte-doux">· {l.court}</span>
                  </span>
                  {lang === l.code && <Check size={17} strokeWidth={2.6} />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function Header({ rubrique, onRubrique, onMenu, onRecherche, onAccueil }: HeaderProps) {
  const { lang, t } = useLang();
  const lignes = filInfo(lang);
  const [idxFil, setIdxFil] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdxFil((i) => i + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[60] bg-accent text-white shadow-[0_1px_0_rgba(0,0,0,.25)]">
        <div className="mx-auto flex min-h-14 max-w-[1180px] items-center gap-2 px-3 py-1.5">
          <button type="button" className={btnIcone} onClick={onMenu} aria-label={t("ouvrir_menu")}>
            <Menu size={26} strokeWidth={2.4} />
          </button>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onAccueil();
            }}
            aria-label={t("retour_accueil")}
            className="mx-auto px-1 py-1.5 no-underline min-[720px]:mx-0"
          >
            <LogoTexte avecBaseline />
          </a>
          <div className="ml-auto flex items-center gap-0.5">
            <BoutonLangue />
            <button type="button" className={btnIcone} onClick={onRecherche} aria-label={t("rechercher")}>
              <Search size={26} strokeWidth={2.4} />
            </button>
            <button type="button" className={btnIcone} onClick={onRecherche} aria-label={t("mon_compte")}>
              <User size={26} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-noir max-[719px]:hidden" aria-label={t("rubriques")}>
        <div className="mx-auto flex max-w-[1180px] gap-1 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_RUBRIQUES.map((r) => (
            <a
              key={r.id}
              href={cheminRubrique(r.id)}
              onClick={(e) => {
                e.preventDefault();
                onRubrique(r.id);
              }}
              className={`flex min-h-11 items-center whitespace-nowrap border-b-4 px-3.5 py-3 font-display text-[14.5px] font-extrabold uppercase tracking-[0.4px] no-underline transition-colors ${
                rubrique === r.id
                  ? "border-accent-clair text-accent-clair"
                  : "border-transparent text-white hover:text-accent-clair"
              }`}
            >
              {t(`rub_${r.id}`)}
            </a>
          ))}
        </div>
      </nav>

      <div className="border-b border-bordure bg-fond-alt" aria-live="polite">
        <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-4 py-2">
          <span className="inline-flex flex-none items-center gap-1.5 rounded-[3px] bg-rouge px-[9px] py-1 font-display text-xs font-extrabold uppercase tracking-[1px] text-white">
            <span className="h-2 w-2 animate-clignote rounded-full bg-white motion-reduce:animate-none" />
            {t("fil_mast")}
          </span>
          <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14.5px] font-semibold">
            {lignes[idxFil % lignes.length]}
          </p>
        </div>
      </div>
    </>
  );
}
