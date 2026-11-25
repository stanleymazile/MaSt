import type { Article } from "../data/articles";

interface ArticleCardProps {
  article: Article;
  onOuvrir: (id: string) => void;
}

export function Tag({ children, variante = "accent" }: { children: React.ReactNode; variante?: "accent" | "rouge" }) {
  return (
    <span
      className={`inline-block w-fit rounded-[3px] px-[9px] py-1 font-display text-xs font-extrabold uppercase tracking-[0.8px] text-white ${
        variante === "rouge" ? "bg-rouge" : "bg-accent"
      }`}
    >
      {children}
    </span>
  );
}

export default function ArticleCard({ article, onOuvrir }: ArticleCardProps) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onOuvrir(article.id);
      }}
      className="flex flex-col overflow-hidden rounded-lg border border-bordure bg-carte no-underline shadow-carte"
    >
      <img src={article.image} alt={article.legende} loading="lazy" className="h-[180px] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3.5">
        <Tag>{article.tag}</Tag>
        <h3 className="m-0 text-[18.5px] font-extrabold leading-[1.28]">{article.titre}</h3>
        <p className="m-0 flex-1 text-[14.5px] text-texte-doux">{article.chapo}</p>
        <span className="text-[13px] text-texte-doux">
          {article.date} · {article.lecture}
        </span>
      </div>
    </a>
  );
}
