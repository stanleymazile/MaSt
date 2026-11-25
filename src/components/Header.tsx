import { useEffect, useState } from "react";
import { Menu, Search, User } from "lucide-react";
import { FIL_INFO, NAV_RUBRIQUES } from "../data/articles";
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

export default function Header({ rubrique, onRubrique, onMenu, onRecherche, onAccueil }: HeaderProps) {
  const [idxFil, setIdxFil] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdxFil((i) => (i + 1) % FIL_INFO.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[60] bg-accent text-white shadow-[0_1px_0_rgba(0,0,0,.25)]">
        <div className="mx-auto flex min-h-14 max-w-[1180px] items-center gap-2 px-3 py-1.5">
          <button type="button" className={btnIcone} onClick={onMenu} aria-label="Ouvrir le menu">
            <Menu size={26} strokeWidth={2.4} />
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onAccueil();
            }}
            aria-label="MaSt — retour à l'accueil"
            className="mx-auto px-1 py-1.5 no-underline min-[720px]:mx-0"
          >
            <LogoTexte avecBaseline />
          </a>
          <div className="ml-auto flex items-center gap-0.5">
            <button type="button" className={btnIcone} onClick={onRecherche} aria-label="Rechercher">
              <Search size={26} strokeWidth={2.4} />
            </button>
            <button type="button" className={btnIcone} onClick={onRecherche} aria-label="Mon compte">
              <User size={26} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-noir max-[719px]:hidden" aria-label="Rubriques">
        <div className="mx-auto flex max-w-[1180px] gap-1 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_RUBRIQUES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onRubrique(r.id)}
              className={`min-h-11 whitespace-nowrap border-b-4 px-3.5 py-3 font-display text-[14.5px] font-extrabold uppercase tracking-[0.4px] transition-colors ${
                rubrique === r.id
                  ? "border-accent-clair text-accent-clair"
                  : "border-transparent text-white hover:text-accent-clair"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-b border-bordure bg-fond-alt" aria-live="polite">
        <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-4 py-2">
          <span className="inline-flex flex-none items-center gap-1.5 rounded-[3px] bg-rouge px-[9px] py-1 font-display text-xs font-extrabold uppercase tracking-[1px] text-white">
            <span className="h-2 w-2 animate-clignote rounded-full bg-white motion-reduce:animate-none" />
            Le fil MaSt
          </span>
          <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14.5px] font-semibold">
            {FIL_INFO[idxFil]}
          </p>
        </div>
      </div>
    </>
  );
}
