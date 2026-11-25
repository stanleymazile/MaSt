import { cheminRubrique } from "../seo";
import { useLang } from "../i18n/lang";
import { LogoBadge } from "./Logo";

interface FooterProps {
  onRubrique: (r: string) => void;
  onNewsletter: () => void;
  onPage: (p: string) => void;
}

const lienClasse = "inline-flex min-h-9 items-center py-[7px] text-left text-[15px] text-[#e8e8e8] no-underline transition-colors hover:text-accent-clair";

const PAGES_PIED: { id: string; cle: string }[] = [
  { id: "a-propos", cle: "pied_page_apropos" },
  { id: "politique-editoriale", cle: "pied_page_politique" },
  { id: "mentions-legales", cle: "pied_page_mentions" },
  { id: "politique-confidentialite", cle: "pied_page_confidentialite" },
  { id: "contact", cle: "pied_page_contact" },
];

export default function Footer({ onRubrique, onNewsletter, onPage }: FooterProps) {
  const { t } = useLang();
  const rubriques = ["cine", "series", "tech", "telephones", "ia", "sport", "jeux", "business"];

  return (
    <footer className="mt-[60px] bg-noir text-[#e8e8e8]">
      <div className="mx-auto max-w-[1180px] px-4 pb-[30px] pt-[34px]">
        <span className="inline-flex items-center gap-2.5 font-display text-[30px] font-black text-white">
          <LogoBadge />
          <span>
            Ma<span className="text-accent-clair">St</span>
          </span>
        </span>
        <div className="mt-[18px] grid grid-cols-1 gap-6 min-[760px]:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="m-0 mb-2.5 text-sm uppercase tracking-[1px] text-accent-clair">{t("pied_a_propos")}</h3>
            <p className="m-0 max-w-[44ch] text-[15px]">{t("pied_a_propos_texte")}</p>
            <ul className="m-0 mt-2 list-none p-0">
              {PAGES_PIED.map((p) => (
                <li key={p.id}>
                  <a
                    href={`/${p.id}`}
                    className={lienClasse}
                    onClick={(e) => {
                      e.preventDefault();
                      onPage(p.id);
                    }}
                  >
                    {t(p.cle)}
                  </a>
                </li>
              ))}
              <li>
                <a href="/rss.xml" className={lienClasse}>
                  {t("pied_rss")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="m-0 mb-2.5 text-sm uppercase tracking-[1px] text-accent-clair">{t("pied_rubriques")}</h3>
            <ul className="m-0 list-none p-0">
              {rubriques.map((id) => (
                <li key={id}>
                  <a
                    href={cheminRubrique(id)}
                    className={lienClasse}
                    onClick={(e) => {
                      e.preventDefault();
                      onRubrique(id);
                    }}
                  >
                    {t(`rub_${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 mb-2.5 text-sm uppercase tracking-[1px] text-accent-clair">{t("pied_quotidien")}</h3>
            <ul className="m-0 list-none p-0">
              <li>
                <a
                  href="/"
                  className={lienClasse}
                  onClick={(e) => {
                    e.preventDefault();
                    onRubrique("toutes");
                  }}
                >
                  {t("pied_toutes_news")}
                </a>
              </li>
              <li>
                <a
                  href={cheminRubrique("streaming")}
                  className={lienClasse}
                  onClick={(e) => {
                    e.preventDefault();
                    onRubrique("streaming");
                  }}
                >
                  {t("rub_streaming")}
                </a>
              </li>
              <li>
                <a
                  href="#newsletter"
                  className={lienClasse}
                  onClick={(e) => {
                    e.preventDefault();
                    onNewsletter();
                  }}
                >
                  {t("pied_newsletter")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-[26px] border-t border-[#333] pt-4 text-[13.5px] text-[#a9a9a9]">{t("pied_droits")}</p>
      </div>
    </footer>
  );
}
