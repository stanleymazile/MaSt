import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { TELEPHONES } from "../data/telephones";
import { cheminArticle, cheminTelephone } from "../seo";
import { useLang } from "../i18n/lang";
import { dateLisible, texteArticle } from "../i18n/contenu";

interface SearchOverlayProps {
  ouvert: boolean;
  onFermer: () => void;
  onOuvrirArticle: (id: string) => void;
  onOuvrirTelephone: (id: string) => void;
}

export default function SearchOverlay({ ouvert, onFermer, onOuvrirArticle, onOuvrirTelephone }: SearchOverlayProps) {
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const champRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ouvert) {
      setQ("");
      const id = setTimeout(() => champRef.current?.focus(), 30);
      return () => clearTimeout(id);
    }
  }, [ouvert]);

  if (!ouvert) return null;

  const requete = q.trim().toLowerCase();
  const liste = ARTICLES.filter((a) => {
    if (!requete) return true;
    const fr = `${a.titre} ${a.chapo} ${a.tag}`.toLowerCase();
    const tr = texteArticle(a, lang);
    const autre = `${tr.titre} ${tr.chapo} ${tr.tag}`.toLowerCase();
    return fr.includes(requete) || autre.includes(requete);
  });
  // Les fiches téléphones sont aussi cherchables (par marque, modèle ou résumé).
  const listeTels = requete
    ? TELEPHONES.filter((tel) => `${tel.marque} ${tel.modele} ${tel.resume}`.toLowerCase().includes(requete))
    : [];

  return (
    <div className="fixed inset-0 z-[95] flex flex-col bg-fond" role="dialog" aria-label={t("rech_titre")}>
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-[22px]">
        <div className="flex items-center gap-2.5">
          <input
            ref={champRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("rech_placeholder")}
            aria-label={t("rech_label")}
            className="min-h-[52px] flex-1 rounded-md border-2 border-noir bg-carte px-4 py-[13px] text-xl text-texte dark:border-accent-clair"
          />
          <button
            type="button"
            onClick={onFermer}
            aria-label={t("rech_fermer")}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-bordure transition-colors hover:bg-black/[0.08] dark:hover:bg-white/10"
          >
            <X size={26} strokeWidth={2.4} />
          </button>
        </div>
        <div className="overflow-y-auto pb-10">
          {listeTels.map((tel) => (
            <a
              key={tel.id}
              href={cheminTelephone(tel.id)}
              onClick={(e) => {
                e.preventDefault();
                onOuvrirTelephone(tel.id);
              }}
              className="flex items-center gap-3.5 border-b border-bordure py-3.5 no-underline"
            >
              <img src={tel.image} alt="" className="h-[70px] w-[104px] flex-none rounded object-cover" />
              <span>
                <span className="inline-block w-fit rounded-[3px] bg-accent px-[9px] py-1 font-display text-xs font-extrabold uppercase tracking-[0.8px] text-white">
                  {t("rub_telephones")}
                </span>
                <h3 className="m-0 mt-1 text-[17px] leading-[1.3]">
                  {tel.marque} {tel.modele}
                </h3>
                <span className="text-[13px] text-texte-doux">{tel.prix}</span>
              </span>
            </a>
          ))}
          {liste.length > 0 ? (
            liste.map((a) => {
              const tr = texteArticle(a, lang);
              return (
                <a
                  key={a.id}
                  href={cheminArticle(a.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    onOuvrirArticle(a.id);
                  }}
                  className="flex items-center gap-3.5 border-b border-bordure py-3.5 no-underline"
                >
                  <img src={a.image} alt="" className="h-[70px] w-[104px] flex-none rounded object-cover" />
                  <span>
                    <span className="inline-block w-fit rounded-[3px] bg-accent px-[9px] py-1 font-display text-xs font-extrabold uppercase tracking-[0.8px] text-white">
                      {tr.tag}
                    </span>
                    <h3 className="m-0 mt-1 text-[17px] leading-[1.3]">{tr.titre}</h3>
                    <span className="text-[13px] text-texte-doux">{dateLisible(a.dateIso, lang)}</span>
                  </span>
                </a>
              );
            })
          ) : listeTels.length === 0 ? (
            <p className="py-[26px] text-texte-doux">{t("rech_aucun", { q })}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
