/**
 * BodyMapData.js
 * Données anatomiques complètes pour le BodyMap interactif.
 * Chaque structure contient :
 *   - id, nom, nomLatin
 *   - systeme : clé de SYSTEMES
 *   - region : zone du corps
 *   - x, y : coordonnées en % sur le SVG du corps (vue antérieure, corps debout)
 *   - vues : ["face"] | ["dos"] | ["face", "dos"]
 *   - symetrie : true par défaut (miroir gauche/droite), false pour organes médians ou asymétriques
 *   - description, role, pathologies, kine
 *
 * COORDONNÉES CALIBRÉES sur la silhouette SVG (viewBox 200x520) :
 *   - x = 50 => centre du corps (ligne médiane)
 *   - x < 50 => côté gauche anatomique (affiché à droite de l'écran)
 *   - y = 0 => sommet du crâne, y = 100 => plante des pieds
 */

export const SYSTEMES = {
  osseux: {
    id: "osseux",
    label: "Osseux",
    couleur: "#C4A882",
    couleurLight: "#F0E4CC",
    icone: "◻",
    description: "Structure porteuse. 206 os chez l'adulte.",
  },
  musculaire: {
    id: "musculaire",
    label: "Musculaire",
    couleur: "#C0615A",
    couleurLight: "#F5CECA",
    icone: "◻",
    description:
      "Plus de 600 muscles assurant mouvement, posture et thermorégulation.",
  },
  nerveux: {
    id: "nerveux",
    label: "Nerveux",
    couleur: "#B8A800",
    couleurLight: "#FBF5A0",
    icone: "◻",
    description: "Réseau de communication électrochimique du corps.",
  },
  articulaire: {
    id: "articulaire",
    label: "Articulaire & Tendineux",
    couleur: "#5AAEC4",
    couleurLight: "#C8EAF5",
    icone: "◻",
    description: "Ligaments, tendons, cartilages et capsules articulaires.",
  },
  arteriel: {
    id: "arteriel",
    label: "Artériel",
    couleur: "#CC2222",
    couleurLight: "#FFCACA",
    icone: "◻",
    description: "Transport du sang oxygéné du cœur vers les tissus.",
  },
  veineux: {
    id: "veineux",
    label: "Veineux",
    couleur: "#3A4CB8",
    couleurLight: "#C8CEFF",
    icone: "◻",
    description: "Retour du sang désoxygéné vers le cœur.",
  },
  lymphatique: {
    id: "lymphatique",
    label: "Lymphatique",
    couleur: "#3DAA8A",
    couleurLight: "#C0EDE0",
    icone: "◻",
    description: "Drainage des liquides interstitiels et immunité.",
  },
  respiratoire: {
    id: "respiratoire",
    label: "Respiratoire",
    couleur: "#4AA3E0",
    couleurLight: "#C8E8FF",
    icone: "◻",
    description: "Échanges gazeux : poumons, bronches, trachée.",
  },
  digestif: {
    id: "digestif",
    label: "Digestif & Viscéral",
    couleur: "#E07800",
    couleurLight: "#FFE0B0",
    icone: "◻",
    description: "Transformation des aliments et absorption des nutriments.",
  },
  urinaire: {
    id: "urinaire",
    label: "Urinaire",
    couleur: "#9A3FA0",
    couleurLight: "#EED0F5",
    icone: "◻",
    description: "Filtration du sang et élimination des déchets métaboliques.",
  },
  cerebral: {
    id: "cerebral",
    label: "Cérébral",
    couleur: "#C0405A",
    couleurLight: "#FFCCD8",
    icone: "◻",
    description: "Cerveau, cervelet, tronc cérébral : centre de contrôle.",
  },
  perineal: {
    id: "perineal",
    label: "Périnéal & Pelvien",
    couleur: "#A05080",
    couleurLight: "#F0D0E8",
    icone: "◻",
    description:
      "Plancher pelvien, sphincters, continence et statique pelvienne.",
  },
};

export const STRUCTURES = [
  // ══════════════════════════════════════════════════════════════════════════
  // ══ OSSEUX ════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "crane",
    nom: "Crâne",
    nomLatin: "Cranium",
    systeme: "osseux",
    region: "tete",
    x: 50,
    y: 4,
    symetrie: false,
    vues: ["face", "dos"],
    description:
      "Boîte crânienne composée de 8 os (frontal, pariétaux, temporaux, occipital, sphénoïde, ethmoïde) protégeant l'encéphale.",
    role: "Protection cérébrale, point d'attache musculaire cervical.",
    pathologies: [
      "Traumatisme crânien",
      "Fracture de la base du crâne",
      "Céphalée de tension",
    ],
    kine: "Traitement des céphalées cervicogéniques, rééducation vestibulaire post-traumatique.",
  },

  {
    id: "mandibule",
    nom: "Mandibule & ATM",
    nomLatin: "Mandibula",
    systeme: "osseux",
    region: "tete",
    x: 50,
    y: 8.5,
    symetrie: false,
    vues: ["face"],
    description:
      "Seul os mobile de la face. L'articulation temporo-mandibulaire (ATM) est une des plus sollicitées du corps.",
    role: "Mastication, phonation, déglutition.",
    pathologies: [
      "Bruxisme",
      "SADAM (syndrome algodysfonctionnel de l'ATM)",
      "Trismus",
    ],
    kine: "Thérapie manuelle de l'ATM, rééducation de la déglutition, mobilisation des muscles masticateurs.",
  },

  {
    id: "rachis-cervical",
    nom: "Rachis cervical",
    nomLatin: "Columnae C1–C7",
    systeme: "osseux",
    region: "cou",
    x: 50,
    y: 11,
    symetrie: false,
    vues: ["dos"],
    description:
      "7 vertèbres cervicales dont Atlas (C1) et Axis (C2). Grande mobilité mais vulnérabilité élevée. Disques C5-C6 et C6-C7 les plus sollicités.",
    role: "Soutien de la tête, mobilité cervicale (flexion, extension, rotations, inclinaisons), protection de la moelle épinière cervicale.",
    pathologies: [
      "Cervicalgie commune",
      "Hernie discale cervicale",
      "Coup du lapin (whiplash)",
      "Canal cervical étroit",
      "Névralgie cervico-brachiale",
    ],
    kine: "Manipulation, mobilisation douce, tractions cervicales, renforcement des stabilisateurs profonds (multifides, longus colli).",
  },

  {
    id: "clavicule",
    nom: "Clavicule",
    nomLatin: "Clavicula",
    systeme: "osseux",
    region: "epaule",
    x: 35,
    y: 12.5,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Os long en S reliant le sternum (articulation sternoclaviculaire) à l'acromion (articulation acromioclaviculaire). Unique pont osseux entre le membre supérieur et le squelette axial.",
    role: "Transmission des forces, protection des structures sous-clavières (plexus brachial, vaisseaux).",
    pathologies: [
      "Fracture claviculaire (os le plus fracturé du corps)",
      "Luxation acromio-claviculaire",
      "Ostéolyse distale",
    ],
    kine: "Rééducation post-fracture, restauration de la cinématique scapulothoracique, renforcement.",
  },

  {
    id: "scapula",
    nom: "Omoplate",
    nomLatin: "Scapula",
    systeme: "osseux",
    region: "epaule",
    x: 33,
    y: 19,
    symetrie: true,
    vues: ["dos"],
    description:
      "Os plat triangulaire portant la glène pour l'épaule. Se déplace sur le thorax : 6 degrés de liberté. Point d'ancrage de 17 muscles.",
    role: "Positionnement optimal de la glène, transmission des forces tronc-membre supérieur.",
    pathologies: [
      "Dyskinésie scapulaire",
      "Fracture de l'omoplate (rare)",
      "Syndrome du nerf supra-scapulaire",
      "Snapping scapula",
    ],
    kine: "Renforcement des stabilisateurs scapulaires (trapèze moyen/inférieur, grand dentelé), rééducation neuromusculaire.",
  },

  {
    id: "humerus",
    nom: "Humérus",
    nomLatin: "Humerus",
    systeme: "osseux",
    region: "bras",
    x: 26,
    y: 26,
    symetrie: true,
    vues: ["face"],
    description:
      "Os long du bras, articulé en haut avec la glène (épaule sphéroïde) et en bas avec radius et ulna (coude trochléen).",
    role: "Levier mécanique principal du membre supérieur.",
    pathologies: [
      "Fracture de l'humérus proximal (3e fracture ostéoporotique)",
      "Fracture diaphysaire (paralysie radiale associée)",
      "Fracture intercondylienne",
    ],
    kine: "Rééducation post-fracture, récupération de la mobilité, renforcement progressif.",
  },

  {
    id: "radius-ulna",
    nom: "Radius & Ulna",
    nomLatin: "Radius / Ulna",
    systeme: "osseux",
    region: "avant-bras",
    x: 24,
    y: 38,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Deux os de l'avant-bras. Le radius (latéral) pivote autour de l'ulna pour la prono-supination. L'ulna porte l'olécrane.",
    role: "Prono-supination, stabilité du poignet, support des articulations du coude.",
    pathologies: [
      "Fracture du radius distal (Pouteau-Colles, Smith)",
      "Fracture de Monteggia",
      "Fracture de Galeazzi",
    ],
    kine: "Récupération de la prono-supination (raideur fréquente), force de préhension, orthèse.",
  },

  {
    id: "main-carpe",
    nom: "Main & Carpe",
    nomLatin: "Manus / Ossa carpi",
    systeme: "osseux",
    region: "main",
    x: 21,
    y: 48,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "8 os du carpe (scaphoïde, lunatum, triquétrum, pisiforme, trapèze, trapézoïde, capitatum, hamatum), 5 métacarpes, 14 phalanges.",
    role: "Préhension (pince, paume, force), manipulation fine, expression non-verbale.",
    pathologies: [
      "Fracture du scaphoïde (diagnostic souvent tardif)",
      "Syndrome du canal carpien",
      "Rhizarthrose (CMC1)",
      "Syndrome de De Quervain",
      "Doigt à ressaut",
    ],
    kine: "Rééducation de la main (ergothérapie associée), orthèses, hydrothérapie, récupération de la pince et de la force.",
  },

  {
    id: "sternum",
    nom: "Sternum",
    nomLatin: "Sternum",
    systeme: "osseux",
    region: "thorax",
    x: 50,
    y: 17,
    symetrie: false,
    vues: ["face"],
    description:
      "Os plat médian du thorax en 3 parties (manubrium, corps, xiphoïde). Articulé avec clavicules et 7 premières paires de côtes.",
    role: "Protection des organes thoraciques, attache des muscles respiratoires et pectoraux.",
    pathologies: [
      "Fracture sternale (choc direct ou ceinture)",
      "Costochondrite",
      "Syndrome de Tietze",
      "Sternotomie post-cardiaque",
    ],
    kine: "Mobilisation thoracique, rééducation respiratoire post-chirurgie cardiaque, cicatrice sternale.",
  },

  {
    id: "cotes",
    nom: "Côtes",
    nomLatin: "Costae",
    systeme: "osseux",
    region: "thorax",
    x: 38,
    y: 22,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "12 paires de côtes formant la cage thoracique, articulées avec les vertèbres thoraciques en arrière.",
    role: "Protection cardio-pulmonaire, mécanique ventilatoire.",
    pathologies: [
      "Fracture costale",
      "Subluxation costo-vertébrale",
      "Syndrome de la côte glissante",
    ],
    kine: "Mobilisation costale, techniques respiratoires, strapping antalgique.",
  },

  {
    id: "rachis-dorsal",
    nom: "Rachis dorsal",
    nomLatin: "Columna T1–T12",
    systeme: "osseux",
    region: "dos",
    x: 50,
    y: 25,
    symetrie: false,
    vues: ["dos"],
    description:
      "12 vertèbres thoraciques articulées avec les côtes. Cyphose physiologique de 20-45°. Mobilité moindre qu'en cervical et lombaire.",
    role: "Stabilité du tronc, protection de la moelle thoracique, ancrage des côtes.",
    pathologies: [
      "Dorsalgie",
      "Fracture vertébrale ostéoporotique (cunéiforme)",
      "Scoliose idiopathique",
      "Maladie de Scheuermann (dos voûté adolescent)",
    ],
    kine: "Mobilisation thoracique (manipulation/mobilisation), renforcement postural, corset de correction (scoliose).",
  },

  {
    id: "rachis-lombaire",
    nom: "Rachis lombaire",
    nomLatin: "Columna L1–L5",
    systeme: "osseux",
    region: "lombaire",
    x: 50,
    y: 36,
    symetrie: false,
    vues: ["dos"],
    description:
      "5 vertèbres lombaires, les plus volumineuses. Lordose physiologique. L4-L5 et L5-S1 : 90% des hernies discales lombaires.",
    role: "Support du poids du corps, transmission des charges tronc-bassin, mobilité du tronc.",
    pathologies: [
      "Lombalgie commune (1re cause d'arrêt de travail)",
      "Hernie discale lombaire",
      "Canal lombaire étroit",
      "Spondylolisthésis",
      "Spondylarthropathie",
    ],
    kine: "École du dos, stabilisation lombaire (transverse, multifides), McKenzie, crochetage myofascial, tractions.",
  },

  {
    id: "sacrum-ilium",
    nom: "Sacrum & Bassin osseux",
    nomLatin: "Os sacrum / Ossa coxae",
    systeme: "osseux",
    region: "bassin",
    x: 50,
    y: 43,
    symetrie: false,
    vues: ["face", "dos"],
    description:
      "Sacrum (5 vertèbres fusionnées) + 2 os iliaques (ilium, ischion, pubis) + symphyse pubienne. Articulations sacro-iliaques (ASI).",
    role: "Transmission des charges tronc-membres inférieurs, protection des organes pelviens, insertion des muscles du tronc et des membres.",
    pathologies: [
      "Sacro-iliite",
      "Fracture du bassin",
      "Syndrome de la ceinture pelvienne (grossesse)",
      "Pubalgie de sportif",
    ],
    kine: "Thérapie manuelle sacro-iliaque, renforcement des stabilisateurs pelviens, électrothérapie.",
  },

  {
    id: "femur",
    nom: "Fémur",
    nomLatin: "Femur",
    systeme: "osseux",
    region: "cuisse",
    x: 35,
    y: 55,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Os le plus long et le plus solide du corps (25% de la taille). Angle cervicodiaphysaire de 126°. Tête articulée dans le cotyle.",
    role: "Levier principal de la marche et de la course, transfert des forces au bassin.",
    pathologies: [
      "Fracture du col fémoral (personnes âgées)",
      "Coxarthrose",
      "Ostéonécrose aseptique de la tête fémorale",
      "Fracture de fatigue",
    ],
    kine: "Rééducation post-PTH (prothèse totale de hanche), renforcement des abducteurs, marche, équilibre.",
  },

  {
    id: "rotule",
    nom: "Rotule",
    nomLatin: "Patella",
    systeme: "osseux",
    region: "genou",
    x: 35,
    y: 65,
    symetrie: true,
    vues: ["face"],
    description:
      "Plus grand os sésamoïde inscrit dans le tendon quadricipital. Glisse dans la trochlée fémorale.",
    role: "Augmente le bras de levier du quadriceps de 30 à 50%, protège l'articulation.",
    pathologies: [
      "Syndrome fémoro-patellaire",
      "Chondromalacie rotulienne",
      "Fracture de rotule",
      "Luxation de rotule",
    ],
    kine: "Taping rotulien (McConnell), renforcement du VMO, mobilisation manuelle de la rotule.",
  },

  {
    id: "tibia-fibula",
    nom: "Tibia & Fibula",
    nomLatin: "Tibia / Fibula",
    systeme: "osseux",
    region: "jambe",
    x: 35,
    y: 77,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Le tibia supporte 85% du poids du corps. La fibula (péroné) est un os fin latéral servant d'attache musculaire et ligamentaire.",
    role: "Transmission du poids, stabilité de la cheville, rotations.",
    pathologies: [
      "Fracture de fatigue tibiale (coureurs)",
      "Syndrome des loges",
      "Fracture malléolaire (cheville)",
    ],
    kine: "Rééducation post-fracture, proprioception, retour au sport progressif.",
  },

  {
    id: "pied-tarse",
    nom: "Pied & Tarse",
    nomLatin: "Pes / Ossa tarsi",
    systeme: "osseux",
    region: "pied",
    x: 35,
    y: 92,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "7 os tarsiens (calcanéum, talus, naviculaire, cuboïde, 3 cunéiformes), 5 métatarses, 14 phalanges = 26 os au total.",
    role: "Amortissement, propulsion, équilibre, adaptation aux irrégularités du sol.",
    pathologies: [
      "Fracture du calcanéum (chute)",
      "Fracture de fatigue métatarsienne",
      "Hallux valgus",
      "Pied plat/creux",
    ],
    kine: "Semelles orthopédiques, renforcement des intrinsèques du pied, proprioception, reprogrammation podologique.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ MUSCULAIRE ════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "trapeze",
    nom: "Trapèze",
    nomLatin: "M. trapezius",
    systeme: "musculaire",
    region: "cou",
    x: 38,
    y: 14,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Grand muscle superficiel en forme de losange couvrant le cou et le dos supérieur. Chef supérieur (élévateur), moyen (rétracteur), inférieur (dépresseur).",
    role: "Mouvement et stabilisation de l'omoplate, extension et rotation cervicale.",
    pathologies: [
      "Syndrome myofascial du trapèze (point gâchette)",
      "Contracture post-stress",
      "Torticolis musculaire",
    ],
    kine: "Étirements, massage transverse, dry needling, rééducation posturale globale (RPG).",
  },

  {
    id: "sternocleidomastoidien",
    nom: "Sterno-cléido-mastoïdien",
    nomLatin: "M. SCM",
    systeme: "musculaire",
    region: "cou",
    x: 45,
    y: 10.5,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Muscle oblique proéminent du cou, de l'origine sternum/clavicule à l'insertion mastoïde. Visible à la rotation cervicale.",
    role: "Flexion et rotation controlatérale de la tête. Muscle inspiratoire accessoire.",
    pathologies: [
      "Torticolis congénital (fibromatose du SCM)",
      "Syndrome de contraction du SCM",
      "Céphalées d'origine cervicale",
    ],
    kine: "Étirements doux, massage, mobilisation cervicale, RPG.",
  },

  {
    id: "deltoid",
    nom: "Deltoïde",
    nomLatin: "M. deltoideus",
    systeme: "musculaire",
    region: "epaule",
    x: 26,
    y: 15,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Muscle superficiel en delta couvrant l'épaule. 3 chefs : antérieur (clavicule), moyen (acromion), postérieur (épine de la scapula).",
    role: "Abduction du bras (chef moyen), flexion (chef ant.), extension (chef post.). Principal abducteur de l'épaule.",
    pathologies: [
      "Tendinopathie du deltoïde",
      "Contusion directe",
      "Atrophie post-immobilisation ou post-AVC",
    ],
    kine: "Renforcement progressif (électrostimulation si paralysie), exercices en chaîne fermée.",
  },

  {
    id: "coiffe",
    nom: "Coiffe des rotateurs",
    nomLatin: "Supraspinatus / Infraspinatus / Subscapularis / Teres minor",
    systeme: "musculaire",
    region: "epaule",
    x: 30,
    y: 16,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "4 muscles profonds formant une manchette stabilisatrice autour de la tête humérale : sus-épineux (abduction), sous-épineux et petit rond (RE), sous-scapulaire (RI).",
    role: "Centrage de la tête humérale dans la glène, rotations interne et externe, stabilisation dynamique.",
    pathologies: [
      "Rupture transfixiante de la coiffe (sus-épineux ++)",
      "Tendinopathie calcifiante",
      "Syndrome de conflit sous-acromial",
      "Tendinite du long biceps",
    ],
    kine: "Renforcement excentrique, travail de centrage gléno-huméral, ultrasons, arthrokinématique.",
  },

  {
    id: "biceps",
    nom: "Biceps brachial",
    nomLatin: "M. biceps brachii",
    systeme: "musculaire",
    region: "bras",
    x: 27,
    y: 28,
    symetrie: true,
    vues: ["face"],
    description:
      "Muscle à 2 chefs (long : tubercule supra-glénoïde ; court : processus coracoïde) s'insérant sur le tubercule bicipital du radius.",
    role: "Flexion du coude (puissant), supination de l'avant-bras, stabilisation dynamique de l'épaule (chef long).",
    pathologies: [
      "Rupture du tendon du long biceps (épaule)",
      "Rupture distale (coude)",
      "Tendinite bicipitale",
    ],
    kine: "Rééducation post-opératoire, renforcement excentrique, massage transverse.",
  },

  {
    id: "triceps",
    nom: "Triceps brachial",
    nomLatin: "M. triceps brachii",
    systeme: "musculaire",
    region: "bras",
    x: 27,
    y: 30,
    symetrie: true,
    vues: ["dos"],
    description:
      "Seul extenseur du coude. 3 chefs : long (scapula, infra-glénoïde), latéral et médial (humérus).",
    role: "Extension du coude, stabilisation postérieure de l'épaule (chef long).",
    pathologies: [
      "Tendinopathie olécranienne du triceps",
      "Rupture rare du triceps",
      "Bursopathie olécranienne",
    ],
    kine: "Renforcement excentrique, massage transverse profond (Cyriax), cryothérapie.",
  },

  {
    id: "epicondyliens",
    nom: "Épicondyliens lat. & méd.",
    nomLatin: "Mm. epicondylares",
    systeme: "musculaire",
    region: "avant-bras",
    x: 25,
    y: 35,
    symetrie: true,
    vues: ["face"],
    description:
      "Épicondyliens latéraux (extenseurs du poignet et doigts) originant sur l'épicondyle latéral. Épicondyliens médiaux (fléchisseurs) sur l'épicondyle médial.",
    role: "Mouvements du poignet, doigts et pronation-supination.",
    pathologies: [
      "Épicondylite latérale (tennis elbow)",
      "Épicondylite médiale (golfer's elbow)",
      "Syndrome du canal cubital",
    ],
    kine: "Massage transverse profond (Cyriax), renforcement excentrique, TENS, ultrasons, orthèse d'épicondyle.",
  },

  {
    id: "quadriceps",
    nom: "Quadriceps",
    nomLatin: "M. quadriceps femoris",
    systeme: "musculaire",
    region: "cuisse",
    x: 36,
    y: 58,
    symetrie: true,
    vues: ["face"],
    description:
      "4 chefs : droit fémoral (bi-articulaire), vaste latéral, vaste médial (VMO, stabilisateur rotulien), vaste intermédiaire. Tendon quadricipital → rotule → tendon rotulien.",
    role: "Extension du genou (principal), flexion de hanche (droit fémoral). Amortissement lors de la réception de sauts.",
    pathologies: [
      "Tendinopathie rotulienne (genou du sauteur)",
      "Rupture du quadriceps",
      "Syndrome fémoro-patellaire",
      "Contusion du quadriceps (hématome)",
    ],
    kine: "Renforcement du VMO (squat guidé), excentrique sur plan incliné, électrostimulation.",
  },

  {
    id: "ischio-jambiers",
    nom: "Ischio-jambiers",
    nomLatin: "Mm. ischiocrurales",
    systeme: "musculaire",
    region: "cuisse",
    x: 36,
    y: 60,
    symetrie: true,
    vues: ["dos"],
    description:
      "3 muscles postérieurs : biceps fémoral (long chef + court chef), semi-tendineux, semi-membraneux. Origine ischion.",
    role: "Flexion du genou, extension de la hanche, frein de la flexion du tronc.",
    pathologies: [
      "Claquage des ischio-jambiers (sport : sprint)",
      "Tendinopathie insertionnelle ischiatique",
      "Syndrome de la loge postérieure",
    ],
    kine: "Renforcement nordique (excentrique), PNF, étirements actifs, retour progressif au sport.",
  },

  {
    id: "fessiers",
    nom: "Fessiers (grand, moyen, petit)",
    nomLatin: "Mm. glutei maximus / medius / minimus",
    systeme: "musculaire",
    region: "bassin",
    x: 38,
    y: 47,
    symetrie: true,
    vues: ["dos"],
    description:
      "Grand fessier (extension et RE de hanche), moyen fessier (abduction, stabilisateur en mono-appui), petit fessier (RI, abduction).",
    role: "Propulsion à la marche et la course, stabilisation pelvienne en appui unipodal, prévention des douleurs lombaires.",
    pathologies: [
      "Tendinopathie du moyen fessier",
      "Syndrome du piriforme",
      "Bursopathie trochantérienne",
      "Douleur fessière post-PTH",
    ],
    kine: "Renforcement en chaîne fermée, clamshell, pont fessier, marche avec bande élastique, isométrique initial si douloureux.",
  },

  {
    id: "soleo-gastrocnemien",
    nom: "Triceps sural (soléaire + gastrocnémiens)",
    nomLatin: "M. triceps surae",
    systeme: "musculaire",
    region: "jambe",
    x: 36,
    y: 79,
    symetrie: true,
    vues: ["dos"],
    description:
      "3 chefs convergeant vers le tendon calcanéen. Gastrocnémiens (bi-articulaires, fémoro-calcanéens), soléaire (uni-articulaire, tibiofibulo-calcanéen).",
    role: "Flexion plantaire (propulsion), pompe musculaire veineuse, stabilisation de la cheville.",
    pathologies: [
      "Tendinopathie achilléenne (insertionnelle/corps du tendon)",
      "Rupture du tendon d'Achille",
      "Claquage du gastrocnémien médial (tennis leg)",
    ],
    kine: "Protocole excentrique d'Alfredson, ondes de choc radiales, massage transverse, reprogrammation proprioceptive.",
  },

  {
    id: "tibial-anterieur",
    nom: "Loge antérieure de jambe",
    nomLatin: "M. tibialis anterior / Mm. extensores",
    systeme: "musculaire",
    region: "jambe",
    x: 33,
    y: 75,
    symetrie: true,
    vues: ["face"],
    description:
      "Tibial antérieur, long extenseur des orteils, long extenseur de l'hallux, long fibulaire antérieur. Loge fermée à risque de syndrome de loge.",
    role: "Dorsiflexion et inversion du pied, contrôle de l'attaque du pas (phase oscillante de marche).",
    pathologies: [
      "Périostite tibiale (shin splints)",
      "Syndrome de loge antérieure chronique",
      "Paralysie du SPE avec steppage",
    ],
    kine: "Renforcement en dorsiflexion contre résistance, étirements, gestion du volume d'entraînement.",
  },

  {
    id: "transverse-abdomen",
    nom: "Transverse abdominal",
    nomLatin: "M. transversus abdominis",
    systeme: "musculaire",
    region: "abdomen",
    x: 42,
    y: 33,
    symetrie: true,
    vues: ["face"],
    description:
      "Muscle profond formant une gaine autour de l'abdomen (comme un corset naturel). Premier muscle activé avant tout mouvement des membres.",
    role: "Stabilisation lombaire, augmentation de la pression intra-abdominale, rôle dans la continence.",
    pathologies: [
      "Insuffisance de la stabilisation lombaire",
      "Diastasis des droits (grossesse)",
      "Hernie inguinale",
    ],
    kine: "Activation du transverse en respiration diaphragmatique, hypopressif, gainage profond.",
  },

  {
    id: "psoas",
    nom: "Muscle ilio-psoas",
    nomLatin: "M. iliopsoas",
    systeme: "musculaire",
    region: "lombaire",
    x: 40,
    y: 42,
    symetrie: true,
    vues: ["face"],
    description:
      "Union du psoas major (L1-L5 → petit trochanter) et de l'iliaque (fosse iliaque → petit trochanter). Muscle le plus puissant du corps en flexion de hanche.",
    role: "Flexion de hanche (dominant), antéversion pelvienne, stabilisateur latéral de la colonne lombaire.",
    pathologies: [
      "Psoas raccourci (hyperlordose, antéversion)",
      "Bursopathie ilio-pectinée",
      "Claquage du psoas (sportif)",
      "Hanche à ressort interne",
    ],
    kine: "Étirements en fente, relâchement myofascial, renforcement excentrique, thérapie viscérale.",
  },

  {
    id: "peroniers",
    nom: "Muscles fibulaires (péroniers)",
    nomLatin: "Mm. fibulares (peronei longus/brevis)",
    systeme: "musculaire",
    region: "cheville",
    x: 32,
    y: 82,
    symetrie: true,
    vues: ["face"],
    description:
      "Long et court fibulaire dans la loge latérale de jambe. Passent derrière la malléole externe.",
    role: "Éversion du pied, stabilisation latérale de la cheville, propulsion.",
    pathologies: [
      "Tendinopathie des fibulaires",
      "Luxation des tendons fibulaires",
      "Claquage fibulaire",
    ],
    kine: "Renforcement en éversion, proprioception, taping, rééducation de la cheville.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ NERVEUX ═══════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "moelle-epiniere",
    nom: "Moelle épinière",
    nomLatin: "Medulla spinalis",
    systeme: "nerveux",
    region: "dos",
    x: 50,
    y: 28,
    symetrie: false,
    vues: ["dos"],
    description:
      "Cordon nerveux de 45 cm dans le canal rachidien (C1-L1/L2). 31 paires de nerfs rachidiens (8C, 12T, 5L, 5S, 1Co). Substance grise centrale, substance blanche périphérique.",
    role: "Transmission des messages cerveau-corps (voies sensitives et motrices), arcs réflexes, centres végétatifs.",
    pathologies: [
      "Tétraplégie (lésion cervicale)",
      "Paraplégie (lésion thoracique/lombaire)",
      "Syndrome de la queue de cheval",
      "Compression médullaire",
    ],
    kine: "Rééducation neurologique intensive (Bobath, locomotion sur tapis, FES), transferts, indépendance fonctionnelle.",
  },

  {
    id: "plexus-brachial",
    nom: "Plexus brachial",
    nomLatin: "Plexus brachialis (C5-T1)",
    systeme: "nerveux",
    region: "cou",
    x: 38,
    y: 12.5,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Réseau nerveux partant du cou formé par les racines C5-T1 en 3 troncs (supérieur, moyen, inférieur), 2 divisions, 3 cordons, 5 nerfs terminaux.",
    role: "Commande motrice et sensitive complète du membre supérieur.",
    pathologies: [
      "Paralysie obstétricale (accouchement)",
      "Avulsion traumatique du plexus (moto)",
      "Syndrome du défilé thoraco-brachial",
    ],
    kine: "Mobilisation neurale, rééducation sensitive, électrostimulation fonctionnelle, orthèses.",
  },

  {
    id: "nerf-median",
    nom: "Nerf médian",
    nomLatin: "N. medianus (C6-T1)",
    systeme: "nerveux",
    region: "avant-bras",
    x: 25,
    y: 40,
    symetrie: true,
    vues: ["face"],
    description:
      "Descend dans le canal médian de l'avant-bras, passe dans le canal carpien au poignet (sous le ligament annulaire).",
    role: "Innervation des fléchisseurs des doigts (index et majeur), muscles thénariens, sensibilité des 3,5 premiers doigts.",
    pathologies: [
      "Syndrome du canal carpien (compression la plus fréquente du corps)",
      "Syndrome du pronateur rond",
      "Paralysie médiane haute/basse",
    ],
    kine: "Orthèse nocturne en position neutre, mobilisation neurale du nerf médian, ultrasonophorèse.",
  },

  {
    id: "nerf-ulnaire",
    nom: "Nerf ulnaire",
    nomLatin: "N. ulnaris (C8-T1)",
    systeme: "nerveux",
    region: "avant-bras",
    x: 23,
    y: 41,
    symetrie: true,
    vues: ["face"],
    description:
      "Passe dans la gouttière épitrochléo-olécrânienne au coude (tunnel cubital) puis dans le canal de Guyon au poignet.",
    role: "Muscles hypothénariens, interosseux, 4e et 5e lombricaux. Sensibilité 4e-5e doigts.",
    pathologies: [
      "Syndrome du canal cubital (2e compression)",
      "Syndrome du canal de Guyon",
      "Griffe ulnaire (intrinsèques paralysés)",
    ],
    kine: "Mobilisation neurale, orthèse de coude, renforcement des interosseux, éducation posturale.",
  },

  {
    id: "nerf-sciatique",
    nom: "Nerf sciatique",
    nomLatin: "N. ischiadicus (L4-S3)",
    systeme: "nerveux",
    region: "cuisse",
    x: 38,
    y: 54,
    symetrie: true,
    vues: ["dos"],
    description:
      "Plus gros nerf du corps (2 cm de diamètre). Issu du plexus sacral, sort du bassin sous le piriforme, descend dans la loge postérieure de cuisse.",
    role: "Innervation motrice et sensitive de la loge postérieure de cuisse, toute la jambe et le pied.",
    pathologies: [
      "Sciatique (hernie discale L4-L5 ou L5-S1 le plus souvent)",
      "Syndrome du piriforme (compression musculaire)",
      "Névralgie sciatique",
    ],
    kine: "Mobilisation neurale (nerf sciatique glissant), traitement de la cause, techniques de neurodynamique.",
  },

  {
    id: "nerf-femoral",
    nom: "Nerf fémoral (crural)",
    nomLatin: "N. femoralis (L2-L4)",
    systeme: "nerveux",
    region: "cuisse",
    x: 37,
    y: 51,
    symetrie: true,
    vues: ["face"],
    description:
      "Branche du plexus lombaire. Passe sous le ligament inguinal dans le triangle de Scarpa, se divise en branches musculaires et nerfs cutanés.",
    role: "Innervation du quadriceps et du sartorius. Sensibilité face antérieure de cuisse et jambe (saphène).",
    pathologies: [
      "Cruralgie (hernie L2-L4)",
      "Méralgie paresthésique (cutané fémoral latéral)",
      "Compression fémorale iatrogène",
    ],
    kine: "Mobilisation neurale en décubitus ventral (test LF3), traitement de la cause (colonne lombaire).",
  },

  {
    id: "nerf-spe",
    nom: "Nerf fibulaire commun (SPE)",
    nomLatin: "N. fibularis communis (L4-S2)",
    systeme: "nerveux",
    region: "jambe",
    x: 33,
    y: 68,
    symetrie: true,
    vues: ["face"],
    description:
      "Bifurcation du sciatique au creux poplité. Contourne le col de la fibula (très vulnérable) puis se divise en SPE superficiel et profond.",
    role: "SPE superficiel : éversion et sensibilité dorsale du pied. SPE profond : dorsiflexion et muscles de la loge antérieure.",
    pathologies: [
      "Paralysie du SPE (steppage)",
      "Compression au col de la fibula (plâtre, position)",
      "Syndrome de loge antérolatérale",
    ],
    kine: "Stimulation électrique fonctionnelle, orthèse releveur de pied, renforcement dorsiflexeurs.",
  },

  {
    id: "nerf-honteux",
    nom: "Nerf honteux (pudendal)",
    nomLatin: "N. pudendus (S2-S4)",
    systeme: "nerveux",
    region: "bassin",
    x: 50,
    y: 48,
    symetrie: false,
    vues: ["face"],
    description:
      "Nerf du périnée issu du plexus sacral. Passe par le canal d'Alcock (fosse ischiorectale).",
    role: "Innervation du périnée, sphincters urétraux et anaux, clitoris/pénis, muscles bulbo-spongieux.",
    pathologies: [
      "Névralgie pudendale (douleur périnéale chronique)",
      "Syndrome du canal d'Alcock",
      "Anesthésie périnéale",
    ],
    kine: "Rééducation périnéale, techniques de nerf glissant pudendal, désensibilisation, biofeedback.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ ARTICULAIRE & TENDINEUX ═══════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "epaule-articulation",
    nom: "Articulation gléno-humérale",
    nomLatin: "Articulatio humeri",
    systeme: "articulaire",
    region: "epaule",
    x: 28,
    y: 17,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Articulation sphéroïde la plus mobile du corps humain (3 degrés de liberté). Stabilité assurée principalement par les muscles (coiffe) et secondairement par les ligaments et le labrum.",
    role: "Flexion, extension, abduction, adduction, rotations interne/externe, circumduction.",
    pathologies: [
      "Luxation antérieure (90% des luxations)",
      "Capsulite rétractile",
      "Instabilité chronique gléno-humérale",
    ],
    kine: "Mobilisation passive progressive, renforcement de la coiffe et des stabilisateurs scapulaires, hydrothérapie.",
  },

  {
    id: "coude",
    nom: "Articulation du coude",
    nomLatin: "Articulatio cubiti",
    systeme: "articulaire",
    region: "bras",
    x: 25,
    y: 33,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Articulation composée : huméro-ulnaire (trochléenne), huméro-radiale et radio-ulnaire proximale.",
    role: "Flexion-extension et prono-supination de l'avant-bras.",
    pathologies: [
      "Épicondylite (tennis elbow)",
      "Épitrochléite (golfer's elbow)",
      "Instabilité du coude",
      "Arthrose du coude",
    ],
    kine: "Mobilisation, renforcement excentrique, ondes de choc, orthèse.",
  },

  {
    id: "poignet",
    nom: "Articulation du poignet",
    nomLatin: "Articulatio radiocarpalis",
    systeme: "articulaire",
    region: "avant-bras",
    x: 21,
    y: 44,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Articulation condylienne entre radius et première rangée du carpe. Complexe TFCC côté ulnaire.",
    role: "Flexion-extension, inclinaisons radiale et ulnaire.",
    pathologies: [
      "Entorse du poignet",
      "Lésion du TFCC",
      "Ténosynovite de De Quervain",
      "Kyste synovial",
    ],
    kine: "Mobilisation, renforcement, proprioception, orthèse.",
  },

  {
    id: "hanche",
    nom: "Articulation coxo-fémorale",
    nomLatin: "Articulatio coxae",
    systeme: "articulaire",
    region: "bassin",
    x: 38,
    y: 49,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Articulation sphéroïde très stable (cotyle profond + labrum). Angle cervicodiaphysaire ~126°, antéversion ~15°.",
    role: "Flexion-extension, abduction-adduction, rotations de la cuisse sur le bassin.",
    pathologies: [
      "Coxarthrose",
      "Conflit fémoro-acétabulaire (FAI)",
      "Nécrose tête fémorale",
      "Bursite trochantérienne",
    ],
    kine: "Mobilisation, renforcement des stabilisateurs, rééducation post-PTH, hydrothérapie.",
  },

  {
    id: "genou",
    nom: "Articulation du genou",
    nomLatin: "Articulatio genus",
    systeme: "articulaire",
    region: "genou",
    x: 35,
    y: 66,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Plus grande articulation du corps. Fémoro-tibiale (condylienne), fémoro-patellaire (trochléenne). Stabilité par ligaments croisés et collatéraux.",
    role: "Flexion-extension, légère rotation en flexion.",
    pathologies: [
      "Gonarthrose",
      "Rupture LCA/LCP",
      "Lésion méniscale",
      "Syndrome rotulien",
    ],
    kine: "Rééducation post-ligamentoplastie, renforcement quadriceps/ischio, proprioception.",
  },

  {
    id: "lca",
    nom: "LCA (ligament croisé antérieur)",
    nomLatin: "Lig. cruciatum anterius",
    systeme: "articulaire",
    region: "genou",
    x: 36,
    y: 67,
    symetrie: true,
    vues: ["face"],
    description:
      "Ligament intra-articulaire extra-synovial reliant le condyle fémoral latéral au tibia. Longueur 3-4 cm, pivote lors de la rotation tibiale.",
    role: "Stabilité antérieure et rotatoire du genou. Proprioception du genou.",
    pathologies: [
      "Rupture du LCA (sport pivot : ski, football, basket)",
      "Entorse du LCA",
      "Laxité chronique antérieure",
    ],
    kine: "Protocole de rééducation post-LCA (4-9 mois) : contrôle neuromusculaire, renforcement, retour au sport (RTS) avec critères.",
  },

  {
    id: "menisques",
    nom: "Ménisques",
    nomLatin: "Meniscus medialis / lateralis",
    systeme: "articulaire",
    region: "genou",
    x: 37,
    y: 67.5,
    symetrie: true,
    vues: ["face"],
    description:
      "2 coussinets fibrocartilagineux en forme de croissant. Le ménisque interne (médial) est semi-mobile, plus souvent lésé. Le ménisque externe est plus mobile.",
    role: "Amortissement (50-70% en compression), stabilité du genou, lubrification, proprioception.",
    pathologies: [
      "Fissure méniscale en anse de seau",
      "Méniscectomie partielle arthroscopique",
      "Dégénérescence méniscale",
    ],
    kine: "Rééducation post-méniscectomie (4-6 semaines), renforcement musculaire, proprioception, retour au sport.",
  },

  {
    id: "cheville",
    nom: "Articulation talo-crurale",
    nomLatin: "Articulatio talocruralis",
    systeme: "articulaire",
    region: "cheville",
    x: 35,
    y: 87,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Articulation trochléenne entre tibia-fibula et talus. Mortaise tibio-fibulaire + dôme talien.",
    role: "Flexion dorsale et plantaire du pied.",
    pathologies: [
      "Entorse de cheville (LTFA ++)",
      "Instabilité chronique",
      "Arthrose de cheville",
      "Conflit antérieur",
    ],
    kine: "Proprioception, renforcement fibulaires, mobilisation, taping fonctionnel.",
  },

  {
    id: "tendon-achille",
    nom: "Tendon d'Achille",
    nomLatin: "Tendo calcaneus (Achillis)",
    systeme: "articulaire",
    region: "cheville",
    x: 36,
    y: 86,
    symetrie: true,
    vues: ["dos"],
    description:
      "Tendon le plus puissant du corps (supporte 6-8 fois le poids du corps à la course). Relie le triceps sural au calcanéum. Zone avasculaire critique à 2-6 cm de l'insertion.",
    role: "Transmission de la force de propulsion du triceps sural lors de la marche, course et saut.",
    pathologies: [
      "Tendinopathie achilléenne corporéale ou insertionnelle",
      "Rupture totale du tendon (pop audible)",
      "Bursopathie rétro ou pré-calcanéenne",
    ],
    kine: "Protocole excentrique d'Alfredson (tendinopathie corporéale), ondes de choc radiales, renforcement progressif.",
  },

  {
    id: "ligaments-cheville",
    nom: "Ligament latéral externe (LLE)",
    nomLatin: "Lig. talofibulare ant./post. / calcaneofibulare",
    systeme: "articulaire",
    region: "cheville",
    x: 33,
    y: 88,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "LLE composé de 3 faisceaux : talofibulaire antérieur (LTFA, le plus souvent lésé), calcanéofibulaire (LCF), talofibulaire postérieur (LTFP). Le ligament deltoïde (LLI) est beaucoup plus résistant.",
    role: "Stabilisation latérale de la cheville, limitation de l'inversion excessive.",
    pathologies: [
      "Entorse latérale de cheville (la plus fréquente du corps)",
      "Instabilité chronique de cheville",
      "Syndrome du sinus du tarse",
    ],
    kine: "Proprioception (plateau Freeman, boitier TENS), renforcement des fibulaires, taping, retour au sport.",
  },

  {
    id: "disques-intervertebraux",
    nom: "Disques intervertébraux",
    nomLatin: "Disci intervertebrales",
    systeme: "articulaire",
    region: "dos",
    x: 50,
    y: 32,
    symetrie: false,
    vues: ["dos"],
    description:
      "23 disques. Nucleus pulposus central (gel hydraté à 70-90% eau) + annulus fibrosus périphérique (lamelles concentriques). Hauteur totale = 20-25% de la taille de l'individu.",
    role: "Amortissement des chocs (nucleus), répartition des charges (annulus), mobilité rachidienne.",
    pathologies: [
      "Hernie discale (protrusion, extrusion, séquestration)",
      "Discopathie dégénérative",
      "Fissure de l'annulus",
    ],
    kine: "Méthode McKenzie, tractions vertébrales, stabilisation segmentaire, neuromécanique.",
  },

  {
    id: "symphyse-pubienne",
    nom: "Symphyse pubienne",
    nomLatin: "Symphysis pubica",
    systeme: "articulaire",
    region: "bassin",
    x: 50,
    y: 46,
    symetrie: false,
    vues: ["face"],
    description:
      "Articulation fibrocartilagineurse médiane du bassin antérieur reliant les deux pubis. Micro-mobilité de 2 mm.",
    role: "Stabilité du bassin antérieur, transmission des forces de rotation.",
    pathologies: [
      "Ostéite pubienne (footballeurs)",
      "Pubalgie de sportif",
      "Diastasis pubien (grossesse)",
    ],
    kine: "Renforcement des adducteurs et abdominaux, mise au repos sportif, reprise progressive.",
  },

  {
    id: "sacro-iliaque",
    nom: "Articulation sacro-iliaque",
    nomLatin: "Articulatio sacroiliaca",
    systeme: "articulaire",
    region: "bassin",
    x: 42,
    y: 44,
    symetrie: true,
    vues: ["dos"],
    description:
      "Articulation synoviale plane/amphiarthrose entre sacrum et ilium. Mobilité très faible (nutation/contre-nutation).",
    role: "Transmission des charges tronc-membres inférieurs, amortissement.",
    pathologies: [
      "Sacro-iliite",
      "Blocage sacro-iliaque",
      "Syndrome de la ceinture pelvienne (grossesse)",
    ],
    kine: "Mobilisation, manipulation, renforcement stabilisateurs pelviens, ceinture de soutien.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ ARTÉRIEL ══════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "coeur",
    nom: "Cœur",
    nomLatin: "Cor",
    systeme: "arteriel",
    region: "thorax",
    symetrie: false,
    x: 55,
    y: 21,
    vues: ["face"],
    description:
      "Pompe musculaire de 300 g, 4 cavités. 2 oreillettes (réception) + 2 ventricules (éjection). Débit de repos : 5 L/min. Effort : 20-25 L/min.",
    role: "Propulsion du sang dans la petite circulation (poumons) et grande circulation (corps).",
    pathologies: [
      "Insuffisance cardiaque",
      "Post-infarctus du myocarde",
      "Post-pontage coronarien",
      "Valvulopathies",
    ],
    kine: "Réadaptation cardiaque supervisée (phases I, II, III), reconditionnement à l'effort, éducation thérapeutique.",
  },

  {
    id: "aorte",
    nom: "Aorte & grandes artères",
    nomLatin: "Aorta",
    systeme: "arteriel",
    region: "thorax",
    x: 50,
    y: 27,
    symetrie: false,
    vues: ["face", "dos"],
    description:
      "Aorte ascendante (3 cm) → crosse (tronc brachiocéphalique, carotides, sous-clavières) → aorte thoracique descendante → aorte abdominale (rénales, mésentériques, iliaques).",
    role: "Distribution du sang oxygéné à l'ensemble de l'organisme.",
    pathologies: [
      "Anévrisme de l'aorte abdominale (AAA)",
      "Dissection aortique",
      "Coarctation de l'aorte",
    ],
    kine: "Précautions post-chirurgicales, réadaptation douce, surveillance tensionnelle.",
  },

  {
    id: "artere-femorale",
    nom: "Artères des membres inférieurs",
    nomLatin: "A. femoralis / poplitea / tibiales",
    systeme: "arteriel",
    region: "cuisse",
    x: 40,
    y: 52,
    symetrie: true,
    vues: ["face"],
    description:
      "A. iliaque externe → A. fémorale commune (triangle de Scarpa, palpable) → A. fémorale superficielle → A. poplitée → A. tibiales ant. et post.",
    role: "Vascularisation du membre inférieur.",
    pathologies: [
      "Artériopathie oblitérante des membres inférieurs (AOMI)",
      "Claudication intermittente",
      "Ischémie critique de jambe",
    ],
    kine: "Programme supervisé de marche vasculaire (traitement de référence), reconditionnement à l'effort.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ VEINEUX ═══════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "reseau-veineux-mi",
    nom: "Réseau veineux membre inférieur",
    nomLatin: "Vv. saphena magna / parva / profundes",
    systeme: "veineux",
    region: "jambe",
    x: 34,
    y: 76,
    symetrie: true,
    vues: ["face", "dos"],
    description:
      "Grande veine saphène (face interne, cheville → aine), petite saphène (face postérieure, cheville → creux poplité). Réseau profond accompagnant les artères. Valvules anti-reflux tous les 2-3 cm.",
    role: "Retour veineux vers le cœur droit, rôle thermique.",
    pathologies: [
      "Insuffisance veineuse chronique",
      "Varices",
      "Phlébite / TVP (thrombose veineuse profonde)",
      "Syndrome post-thrombotique",
    ],
    kine: "Drainage lymphatique manuel (DLM), compression (bandage multicouche), exercices de pompe musculaire, élévation.",
  },

  {
    id: "veines-jugulaires",
    nom: "Veines jugulaires & caves",
    nomLatin: "Vv. jugulares / cavae",
    systeme: "veineux",
    region: "cou",
    x: 44,
    y: 11,
    symetrie: true,
    vues: ["face"],
    description:
      "Jugulaires interne (sinus veineux crâniens) et externe (drainage superficiel cervicofacial). VCS et VCI collectent le sang pour l'oreillette droite.",
    role: "Retour veineux céphalique et systémique vers le cœur droit.",
    pathologies: [
      "Thrombose jugulaire interne (post-cathéter)",
      "Turgescence jugulaire (insuffisance cardiaque droite)",
      "Syndrome cave supérieur",
    ],
    kine: "Drainage lymphatique cervicocéphalique, techniques de drainage fascial.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ LYMPHATIQUE ═══════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ganglions-axillaires",
    nom: "Ganglions axillaires",
    nomLatin: "Nodi lymphoidei axillares",
    systeme: "lymphatique",
    region: "thorax",
    x: 31,
    y: 20,
    symetrie: true,
    vues: ["face"],
    description:
      "20-30 ganglions dans le creux axillaire organisés en 5 groupes (latéral, médial, postérieur, central, apical). Drainent le membre supérieur, le sein, la paroi thoracique.",
    role: "Filtration de la lymphe, immunité locale (ganglions sentinelles du sein).",
    pathologies: [
      "Lymphœdème du membre supérieur (post-curage axillaire dans le cancer du sein)",
      "Adénopathie axillaire",
    ],
    kine: "Drainage lymphatique manuel (méthode Vodder), compression multi-couches (bandaging), auto-drainage enseigné.",
  },

  {
    id: "ganglions-inguinaux",
    nom: "Ganglions inguinaux",
    nomLatin: "Nodi lymphoidei inguinales",
    systeme: "lymphatique",
    region: "bassin",
    x: 40,
    y: 48,
    symetrie: true,
    vues: ["face"],
    description:
      "Superficiels (aine, palpables) et profonds (sous le fascia lata). Drainent le membre inférieur, les organes génitaux, le périnée et le tégument abdominal bas.",
    role: "Filtration lymphatique, barrière immunologique du membre inférieur.",
    pathologies: [
      "Lymphœdème du membre inférieur (post-curage pelvien/inguinal)",
      "Éléphantisis",
      "Adénopathie inguinale",
    ],
    kine: "Drainage lymphatique manuel, compression élastique sur mesure, programmes intensifs de décongestion.",
  },

  {
    id: "canal-thoracique",
    nom: "Canal thoracique",
    nomLatin: "Ductus thoracicus",
    systeme: "lymphatique",
    region: "thorax",
    x: 48,
    y: 25,
    symetrie: false,
    vues: ["face", "dos"],
    description:
      "Principal collecteur (75% du lymphe du corps). Naît de la citerne de Pecquet (L2), remonte jusqu'à l'angle veineux gauche (jonction jugulaire-sous-clavière).",
    role: "Retour de la lymphe dans la circulation veineuse.",
    pathologies: [
      "Chylothorax (brèche traumatique ou post-chirurgicale)",
      "Obstruction du canal thoracique",
    ],
    kine: "Massage thoracique profond, techniques de facilitation du drainage médiastinal.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ RESPIRATOIRE ══════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "poumons",
    nom: "Poumons (droit & gauche)",
    nomLatin: "Pulmones",
    systeme: "respiratoire",
    region: "thorax",
    x: 38,
    y: 23,
    symetrie: true,
    vues: ["face"],
    description:
      "Poumon droit : 3 lobes (supérieur, moyen, inférieur). Poumon gauche : 2 lobes (supérieur avec lingula, inférieur). 300 millions d'alvéoles, surface d'échange de 80-100 m².",
    role: "Hématose : O2 → sang, CO2 → air expiré.",
    pathologies: [
      "Pneumonie",
      "Pleurésie",
      "Pneumothorax",
      "BPCO",
      "Bronchectasies",
      "Fibrose pulmonaire",
    ],
    kine: "Désencombrement bronchique (AFE, drainage postural, vibrations), réentraînement à l'effort, ventilation dirigée.",
  },

  {
    id: "diaphragme",
    nom: "Diaphragme",
    nomLatin: "Diaphragma",
    systeme: "respiratoire",
    region: "thorax",
    x: 50,
    y: 29,
    symetrie: false,
    vues: ["face"],
    description:
      "Principal muscle inspiratoire en forme de dôme séparant thorax et abdomen. Coupole droite plus haute (foie). Innervation : nerf phrénique (C3-C5).",
    role: "Inspiration (75% du volume courant), stabilisation lombaire (hausse pression intra-abdominale), rôle dans la continence.",
    pathologies: [
      "Dysfonction diaphragmatique post-chirurgie cardiaque",
      "Hernie hiatale",
      "Hoquet chronique",
      "Dyspnée d'effort",
    ],
    kine: "Rééducation diaphragmatique (respiration abdominale), cohérence cardio-respiratoire, techniques viscérales.",
  },

  {
    id: "bronches-trachee",
    nom: "Trachée & Arbre bronchique",
    nomLatin: "Trachea / Bronchi",
    systeme: "respiratoire",
    region: "thorax",
    x: 50,
    y: 18,
    symetrie: false,
    vues: ["face"],
    description:
      "Trachée (15 cm, 17-22 anneaux cartilagineux) → bronches souches → bronches lobaires → segmentaires → bronchioles → canaux alvéolaires. 23 générations de divisions.",
    role: "Acheminement de l'air vers les alvéoles, humidification, filtration (cils), défense mucociliaire.",
    pathologies: [
      "Asthme bronchique",
      "BPCO (emphysème + bronchite chronique)",
      "Bronchiolite (nourrisson)",
      "Mucoviscidose",
    ],
    kine: "Techniques de désencombrement (AFE, IPV, flutter), assistance à la toux, aérosolthérapie.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ DIGESTIF & VISCÉRAL ═══════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "estomac",
    nom: "Estomac",
    nomLatin: "Gaster",
    systeme: "digestif",
    region: "abdomen",
    x: 55,
    y: 32,
    symetrie: false,
    vues: ["face"],
    description:
      "Poche musculaire en J sous le diaphragme gauche. Capacité 1,5 L. Muqueuse avec cellules pariétales (HCl) et peptiques (pepsine).",
    role: "Brassage mécanique, digestion chimique des protéines, péristaltisme, stockage des aliments.",
    pathologies: [
      "RGO (reflux gastro-œsophagien)",
      "Gastrite",
      "Ulcère gastroduodénal",
      "Gastroparésie",
    ],
    kine: "Thérapie viscérale ostéopathique, mobilisation de l'estomac, techniques diaphragmatiques, postures antireflux.",
  },

  {
    id: "foie-vesicule",
    nom: "Foie & Vésicule biliaire",
    nomLatin: "Hepar / Vesica biliaris",
    systeme: "digestif",
    region: "abdomen",
    x: 42,
    y: 28,
    symetrie: false,
    vues: ["face"],
    description:
      "Foie : 1,5 kg, 8 segments, lobe droit > gauche. Vésicule biliaire : réservoir de 50 ml de bile sous le foie. Drainé par le canal cholédoque vers le duodénum.",
    role: "Métabolisme des macronutriments, détoxification, synthèse protéique (albumine, facteurs coagulation), stockage glycogène et vitamines.",
    pathologies: [
      "Hépatomégalie",
      "Cirrhose",
      "Lithiase biliaire (cholélithiase)",
      "Ptose hépatique",
    ],
    kine: "Thérapie viscérale du foie (mobilisation), traitement des fascias hépatiques, travail diaphragmatique.",
  },

  {
    id: "intestins",
    nom: "Intestin grêle & Côlon",
    nomLatin: "Intestinum tenue / Colon",
    systeme: "digestif",
    region: "abdomen",
    x: 50,
    y: 38,
    symetrie: false,
    vues: ["face"],
    description:
      "Intestin grêle : 6-7 m (duodénum, jéjunum, iléum). Côlon : 1,5 m (ascendant, transverse, descendant, sigmoïde, rectum). Surface totale d'absorption : 200 m² (villosités).",
    role: "Absorption des nutriments (grêle), réabsorption eau et électrolytes, formation des selles (côlon).",
    pathologies: [
      "SII (syndrome de l'intestin irritable)",
      "Maladie de Crohn",
      "Colite ulcéreuse",
      "Constipation chronique",
      "Adhérences post-chirurgicales",
    ],
    kine: "Massage abdominal viscéral (transit), mobilisation des fascias péritonéaux, thérapie viscérale des adhérences.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ URINAIRE ══════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "reins",
    nom: "Reins",
    nomLatin: "Renes",
    systeme: "urinaire",
    region: "lombaire",
    x: 42,
    y: 35,
    symetrie: true,
    vues: ["dos"],
    description:
      "Organes rétropéritonéaux de 150 g chacun. 1 million de néphrons (unité fonctionnelle). Filtrent 180 L de sang/jour pour produire 1,5 L d'urine.",
    role: "Filtration du sang, régulation de la pression artérielle (rénine), équilibre acido-basique et osmotique.",
    pathologies: [
      "Lithiase rénale (colique néphretique)",
      "Ptose rénale",
      "Insuffisance rénale chronique",
      "Rein polykystique",
    ],
    kine: "Thérapie viscérale du rein (mobilisation, élévation), traitement des fascias rénaux, vibrations.",
  },

  {
    id: "vessie-uretrales",
    nom: "Vessie & Urètre",
    nomLatin: "Vesica urinaria / Urethra",
    systeme: "urinaire",
    region: "bassin",
    x: 50,
    y: 45,
    symetrie: false,
    vues: ["face"],
    description:
      "Vessie : réservoir musculo-membraneux (capacité fonctionnelle 300-500 ml). Urètre : 4 cm (femme) ou 20 cm (homme). Sphincters interne (involontaire) et externe (volontaire).",
    role: "Stockage (remplissage, compliance) et vidange contrôlée de l'urine.",
    pathologies: [
      "Incontinence urinaire d'effort (IUE)",
      "Urgences mictionnelles (hyperactivité vésicale)",
      "Dysurie",
      "Rétention urinaire",
    ],
    kine: "Rééducation périnéale (biofeedback, électrostimulation, rééducation manuelle), agenda mictionnel, bladder training.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ CÉRÉBRAL ══════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "cortex-cerebral",
    nom: "Cortex cérébral",
    nomLatin: "Cortex cerebri",
    systeme: "cerebral",
    region: "tete",
    x: 50,
    y: 3,
    symetrie: false,
    vues: ["face"],
    description:
      "2-4 mm d'épaisseur, ~100 milliards de neurones, 150 000 km d'axones. Lobes frontal (moteur, exécutif), pariétal (sensitif, spatial), temporal (auditif, mémoire), occipital (visuel).",
    role: "Motricité volontaire, sensibilité, cognition, langage (Broca, Wernicke), mémoire, émotions, personnalité.",
    pathologies: [
      "AVC ischémique / hémorragique",
      "Traumatisme crânio-cérébral (TCC)",
      "Tumeur cérébrale",
      "Épilepsie",
    ],
    kine: "Rééducation neurologique (Bobath, PNF, Perfetti), rééducation cognitive, marche, activités de la vie quotidienne.",
  },

  {
    id: "cervelet",
    nom: "Cervelet",
    nomLatin: "Cerebellum",
    systeme: "cerebral",
    region: "tete",
    x: 50,
    y: 7,
    symetrie: false,
    vues: ["dos"],
    description:
      "Sous les hémisphères, 10% du volume cérébral mais 50% des neurones. 3 lobes (flocculo-nodulaire, antérieur, postérieur). 3 pédoncules cérébelleux.",
    role: "Coordination motrice, équilibre postural, apprentissage moteur, ajustement du tonus musculaire.",
    pathologies: [
      "Syndrome cérébelleux post-AVC",
      "Ataxie cérébelleuse (hérédodégénérative)",
      "Atrophie cérébelleuse",
    ],
    kine: "Exercices de Frenkel (coordination fine), équilibre progressif, stabilisation tronc, apprentissage moteur.",
  },

  {
    id: "vestibule",
    nom: "Appareil vestibulaire",
    nomLatin: "Apparatus vestibularis",
    systeme: "cerebral",
    region: "tete",
    x: 40,
    y: 6,
    symetrie: true,
    vues: ["face"],
    description:
      "Oreille interne : 3 canaux semi-circulaires (rotations 3D) + 2 organes otolithiques (accélération linéaire : utricule et saccule). Nerf vestibulaire (VIII). Otolithes : cristaux de carbonate de calcium.",
    role: "Détection des mouvements et position de la tête, réflexe vestibulo-oculaire (stabilisation du regard), réflexe vestibulospinal (posture).",
    pathologies: [
      "VPPB (vertige paroxystique positionnel bénin, le plus fréquent des vertiges)",
      "Névrite vestibulaire",
      "Maladie de Ménière (hydrops)",
      "Labyrinthite",
    ],
    kine: "Manœuvre d'Epley ou Semont (VPPB canaux postérieurs), exercices de Cawthorne-Cooksey, rééducation vestibulaire.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ══ PÉRINÉAL & PELVIEN ════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "plancher-pelvien",
    nom: "Plancher pelvien (releveur de l'anus)",
    nomLatin: "M. levator ani (pubococcygeus, iliococcygeus, puborectalis)",
    systeme: "perineal",
    region: "bassin",
    x: 50,
    y: 47,
    symetrie: false,
    vues: ["face"],
    description:
      "Ensemble musculo-aponévrotique fermant le bas du bassin. 3 faisceaux du releveur : pubo-coccygien (continence), pubo-rectal (angle ano-rectal), ilio-coccygien. + Muscles coccygiens.",
    role: "Continence urinaire et fécale, soutien des organes pelviens (utérus, vessie, rectum), fonction sexuelle, synchronisation avec diaphragme thoracique et transverse.",
    pathologies: [
      "Incontinence urinaire d'effort",
      "Incontinence fécale",
      "Prolapsus des organes pelviens (cystocèle, rectocèle, hystérocèle)",
      "Douleurs périnéales chroniques",
      "Vaginisme",
      "Dyspareunie",
    ],
    kine: "Rééducation périnéale (biofeedback EMG, électrostimulation endocavitaire, rééducation manuelle interne/externe), hypopressif, travail proprioceptif.",
  },

  {
    id: "perinee-superficiel",
    nom: "Périnée superficiel & Sphincters",
    nomLatin: "Mm. perinei superficiales / Mm. sphincteres",
    systeme: "perineal",
    region: "bassin",
    x: 50,
    y: 49,
    symetrie: false,
    vues: ["face"],
    description:
      "Bulbo-spongieux, ischio-caverneux, transverse superficiel du périnée. Sphincter urétral externe (S2-S4, volontaire). Sphincter anal externe (S2-S4, volontaire).",
    role: "Continence (sphincters), érection/éjaculation, soutien périnéal postérieur.",
    pathologies: [
      "Incontinence fécale (déchirure obstétricale)",
      "Dyspareunie superficielle",
      "Vulvodynie",
      "Syndrome douloureux pelvien chronique",
    ],
    kine: "Techniques manuelles périnéales, désensibilisation progressive, relaxation périnéale, électrostimulation.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// ══ HELPERS ═════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════
export function getBySysteme(systemeId) {
  return STRUCTURES.filter((s) => s.systeme === systemeId);
}

export function getByRegion(region) {
  return STRUCTURES.filter((s) => s.region === region);
}

export function search(terme) {
  const t = terme.toLowerCase();
  return STRUCTURES.filter(
    (s) =>
      s.nom.toLowerCase().includes(t) ||
      (s.nomLatin && s.nomLatin.toLowerCase().includes(t)) ||
      s.description.toLowerCase().includes(t) ||
      s.pathologies.some((p) => p.toLowerCase().includes(t)),
  );
}

export const REGIONS_LABELS = {
  tete: "Tête",
  cou: "Cou",
  epaule: "Épaule",
  bras: "Bras",
  "avant-bras": "Avant-bras",
  main: "Main",
  thorax: "Thorax",
  dos: "Dos",
  abdomen: "Abdomen",
  lombaire: "Lombaires",
  bassin: "Bassin / Hanche",
  cuisse: "Cuisse",
  genou: "Genou",
  jambe: "Jambe",
  cheville: "Cheville",
  pied: "Pied",
};
