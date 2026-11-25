import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { UI } from "./ui";

export type Lang = "fr" | "en" | "es" | "pt" | "de" | "it" | "ht";

export const LANGS: { code: Lang; label: string; court: string }[] = [
  { code: "fr", label: "Français", court: "FR" },
  { code: "en", label: "English", court: "EN" },
  { code: "es", label: "Español", court: "ES" },
  { code: "pt", label: "Português", court: "PT" },
  { code: "de", label: "Deutsch", court: "DE" },
  { code: "it", label: "Italiano", court: "IT" },
  { code: "ht", label: "Kreyòl ayisyen", court: "HT" },
];

export const LOCALES: Record<Lang, string> = {
  fr: "fr-FR",
  en: "en-GB",
  es: "es-ES",
  pt: "pt-PT",
  de: "de-DE",
  it: "it-IT",
  ht: "ht-HT",
};

interface ContexteLang {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (cle: string, vars?: Record<string, string | number>) => string;
}

const Ctx = createContext<ContexteLang | null>(null);

function langueInitiale(): Lang {
  try {
    const s = window.localStorage.getItem("mast-lang");
    if (s && LANGS.some((l) => l.code === s)) return s as Lang;
  } catch {
    /* stockage indisponible */
  }
  return "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(langueInitiale);

  useEffect(() => {
    try {
      window.localStorage.setItem("mast-lang", lang);
    } catch {
      /* stockage indisponible */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (cle: string, vars?: Record<string, string | number>): string => {
    let s = UI[lang]?.[cle] ?? UI.fr[cle] ?? cle;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.split(`{${k}}`).join(String(v));
      }
    }
    return s;
  };

  return <Ctx.Provider value={{ lang, setLang: setLangState, t }}>{children}</Ctx.Provider>;
}

export function useLang(): ContexteLang {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang doit être utilisé dans <LangProvider>");
  return c;
}
