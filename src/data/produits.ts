/**
 * Vitrine « Nouveaux produits » de la rubrique Business — petites annonces innovantes.
 * Produits réels et récents, prix et caractéristiques vérifiés (presse et fabricants).
 */
import { produitAirpods } from "./images";

export interface Produit {
  id: string;
  nom: string;
  marque: string;
  categorie: string;
  prix: string;
  lancement: string;
  accroche: string;
  description: string;
  innovation: string;
  disponibilite: string;
  source: string;
  image?: string;
  legendeImage?: string;
}

export const PRODUITS: Produit[] = [
  {
    id: "airpods-pro-3",
    nom: "AirPods Pro 3",
    marque: "Apple",
    categorie: "Tech",
    prix: "249 $ / 279 €",
    lancement: "Annoncés le 9 septembre 2025, en vente le 19 septembre 2025",
    accroche: "Ils traduisent vos conversations en direct et prennent votre pouls : les écouteurs deviennent de vrais assistants santé.",
    description:
      "Écouteurs sans fil à réduction de bruit active renforcée (jusqu'à deux fois celle des AirPods Pro 2 selon Apple), avec embouts en mousse en cinq tailles et indice IP57. Jusqu'à 8 heures d'écoute avec réduction de bruit activée, boîtier MagSafe USB-C.",
    innovation:
      "Premiers AirPods dotés d'un capteur de fréquence cardiaque intégré (mesure 256 fois par seconde) et de la traduction en direct via Apple Intelligence.",
    disponibilite: "Apple Store, apple.com, Amazon, Fnac et revendeurs agréés",
    source: "https://www.soundguys.com/apple-announces-airpods-pro-3-144038/",
    image: produitAirpods,
    legendeImage:
      "Les AirPods Pro 3 (à gauche) comparés aux AirPods Pro 1. (Photo : Burkhard Mücke, licence libre Creative Commons, via Wikimedia Commons)",
  },
  {
    id: "roborock-saros-z70",
    nom: "Saros Z70",
    marque: "Roborock",
    categorie: "Maison",
    prix: "2 599 $ au lancement",
    lancement: "Dévoilé au CES de janvier 2025, commercialisé en mai 2025",
    accroche: "Le premier aspirateur robot qui range ce qui traîne par terre avant de nettoyer.",
    description:
      "Aspirateur-laveur robot doté d'un bras mécanique articulé OmniGrip qui saisit les petits objets (chaussettes, sandales, mouchoirs, jusqu'à 300 g) et les dépose dans une zone définie par l'utilisateur. Aspiration de 22 000 Pa ; la station lave et sèche automatiquement les serpillières.",
    innovation:
      "Premier aspirateur robot grand public équipé d'un bras robotisé à cinq axes capable de déplacer les obstacles au lieu de simplement les contourner.",
    disponibilite: "roborock.com, Amazon et revendeurs spécialisés",
    source:
      "https://www.notebookcheck.net/Innovative-and-spectacular-but-also-useful-Roborock-Saros-Z70-robot-vacuum-with-robotic-arm-review.1100881.0.html",
  },
  {
    id: "dyson-airwrap-co-anda-2x",
    nom: "Airwrap Co-anda 2x",
    marque: "Dyson",
    categorie: "Beauté",
    prix: "699,99 $",
    lancement: "En vente aux États-Unis depuis juillet 2025",
    accroche: "Boucler, sécher et maintenant lisser les cheveux mouillés, sans plaques brûlantes.",
    description:
      "Multi-styler qui utilise l'effet Coanda — un flux d'air qui enroule les mèches autour des embouts — pour boucler et coiffer en séchant. Son moteur Hyperdymium 2 délivre deux fois plus de pression d'air que la génération précédente, dans un boîtier plus petit et plus léger.",
    innovation:
      "Nouvel embout AirSmooth qui lisse les cheveux dès la sortie de la douche grâce à l'air, et embouts RFID reconnus automatiquement par l'appareil, qui mémorise les réglages de chacun.",
    disponibilite: "dyson.com et grands revendeurs beauté",
    source: "https://www.techradar.com/home/hair-care/what-is-the-dyson-airwrap-co-anda-2x-and-how-is-it-better-than-the-airwrap",
  },
  {
    id: "segway-xyber",
    nom: "Xyber",
    marque: "Segway",
    categorie: "Mobilité",
    prix: "2 999,99 $",
    lancement: "Présenté au CES de janvier 2025, livraisons dès février 2025",
    accroche: "Mi-vélo, mi-moto électrique : un look de scrambler et jusqu'à environ 180 km d'autonomie en double batterie.",
    description:
      "Vélo électrique au design de moto tout-terrain, moteur de 6 000 W, trois modes de conduite (Eco, Sport, Race) et vitesse pouvant atteindre environ 56 km/h dans sa version d'origine non homologuée pour la route (une version conforme à la réglementation a été annoncée ensuite). Écran LCD avec navigation et musique, verrouillage automatique et application connectée.",
    innovation:
      "Premier vélo électrique de Segway, construit autour de son « Intelligent Ride System » : verrouillage et déverrouillage automatiques à distance, géolocalisation et intégration des données de santé du cycliste.",
    disponibilite: "store.segway.com et revendeurs agréés",
    source: "https://techcrunch.com/2025/01/07/segway-dropped-two-e-bikes-at-ces-2025-that-are-stylish-and-packed-with-tech-for-under-3000/",
  },
  {
    id: "ninja-swirl-by-creami",
    nom: "Swirl by CREAMi",
    marque: "Ninja (SharkNinja)",
    categorie: "Cuisine",
    prix: "349,99 $",
    lancement: "Lancé le 11 février 2025",
    accroche: "La glace italienne façon glacier, servie à la poignée directement chez vous.",
    description:
      "Machine à glace domestique qui transforme une préparation congelée en glace classique, sorbet ou yaourt glacé. Treize programmes, dont six dédiés à la glace molle (soft serve, frozen custard, fruit whip…), distribuée par une poignée comme chez le glacier.",
    innovation: "Premier modèle de la gamme CREAMi doté d'un distributeur de glace molle (soft serve) intégré.",
    disponibilite: "NinjaKitchen.com, Amazon, Walmart, Target, Macy's, Crate & Barrel",
    source: "https://www.businesswire.com/news/home/20250211834173/en/New-Ninja-Swirl-by-CREAMi-is-the-Next-Generation-of-Enjoying-Frozen-Treats-on-Your-Countertop",
  },
  {
    id: "whoop-5-0",
    nom: "WHOOP 5.0",
    marque: "WHOOP",
    categorie: "Santé & Sport",
    prix: "Abonnement dès 199 $/an, bracelet inclus",
    lancement: "Lancé le 8 mai 2025",
    accroche: "14 jours d'autonomie et un « âge corporel » calculé chaque semaine, sans aucun écran.",
    description:
      "Bracelet connecté sans écran qui mesure en continu l'effort, la récupération, le sommeil et la fréquence cardiaque (capteurs échantillonnant 26 fois par seconde), dans un boîtier 7 % plus petit que le WHOOP 4.0. La version MG ajoute un ECG à la demande validé par la FDA et des estimations de tension artérielle (fonction bêta).",
    innovation:
      "La fonction « Healthspan » calcule un âge physiologique (WHOOP Age) et un rythme de vieillissement à partir de neuf indicateurs, pour relier les habitudes quotidiennes à la longévité.",
    disponibilite: "whoop.com (abonnement) et Amazon",
    source: "https://www.theshortcut.com/p/whoop-5-mg-announced",
  },
  {
    id: "toniebox-2",
    nom: "Toniebox 2",
    marque: "tonies",
    categorie: "Enfants",
    prix: "À partir de 139,99 $",
    lancement: "Disponibilité générale le 5 octobre 2025 aux États-Unis",
    accroche: "Des histoires sans écran dès l'âge de 1 an — et désormais des jeux interactifs à écouter et à jouer.",
    description:
      "Lecteur audio sans écran ni publicité pour les enfants de 1 à 9 ans et plus : il suffit de poser une figurine Tonie sur le boîtier pour lancer histoires et chansons. Cette génération ajoute une minuterie de coucher avec lumière, un réveil « lever de soleil » et un anneau lumineux pour structurer les routines.",
    innovation:
      "Tonieplay, une nouvelle catégorie de jeux, quiz et aventures interactifs sans écran (avec une petite manette dédiée), fait entrer le jeu dans un lecteur audio jusque-là limité à l'écoute — une première pour la marque.",
    disponibilite: "us.tonies.com, Amazon, Target, Walmart, Kohl's et magasins de jouets spécialisés",
    source: "https://www.prnewswire.com/news-releases/tonies-introduces-new-toniebox-2-tonieplay-and-my-first-tonies-302539547.html",
  },
  {
    id: "anker-solix-c1000-gen-2",
    nom: "SOLIX C1000 Gen 2",
    marque: "Anker SOLIX",
    categorie: "Écolo",
    prix: "799 $ (429 $ en offre de lancement)",
    lancement: "En vente le 8 septembre 2025",
    accroche: "Recharge complète en 49 minutes : l'électricité solaire prête avant même la prochaine coupure.",
    description:
      "Station d'énergie portable de 1 024 Wh à batterie LFP (plus de 4 000 cycles de charge), délivrant 2 000 W en continu (3 000 W en crête) pour alimenter frigo, ordinateur ou outils. Elle accepte jusqu'à 600 W de panneaux solaires et fait office d'onduleur avec bascule en 10 ms en cas de coupure.",
    innovation:
      "Technologie HyperFlash : une recharge secteur de 0 à 100 % en 49 minutes seulement (1 600 W), présentée par Anker comme la plus rapide de sa catégorie — un record certifié Guinness selon la presse spécialisée.",
    disponibilite: "ankersolix.com et Amazon",
    source:
      "https://beta.manilatimes.net/2025/08/19/tmt-newswire/globenewswire/anker-launches-solix-c1000-gen-2-its-most-versatile-compact-power-station-yet/2170297/amp",
  },
];
