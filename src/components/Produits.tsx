import { Lightbulb, Package, Tag as TagIcon } from "lucide-react";
import { PRODUITS, type Produit } from "../data/produits";

function CarteProduit({ p }: { p: Produit }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-bordure bg-carte shadow-carte">
      {p.image ? (
        <img src={p.image} alt={p.nom} className="h-[170px] w-full object-cover" />
      ) : (
        <div
          className="flex h-[170px] w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-anthracite to-noir text-white"
          aria-hidden="true"
        >
          <Package size={40} strokeWidth={1.6} />
          <span className="px-3 text-center font-display text-[14px] font-black uppercase tracking-[0.5px]">
            {p.marque}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.6px] text-white">
            <TagIcon size={11} strokeWidth={2.6} />
            Nouveau
          </span>
          <span className="font-display text-[12px] font-extrabold uppercase tracking-[0.8px] text-accent-fonce dark:text-accent-clair">
            {p.categorie}
          </span>
        </div>
        <h3 className="m-0 font-display text-[19px] font-black leading-tight">
          {p.nom} <span className="text-[15px] font-bold text-texte-doux">· {p.marque}</span>
        </h3>
        <p className="m-0 font-display text-[16.5px] font-extrabold leading-snug text-accent-fonce dark:text-accent-clair">
          {p.accroche}
        </p>
        <p className="m-0 text-[14px] leading-relaxed text-texte-doux">{p.description}</p>
        <p className="m-0 flex items-start gap-1.5 text-[13.5px] leading-snug">
          <Lightbulb size={15} strokeWidth={2.4} className="mt-0.5 flex-none text-accent-fonce dark:text-accent-clair" />
          <span>
            <strong>L’innovation :</strong> {p.innovation}
          </span>
        </p>
        <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-bordure pt-3">
          <span className="font-display text-[17px] font-black">{p.prix}</span>
          <span className="text-right text-[12.5px] text-texte-doux">
            Lancement : {p.lancement}
            <br />
            {p.disponibilite}
          </span>
        </div>
        {p.legendeImage && <p className="m-0 text-[12px] text-texte-doux">{p.legendeImage}</p>}
      </div>
    </article>
  );
}

export default function ProduitsVitrine() {
  if (PRODUITS.length === 0) {
    return <p className="py-[26px] text-texte-doux">Les premières annonces arrivent très bientôt.</p>;
  }
  return (
    <div>
      <p className="mb-6 max-w-[720px] text-[15.5px] leading-relaxed text-texte-doux">
        Les nouveautés qui comptent, toutes catégories confondues : des produits récents et innovants, présentés en
        petites annonces — ce qu’ils font, ce qu’ils changent, et combien ils coûtent.
      </p>
      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
        {PRODUITS.map((p) => (
          <CarteProduit key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
