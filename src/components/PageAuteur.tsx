/** Page auteur dédiée : Stanley Mazile, fondateur et rédacteur en chef de MaSt.
 * Présentation, parcours, contact et la liste de tous ses articles.
 * Contenu en français (langue source du site), comme les pages d'information ;
 * les titres d'articles suivent la langue choisie par le lecteur. */

import { ARTICLES } from "../data/articles";
import { cheminArticle } from "../seo";
import { useLang } from "../i18n/lang";
import { dateLisible, texteArticle } from "../i18n/contenu";

export const AUTEUR_NOM = "Stanley Mazile";
export const AUTEUR_ROLE = "Fondateur et rédacteur en chef";
export const AUTEUR_CHEMIN = "/auteur/stanley-mazile";
export const AUTEUR_DESCRIPTION =
  "Stanley Mazile est le fondateur et le rédacteur en chef de MaSt, média d'actualité cinéma, séries, tech, intelligence artificielle, sport, jeux et business. Sa présentation et tous ses articles.";

export default function PageAuteur({ onOuvrir }: { onOuvrir: (id: string) => void }) {
  const { lang } = useLang();
  const articles = [...ARTICLES].sort((a, b) => (b.dateIso || "").localeCompare(a.dateIso || ""));
  return (
    <article className="mx-auto max-w-[760px] pt-8">
      <header className="flex flex-wrap items-center gap-5">
        <span className="inline-flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[30px] font-black text-white">
          SM
        </span>
        <div>
          <h1 className="m-0 font-display text-[34px] font-black leading-[1.12] min-[640px]:text-[40px]">{AUTEUR_NOM}</h1>
          <p className="mt-1.5 text-[16px] font-bold text-accent">{AUTEUR_ROLE} de MaSt</p>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="m-0 font-display text-[21px] font-extrabold">Présentation</h2>
        <p className="mt-2.5 text-[15.5px] leading-[1.7]">
          Stanley Mazile est le fondateur et le rédacteur en chef de MaSt, le média d'actualité qu'il a créé pour
          suivre chaque jour l'essentiel du cinéma, des séries, de la tech, de l'intelligence artificielle, du sport,
          des jeux et du business.
        </p>
        <p className="mt-2.5 text-[15.5px] leading-[1.7]">
          Il choisit les sujets, vérifie chaque fait à la source et signe l'ensemble des articles publiés sur le site.
          Les sources sont citées en fin d'article et les photos, libres de droits, sont créditées sous chaque visuel.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="m-0 font-display text-[21px] font-extrabold">Son parcours</h2>
        <p className="mt-2.5 text-[15.5px] leading-[1.7]">
          Psychologue, Stanley Mazile dirige aussi Educa-Psy, entreprise sociale haïtienne qui rend les services
          psychologiques et éducatifs accessibles aux écoles, aux institutions et aux organisations. Il vit et
          travaille en Haïti, d'où il anime MaSt en sept langues : français, anglais, espagnol, portugais, allemand,
          italien et créole haïtien.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="m-0 font-display text-[21px] font-extrabold">Le contacter</h2>
        <p className="mt-2.5 text-[15.5px] leading-[1.7]">
          Pour lui écrire : mazilepost@gmail.com, ou via la page Contact du site. MaSt est aussi sur Facebook (page
          « MazilePost »), où ses articles sont relayés chaque jour.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="m-0 font-display text-[21px] font-extrabold">Ses articles ({articles.length})</h2>
        <ul className="m-0 mt-2 list-none p-0">
          {articles.map((a) => (
            <li key={a.id} className="border-b border-bordure py-3">
              <a
                href={cheminArticle(a.id)}
                onClick={(e) => {
                  e.preventDefault();
                  onOuvrir(a.id);
                }}
                className="group flex items-baseline gap-3.5 no-underline"
              >
                <span className="shrink-0 text-[13px] text-texte-doux">{dateLisible(a.dateIso, lang)}</span>
                <span className="font-display text-[16.5px] font-bold leading-snug group-hover:text-accent group-hover:underline">
                  {texteArticle(a, lang).titre}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
