// kines.js
export const kines = [
  {
    id: 1,
    /*
      ✅ slug SEO-friendly : utilisé dans les URLs à la place de l'id numérique.
         Format kebab-case : Prénom-Nom en minuscules, accents retirés.
         → /kine-heggen/equipe/justine-hoffmann-heggen
    */
    slug: "justine-hoffmann-heggen",
    prenom: "Justine",
    nom: "Hoffmann-Heggen",
    titre: "Kinésithérapeute D.E.",
    photo: "/images/kine-justine.jpg",
    bioCourte:
      "Spécialisée en rééducation post-opératoire et en thérapie manuelle, Justine accompagne ses patients vers une récupération optimale avec douceur et rigueur.",
    bioComplete:
      "Diplômée de l'IFMK de Lyon en 2012, Justine a exercé pendant cinq ans en milieu hospitalier avant de rejoindre le cabinet. Cette expérience lui a permis de développer une expertise pointue en rééducation fonctionnelle et en prise en charge post-chirurgicale. Passionnée par la thérapie manuelle, elle s'est formée aux techniques ostéo-articulaires et myofasciales. Son approche allie rigueur scientifique et écoute attentive pour proposer des soins adaptés à chaque patient.",
    formation: [
      "Diplôme d'État de Masseur-Kinésithérapeute — IFMK Lyon (2012)",
      "DU Thérapie Manuelle — Université Claude Bernard Lyon 1",
      "Formation McKenzie — Méthode de Diagnostic et Thérapie Mécanique",
      "Certification Dry Needling",
    ],
    specialites: [1, 2, 3],
    approche:
      "Je crois en une rééducation active où le patient est pleinement acteur de sa guérison. Mon rôle est de guider, d'éduquer et de soulager afin que chacun retrouve son autonomie.",
    email: "justine.hh@kine-chez-jj.fr",
  },
  {
    id: 2,
    slug: "johan-heggen",
    prenom: "Johan",
    nom: "Heggen",
    titre: "Kinésithérapeute D.E.",
    photo: "/images/kine-johan.jpg",
    bioCourte:
      "Expert en kinésithérapie respiratoire et en rééducation périnéale, Johan allie technicité et bienveillance pour des soins au plus proche de vos besoins.",
    bioComplete:
      "Diplômé de l'IFMK de Saint-Étienne en 2014, Johan a choisi de se consacrer à des domaines souvent délaissés de la kinésithérapie. Sa formation en kinésithérapie respiratoire lui permet de prendre en charge aussi bien les nourrissons atteints de bronchiolite que les adultes souffrant de pathologies chroniques. Parallèlement, il s'est spécialisé en rééducation périnéale, accompagnant les femmes avant et après l'accouchement avec délicatesse et professionnalisme.",
    formation: [
      "Diplôme d'État de Masseur-Kinésithérapeute — IFMK Saint-Étienne (2014)",
      "DU Kinésithérapie Respiratoire Pédiatrique — Université de Montpellier",
      "Formation en Rééducation Périnéale et Pelvi-Périnéologie",
      "Formation en Kinésithérapie Pédiatrique",
    ],
    specialites: [4, 5, 6],
    approche:
      "Chaque patient mérite une écoute attentive et des soins adaptés à sa situation. Je m'engage à créer un espace de confiance où chacun se sent respecté et accompagné.",
    email: "johan.heggen@kine-chez-jj.fr",
  },
];
