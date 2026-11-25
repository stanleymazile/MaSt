import { Zap } from "lucide-react";
import type { Fiche } from "../data/articles";

/**
 * « Le Verdict MaSt » — le format signature de MaSt pour présenter un film ou une série.
 * Volontairement différent des fiches à étoiles façon AlloCiné : carte sombre aux couleurs
 * MaSt, notes Presse / Public en jauges violettes, « chiffre qui parle » et verdict de la rédaction.
 */
function Jauge({ libelle, valeur }: { libelle: string; valeur: number }) {
  const pct = Math.max(0, Math.min(100, (valeur / 5) * 100));
  return (
    <div className="min-w-[150px] flex-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-[12px] font-extrabold uppercase tracking-[1px] text-[#bdbdbd]">
          {libelle}
        </span>
        <span className="font-display text-[22px] font-black leading-none text-white">
          {String(valeur).replace(".", ",")}
          <span className="text-[13px] font-bold text-[#bdbdbd]"> /5</span>
        </span>
      </div>
      <div
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.16]"
        role="img"
        aria-label={`${libelle} : ${String(valeur).replace(".", ",")} sur 5`}
      >
        <div className="h-full rounded-full bg-accent-clair" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function FicheCard({ fiche }: { fiche: Fiche }) {
  return (
    <div className="overflow-hidden rounded-lg bg-noir text-white shadow-carte">
      <div className="flex items-center gap-2 bg-accent px-4 py-2">
        <Zap size={17} strokeWidth={2.6} className="flex-none" />
        <span className="font-display text-[14px] font-black uppercase tracking-[1.2px]">Le Verdict MaSt</span>
      </div>
      <div className="flex gap-4 p-4 pb-3">
        <img
          src={fiche.affiche}
          alt={`Visuel de ${fiche.titre}`}
          className="h-[156px] w-[104px] flex-none rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="m-0 mb-1 text-[19px] font-extrabold leading-snug">{fiche.titre}</h3>
          <p className="m-0 mb-3.5 text-sm leading-relaxed text-[#c9c9c9]">
            Sortie : <strong className="text-white">{fiche.sortie}</strong>
            <br />
            {fiche.detail}
            <br />
            Avec <strong className="text-white">{fiche.casting}</strong>
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Jauge libelle="Presse" valeur={fiche.presse} />
            <Jauge libelle="Public" valeur={fiche.spectateurs} />
          </div>
        </div>
      </div>
      {fiche.buzz && (
        <div className="mx-4 mb-3 flex items-start gap-2.5 rounded-md bg-white/[0.09] px-3.5 py-2.5">
          <Zap size={16} strokeWidth={2.6} className="mt-0.5 flex-none text-accent-clair" />
          <p className="m-0 text-[14px] leading-snug">
            <span className="font-display text-[11.5px] font-extrabold uppercase tracking-[1px] text-accent-clair">
              Le chiffre qui parle&nbsp;&nbsp;
            </span>
            <strong>{fiche.buzz}</strong>
          </p>
        </div>
      )}
      {fiche.verdict && (
        <p className="m-0 px-4 pb-4 text-[14.5px] italic leading-relaxed text-[#e6e6e6]">
          « {fiche.verdict} » <span className="whitespace-nowrap not-italic text-[#bdbdbd]">— La rédaction MaSt</span>
        </p>
      )}
    </div>
  );
}
