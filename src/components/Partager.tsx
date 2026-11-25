import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { useLang } from "../i18n/lang";

interface PartagerProps {
  titre: string;
  url: string;
  className?: string;
}

/* Glyphes des réseaux (cercles officiels, 24 × 24) */
const ICONES: Record<string, string> = {
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
};

function IconeReseau({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/**
 * Barre de partage d'une page MaSt : partage natif de l'appareil (si disponible),
 * WhatsApp, Facebook, X, Telegram et copie du lien. L'URL partagée est toujours
 * l'URL canonique de la page (article, fiche téléphone, rubrique ou accueil).
 */
export default function Partager({ titre, url, className = "" }: PartagerProps) {
  const { t } = useLang();
  const [copie, setCopie] = useState(false);
  const [natifDispo, setNatifDispo] = useState(false);

  useEffect(() => {
    setNatifDispo(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const texteSeul = encodeURIComponent(titre);
  const lien = encodeURIComponent(url);
  const reseaux = [
    { nom: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${titre} ${url}`)}`, d: ICONES.whatsapp },
    { nom: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${lien}`, d: ICONES.facebook },
    { nom: "X", href: `https://twitter.com/intent/tweet?text=${texteSeul}&url=${lien}`, d: ICONES.x },
    { nom: "Telegram", href: `https://t.me/share/url?url=${lien}&text=${texteSeul}`, d: ICONES.telegram },
  ];

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      /* Presse-papiers indisponible : on ignore, les autres boutons restent actifs. */
    }
  };

  const partagerNatif = async () => {
    try {
      await navigator.share({ title: titre, text: titre, url });
    } catch {
      /* Partage annulé par l'utilisateur. */
    }
  };

  const boutonRond =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-bordure text-texte transition-colors hover:border-accent hover:text-accent";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label={t("partager")}>
      <span className="mr-1 font-display text-[13px] font-extrabold uppercase tracking-[1px] text-texte-doux">
        {t("partager")}
      </span>
      {natifDispo && (
        <button
          type="button"
          onClick={partagerNatif}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-85"
          aria-label={t("partager_appareil")}
        >
          <Share2 size={18} />
        </button>
      )}
      {reseaux.map((r) => (
        <a
          key={r.nom}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          className={boutonRond}
          aria-label={`${t("partager_sur")} ${r.nom}`}
        >
          <IconeReseau d={r.d} />
        </a>
      ))}
      <button
        type="button"
        onClick={copier}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-bordure px-3.5 text-[13.5px] font-bold text-texte transition-colors hover:border-accent hover:text-accent"
        aria-label={t("copier_lien")}
      >
        {copie ? <Check size={16} /> : <Link2 size={16} />}
        {copie ? t("lien_copie") : t("copier_lien")}
      </button>
    </div>
  );
}
