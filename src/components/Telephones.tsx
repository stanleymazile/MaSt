import { ArrowLeft, Check, Minus, Smartphone } from "lucide-react";
import { TELEPHONES, type Telephone } from "../data/telephones";
import { cheminTelephone } from "../seo";
import { TitreSection } from "./ArticleView";

function PanneauVisuel({ tel, hauteur }: { tel: Telephone; hauteur: string }) {
  if (tel.image) {
    return <img src={tel.image} alt={`${tel.marque} ${tel.modele}`} className={`w-full ${hauteur} object-cover`} />;
  }
  return (
    <div
      className={`flex w-full ${hauteur} flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-accent-fonce via-accent to-accent-clair text-white`}
      aria-hidden="true"
    >
      <Smartphone size={44} strokeWidth={1.6} />
      <span className="px-3 text-center font-display text-[15px] font-black uppercase tracking-[0.5px]">
        {tel.marque} {tel.modele}
      </span>
    </div>
  );
}

export function TelephoneCard({ tel, onOuvrir }: { tel: Telephone; onOuvrir: (id: string) => void }) {
  return (
    <a
      href={cheminTelephone(tel.id)}
      onClick={(e) => {
        e.preventDefault();
        onOuvrir(tel.id);
      }}
      className="flex flex-col overflow-hidden rounded-lg border border-bordure bg-carte no-underline shadow-carte transition-transform hover:-translate-y-0.5"
    >
      <PanneauVisuel tel={tel} hauteur="h-[190px]" />
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="font-display text-[12px] font-extrabold uppercase tracking-[1px] text-accent-fonce dark:text-accent-clair">
          {tel.marque}
        </span>
        <span className="font-display text-[19px] font-black leading-tight text-texte">{tel.modele}</span>
        <span className="text-[13.5px] leading-snug text-texte-doux">{tel.resume}</span>
        <span className="mt-auto pt-2 font-display text-[15px] font-extrabold text-texte">{tel.prix}</span>
        <span className="font-display text-[13px] font-bold text-accent-fonce dark:text-accent-clair">
          Voir la fiche complète →
        </span>
      </div>
    </a>
  );
}

export function TelephonesListe({ onOuvrir }: { onOuvrir: (id: string) => void }) {
  return (
    <div>
      <TitreSection>Téléphones</TitreSection>
      <p className="mb-6 max-w-[720px] text-[15.5px] leading-relaxed text-texte-doux">
        Les fiches caractéristiques MaSt des téléphones récents : écran, processeur, caméras, batterie, prix — et pour
        chaque modèle, nos points forts et points faibles. Données vérifiées sur les fiches GSMArena, PhoneArena et les
        pages officielles des fabricants.
      </p>
      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
        {TELEPHONES.map((t) => (
          <TelephoneCard key={t.id} tel={t} onOuvrir={onOuvrir} />
        ))}
      </div>
    </div>
  );
}

function LigneSpec({ libelle, valeur }: { libelle: string; valeur: string }) {
  return (
    <div className="grid grid-cols-1 gap-0.5 border-b border-bordure py-2.5 min-[640px]:grid-cols-[210px_1fr] min-[640px]:gap-4">
      <dt className="font-display text-[13px] font-extrabold uppercase tracking-[0.6px] text-texte-doux">{libelle}</dt>
      <dd className="m-0 text-[14.5px] leading-relaxed">{valeur}</dd>
    </div>
  );
}

function BlocAvis({ titre, points, positif }: { titre: string; points: string[]; positif: boolean }) {
  return (
    <div className="flex-1 rounded-lg border border-bordure bg-fond-alt px-5 py-4">
      <h3 className="m-0 mb-3 font-display text-[17px] font-black">{titre}</h3>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[14.5px] leading-snug">
            {positif ? (
              <Check size={17} strokeWidth={3} className="mt-0.5 flex-none text-accent-fonce dark:text-accent-clair" />
            ) : (
              <Minus size={17} strokeWidth={3} className="mt-0.5 flex-none text-rouge" />
            )}
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TelephoneViewProps {
  tel: Telephone;
  onRetour: () => void;
  onAccueil: () => void;
  onOuvrir: (id: string) => void;
}

export default function TelephoneView({ tel, onRetour, onAccueil, onOuvrir }: TelephoneViewProps) {
  const autres = TELEPHONES.filter((t) => t.id !== tel.id).slice(0, 3);
  return (
    <article>
      <p className="mb-2.5 mt-5 text-[13.5px] text-texte-doux">
        <button type="button" onClick={onAccueil} className="min-h-9 px-0.5 py-1.5 text-texte-doux underline">
          Accueil
        </button>{" "}
        &gt; Téléphones &gt; {tel.modele}
      </p>

      <span className="font-display text-[13px] font-extrabold uppercase tracking-[1px] text-accent-fonce dark:text-accent-clair">
        {tel.marque}
      </span>
      <h1 className="mb-2 mt-1 text-[clamp(27px,4.6vw,40px)] font-black leading-[1.15]">
        {tel.marque} {tel.modele}
      </h1>
      <p className="m-0 mb-5 text-[19px] text-texte-doux">{tel.resume}</p>

      <div className="grid grid-cols-1 gap-6 min-[860px]:grid-cols-[340px_1fr]">
        <div>
          <PanneauVisuel tel={tel} hauteur="h-[300px] rounded-lg" />
          {tel.legendeImage && <p className="m-0 mt-2 text-[13px] text-texte-doux">{tel.legendeImage}</p>}
          <div className="mt-4 rounded-lg bg-noir px-5 py-4 text-white">
            <div className="font-display text-[12px] font-extrabold uppercase tracking-[1px] text-accent-clair">
              Prix de lancement
            </div>
            <div className="mt-1 font-display text-[21px] font-black leading-tight">{tel.prix}</div>
            <div className="mt-2 text-[13.5px] text-[#c9c9c9]">
              Annoncé le {tel.annonce} · Sortie : {tel.sortie}
            </div>
          </div>
        </div>

        <div>
          <h2 className="m-0 mb-1 font-display text-[21px] font-black">Caractéristiques complètes</h2>
          <dl className="m-0">
            <LigneSpec libelle="Réseau" valeur={tel.reseau} />
            <LigneSpec libelle="Dimensions & boîtier" valeur={tel.dimensions} />
            <LigneSpec libelle="SIM" valeur={tel.sim} />
            <LigneSpec libelle="Écran" valeur={tel.ecran} />
            <LigneSpec libelle="Système" valeur={tel.os} />
            <LigneSpec libelle="Processeur" valeur={tel.puce} />
            <LigneSpec libelle="Mémoire" valeur={tel.memoire} />
            <LigneSpec libelle="Caméras arrière" valeur={tel.cameraPrincipale} />
            <LigneSpec libelle="Caméra selfie" valeur={tel.cameraSelfie} />
            <LigneSpec libelle="Vidéo" valeur={tel.video} />
            <LigneSpec libelle="Batterie & charge" valeur={tel.batterie} />
            <LigneSpec libelle="Connectivité" valeur={tel.connectivite} />
            <LigneSpec libelle="Divers" valeur={tel.divers} />
          </dl>
          <p className="mt-3 text-[13px] text-texte-doux">Sources des caractéristiques : {tel.sources.join(" · ")}.</p>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 min-[760px]:flex-row">
        <BlocAvis titre="Points forts" points={tel.pointsForts} positif />
        <BlocAvis titre="Points faibles" points={tel.pointsFaibles} positif={false} />
      </div>

      <button
        type="button"
        onClick={onRetour}
        className="mt-7 inline-flex min-h-[46px] items-center gap-2 rounded-md bg-noir px-5 py-3 font-display text-sm font-extrabold uppercase text-accent-clair"
      >
        <ArrowLeft size={18} strokeWidth={2.4} />
        Tous les téléphones
      </button>

      <TitreSection>Autres fiches</TitreSection>
      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
        {autres.map((t) => (
          <TelephoneCard key={t.id} tel={t} onOuvrir={onOuvrir} />
        ))}
      </div>
    </article>
  );
}
