import { useState } from "react";
import { ChevronRight, Minus, Plus, X } from "lucide-react";
import { NAV_RUBRIQUES, SOUS_PAR_RUBRIQUE } from "../data/articles";
import { useLang } from "../i18n/lang";
import { LogoTexte } from "./Logo";

interface SideMenuProps {
  ouvert: boolean;
  onFermer: () => void;
  onRubrique: (r: string, sous?: string | null) => void;
}

export default function SideMenu({ ouvert, onFermer, onRubrique }: SideMenuProps) {
  const { t } = useLang();
  // Sous-catégories refermées par défaut : l'utilisateur les ouvre lui-même, catégorie par catégorie.
  const [ouvertes, setOuvertes] = useState<Record<string, boolean>>({});
  const basculer = (id: string) => setOuvertes((prev) => ({ ...prev, [id]: !prev[id] }));
  return (
    <>
      <div
        onClick={onFermer}
        className={`fixed inset-0 z-[80] bg-black/55 transition-opacity duration-300 ${
          ouvert ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label={t("menu_principal")}
        className={`fixed bottom-0 left-0 top-0 z-[90] flex w-[min(400px,88vw)] flex-col overflow-y-auto bg-[#262626] text-white transition-transform duration-300 ${
          ouvert ? "translate-x-0" : "-translate-x-[102%]"
        }`}
      >
        <div className="flex min-h-14 items-center bg-accent px-3 py-1.5">
          <button
            type="button"
            onClick={onFermer}
            aria-label={t("fermer_menu")}
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
          {NAV_RUBRIQUES.map((r) => {
            const subs = SOUS_PAR_RUBRIQUE[r.id];
            const deplie = !!ouvertes[r.id];
            return (
              <div key={r.id}>
                <div className="flex items-stretch">
                  <button
                    type="button"
                    onClick={() => onRubrique(r.id)}
                    className={`flex min-h-[52px] flex-1 items-center px-[22px] py-[15px] text-left font-display text-[19px] font-extrabold uppercase tracking-[0.3px] transition-colors hover:bg-white/[0.06] ${
                      r.id === "toutes" ? "text-accent-clair" : "text-white"
                    }`}
                  >
                    {t(`rub_${r.id}`)}
                  </button>
                  {subs ? (
                    <button
                      type="button"
                      onClick={() => basculer(r.id)}
                      aria-expanded={deplie}
                      aria-label={t(`rub_${r.id}`)}
                      className="flex w-[52px] flex-none items-center justify-center text-white transition-colors hover:bg-white/[0.06]"
                    >
                      {deplie ? <Minus size={20} strokeWidth={2.4} /> : <Plus size={20} strokeWidth={2.4} />}
                    </button>
                  ) : (
                    <span className="flex w-[52px] flex-none items-center justify-center text-white">
                      <ChevronRight size={20} strokeWidth={2.4} className="opacity-85" />
                    </span>
                  )}
                </div>
                {subs && deplie && (
                  <div className="mb-1.5 ml-[22px] border-l-2 border-accent/60">
                    {subs.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => onRubrique(r.id, s.id)}
                        className="flex min-h-[42px] w-full items-center py-2 pl-4 pr-[22px] text-left text-[15.5px] font-semibold text-[#d8d8d8] transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        {t(`sous_${s.id}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-[#3d3d3d] px-[22px] py-[18px] text-[13.5px] text-[#bdbdbd]">
          {t("menu_baseline")}
        </div>
      </aside>
    </>
  );
}
