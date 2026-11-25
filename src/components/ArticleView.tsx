import { ArrowLeft } from "lucide-react";
import { ARTICLES, RUBRIQUES, type Article } from "../data/articles";
import ArticleCard, { Tag } from "./ArticleCard";
import FicheCard from "./FicheCard";

interface ArticleViewProps {
  article: Article;
  note: number;
  onNoter: (id: string, note: number) => void;
  onRetour: () => void;
  onAccueil: () => void;
  onOuvrir: (id: string) => void;
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

export default function ArticleView({ article, note, onNoter, onRetour, onAccueil, onOuvrir }: ArticleViewProps) {
  const aussi = ARTICLES.filter((x) => x.id !== article.id).slice(0, 3);
  const titreCourt = article.titre.length > 42 ? `${article.titre.slice(0, 42)}…` : article.titre;

  return (
    <article>
      <p className="mb-2.5 mt-5 text-[13.5px] text-texte-doux">
        <button
          type="button"
          onClick={onAccueil}
          className="min-h-9 px-0.5 py-1.5 text-texte-doux underline"
        >
          Accueil
        </button>{" "}
        &gt; {RUBRIQUES[article.rubrique]} &gt; {titreCourt}
      </p>

      <div>
        <Tag>{article.tag}</Tag>
        <h1 className="mb-2.5 mt-2 text-[clamp(27px,4.6vw,40px)] font-black leading-[1.15]">{article.titre}</h1>
        <p className="m-0 mb-3.5 text-[19px] text-texte-doux">{article.chapo}</p>
        <div className="mb-5 flex flex-wrap items-center gap-2.5 border-y border-bordure py-2.5 text-sm text-texte-doux">
          <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-accent font-display text-[15px] font-black text-white">
            M
          </span>
          <span>
            Par <strong>{article.auteur}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
          <span aria-hidden="true">·</span>
          <span>{article.lecture}</span>
        </div>
      </div>

      <img src={article.image} alt={article.legende} className="mb-2 aspect-[3/2] w-full rounded-lg object-cover" />
      <p className="m-0 mb-[22px] text-[13px] text-texte-doux">{article.legende}</p>

      {article.fiche && (
        <div className="my-[26px] max-w-[720px]">
          <FicheCard fiche={article.fiche} />
        </div>
      )}

      <div
        className="article-corps max-w-[720px]"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) e.preventDefault();
        }}
        dangerouslySetInnerHTML={{ __html: article.corps.join("") }}
      />

      <div className="my-[26px] max-w-[720px] rounded-lg border border-bordure bg-fond-alt px-5 py-[18px]">
        <h2 className="m-0 mb-1.5 font-display text-[19px] font-black">Votre avis compte</h2>
        <p className="m-0 mb-2.5 text-[14.5px] text-texte-doux">
          Attribuez votre note à ce sujet, comme les spectateurs sur les fiches MaSt.
        </p>
        <div className="flex gap-1" role="radiogroup" aria-label="Votre note sur 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={n === note}
              aria-label={`Noter ${n} sur 5`}
              onClick={() => onNoter(article.id, n)}
              className={`min-h-11 min-w-11 rounded-md p-1.5 text-[30px] leading-none ${
                n <= note ? "text-accent-fonce dark:text-accent-clair" : "text-[#c9c9c4] dark:text-[#55554f]"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="m-0 mt-1.5 min-h-[22px] text-[15px] font-bold">
          {note
            ? `Merci ! Votre note : ${note} / 5 — elle rejoint les notes des lecteurs MaSt.`
            : ""}
        </p>
      </div>

      <button
        type="button"
        onClick={onRetour}
        className="mt-2 inline-flex min-h-[46px] items-center gap-2 rounded-md bg-noir px-5 py-3 font-display text-sm font-extrabold uppercase text-accent-clair"
      >
        <ArrowLeft size={18} strokeWidth={2.4} />
        Retour aux news
      </button>

      <TitreSection>À lire aussi</TitreSection>
      <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
        {aussi.map((a) => (
          <ArticleCard key={a.id} article={a} onOuvrir={onOuvrir} />
        ))}
      </div>
    </article>
  );
}
