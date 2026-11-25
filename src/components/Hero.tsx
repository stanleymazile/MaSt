import type { Article } from "../data/articles";
import { useLang } from "../i18n/lang";
import { dateLisible, dureeLecture, texteArticle } from "../i18n/contenu";

interface HeroProps {
  article: Article;
  onOuvrir: (id: string) => void;
}

export default function Hero({ article, onOuvrir }: HeroProps) {
  const { lang, t } = useLang();
  const txt = texteArticle(article, lang);
  return (
    <section className="mt-[22px]">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onOuvrir(article.id);
        }}
        className="relative block overflow-hidden rounded-lg text-white no-underline shadow-carte"
      >
        <img
          src={article.image}
          alt={txt.legende}
          className="h-[200px] w-full object-cover min-[641px]:h-[clamp(300px,52vw,520px)]"
        />
        <span className="flex flex-col justify-end bg-noir p-[18px] min-[641px]:absolute min-[641px]:inset-0 min-[641px]:bg-[linear-gradient(to_top,rgba(0,0,0,.88)_0%,rgba(0,0,0,.45)_45%,rgba(0,0,0,0)_75%)] min-[641px]:p-[22px]">
          <span className="inline-block w-fit rounded-[3px] bg-rouge px-[9px] py-1 font-display text-xs font-extrabold uppercase tracking-[0.8px] text-white">
            {t("a_la_une")}
          </span>
          <h1 className="mb-2 mt-2.5 max-w-[22ch] text-[24px] font-black leading-[1.12] min-[641px]:text-[clamp(24px,4.4vw,42px)]">
            {txt.titre}
          </h1>
          <p className="m-0 max-w-[62ch] text-base text-[#e8e8e8]">{txt.chapo}</p>
          <span className="mt-2.5 text-[13.5px] text-[#cfcfcf]">
            {dateLisible(article.dateIso, lang)} · {dureeLecture(article.lecture, t)}
          </span>
        </span>
      </a>
    </section>
  );
}
