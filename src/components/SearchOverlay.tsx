import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ARTICLES } from "../data/articles";

interface SearchOverlayProps {
  ouvert: boolean;
  onFermer: () => void;
  onOuvrirArticle: (id: string) => void;
}

export default function SearchOverlay({ ouvert, onFermer, onOuvrirArticle }: SearchOverlayProps) {
  const [q, setQ] = useState("");
  const champRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ouvert) {
      setQ("");
      const t = setTimeout(() => champRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [ouvert]);

  if (!ouvert) return null;

  const requete = q.trim().toLowerCase();
  const liste = ARTICLES.filter(
    (a) => !requete || `${a.titre} ${a.chapo} ${a.tag}`.toLowerCase().includes(requete),
  );

  return (
    <div className="fixed inset-0 z-[95] flex flex-col bg-fond" role="dialog" aria-label="Recherche">
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-[22px]">
        <div className="flex items-center gap-2.5">
          <input
            ref={champRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un film, une série, un sujet…"
            aria-label="Votre recherche"
            className="min-h-[52px] flex-1 rounded-md border-2 border-noir bg-carte px-4 py-[13px] text-xl text-texte dark:border-accent-clair"
          />
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la recherche"
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-bordure transition-colors hover:bg-black/[0.08] dark:hover:bg-white/10"
          >
            <X size={26} strokeWidth={2.4} />
          </button>
        </div>
        <div className="overflow-y-auto pb-10">
          {liste.length > 0 ? (
            liste.map((a) => (
              <a
                key={a.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOuvrirArticle(a.id);
                }}
                className="flex items-center gap-3.5 border-b border-bordure py-3.5 no-underline"
              >
                <img src={a.image} alt="" className="h-[70px] w-[104px] flex-none rounded object-cover" />
                <span>
                  <span className="inline-block w-fit rounded-[3px] bg-accent px-[9px] py-1 font-display text-xs font-extrabold uppercase tracking-[0.8px] text-white">
                    {a.tag}
                  </span>
                  <h3 className="m-0 mt-1 text-[17px] leading-[1.3]">{a.titre}</h3>
                  <span className="text-[13px] text-texte-doux">{a.date}</span>
                </span>
              </a>
            ))
          ) : (
            <p className="py-[26px] text-texte-doux">
              Aucun résultat pour « {q} ». Essayez « Jackal », « IA », « F1 »…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
