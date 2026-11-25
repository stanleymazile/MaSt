import { ChevronRight, X } from "lucide-react";
import { NAV_RUBRIQUES } from "../data/articles";
import { LogoTexte } from "./Logo";

interface SideMenuProps {
  ouvert: boolean;
  onFermer: () => void;
  onRubrique: (r: string) => void;
}

export default function SideMenu({ ouvert, onFermer, onRubrique }: SideMenuProps) {
  return (
    <>
      <div
        onClick={onFermer}
        className={`fixed inset-0 z-[80] bg-black/55 transition-opacity duration-300 ${
          ouvert ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Menu principal"
        className={`fixed bottom-0 left-0 top-0 z-[90] flex w-[min(400px,88vw)] flex-col overflow-y-auto bg-[#262626] text-white transition-transform duration-300 ${
          ouvert ? "translate-x-0" : "-translate-x-[102%]"
        }`}
      >
        <div className="flex min-h-14 items-center bg-accent px-3 py-1.5">
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer le menu"
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full transition-colors hover:bg-white/[0.18]"
          >
            <X size={26} strokeWidth={2.4} />
          </button>
          <span className="mx-auto">
            <LogoTexte />
          </span>
          <span className="w-11 flex-none" />
        </div>
        <nav className="py-2.5 pb-6">
          {NAV_RUBRIQUES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onRubrique(r.id)}
              className={`flex min-h-[52px] w-full items-center justify-between px-[22px] py-[15px] text-left font-display text-[19px] font-extrabold uppercase tracking-[0.3px] transition-colors hover:bg-white/[0.06] ${
                r.id === "toutes" ? "text-accent-clair" : "text-white"
              }`}
            >
              {r.label}
              <ChevronRight size={20} strokeWidth={2.4} className="opacity-85" />
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-[#3d3d3d] px-[22px] py-[18px] text-[13.5px] text-[#bdbdbd]">
          MaSt — l'actualité ciné, tech, IA et sport, sélectionnée et décryptée chaque jour.
        </div>
      </aside>
    </>
  );
}
