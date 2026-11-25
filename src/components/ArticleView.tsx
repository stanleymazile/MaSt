import { ArrowLeft } from "lucide-react";
import { ARTICLES, type Article } from "../data/articles";
import { cheminArticle, SITE_URL } from "../seo";
import { useLang } from "../i18n/lang";
import { dateLisible, dureeLecture, texteArticle } from "../i18n/contenu";
import ArticleCard, { Tag } from "./ArticleCard";
import FicheCard from "./FicheCard";
import Partager from "./Partager";

interface ArticleViewProps {
  article: Article;
  note: number;
  onNoter: (id: string, note: number) => void;
  onRetour: () => void;
  onAccueil: () => void;
  onOuvrir: (id: string) => void;
  onAuteur: () => void;
}

export function TitreSection({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <h2 className="mb-[18px] mt-10 flex items-center gap-3.5 font-display text-[25px] font-black uppercase leading-tight tracking-[0.2px]">
      <span>{children}</span>
      {action}
      <span className="h-1 flex-1 bg-accent" />
    </h2>
  );
}

export default function ArticleView({ article, note, onNoter, onRetour, onAccueil, onOuvrir, onAuteur }: ArticleViewProps) {
  const { lang, t } = useLang();
  const txt = texteArticle(article, lang);
  const aussi = ARTICLES.filter((x) => x.id !== article.id).slice(0, 3);
  const titreCourt = txt.titre.length > 42 ? `${txt.titre.slice(0, 42)}…` : txt.titre;

  return (
    <article>
      <p className="mb-2.5 mt-5 text-[13.5px] text-texte-doux">
        <button
          type="button"
          onClick={onAccueil}
          className="min-h-9 px-0.5 py-1.5 text-texte-doux underline"
        >
          {t("accueil")}
        </button>{" "}
        &gt; {t(`rub_${article.rubrique}`)} &gt; {titreCourt}
      </p>

      <div>
        <Tag>{txt.tag}</Tag>
        <h1 className="mb-2.5 mt-2 text-[clamp(27px,4.6vw,40px)] font-black leading-[1.15]">{txt.titre}</h1>
        <p className="m-0 mb-3.5 text-[19px] text-texte-doux">{txt.chapo}</p>
        <div className="mb-5 flex flex-wrap items-center gap-2.5 border-y border-bordure py-2.5 text-sm text-texte-doux">
          <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-accent font-display text-[13px] font-black text-white">
            SM
          </span>
          <span>
            {t("par")}{" "}
            <a
              href="/auteur/stanley-mazile"
              onClick={(e) => {
                e.preventDefault();
                onAuteur();
              }}
              className="font-bold text-texte underline-offset-2 hover:text-accent hover:underline"
            >
              {article.auteur}
            </a>
          </span>
          <span aria-hidden="true">·</span>
          <span>{dateLisible(article.dateIso, lang)}</span>
          <span aria-hidden="true">·</span>
          <span>{dureeLecture(article.lecture, t)}</span>
        </div>
      </div>

      <img src={article.image} alt={txt.legende} className="mb-2 aspect-[3/2] w-full rounded-lg object-cover" />
      <p className="m-0 mb-3.5 text-[13px] text-texte-doux">{txt.legende}</p>

      <Partager titre={txt.titre} url={`${SITE_URL}${cheminArticle(article.id)}`} className="mb-[22px]" />

      {txt.fiche && (
        <div className="my-[26px] max-w-[720px]">
          <FicheCard fiche={txt.fiche} />
        </div>
      )}

      <div
        className="article-corps max-w-[720px]"
        onClick={(e) => {
          const lien = (e.target as HTMLElement).closest("a");
          if (!lien) return;
          const hrefBrut = lien.getAttribute("href") ?? "";
          const chemin = hrefBrut.startsWith(SITE_URL) ? hrefBrut.slice(SITE_URL.length) : hrefBrut;
          const interne = chemin.match(/^\/article\/([\w-]+)/);
          if (interne) {
            e.preventDefault();
            onOuvrir(interne[1]);
          } else if (/^https?:\/\//.test(hrefBrut)) {
            lien.setAttribute("target", "_blank");
            lien.setAttribute("rel", "noopener noreferrer");
          }
        }}
        dangerouslySetInnerHTML={{ __html: txt.corps.join("") }}
      />

      <Partager titre={txt.titre} url={`${SITE_URL}${cheminArticle(article.id)}`} className="mt-[26px]" />

      <div className="my-[26px] max-w-[720px] rounded-lg border border-bordure bg-fond-alt px-5 py-[18px]">
        <h2 className="m-0 mb-1.5 font-display text-[19px] font-black">{t("votre_avis")}</h2>
        <p className="m-0 mb-2.5 text-[14.5px] text-texte-doux">{t("avis_texte")}</p>
        <div className="flex gap-1" role="radiogroup" aria-label={t("votre_note")}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={n === note}
              aria-label={`${n} / 5`}
              onClick={() => onNoter(article.id, n)}
              className={`min-h-11 min-w-11 rounded-md p-1.5 text-[30px] leading-none ${
                n <= note ? "text-accent-fonce dark:text-accent-clair" : "text-[#c9c9c4] dark:text-[#55554f]"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="m-0 mt-1.5 min-h-[22px] text-[15px] font-bold">{note ? t("merci_note", { n: note }) : ""}</p>
      </div>

      <button
        type="button"
        onClick={onRetour}
        className="mt-2 inline-flex min-h-[46px] items-center gap-2 rounded-md bg-noir px-5 py-3 font-display text-sm font-extrabold uppercase text-accent-clair"
      >
        <ArrowLeft size={18} strokeWidth={2.4} />
        {t("retour_news")}
      </button>

      <TitreSection>{t("a_lire_aussi")}</TitreSection>
      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
        {aussi.map((a) => (
          <ArticleCard key={a.id} article={a} onOuvrir={onOuvrir} />
        ))}
      </div>
    </article>
  );
}
