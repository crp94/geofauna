import type { RawSpeciesEntry } from "./types";

export const reptiles: RawSpeciesEntry[] = [
  // 51. Komodo Dragon
  {
    id: "komodo-dragon",
    commonName: { en: "Komodo Dragon", es: "Dragón de Komodo", it: "Drago di Komodo" },
    scientificName: "Varanus komodoensis",
    taxonClass: "Reptilia",
    order: "Squamata",
    family: "Varanidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~3,300 – 3,500 individuals (Komodo National Park & Flores)",
    populationHistory: [
      { year: 1990, estimate: 5000 },
      { year: 2021, estimate: 3400, label: "Uplisted to Endangered on climate criteria" },
      { year: 2024, estimate: 3300 },
    ],
    climateVulnerability: {
      en: "Sea level rise and rising temperatures are projected to reduce available lowland habitat by at least 30-71% across small volcanic island ranges by 2050.",
      es: "El ascenso del nivel del mar y calor extremo reducirán entre 30% y 71% su hábitat costero insular para 2050.",
      it: "L'innalzamento del mare e l'aumento termico ridurranno fino al 71% l'habitat disponibile sulle piccole isole.",
    },
    keyThreats: [
      {
        threat: "Habitat fragmentation & deer poaching",
        impact: "high",
        description: {
          en: "Poaching of primary prey (Rusa deer) outside park borders and agricultural encroachment.",
          es: "Caza furtiva de ciervos rusa (presa básica) y fragmentación de hábitat en la isla de Flores.",
          it: "Bracconaggio dei cervi rusa e frammentazione dell'habitat sull'isola di Flores.",
        },
      },
    ],
    diet: {
      en: "Apex hypercarnivore: Timor deer, wild boar, water buffalo, monkeys, and smaller dragons.",
      es: "Superdepredador hipercarnívoro: ciervo de Timor, jabalí, búfalo de agua y carroña.",
      it: "Carnivoro apicale: cervi di Timor, cinghiali, bufali d'acqua e carogne.",
    },
    clues: [
      {
        en: "The largest living lizard on Earth, growing up to 3 meters in length and weighing over 70 kg, dominating tropical savanna island ecosystems.",
        es: "El lagarto más grande y pesado del planeta, alcanzando hasta 3 metros de longitud y 70 kg en sabanas de islas volcánicas.",
        it: "La più grande lucertola vivente sulla Terra, lunga fino a 3 metri e pesante oltre 70 kg.",
      },
      {
        en: "Dispatches large mammalian prey using serrated shark-like teeth and mandibular venom glands that secrete anticoagulant toxins.",
        es: "Caza grandes mamíferos mediante dientes aserrados tipo tiburón y glándulas mandibulares de veneno anticoagulante.",
        it: "Abbatte grandi prede grazie a denti seghettati e ghiandole velenifere mandibolari che secernono anticoagulanti.",
      },
    ],
    image: {
      url: "/images/species/komodo-dragon.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Komodo_dragon_(Varanus_komodoensis).jpg",
      alt: "Komodo dragon on sandy terrain",
    },
    rangeConfig: [{ minLon: 119.2, maxLon: 120.6, minLat: -8.9, maxLat: -8.3 }],
  },

  // 52. Marine Iguana
  {
    id: "marine-iguana",
    commonName: { en: "Marine Iguana", es: "Iguana Marina", it: "Iguana Marina" },
    scientificName: "Amblyrhynchus cristatus",
    taxonClass: "Reptilia",
    order: "Squamata",
    family: "Iguanidae",
    realm: "Coastal",
    difficulty: "endemic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~200,000 – 300,000 individuals",
    populationHistory: [
      { year: 1982, estimate: 500000, label: "Catastrophic El Niño mortality event" },
      { year: 2000, estimate: 300000 },
      { year: 2024, estimate: 250000 },
    ],
    climateVulnerability: {
      en: "Severe El Niño warming events kill off cold-water intertidal green and red algae, causing up to 90% local colony starvation.",
      es: "Eventos de El Niño calientan el agua y destruyen las algas rojas y verdes, causando hasta 90% de mortandad.",
      it: "Le ondate di calore di El Niño distruggono le alghe intertidali provocando morie di massa per fame.",
    },
    keyThreats: [
      {
        threat: "El Niño cycles & feral predators",
        impact: "high",
        description: {
          en: "Thermal nutrient starvation during warm phases and predation by feral cats on hatchlings.",
          es: "Inanición durante fases cálidas y depredación de crías por gatos asilvestrados.",
          it: "Mancanza di nutrienti durante El Niño e predazione dei piccoli da parte di gatti randagi.",
        },
      },
    ],
    diet: {
      en: "Marine herbivore: Subtidal and intertidal red and green macroalgae grazed off submerged lava rocks.",
      es: "Herbívoro marino: macroalgas rojas y verdes pastadas sobre rocas volcánicas sumergidas.",
      it: "Erbivoro marino: alghe rosse e verdi pascolate sulle rocce laviche sommerse.",
    },
    clues: [
      {
        en: "The only marine lizard in the world, diving to depths of 15 meters on submerged volcanic basalt reefs to graze on macroalgae.",
        es: "El único lagarto marino del mundo, buceando hasta 15 m de profundidad en arrecifes de lava para pastar algas.",
        it: "L'unica lucertola marina al mondo, si immerge fino a 15 metri sui fondali basaltici per nutrirsi di alghe.",
      },
      {
        en: "Possesses specialized cranial salt glands connected to its nostrils that periodically 'sneeze' out concentrated saline crusts, and can shrink its skeletal body length by up to 20% during food shortages.",
        es: "Expulsa sal marina estornudando por glándulas nasales y puede encoger su propio esqueleto óseo hasta un 20% en hambrunas.",
        it: "Espelle il sale in eccesso 'starnutendo' da speciali ghiandole nasali e può ridurre la propria lunghezza ossea del 20% nei periodi di carestia.",
      },
    ],
    image: {
      url: "/images/species/marine-iguana.jpg",
      photographer: "Deko4you",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Amblyrhynchus_cristatus.jpg",
      alt: "Marine iguanas resting at the water's edge on volcanic rock",
    },
    rangeConfig: [{ minLon: -91.8, maxLon: -89.2, minLat: -1.5, maxLat: 0.7, includeOcean: true }],
  },

  // 53. Galápagos Giant Tortoise
  {
    id: "galapagos-giant-tortoise",
    commonName: { en: "Galápagos Giant Tortoise", es: "Tortuga Gigante de Galápagos", it: "Tartaruga Gigante delle Galápagos" },
    scientificName: "Chelonoidis niger",
    taxonClass: "Reptilia",
    order: "Testudines",
    family: "Testudinidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "CR",
    populationTrend: "increasing",
    populationEstimate: "~20,000 – 25,000 individuals across subspecies complexes",
    populationHistory: [
      { year: 1800, estimate: 250000 },
      { year: 1970, estimate: 3000, label: "Cumulative effect of historic whaling-era overharvesting and invasive predators" },
      { year: 2000, estimate: 15000 },
      { year: 2024, estimate: 22000 },
    ],
    climateVulnerability: {
      en: "Altered cloud mist (garúa) elevation shifts highland pasture moisture and affects nest incubation temperatures.",
      es: "La alteración de la garúa neblinosa seca pastos altos y modifica la temperatura de incubación de huevos.",
      it: "I cambiamenti nella nebbia estiva alterano i pascoli e le temperature di incubazione delle uova.",
    },
    conservationActions: {
      en: "The IUCN does not publish one Red List assessment for the whole Chelonoidis niger complex; the 15 recognized island populations are assessed individually and range from Extinct in the Wild (Floreana) to Vulnerable (Pinzón). The CR rating shown here reflects the most-threatened, best-documented populations, such as the iconic Santa Cruz tortoise (C. porteri), which has lost roughly 90% of its historic numbers.",
      es: "La UICN no publica una única evaluación para todo el complejo Chelonoidis niger; las 15 poblaciones insulares reconocidas se evalúan por separado y van desde Extinta en Estado Silvestre (Floreana) hasta Vulnerable (Pinzón). La categoría CR aquí mostrada refleja a las poblaciones más amenazadas y mejor documentadas, como la icónica tortuga de Santa Cruz (C. porteri), que ha perdido cerca del 90% de sus efectivos históricos.",
      it: "La IUCN non pubblica una valutazione unica per l'intero complesso Chelonoidis niger; le 15 popolazioni insulari riconosciute vengono valutate singolarmente e variano da Estinta in Natura (Floreana) a Vulnerabile (Pinzón). La categoria CR qui indicata riflette le popolazioni più minacciate e meglio documentate, come l'iconica tartaruga di Santa Cruz (C. porteri), che ha perso circa il 90% dei suoi effettivi storici.",
    },
    keyThreats: [
      {
        threat: "Invasive mammalian herbivores & predators",
        impact: "medium",
        description: {
          en: "Feral goats destroying vegetation (largely eradicated) and rats preying on hatchlings.",
          es: "Degradación histórica de vegetación por cabras y depredación de crías por ratas invasoras.",
          it: "Competizione per il pascolo con capre e predazione dei piccoli da ratti.",
        },
      },
    ],
    diet: {
      en: "Herbivore: Prickly pear cactus pads (Opuntia), grasses, fallen fruits, lichens, and native shrubs.",
      es: "Herbívoro: palas de chumbera (Opuntia), gramíneas, frutos caídos y líquenes.",
      it: "Erbivoro: pale di fico d'India (Opuntia), erba, frutti caduti e licheni.",
    },
    clues: [
      {
        en: "Gigantic terrestrial chelonian with individuals living over 150 years and weighing over 300 kg, roaming isolated volcanic islands.",
        es: "Quelonio terrestre gigante que supera los 150 años de longevidad y 300 kg de peso en islas volcánicas aisladas.",
        it: "Testuggine terrestre gigante che supera i 150 anni di vita e i 300 kg di peso su isole vulcaniche.",
      },
      {
        en: "Exhibits distinct morphological shell variations between domed carapaces in humid highlands and saddleback carapaces with flared rims in arid lowlands.",
        es: "Muestra carapachos abombados en tierras altas húmedas y carapachos en silla de montar en tierras bajas áridas para estirar el cuello.",
        it: "Presenta carapaci a cupola negli altipiani umidi e a sella di cavallo nelle zone aride per raggiungere i rami alti.",
      },
    ],
    image: {
      url: "/images/species/galapagos-giant-tortoise.jpg",
      photographer: "Bengt Oberger",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Galapagos_giant_tortoise_01.jpg",
      alt: "Close-up of a Galápagos giant tortoise's head and shell",
    },
    rangeConfig: [{ minLon: -91.6, maxLon: -89.4, minLat: -1.4, maxLat: 0.6 }],
  },

  // 54. Leatherback Sea Turtle
  {
    id: "leatherback-sea-turtle",
    commonName: { en: "Leatherback Sea Turtle", es: "Tortuga Laúd", it: "Tartaruga Liuto" },
    scientificName: "Dermochelys coriacea",
    taxonClass: "Reptilia",
    order: "Testudines",
    family: "Dermochelyidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~20,000 – 30,000 nesting females globally (Pacific subpopulations critically low)",
    populationHistory: [
      { year: 1982, estimate: 115000 },
      { year: 2000, estimate: 34000 },
      { year: 2024, estimate: 25000 },
    ],
    climateVulnerability: {
      en: "Rising beach sand incubation temperatures skew hatchling sex ratios toward 100% females and cause thermal nest mortality.",
      es: "El calor en arenas de nidificación feminiza al 100% las nidadas y causa letalidad térmica en embriones.",
      it: "L'aumento delle temperature della sabbia femminilizza le nidiate e aumenta la mortalità embrionale.",
    },
    keyThreats: [
      {
        threat: "Pelagic longline bycatch & plastic ingestion",
        impact: "high",
        description: {
          en: "Drowning in oceanic longlines/driftnets and fatal mistaking of floating plastic bags for jellyfish.",
          es: "Ahogamiento accidental en palangres oceánicos e ingestión mortal de bolsas plásticas confundidas con medusas.",
          it: "Catture accidentali nei palamiti e ingestione letale di sacchetti di plastica scambiati per meduse.",
        },
      },
    ],
    diet: {
      en: "Gelatinovore specialist: Jellyfish (Scyphozoa), salps, and siphonophores captured with backward-pointing esophageal spines.",
      es: "Especialista gelatinívoro: medusas y salpas retenidas con papilas esofágicas orientadas hacia adentro.",
      it: "Specialista in meduse e tunicati pelagici trattenuti da spine esofagee rivolte all'indietro.",
    },
    clues: [
      {
        en: "The largest living turtle and the heaviest non-crocodilian reptile, reaching lengths over 2 meters and diving to freezing depths exceeding 1,200 meters.",
        es: "La tortuga más grande del mundo y el reptil no crocodiliano más pesado, superando 2 m de longitud y buceando a más de 1.200 m de profundidad.",
        it: "La tartaruga più grande del mondo, capace di immersioni record a oltre 1.200 metri in acque gelide.",
      },
      {
        en: "Lacks a bony hard carapace, instead possessing a flexible, leathery oily skin shell with 7 prominent longitudinal dorsal ridges, maintaining endothermy through counter-current heat exchangers.",
        es: "Carece de caparazón óseo duro, luciendo una coraza correosa con 7 crestas longitudinales y manteniendo calor corporal mediante endotermia.",
        it: "Priva di carapace osseo rigido, ha una pelle cuoiosa con 7 carene longitudinali e mantiene il corpo caldo grazie a scambiatori termici.",
      },
    ],
    image: {
      url: "/images/species/leatherback-sea-turtle.jpg",
      photographer: "Bernard DUPONT",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Leatherback_Sea_Turtle_(Dermochelys_coriacea)_(10628948135).jpg",
      alt: "Leatherback sea turtle on a nesting beach",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: -45.0, maxLat: 65.0, includeOcean: true }],
  },

  // 55. Nile Crocodile
  {
    id: "nile-crocodile",
    commonName: { en: "Nile Crocodile", es: "Cocodrilo del Nilo", it: "Coccodrillo del Nilo" },
    scientificName: "Crocodylus niloticus",
    taxonClass: "Reptilia",
    order: "Crocodilia",
    family: "Crocodylidae",
    realm: "Freshwater",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "~250,000 – 500,000 individuals across sub-Saharan Africa",
    populationHistory: [
      { year: 1975, estimate: 100000, label: "Unregulated hide hunting collapse" },
      { year: 1996, estimate: 300000 },
      { year: 2024, estimate: 400000 },
    ],
    climateVulnerability: {
      en: "Severe multi-year river drying concentrates large adults in shrinking muddy pools, escalating intraspecific cannibalism.",
      es: "La desecación de cauces fluviales concentra ejemplares en pozas reducidas, desatando canibalismo.",
      it: "Il prosciugamento dei fiumi costringe i coccodrilli in pozze ristrette aumentando il cannibalismo.",
    },
    keyThreats: [
      {
        threat: "Human-wildlife conflict & damming",
        impact: "low",
        description: {
          en: "Persecution over human/livestock attacks and altered river flow from hydroelectric barrages.",
          es: "Persecución por ataques a personas y ganado, y alteración de caudales por presas.",
          it: "Conflitti con le comunità locali e alterazione del flusso fluviale da dighe.",
        },
      },
    ],
    diet: {
      en: "Apex ambush predator: Fish, zebras, wildebeest, antelopes, warthogs, and birds drowned in a 'death roll'.",
      es: "Superdepredador de emboscada: peces, cebras, ñus y antílopes ahogados mediante giros de la muerte.",
      it: "Predatore d'agguato: pesci, zebre, gnu e gazzelle annegati tramite la 'torsione della morte'.",
    },
    clues: [
      {
        en: "A dominant freshwater apex predator, reaching lengths up to 5 to 6 meters and exerting one of the most powerful crushing bite forces ever measured in nature.",
        es: "Un depredador dominante de agua dulce, que alcanza hasta 6 metros de longitud y posee una de las mordeduras más potentes del reino animal.",
        it: "Un predatore dominante d'acqua dolce, lungo fino a 6 metri con un morso dalla potenza devastante.",
      },
      {
        en: "Lies submerged with only raised nostrils and eyes exposed before launching explosive shoreline ambush attacks, dragging large terrestrial mammals underwater.",
        es: "Acecha sumergido asomando únicamente ojos y narinas antes de lanzarse como un resorte sobre mamíferos que beben en la orilla.",
        it: "Attende sommerso lasciando emergere solo occhi e narici prima di scattare per trascinare in acqua grandi mammiferi.",
      },
    ],
    image: {
      url: "/images/species/nile-crocodile.jpg",
      photographer: "Rob Bulmahn",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Crocodile_du_Nil_vue_de_face.jpg",
      alt: "Nile crocodile facing forward with jaws slightly open",
    },
    rangeConfig: [{ minLon: -17.0, maxLon: 51.0, minLat: -34.0, maxLat: 31.0 }],
  },

  // 56. Saltwater Crocodile
  {
    id: "saltwater-crocodile",
    commonName: { en: "Saltwater Crocodile", es: "Cocodrilo Marino / Cocodrilo Poroso", it: "Coccodrillo Marino" },
    scientificName: "Crocodylus porosus",
    taxonClass: "Reptilia",
    order: "Crocodilia",
    family: "Crocodylidae",
    realm: "Coastal",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "~200,000 – 300,000 mature individuals (massive Australian recovery)",
    populationHistory: [
      { year: 1971, estimate: 5000, label: "Australian hunting ban protection" },
      { year: 1995, estimate: 100000 },
      { year: 2024, estimate: 200000 },
    ],
    climateVulnerability: {
      en: "Extreme monsoon storm surges erode and submerge coastal mangrove mud mound nests.",
      es: "Marejadas ciclónicas extremas erosionan e inundan los nidos en montículos de manglar.",
      it: "Le mareggiate estreme sommergono i nidi a tumulo costruiti nelle mangrovie.",
    },
    keyThreats: [
      {
        threat: "Habitat destruction in SE Asia",
        impact: "medium",
        description: {
          en: "Nearly extirpated across much of mainland Southeast Asia due to aquaculture expansion.",
          es: "Casi erradicado del sudeste asiático continental por expansión acuícola y urbana.",
          it: "Estinto in gran parte del Sud-est asiatico continentale per acquacoltura e bonifiche.",
        },
      },
    ],
    diet: {
      en: "Apex hypercarnivore: Water buffalo, wild boar, sea turtles, sharks, mud crabs, and fish.",
      es: "Superdepredador hipercarnívoro: búfalos de agua, jabalíes, tortugas marinas, tiburones y cangrejos.",
      it: "Predatore apicale: bufali d'acqua, cinghiali, squali, tartarughe marine e pesci.",
    },
    clues: [
      {
        en: "The largest living reptile on Earth, with adult males exceeding 6 meters in length and weighing over 1,000 kg, capable of thriving in open hypersaline sea channels.",
        es: "El reptil vivo más grande de la Tierra, superando 6 metros de longitud y 1.000 kg de peso, capaz de adentrarse cientos de km en mar abierto.",
        it: "Il più grande rettile vivente sulla Terra, supera i 6 metri e 1.000 kg, perfettamente adattato alle acque salate dell'oceano.",
      },
      {
        en: "Equipped with specialized lingual salt-secreting glands on its tongue, enabling long-distance open-ocean transits between distant island chains.",
        es: "Posee glándulas salinas excretoras en la lengua que le permiten navegar grandes distancias oceánicas entre archipiélagos.",
        it: "Dotato di ghiandole saline linguali che espellono il sale, permettendogli traversate oceaniche tra le isole.",
      },
    ],
    image: {
      url: "/images/species/saltwater-crocodile.jpg",
      photographer: "JJ Harrison",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Crocodylus_porosus_-_Daintree_River.jpg",
      alt: "Saltwater crocodile resting in shallow river water",
    },
    rangeConfig: [
      { minLon: 80.0, maxLon: 155.0, minLat: -25.0, maxLat: 22.0, includeOcean: true },
    ],
  },

  // 57. Tuatara
  {
    id: "tuatara",
    commonName: { en: "Tuatara", es: "Tuátara", it: "Tuatara" },
    scientificName: "Sphenodon punctatus",
    taxonClass: "Reptilia",
    order: "Rhynchocephalia",
    family: "Sphenodontidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "~50,000 – 100,000 individuals on predator-free offshore islands",
    populationHistory: [
      { year: 1900, estimate: 20000 },
      { year: 1990, estimate: 60000, label: "Rat eradication on island sanctuaries" },
      { year: 2024, estimate: 80000 },
    ],
    climateVulnerability: {
      en: "Temperature-dependent sex determination (TSD) produces 100% male hatchlings above 22°C, risking severe future demographic skewing.",
      es: "La determinación del sexo por temperatura produce 100% machos a más de 22°C, arriesgando un colapso reproductivo.",
      it: "La determinazione del sesso legata alla temperatura produce solo maschi sopra i 22°C, rischiando il collasso demografico.",
    },
    keyThreats: [
      {
        threat: "Invasive rodent re-introduction",
        impact: "high",
        description: {
          en: "Extirpated from the mainland by Pacific and brown rats; strictly confined to managed island refuges.",
          es: "Extinguido en tierra firme por ratas invasoras; confinado a islas santuario protegidas.",
          it: "Estinto sulla terraferma a causa dei ratti; sopravvive solo su isole protette.",
        },
      },
    ],
    diet: {
      en: "Nocturnal carnivore: Beetles, wetas, spiders, seabird eggs, chicks, and small lizards.",
      es: "Carnívoro nocturno: escarabajos, wetas gigantes, huevos y polluelos de aves marinas petreles.",
      it: "Carnivoro notturno: coleotteri, weta giganti, uova e pulcini di uccelli marini.",
    },
    clues: [
      {
        en: "The sole surviving order of rhynchocephalian reptiles, representing an ancient lineage that diverged from squamates over 240 million years ago in the Mesozoic.",
        es: "Único representante vivo del orden arcosaurio Rhynchocephalia, un linaje fósil viviente que divergió hace más de 240 millones de años.",
        it: "L'unico sopravvissuto dell'ordine dei Rincocefali, un lignaggio arcaico originatosi oltre 240 milioni di anni fa.",
      },
      {
        en: "Thrives at remarkably low metabolic temperatures (down to 5°C) and features a prominent photosensitive parietal 'third eye' on top of its skull.",
        es: "Activo a temperaturas frías de hasta 5°C y dotado de un 'tercer ojo' parietal fotosensible en la parte superior del cráneo.",
        it: "Attivo a temperature insolitamente basse (fino a 5°C) e dotato di un 'terzo occhio' parietale fotosensibile sul cranio.",
      },
    ],
    image: {
      url: "/images/species/tuatara.jpg",
      photographer: "Judi Lapsley Miller",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tuatara_at_Zealandia_EcoSanctuary.jpg",
      alt: "Close-up of a tuatara peering out from its burrow",
    },
    rangeConfig: [{ minLon: 173.5, maxLon: 178.0, minLat: -41.5, maxLat: -35.5 }],
  },

  // 58. Gila Monster
  {
    id: "gila-monster",
    commonName: { en: "Gila Monster", es: "Monstruo de Gila", it: "Mostro di Gila" },
    scientificName: "Heloderma suspectum",
    taxonClass: "Reptilia",
    order: "Squamata",
    family: "Helodermatidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate: "~10,000 – 20,000 mature individuals",
    populationHistory: [
      { year: 1990, estimate: 30000 },
      { year: 2010, estimate: 18000 },
      { year: 2024, estimate: 14000 },
    ],
    climateVulnerability: {
      en: "Megadroughts reduce quail and desert cottontail nesting success, depleting raid targets for subterranean spring feeding.",
      es: "Megasequías reducen nidadas de codornices y conejos del desierto, mermando su alimento primaveral.",
      it: "Gravi siccità desertiche riducono le nidiate di uccelli e conigli selvatici.",
    },
    keyThreats: [
      {
        threat: "Suburban sprawl & roadkill",
        impact: "high",
        description: {
          en: "Urban expansion across desert scrub and lethal vehicle strikes on desert highways.",
          es: "Urbanización del desierto de Sonora y atropellos frecuentes en carreteras.",
          it: "Urbanizzazione del deserto e mortalità da investimento stradale.",
        },
      },
    ],
    diet: {
      en: "Carnivore: Bird and reptile eggs, juvenile cottontails, rodents, and desert tortoise hatchlings.",
      es: "Carnívoro: huevos de aves y reptiles, crías de conejo del desierto, roedores y lagartijas.",
      it: "Carnivoro: uova di uccelli e rettili, nidiacei e piccoli mammiferi.",
    },
    clues: [
      {
        en: "Heavy, sluggish venomous lizard of arid desert scrublands, spending over 90% of its life hidden in underground burrows.",
        es: "Lagarto venenoso corpulento y lento de desiertos áridos que pasa más del 90% de su vida en madrigueras subterráneas.",
        it: "Pesante e lento rettile velenoso delle zone aride desertiche, trascorre oltre il 90% della vita in gallerie sotterranee.",
      },
      {
        en: "Possesses bead-like bony scales (osteoderms) forming pink, orange, and black reticulated warning patterns, chewing venom into prey via grooved lower teeth.",
        es: "Cubierto de escamas osteodérmicas perladas negras y rosadas, inoculando veneno mediante mordeduras tenaces con dientes inferiores ranurados.",
        it: "Coperto di scaglie perlate nere e arancioni, inietta il veleno masticando tenacemente la preda con denti scanalati.",
      },
    ],
    image: {
      url: "/images/species/gila-monster.jpg",
      photographer: "Gary M. Stolz / U.S. Fish and Wildlife Service",
      license: "Public Domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:GilaMonster.jpg",
      alt: "Gila monster camouflaged among dry desert grasses",
    },
    rangeConfig: [{ minLon: -115.5, maxLon: -108.0, minLat: 27.5, maxLat: 37.0 }],
  },

  // Green Sea Turtle
  {
    id: "green-sea-turtle",
    commonName: { en: "Green Sea Turtle", es: "Tortuga Verde", it: "Tartaruga Verde" },
    scientificName: "Chelonia mydas",
    taxonClass: "Reptilia",
    order: "Testudines",
    family: "Cheloniidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "increasing",
    populationEstimate:
      "No single global headcount exists; long-term monitoring across regional nesting sites shows nesting numbers up roughly 28% since the 1970s, though many regional stocks remain far below historic baselines",
    populationHistory: [],
    climateVulnerability: {
      en: "Incubation temperature alone determines hatchling sex, so warming nesting beaches are already skewing many rookeries overwhelmingly female, while sea level rise erodes the sand nesting beaches depend on.",
      es: "La temperatura de incubación determina el sexo de las crías, y el calentamiento de las playas ya está feminizando muchas colonias, mientras el ascenso del mar erosiona los arenales de anidación.",
      it: "La temperatura di incubazione determina il sesso delle crie, per cui la sabbia sempre più calda sta femminilizzando molte colonie, mentre l'innalzamento del mare erode le spiagge di nidificazione.",
    },
    keyThreats: [
      {
        threat: "Bycatch, egg poaching & coastal development",
        impact: "medium",
        description: {
          en: "Drowning in fishing gear, illegal egg collection, and loss of nesting beaches to coastal construction and artificial lighting.",
          es: "Ahogamiento en artes de pesca, saqueo ilegal de huevos y pérdida de playas de anidación por construcción costera e iluminación artificial.",
          it: "Annegamento negli attrezzi da pesca, saccheggio illegale delle uova e perdita di spiagge di nidificazione per l'edilizia costiera e l'illuminazione artificiale.",
        },
      },
    ],
    diet: {
      en: "Herbivorous grazer as an adult: seagrass and marine algae cropped from shallow coastal meadows; omnivorous as juveniles.",
      es: "Herbívoro adulto: pasta pastos marinos y algas en praderas costeras someras; omnívoro durante la etapa juvenil.",
      it: "Erbivoro da adulto: pascola fanerogame marine e alghe in praterie costiere basse; onnivoro da giovane.",
    },
    keystoneRole: {
      en: "Ecosystem engineer of seagrass meadows: constant cropping keeps seagrass blades short and nutrient-rich, sustaining the nursery habitat that reef fish and invertebrates depend on.",
      es: "Ingeniero ecosistémico de las praderas marinas: su pastoreo constante mantiene las hojas cortas y ricas en nutrientes, sosteniendo el hábitat de cría de peces e invertebrados de arrecife.",
      it: "Ingegnere ecosistemico delle praterie marine: il pascolo costante mantiene le foglie corte e ricche di nutrienti, sostenendo l'habitat di allevamento per pesci e invertebrati di barriera.",
    },
    conservationActions: {
      en: "Reassessed from Endangered to Least Concern in 2025 after decades of nest protection, trade bans, and bycatch-reduction fishing gear — one of the Red List's most dramatic recoveries — though several regional subpopulations remain in decline and depend on continued protection.",
      es: "Reevaluada de En Peligro a Preocupación Menor en 2025 tras décadas de protección de nidos, prohibiciones comerciales y artes de pesca que reducen la captura incidental — una de las recuperaciones más notables de la Lista Roja —, aunque varias subpoblaciones regionales siguen en declive.",
      it: "Riclassificata da In Pericolo a Preoccupazione Minore nel 2025 dopo decenni di protezione dei nidi, divieti commerciali e attrezzi da pesca a minore cattura accidentale — uno dei recuperi più notevoli della Lista Rossa —, sebbene diverse sottopopolazioni regionali restino in declino.",
    },
    clues: [
      {
        en: "The only sea turtle whose adults switch almost entirely to grazing seagrass and algae, a diet that tints its body fat green and gives the species its name.",
        es: "La única tortuga marina cuyos adultos pasan a alimentarse casi por completo de pastos marinos y algas, dieta que tiñe de verde su grasa corporal y da nombre a la especie.",
        it: "L'unica tartaruga marina i cui adulti si nutrono quasi esclusivamente di fanerogame marine e alghe, dieta che tinge di verde il suo grasso corporeo e dà il nome alla specie.",
      },
      {
        en: "Hauls itself onto open beaches at night to bury clutches of soft-shelled eggs in warm sand, where incubation temperature alone decides whether hatchlings emerge male or female.",
        es: "Se arrastra de noche hasta playas abiertas para enterrar puestas de huevos de cáscara blanda en arena cálida, donde la temperatura de incubación determina por sí sola el sexo de las crías.",
        it: "Di notte si trascina su spiagge aperte per seppellire covate di uova dal guscio molle nella sabbia calda, dove la sola temperatura di incubazione decide se le crie saranno maschi o femmine.",
      },
      {
        en: "Navigates thousands of kilometers across open ocean using a sense of Earth's magnetic field, often returning after decades to nest on the very same short stretch of shoreline where it originally hatched.",
        es: "Recorre miles de kilómetros en mar abierto guiándose por el campo magnético terrestre, y a menudo regresa décadas después a anidar en el mismo tramo de costa donde nació.",
        it: "Percorre migliaia di chilometri in mare aperto orientandosi con il campo magnetico terrestre, spesso tornando dopo decenni a nidificare sullo stesso tratto di costa in cui è nata.",
      },
    ],
    image: {
      url: "/images/species/green-sea-turtle.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Green_sea_turtle_(Chelonia_mydas)_Moorea.jpg",
      alt: "Green sea turtle swimming over a shallow reef",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: -40.0, maxLat: 35.0, includeOcean: true }],
  },

  // King Cobra
  {
    id: "king-cobra",
    commonName: { en: "King Cobra", es: "Cobra Real", it: "Cobra Reale" },
    scientificName: "Ophiophagus hannah",
    taxonClass: "Reptilia",
    order: "Squamata",
    family: "Elapidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate:
      "No range-wide census exists; local surveys have recorded declines exceeding 80% over 10 years in parts of its range, with an overall decline estimated at 30% or more over the last three generations (roughly 15-18 years)",
    populationHistory: [],
    climateVulnerability: {
      en: "The only snake known to build a nest, the female relies on decaying leaf litter to generate incubation warmth; drier forest floors from shifting rainfall reduce the humidity and heat her nest mound needs.",
      es: "Única serpiente que construye nido: la hembra depende de la hojarasca en descomposición para generar calor de incubación; la sequedad del suelo forestal por lluvias irregulares reduce la humedad y el calor que necesita el montículo.",
      it: "Unico serpente noto per costruire un nido: la femmina si affida alla lettiera in decomposizione per generare calore di incubazione; un suolo forestale più secco per le piogge irregolari riduce l'umidità e il calore necessari al cumulo.",
    },
    keyThreats: [
      {
        threat: "Habitat fragmentation & human persecution",
        impact: "high",
        description: {
          en: "Clearing and fragmentation of forest habitat, combined with retaliatory killing driven by fear despite the species' general avoidance of people.",
          es: "Tala y fragmentación del hábitat forestal, junto con matanzas por miedo pese a que la especie suele evitar a las personas.",
          it: "Disboscamento e frammentazione dell'habitat forestale, insieme a uccisioni per paura nonostante la specie tenda a evitare le persone.",
        },
      },
    ],
    diet: {
      en: "Ophiophagous specialist: preys almost exclusively on other snakes, including venomous species, occasionally taking monitor lizards.",
      es: "Especialista ofiófago: se alimenta casi exclusivamente de otras serpientes, incluidas venenosas, y ocasionalmente varanos.",
      it: "Specialista ofiofago: si nutre quasi esclusivamente di altri serpenti, comprese specie velenose, occasionalmente di varani.",
    },
    keystoneRole: {
      en: "As a specialist predator of other snakes, it helps regulate populations within the broader snake community of the forests it inhabits.",
      es: "Como depredador especialista de otras serpientes, ayuda a regular las poblaciones dentro de la comunidad de ofidios de los bosques que habita.",
      it: "Da predatore specializzato di altri serpenti, contribuisce a regolare le popolazioni all'interno della comunità di ofidi delle foreste che abita.",
    },
    clues: [
      {
        en: "The world's longest venomous snake, capable of exceeding 5 meters, its genus name literally translating to 'snake-eater' for a diet built almost entirely around other serpents.",
        es: "La serpiente venenosa más larga del mundo, capaz de superar los 5 metros, cuyo nombre de género significa literalmente 'comedora de serpientes' por una dieta basada casi por completo en otros ofidios.",
        it: "Il serpente velenoso più lungo al mondo, capace di superare i 5 metri, il cui nome di genere significa letteralmente 'mangiatore di serpenti' per una dieta basata quasi interamente su altri ofidi.",
      },
      {
        en: "The only snake species known to actively build and guard a nest, gathering leaf litter into a mound and coiling atop it for weeks until the eggs hatch.",
        es: "La única especie de serpiente que construye y vigila activamente un nido, amontonando hojarasca en un montículo sobre el que permanece enroscada semanas hasta la eclosión.",
        it: "L'unica specie di serpente nota per costruire e sorvegliare attivamente un nido, ammucchiando la lettiera in un cumulo su cui resta arrotolata per settimane fino alla schiusa.",
      },
      {
        en: "Can rear more than a meter of its own body off the ground while flattening a narrow hood, delivering a bite potent enough to kill prey many times its own size through respiratory paralysis.",
        es: "Puede erguir más de un metro de su cuerpo mientras despliega una capucha estrecha, e inflige una mordedura capaz de matar por parálisis respiratoria a presas muchas veces más grandes que ella.",
        it: "Può sollevare più di un metro del proprio corpo mentre apre un cappuccio stretto, sferrando un morso capace di uccidere per paralisi respiratoria prede molte volte più grandi di lei.",
      },
    ],
    image: {
      url: "/images/species/king-cobra.jpg",
      photographer: "Rushenb",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Ophiophagus-hannah-king_cobra-kaeng-krachan-national-park.jpg",
      alt: "King cobra with hood raised in leaf litter",
    },
    rangeConfig: [{ minLon: 68.0, maxLon: 128.0, minLat: -8.0, maxLat: 30.0 }],
  },

  // Green Anaconda
  {
    id: "green-anaconda",
    commonName: { en: "Green Anaconda", es: "Anaconda Verde", it: "Anaconda Verde" },
    scientificName: "Eunectes murinus",
    taxonClass: "Reptilia",
    order: "Squamata",
    family: "Boidae",
    realm: "Freshwater",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "unknown",
    populationEstimate:
      "No reliable population-size estimate exists; considered locally common in undisturbed wetlands, with regional depletion reported near expanding agriculture and settlements",
    populationHistory: [],
    climateVulnerability: {
      en: "Depends on seasonal flood-pulse wetlands for ambush hunting; altered rainfall and flooding timing can shrink the shallow, prey-rich margins it relies on for much of the year.",
      es: "Depende de humedales con pulsos de inundación estacional para cazar al acecho; los cambios en el régimen de lluvias e inundaciones pueden reducir los márgenes someros ricos en presas de los que depende gran parte del año.",
      it: "Dipende da zone umide con impulsi di piena stagionali per la caccia d'agguato; l'alterazione dei regimi di piogge e piene può ridurre i margini bassi e ricchi di prede da cui dipende per gran parte dell'anno.",
    },
    keyThreats: [
      {
        threat: "Wetland drainage & habitat conversion",
        impact: "medium",
        description: {
          en: "Drainage and conversion of seasonal wetlands for agriculture and cattle ranching, along with historical hide hunting and killing driven by fear.",
          es: "Drenaje y conversión de humedales estacionales para agricultura y ganadería, junto con la caza histórica de pieles y matanzas por miedo.",
          it: "Drenaggio e conversione delle zone umide stagionali per agricoltura e allevamento, oltre alla caccia storica per le pelli e alle uccisioni per paura.",
        },
      },
    ],
    diet: {
      en: "Apex ambush constrictor: fish, waterbirds, capybaras, caimans, and deer, swallowed whole after constriction.",
      es: "Constrictor de emboscada superior: peces, aves acuáticas, capibaras, caimanes y ciervos, engullidos enteros tras la constricción.",
      it: "Costrittore d'agguato apicale: pesci, uccelli acquatici, capibara, caimani e cervi, ingoiati interi dopo la costrizione.",
    },
    clues: [
      {
        en: "The world's heaviest snake, an aquatic constrictor that can exceed 200 kg, with eyes and nostrils set on top of its head so it can lie almost fully submerged while ambushing prey at the surface.",
        es: "La serpiente más pesada del mundo, un constrictor acuático que puede superar los 200 kg, con ojos y narinas en lo alto de la cabeza para permanecer casi sumergida mientras acecha presas en la superficie.",
        it: "Il serpente più pesante al mondo, un costrittore acquatico che può superare i 200 kg, con occhi e narici sulla sommità della testa per restare quasi del tutto sommerso mentre attende le prede in superficie.",
      },
      {
        en: "A famously slow metabolism lets it go weeks or months between meals after swallowing large prey whole, and it gives birth to dozens of live young rather than laying eggs.",
        es: "Su metabolismo, célebremente lento, le permite pasar semanas o meses entre comidas tras engullir grandes presas enteras, y da a luz decenas de crías vivas en lugar de poner huevos.",
        it: "Il suo metabolismo, notoriamente lento, le permette di restare settimane o mesi tra un pasto e l'altro dopo aver ingoiato intere grandi prede, e partorisce decine di piccoli vivi anziché deporre uova.",
      },
      {
        en: "Spends nearly its entire life submerged in slow-moving swamps and flooded grassland, rarely emerging fully onto dry ground even to bask.",
        es: "Pasa casi toda su vida sumergida en pantanos de aguas lentas y sabanas inundadas, y rara vez sale por completo a tierra firme ni siquiera para tomar el sol.",
        it: "Trascorre quasi tutta la vita sommersa in paludi dalle acque lente e savane allagate, uscendo raramente del tutto in terraferma anche solo per scaldarsi al sole.",
      },
    ],
    image: {
      url: "/images/species/green-anaconda.jpg",
      photographer: "Kai Squires",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Eunectes_murinus_61739178.jpg",
      alt: "Green anaconda coiled on a tree branch",
    },
    rangeConfig: [{ minLon: -78.0, maxLon: -44.0, minLat: -20.0, maxLat: 10.0 }],
  },

  // Panther Chameleon
  {
    id: "panther-chameleon",
    commonName: { en: "Panther Chameleon", es: "Camaleón Pantera", it: "Camaleonte Pantera" },
    scientificName: "Furcifer pardalis",
    taxonClass: "Reptilia",
    order: "Squamata",
    family: "Chamaeleonidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate:
      "No range-wide estimate exists; a mark-recapture study on a single offshore island population calculated roughly 450,000 individuals (95% CI ~21,700-940,000), a figure that cannot be extrapolated to the full range",
    populationHistory: [],
    climateVulnerability: {
      en: "Tied to humid forest-edge microclimates for both prey availability and thermoregulation; prolonged drought reduces insect abundance and narrows the daily basking window it needs.",
      es: "Ligado a microclimas húmedos de borde forestal tanto para la disponibilidad de presas como para la termorregulación; la sequía prolongada reduce la abundancia de insectos y acorta la ventana diaria de exposición al sol que necesita.",
      it: "Legato a microclimi umidi al margine della foresta sia per la disponibilità di prede sia per la termoregolazione; la siccità prolungata riduce l'abbondanza di insetti e restringe la finestra quotidiana di esposizione al sole di cui ha bisogno.",
    },
    keyThreats: [
      {
        threat: "Pet-trade collection & forest-edge clearing",
        impact: "low",
        description: {
          en: "Historic wild-caught collection for the international pet trade (now largely replaced by captive breeding) and clearing of the open forest-edge habitat it favors.",
          es: "Captura histórica en estado silvestre para el comercio internacional de mascotas (hoy en gran parte sustituida por cría en cautiverio) y tala del hábitat abierto de borde forestal que prefiere.",
          it: "Cattura storica in natura per il commercio internazionale di animali da compagnia (oggi ampiamente sostituita dall'allevamento in cattività) e disboscamento dell'habitat aperto al margine della foresta che predilige.",
        },
      },
    ],
    diet: {
      en: "Insectivore: crickets, roaches, and other terrestrial invertebrates captured with a projectile tongue.",
      es: "Insectívoro: grillos, cucarachas y otros invertebrados terrestres capturados con su lengua proyectil.",
      it: "Insettivoro: grilli, blatte e altri invertebrati terrestri catturati con la lingua a proiettile.",
    },
    clues: [
      {
        en: "Arboreal lizard whose skin cells contain a lattice of light-reflecting nanocrystals it can actively tune within seconds, producing rapid, vivid color shifts driven by mood, temperature, and social signaling.",
        es: "Lagarto arborícola cuyas células cutáneas contienen una red de nanocristales reflectantes que puede ajustar en segundos, produciendo cambios de color rápidos y vívidos según su estado de ánimo, la temperatura y señales sociales.",
        it: "Lucertola arboricola le cui cellule cutanee contengono un reticolo di nanocristalli riflettenti che può regolare in pochi secondi, producendo rapidi e vivaci cambi di colore legati a umore, temperatura e segnali sociali.",
      },
      {
        en: "Captures insect prey with a sticky-tipped tongue that can extend to more than twice its own body length in a fraction of a second.",
        es: "Captura insectos con una lengua de punta pegajosa capaz de extenderse más del doble de la longitud de su cuerpo en una fracción de segundo.",
        it: "Cattura insetti con una lingua dalla punta appiccicosa in grado di estendersi per più del doppio della lunghezza del proprio corpo in una frazione di secondo.",
      },
      {
        en: "Independently swiveling, turret-like eyes scan in two different directions at once, giving it a near-360-degree field of view while opposable, tong-like toes and a prehensile tail grip narrow branches.",
        es: "Sus ojos, como torretas giratorias independientes, escanean en dos direcciones a la vez, dándole un campo de visión de casi 360 grados, mientras dedos opuestos en forma de pinza y una cola prensil sujetan ramas estrechas.",
        it: "I suoi occhi, simili a torrette girevoli indipendenti, scandagliano due direzioni contemporaneamente, offrendo un campo visivo di quasi 360 gradi, mentre dita opponibili a pinza e una coda prensile afferrano rami sottili.",
      },
    ],
    image: {
      url: "/images/species/panther-chameleon.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Panther_chameleon_(Furcifer_pardalis)_male_Nosy_Be.jpg",
      alt: "Male panther chameleon gripping a branch, showing vivid color pattern",
    },
    rangeConfig: [{ minLon: 47.0, maxLon: 50.5, minLat: -17.0, maxLat: -12.0 }],
  },

  // Thorny Devil
  {
    id: "thorny-devil",
    commonName: { en: "Thorny Devil", es: "Diablo Espinoso", it: "Diavolo Spinoso" },
    scientificName: "Moloch horridus",
    taxonClass: "Reptilia",
    order: "Squamata",
    family: "Agamidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate:
      "No overall population estimate exists; described as locally common across its arid range, with no documented evidence of range-wide decline",
    populationHistory: [],
    climateVulnerability: {
      en: "Its entire hydration strategy depends on capturing dew and rare rainfall through microscopic skin channels; shifting arid-zone rainfall patterns and rising ground temperatures threaten this narrow water-acquisition window.",
      es: "Toda su estrategia de hidratación depende de captar rocío y lluvias escasas mediante microcanales cutáneos; los cambios en el régimen de lluvias de zonas áridas y el aumento de la temperatura del suelo amenazan esta estrecha ventana de obtención de agua.",
      it: "L'intera strategia di idratazione dipende dalla cattura di rugiada e piogge rare tramite microcanali cutanei; i mutamenti nel regime delle piogge nelle zone aride e l'aumento della temperatura del suolo minacciano questa ristretta finestra di approvvigionamento idrico.",
    },
    keyThreats: [
      {
        threat: "Road mortality & pet-trade collection",
        impact: "low",
        description: {
          en: "Slow-moving individuals are vulnerable to vehicle strikes on desert roads, and some illegal collection persists for the pet trade.",
          es: "Su lentitud lo hace vulnerable a atropellos en carreteras desérticas, y persiste cierta captura ilegal para el comercio de mascotas.",
          it: "La sua lentezza lo rende vulnerabile agli investimenti sulle strade desertiche, e persiste una certa cattura illegale per il commercio di animali da compagnia.",
        },
      },
    ],
    diet: {
      en: "Obligate myrmecophage: eats almost nothing but ants, flicking up as many as several thousand individually with a sticky tongue in a single day.",
      es: "Mirmecófago obligado: se alimenta casi exclusivamente de hormigas, atrapando hasta varios miles una por una con su lengua pegajosa en un solo día.",
      it: "Mirmecofago obbligato: si nutre quasi esclusivamente di formiche, catturandone fino a diverse migliaia una per una con la lingua appiccicosa in un solo giorno.",
    },
    clues: [
      {
        en: "Covered head to tail in hardened conical spines, including a false 'head' bulge on the back of its neck that it presents to a predator by tucking its real head between its front legs.",
        es: "Cubierto de la cabeza a la cola por espinas cónicas endurecidas, incluida una falsa 'cabeza' en la nuca que muestra a un depredador al esconder la cabeza real entre las patas delanteras.",
        it: "Ricoperto dalla testa alla coda da spine coniche indurite, incluso un falso 'capo' sulla nuca che mostra a un predatore nascondendo la testa vera tra le zampe anteriori.",
      },
      {
        en: "Drinks through microscopic grooves between its scales that draw water by capillary action from any point on its body — even damp sand — channeling it directly to the corners of its mouth without ever submerging its head.",
        es: "Bebe a través de microcanales entre sus escamas que atraen agua por capilaridad desde cualquier punto de su cuerpo — incluso arena húmeda —, canalizándola hasta las comisuras de la boca sin sumergir jamás la cabeza.",
        it: "Beve tramite microscanali tra le squame che attirano l'acqua per capillarità da qualsiasi punto del corpo — persino dalla sabbia umida —, incanalandola fino agli angoli della bocca senza mai immergere la testa.",
      },
      {
        en: "An obligate ant specialist that barely moves its body while feeding, flicking up thousands of individual ants one at a time to avoid drawing the attention of predators.",
        es: "Especialista obligado en hormigas que apenas mueve el cuerpo mientras se alimenta, atrapando miles de hormigas una a una para no llamar la atención de depredadores.",
        it: "Specialista obbligato di formiche che durante l'alimentazione muove appena il corpo, catturandone migliaia una alla volta per non attirare l'attenzione dei predatori.",
      },
    ],
    image: {
      url: "/images/species/thorny-devil.jpg",
      photographer: "Stu's Images",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Moloch_horridus,_Thorny_Devil,_Alice_Springs.jpg",
      alt: "Thorny devil lizard on red desert sand",
    },
    rangeConfig: [{ minLon: 113.0, maxLon: 145.0, minLat: -32.0, maxLat: -19.0 }],
  },
];
