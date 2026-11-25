import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [confirme, setConfirme] = useState<string | null>(null);

  return (
    <section id="newsletter" aria-label="Newsletter" className="mt-11 rounded-lg bg-accent p-[26px_22px] text-white">
      <h2 className="m-0 mb-1.5 font-display text-2xl font-black">La newsletter MaSt</h2>
      <p className="m-0 mb-4 max-w-[58ch]">
        Chaque matin, l'essentiel du ciné, de la tech, de l'IA et du sport — en cinq minutes, sans bruit inutile.
      </p>
      {confirme ? (
        <p className="m-0 font-bold">{confirme}</p>
      ) : (
        <form
          className="flex flex-wrap gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            const valeur = email.trim();
            if (!valeur) return;
            setConfirme(`Merci ! L'adresse ${valeur} est bien notée pour recevoir la newsletter MaSt chaque matin.`);
          }}
        >
          <input
            id="champ-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            aria-label="Votre adresse e-mail"
            className="min-h-12 flex-[1_1_240px] rounded-md border-2 border-noir bg-white px-3.5 py-3 text-base text-[#141414]"
          />
          <button
            type="submit"
            className="min-h-12 rounded-md bg-noir px-[22px] py-3 font-display font-extrabold uppercase tracking-[0.5px] text-accent-clair"
          >
            Je m'abonne
          </button>
        </form>
      )}
    </section>
  );
}
