import { LogoBadge } from "./Logo";

interface FooterProps {
  onRubrique: (r: string) => void;
  onNewsletter: () => void;
}

const lienClasse = "inline-flex min-h-9 items-center py-[7px] text-left text-[15px] text-[#e8e8e8] no-underline transition-colors hover:text-accent-clair";

export default function Footer({ onRubrique, onNewsletter }: FooterProps) {
  const rubriques: { id: string; label: string }[] = [
    { id: "cine", label: "Cinéma" },
    { id: "series", label: "Séries" },
    { id: "tech", label: "Tech" },
    { id: "ia", label: "IA" },
    { id: "sport", label: "Sport" },
  ];

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
            <h3 className="m-0 mb-2.5 text-sm uppercase tracking-[1px] text-accent-clair">À propos</h3>
            <p className="m-0 max-w-[44ch] text-[15px]">
              MaSt est un site d'information indépendant consacré au cinéma, aux séries, à la tech, à
              l'intelligence artificielle et au sport : des news vérifiées, des décryptages et les notes de la
              rédaction comme des lecteurs.
            </p>
          </div>
          <div>
            <h3 className="m-0 mb-2.5 text-sm uppercase tracking-[1px] text-accent-clair">Rubriques</h3>
            <ul className="m-0 list-none p-0">
              {rubriques.map((r) => (
                <li key={r.id}>
                  <button type="button" className={lienClasse} onClick={() => onRubrique(r.id)}>
                    {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 mb-2.5 text-sm uppercase tracking-[1px] text-accent-clair">MaSt au quotidien</h3>
            <ul className="m-0 list-none p-0">
              <li>
                <button type="button" className={lienClasse} onClick={() => onRubrique("toutes")}>
                  Toutes les news
                </button>
              </li>
              <li>
                <button type="button" className={lienClasse} onClick={() => onRubrique("streaming")}>
                  Streaming
                </button>
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
                  La newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-[26px] border-t border-[#333] pt-4 text-[13.5px] text-[#a9a9a9]">
          © 2026 MaSt — Tous droits réservés. Les notes « Presse » et « Spectateurs » affichées sur les fiches sont
          celles relevées sur la fiche de l'œuvre concernée.
        </p>
      </div>
    </footer>
  );
}
