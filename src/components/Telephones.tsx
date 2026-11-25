import { ArrowLeft, Check, Minus, Smartphone } from "lucide-react";
import { TELEPHONES, type Telephone } from "../data/telephones";
import { cheminTelephone, SITE_URL } from "../seo";
import { useLang } from "../i18n/lang";
import { texteTelephone } from "../i18n/contenu";
import { TitreSection } from "./ArticleView";
import Partager from "./Partager";

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
  const { lang, t } = useLang();
  const telT = texteTelephone(tel, lang);
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
        <span className="text-[13.5px] leading-snug text-texte-doux">{telT.resume}</span>
        <span className="mt-auto pt-2 font-display text-[15px] font-extrabold text-texte">{telT.prix}</span>
        <span className="font-display text-[13px] font-bold text-accent-fonce dark:text-accent-clair">
          {t("voir_fiche")} →
        </span>
      </div>
    </a>
  );
}

export function TelephonesListe({ onOuvrir }: { onOuvrir: (id: string) => void }) {
  const { t } = useLang();
  return (
    <div>
      <TitreSection>{t("rub_telephones")}</TitreSection>
      <p className="mb-6 max-w-[720px] text-[15.5px] leading-relaxed text-texte-doux">{t("tel_intro")}</p>
      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
        {TELEPHONES.map((tel) => (
          <TelephoneCard key={tel.id} tel={tel} onOuvrir={onOuvrir} />
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
  const { lang, t } = useLang();
  const telT = texteTelephone(tel, lang);
  const autres = TELEPHONES.filter((x) => x.id !== tel.id).slice(0, 3);
  return (
    <article>
      <p className="mb-2.5 mt-5 text-[13.5px] text-texte-doux">
        <button type="button" onClick={onAccueil} className="min-h-9 px-0.5 py-1.5 text-texte-doux underline">
          {t("accueil")}
        </button>{" "}
        &gt; {t("rub_telephones")} &gt; {tel.modele}
      </p>

      <span className="font-display text-[13px] font-extrabold uppercase tracking-[1px] text-accent-fonce dark:text-accent-clair">
        {tel.marque}
      </span>
      <h1 className="mb-2 mt-1 text-[clamp(27px,4.6vw,40px)] font-black leading-[1.15]">
        {tel.marque} {tel.modele}
      </h1>
      <p className="m-0 mb-3.5 text-[19px] text-texte-doux">{telT.resume}</p>

      <Partager
        titre={t("seo_telephone", { marque: tel.marque, modele: tel.modele })}
        url={`${SITE_URL}${cheminTelephone(tel.id)}`}
        className="mb-5"
      />

      <div className="grid grid-cols-1 gap-6 min-[860px]:grid-cols-[340px_1fr]">
        <div>
          <PanneauVisuel tel={telT} hauteur="h-[300px] rounded-lg" />
          {telT.legendeImage && <p className="m-0 mt-2 text-[13px] text-texte-doux">{telT.legendeImage}</p>}
          <div className="mt-4 rounded-lg bg-noir px-5 py-4 text-white">
            <div className="font-display text-[12px] font-extrabold uppercase tracking-[1px] text-accent-clair">
              {t("prix_lancement")}
            </div>
            <div className="mt-1 font-display text-[21px] font-black leading-tight">{telT.prix}</div>
            <div className="mt-2 text-[13.5px] text-[#c9c9c9]">
              {t("annonce_le")} {telT.annonce} · {t("sortie_le")} : {telT.sortie}
            </div>
          </div>
        </div>

        <div>
          <h2 className="m-0 mb-1 font-display text-[21px] font-black">{t("caracteristiques")}</h2>
          <dl className="m-0">
            <LigneSpec libelle={t("spec_reseau")} valeur={telT.reseau} />
            <LigneSpec libelle={t("spec_dimensions")} valeur={telT.dimensions} />
            <LigneSpec libelle={t("spec_sim")} valeur={telT.sim} />
            <LigneSpec libelle={t("spec_ecran")} valeur={telT.ecran} />
            <LigneSpec libelle={t("spec_os")} valeur={telT.os} />
            <LigneSpec libelle={t("spec_puce")} valeur={telT.puce} />
            <LigneSpec libelle={t("spec_memoire")} valeur={telT.memoire} />
            <LigneSpec libelle={t("spec_camera")} valeur={telT.cameraPrincipale} />
            <LigneSpec libelle={t("spec_selfie")} valeur={telT.cameraSelfie} />
            <LigneSpec libelle={t("spec_video")} valeur={telT.video} />
            <LigneSpec libelle={t("spec_batterie")} valeur={telT.batterie} />
            <LigneSpec libelle={t("spec_connectivite")} valeur={telT.connectivite} />
            <LigneSpec libelle={t("spec_divers")} valeur={telT.divers} />
          </dl>
          <p className="mt-3 text-[13px] text-texte-doux">
            {t("sources_caracteristiques")} : {tel.sources.join(" · ")}.
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 min-[760px]:flex-row">
        <BlocAvis titre={t("points_forts")} points={telT.pointsForts} positif />
        <BlocAvis titre={t("points_faibles")} points={telT.pointsFaibles} positif={false} />
      </div>

      <Partager
        titre={t("seo_telephone", { marque: tel.marque, modele: tel.modele })}
        url={`${SITE_URL}${cheminTelephone(tel.id)}`}
        className="mt-7"
      />

      <button
        type="button"
        onClick={onRetour}
        className="mt-7 inline-flex min-h-[46px] items-center gap-2 rounded-md bg-noir px-5 py-3 font-display text-sm font-extrabold uppercase text-accent-clair"
      >
        <ArrowLeft size={18} strokeWidth={2.4} />
        {t("tous_telephones")}
      </button>

      <TitreSection>{t("autres_fiches")}</TitreSection>
      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
        {autres.map((t) => (
          <TelephoneCard key={t.id} tel={t} onOuvrir={onOuvrir} />
        ))}
      </div>
    </article>
  );
}
