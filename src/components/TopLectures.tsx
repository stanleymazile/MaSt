import type { Article } from "../data/articles";
import { cheminArticle } from "../seo";
import { useLang } from "../i18n/lang";
import { texteArticle } from "../i18n/contenu";

interface TopLecturesProps {
  articles: Article[];
  onOuvrir: (id: string) => void;
}

export default function TopLectures({ articles, onOuvrir }: TopLecturesProps) {
  const { lang, t } = useLang();
  return (
    <div className="rounded-lg border border-bordure bg-fond-alt px-5 py-[18px]">
      <h2 className="m-0 mb-2 font-display text-[19px] font-black uppercase">{t("les_plus_lus")}</h2>
      <ol className="m-0 list-none p-0">
        {articles.map((a, i) => (
          <li key={a.id} className="border-b border-bordure last:border-b-0">
            <a
              href={cheminArticle(a.id)}
              onClick={(e) => {
                e.preventDefault();
                onOuvrir(a.id);
              }}
              className="flex items-baseline gap-3.5 py-3 text-[15.5px] font-bold leading-[1.35] no-underline"
            >
              <span className="flex-none font-display text-[26px] font-black leading-none text-accent-fonce [text-shadow:1px_1px_0_#141414] dark:text-accent-clair dark:[text-shadow:none]">
                {i + 1}
              </span>
              <span>{texteArticle(a, lang).titre}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
