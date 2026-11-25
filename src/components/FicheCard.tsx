import type { Fiche } from "../data/articles";

export function Etoiles({ note }: { note: number }) {
  const pleines = Math.round(note);
  return (
    <span className="text-[15px] leading-none tracking-[2px] text-accent-fonce dark:text-accent-clair" aria-label={`${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= pleines ? undefined : "text-[#c9c9c4] dark:text-[#55554f]"}>
          ★
        </span>
      ))}
    </span>
  );
}

function NoteBox({ libelle, valeur }: { libelle: string; valeur: number }) {
  return (
    <div className="min-w-[108px] rounded-md border border-bordure bg-fond px-3.5 py-2 text-center">
      <div className="text-[12.5px] font-semibold text-texte-doux">{libelle}</div>
      <div className="font-display text-2xl font-black leading-[1.1]">{String(valeur).replace(".", ",")}</div>
      <Etoiles note={valeur} />
    </div>
  );
}

export default function FicheCard({ fiche }: { fiche: Fiche }) {
  return (
    <div className="flex gap-4 rounded-lg border border-bordure bg-carte p-4 shadow-carte">
      <img
        src={fiche.affiche}
        alt={`Affiche de ${fiche.titre}`}
        className="h-[156px] w-[104px] flex-none rounded object-cover"
      />
      <div>
        <h3 className="m-0 mb-1 text-[19px] font-extrabold">{fiche.titre}</h3>
        <p className="m-0 mb-3 text-sm text-texte-doux">
          Sortie : <strong className="text-texte">{fiche.sortie}</strong>
          <br />
          {fiche.detail}
          <br />
          Avec <strong className="text-texte">{fiche.casting}</strong>
        </p>
        <div className="flex flex-wrap gap-3">
          <NoteBox libelle="Presse" valeur={fiche.presse} />
          <NoteBox libelle="Spectateurs" valeur={fiche.spectateurs} />
        </div>
      </div>
    </div>
  );
}
