import type { RawSpeciesEntry } from "./types";

export const birds: RawSpeciesEntry[] = [
  // 36. Emperor Penguin
  {
    id: "emperor-penguin",
    commonName: { en: "Emperor Penguin", es: "Pingüino Emperador", it: "Pinguino Imperatore" },
    scientificName: "Aptenodytes forsteri",
    taxonClass: "Aves",
    order: "Sphenisciformes",
    family: "Spheniscidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~595,000 adult individuals (66 colonies)",
    populationHistory: [
      { year: 2000, estimate: 650000 },
      { year: 2012, estimate: 595000 },
      { year: 2024, estimate: 550000 },
    ],
    climateVulnerability: {
      en: "Early seasonal fast-ice breakup causes catastrophic colony-wide drowning of un-fledged chicks without waterproof plumage.",
      es: "La rotura prematura del hielo marino causa el ahogamiento masivo de polluelos sin plumaje impermeable.",
      it: "La rottura precoce dei ghiacci marini provoca l'annegamento dei pulcini prima della muta.",
    },
    keyThreats: [
      {
        threat: "Antarctic sea ice destabilization",
        impact: "high",
        description: {
          en: "Projected 90% colony quasi-extinction by 2100 under high greenhouse gas emission scenarios.",
          es: "Proyección de colapso del 90% de colonias para 2100 por pérdida de banquisa estable.",
          it: "Rischio di scomparsa di oltre il 90% delle colonie entro il 2100 per mancanza di banchisa stabile.",
        },
      },
    ],
    diet: {
      en: "Marine piscivore: Antarctic silverfish (Pleuragramma antarcticum), glacial squid, and krill.",
      es: "Piscívoro marino: diablillo antártico (pez de plata), calamares glaciales y krill.",
      it: "Pesci e cefalopodi antartici: pesce argentato antartico, calamari e krill.",
    },
    clues: [
      {
        en: "The tallest and heaviest of all living penguin species, breeding exclusively on frozen ocean fast ice during the pitch-black polar winter at -50°C, the only bird species to breed through the full depths of a polar winter.",
        es: "El más alto y pesado de todos los pingüinos vivos, criando exclusivamente sobre el hielo marino congelado en pleno invierno polar a -50°C.",
        it: "La specie di pinguino più grande e pesante, nidifica sul ghiaccio marino durante il rigido inverno polare a -50°C.",
      },
      {
        en: "Males incubate a single egg on their feet beneath a feathered brood pouch for over 60 continuous freezing days, huddled in rotating tight thermoregulatory groups.",
        es: "Los machos incuban un único huevo sobre sus patas bajo un pliegue cutáneo durante 60 días sin comer, apiñados en tortugas térmicas.",
        it: "I maschi covano un unico uovo sui piedi per oltre 60 giorni a digiuno, stringendosi in compatti gruppi rotanti.",
      },
    ],
    image: {
      url: "/images/species/emperor-penguin.jpg",
      photographer: "Ian Duffy",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Aptenodytes_forsteri_-Snow_Hill_Island,_Antarctica_-adults_and_juvenile-8.jpg",
      alt: "Emperor penguin adults with a chick on sea ice",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: -78.0, maxLat: -64.0, includeOcean: true }],
  },

  // 37. Andean Condor
  {
    id: "andean-condor",
    commonName: { en: "Andean Condor", es: "Cóndor Andino", it: "Condor delle Ande" },
    scientificName: "Vultur gryphus",
    taxonClass: "Aves",
    order: "Cathartiformes",
    family: "Cathartidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~6,700 mature individuals",
    populationHistory: [
      { year: 1990, estimate: 12000 },
      { year: 2014, estimate: 8000 },
      { year: 2024, estimate: 6700 },
    ],
    climateVulnerability: {
      en: "Altered thermal wind updrafts across high Andean valleys increase flight energetic expenditure for wide-ranging soaring.",
      es: "Alteraciones en corrientes térmicas ascendentes aumentan el gasto energético durante vuelos de planeo.",
      it: "Mutamenti nelle correnti termiche ascensionali aumentano il consumo energetico nel volo veleggiato.",
    },
    keyThreats: [
      {
        threat: "Toxic poisoned carcasses & lead ammunition",
        impact: "high",
        description: {
          en: "Secondary poisoning from toxic baits aimed at pumas/dogs and ingestion of lead bullet fragments in carrion.",
          es: "Envenenamiento secundario por cebos tóxicos para pumas e intoxicación por plomo de municiones.",
          it: "Avvelenamento da bocconi tossici per predatori e saturnismo da munizioni di piombo.",
        },
      },
    ],
    diet: {
      en: "Obligate scavenger: Guanacos, vicuñas, deer, stranded marine mammal carcasses, and livestock carrion.",
      es: "Carroñero obligado: guanacos, vicuñas, ganado muerto y restos de mamíferos marinos varados.",
      it: "Necrofago obbligato: carcasse di guanachi, vigogne e mammiferi marini spiaggiati.",
    },
    clues: [
      {
        en: "One of the world's largest flying birds, boasting a massive wingspan up to 3.3 meters, soaring on high mountain thermal updrafts without flapping for hours.",
        es: "Una de las aves voladoras de mayor envergadura alar (hasta 3,3 metros), planeando horas en corrientes térmicas de montaña casi sin aletear.",
        it: "Uno dei più grandi uccelli volatori del mondo con 3,3 metri di apertura alare, veleggia per ore sfruttando le termiche.",
      },
      {
        en: "Features a naked head that flushes color according to emotional state, a prominent fleshy caruncle (comb) on adult males, and a pristine white neck ruff.",
        es: "Presenta cabeza calva que cambia de color según el estado anímico, una cresta carnosa en machos y un collar de plumas blancas.",
        it: "Ha la testa nuda che muta colore con l'umore, una cresta carnosa nei maschi e un collare di piume candide.",
      },
    ],
    image: {
      url: "/images/species/andean-condor.jpg",
      photographer: "Byron Lasluisa Vásquez",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:C%C3%B3ndor_Andino.jpg",
      alt: "Andean condor perched on a rocky mountain slope",
    },
    rangeConfig: [{ minLon: -78.0, maxLon: -65.0, minLat: -55.0, maxLat: 11.0 }],
  },

  // 38. California Condor
  {
    id: "california-condor",
    commonName: { en: "California Condor", es: "Cóndor Californiano", it: "Condor della California" },
    scientificName: "Gymnogyps californianus",
    taxonClass: "Aves",
    order: "Cathartiformes",
    family: "Cathartidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "CR",
    populationTrend: "increasing",
    populationEstimate: "~607 individuals (~392 in the wild)",
    populationHistory: [
      { year: 1987, estimate: 22, label: "All wild survivors taken into captive breeding" },
      { year: 1992, estimate: 63, label: "First captive-reared releases" },
      { year: 2010, estimate: 381 },
      { year: 2022, estimate: 561 },
      { year: 2025, estimate: 607, label: "Population surpasses 600 for the first time" },
    ],
    climateVulnerability: {
      en: "Megafires in rugged chaparral and conifer canyons destroy cliffside and redwood tree cavity nesting roosts.",
      es: "Megaincendios en cañones de matorral y secuoyas destruyen oquedades históricas de nidificación.",
      it: "Incendi boschivi distruggono le cavità di nidificazione nelle sequoie e sulle pareti rocciose.",
    },
    keyThreats: [
      {
        threat: "Lead poisoning from spent ammunition",
        impact: "high",
        description: {
          en: "Ingestion of lead shotgun pellets and bullet fragments from gut piles left by hunters.",
          es: "Ingestión de perdigones y fragmentos de munición de plomo en vísceras de caza abandonadas.",
          it: "Saturnismo da ingestione di frammenti di piombo presenti nelle carcasse cacciate.",
        },
      },
    ],
    diet: {
      en: "Scavenger: Deer, elk, cattle, marine mammals (whales, sea lions) along coastal bluffs.",
      es: "Carroñero: ciervos, alces, ganado y mamíferos marinos varados en la costa.",
      it: "Necrofago: cervi, mammiferi marini spiaggiati e grandi erbivori.",
    },
    clues: [
      {
        en: "One of the largest flying land birds alive, brought back from the brink of total extinction through rigorous captive breeding after declining to just 22 individuals in 1987.",
        es: "Una de las aves terrestres voladoras más grandes del mundo, salvada de la extinción total tras quedar reducida a solo 22 individuos en 1987.",
        it: "Uno dei più grandi uccelli terrestri volatori al mondo, salvato dall'estinzione grazie all'allevamento in cattività di soli 22 superstiti nel 1987.",
      },
      {
        en: "Features a 3-meter wingspan with conspicuous triangular white patches under the wing linings and a bare orange head in mature adults.",
        es: "Luce 3 metros de envergadura con parches triangulares blancos bajo las alas y cabeza desnuda anaranjada en adultos.",
        it: "Vanta 3 metri di apertura alare con vistose bande bianche sotto le ali e testa nuda arancione.",
      },
    ],
    image: {
      url: "/images/species/california-condor.jpg",
      photographer: "Stuart Itoga / California Department of Fish and Wildlife",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:CA_Condor_on_rocks_(19752763555).jpg",
      alt: "California condor with wings spread on rocks",
    },
    rangeConfig: [{ minLon: -122.0, maxLon: -111.0, minLat: 31.0, maxLat: 37.5 }],
  },

  // 39. Harpy Eagle
  {
    id: "harpy-eagle",
    commonName: { en: "Harpy Eagle", es: "Águila Arpía", it: "Aquila Arpia" },
    scientificName: "Harpia harpyja",
    taxonClass: "Aves",
    order: "Accipitriformes",
    family: "Accipitridae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "Population size highly uncertain: likely tens of thousands, declining sharply",
    populationHistory: [
      { year: 1990, estimate: 120000 },
      { year: 2010, estimate: 80000 },
      { year: 2024, estimate: 55000 },
    ],
    climateVulnerability: {
      en: "Severe drought increases canopy deciduousness, exposing massive stick nests in emergent kapok trees to intense solar overheating.",
      es: "La sequedad extrema provoca caída de hojas del dosel, exponiendo sus nidos gigantes en ceibas al sobrecalentamiento.",
      it: "Le siccità riducono la copertura fogliare esponendo i nidi sugli alberi emergenti al surriscaldamento.",
    },
    keyThreats: [
      {
        threat: "Amazonian deforestation & shooting",
        impact: "high",
        description: {
          en: "Destruction of giant emergent nesting trees (Ceiba pentandra) and opportunistic shooting by ranchers.",
          es: "Tala de grandes árboles emergentes para nidificación y disparos furtivos de ganaderos.",
          it: "Abbattimento dei grandi alberi emergenti per la nidificazione e bracconaggio.",
        },
      },
    ],
    diet: {
      en: "Apex canopy raptor: Two-toed and three-toed sloths, howler monkeys, capuchins, and coatis.",
      es: "Superdepredador del dosel: perezosos de dos y tres dedos, monos aulladores, capuchinos y coatíes.",
      it: "Predatore del baldacchino forestale: bradipi, scimmie urlatrici e coati.",
    },
    clues: [
      {
        en: "The most powerful raptor of the tropical rainforest canopy, possessing massive rear talons up to 13 cm long—larger than the claws of a grizzly bear.",
        es: "La rapaz más poderosa del dosel de la selva tropical, con garras traseras de hasta 13 cm, más grandes que las garras de un oso pardo.",
        it: "Il rapace più potente del baldacchino della foresta pluviale tropicale, con artigli posteriori lunghi fino a 13 cm, pari a quelli di un orso.",
      },
      {
        en: "Features a divided double-feathered erectile crown on its head, short broad wings, and a long banded tail designed for high-speed maneuvering through dense tropical rainforest canopy.",
        es: "Luce una doble cresta eréctil en la coronilla, alas anchas y cola larga adaptada a maniobrar a toda velocidad entre las ramas de la selva.",
        it: "Presenta una doppia cresta erigibile sul capo e ali corte e larghe per sfrecciare agilmente tra i rami fitti.",
      },
    ],
    image: {
      url: "/images/species/harpy-eagle.jpg",
      photographer: "Brian Gratwicke",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Harpy_Eagle_(Harpia_harpyja).jpg",
      alt: "Harpy eagle perched in canopy",
    },
    rangeConfig: [{ minLon: -85.0, maxLon: -45.0, minLat: -25.0, maxLat: 15.0 }],
  },

  // 40. Shoebill
  {
    id: "shoebill",
    commonName: { en: "Shoebill", es: "Picozapato", it: "Becco a Scarpa" },
    scientificName: "Balaeniceps rex",
    taxonClass: "Aves",
    order: "Pelecaniformes",
    family: "Balaenicipitidae",
    realm: "Freshwater",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~5,000 – 8,000 individuals",
    populationHistory: [
      { year: 1995, estimate: 12000 },
      { year: 2008, estimate: 8000 },
      { year: 2024, estimate: 6000 },
    ],
    climateVulnerability: {
      en: "Desiccation of expansive papyrus swamp wetlands and seasonal flood recession concentrates individuals around disturbed water channels.",
      es: "La desecación de pantanos de papiro concentra ejemplares en canales alterados por el ganado.",
      it: "Il prosciugamento delle paludi a papiro riduce le zone umide incontaminate di pesca.",
    },
    keyThreats: [
      {
        threat: "Live bird trade & wetland drainage",
        impact: "high",
        description: {
          en: "Capture of live birds and eggs for private exotic collections and drainage for rice cultivation.",
          es: "Tráfico ilegal de aves vivas para colecciones privadas y drenaje de pantanos para arrozales.",
          it: "Cattura illegale per collezionisti privati e bonifica delle paludi per risaie.",
        },
      },
    ],
    diet: {
      en: "Piscivore specialist: Marbled lungfish (Protopterus aethiopicus), bichirs, catfish, and juvenile monitor lizards.",
      es: "Especialista piscívoro: pez pulmonado africano, tilapias, bagres y pequeñas crías de cocodrilo.",
      it: "Pesci d'acqua dolce: prototteri (pesci polmonati), pesci gatto e piccoli varani.",
    },
    clues: [
      {
        en: "Prehistoric-looking, tall wading bird of dense, poorly oxygenated freshwater papyrus swamps and seasonal floodplains.",
        es: "Ave zancuda de aspecto prehistórico que habita en densos pantanos de papiro y llanuras inundables tropicales.",
        it: "Uccello trampoliere dall'aspetto preistorico, immobile per ore nelle vaste paludi di papiro in agguato ai pesci polmonati.",
      },
      {
        en: "Features a gigantic, swollen bulbous bill ending in a sharp nail-like hook, used to execute explosive head-first 'collapse' strikes onto surfaced lungfish.",
        es: "Posee un pico gigantesco con forma de zueco rematado en un afilado gancho, con el que se desploma de cabeza sobre peces pulmonados.",
        it: "Dotato di un enorme becco a forma di zoccolo uncinato all'apice per catturare pesci polmonati con attacchi fulminei.",
      },
    ],
    image: {
      url: "/images/species/shoebill.jpg",
      photographer: "Eric Inafuku",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Balaeniceps_rex_-East_Africa-8.jpg",
      alt: "Shoebill close-up portrait",
    },
    rangeConfig: [{ minLon: 26.0, maxLon: 35.0, minLat: -13.0, maxLat: 10.0 }],
  },

  // 41. Southern Cassowary
  {
    id: "southern-cassowary",
    commonName: { en: "Southern Cassowary", es: "Casuario Común / Casuario del Sur", it: "Casuario Comune" },
    scientificName: "Casuarius casuarius",
    taxonClass: "Aves",
    order: "Casuariiformes",
    family: "Casuariidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate: "~20,000 – 40,000 individuals (New Guinea & NE Australia)",
    populationHistory: [
      { year: 1990, estimate: 30000 },
      { year: 2017, estimate: 35000 },
      { year: 2024, estimate: 30000 },
    ],
    climateVulnerability: {
      en: "High-category cyclones strip tropical rainforest fruit canopies, causing post-cyclone starvation and road mortality.",
      es: "Ciclones de gran intensidad destruyen el dosel frutal de la selva tropical, provocando inanición post-tormenta.",
      it: "Cicloni intensi distruggono la disponibilità di frutti nella foresta pluviale.",
    },
    keyThreats: [
      {
        threat: "Highway strikes & dog attacks",
        impact: "high",
        description: {
          en: "Fragmentation of lowland coastal rainforests leading to frequent vehicle strikes and domestic dog attacks on chicks.",
          es: "Fragmentación de selvas costeras con frecuentes atropellos viales y ataques de perros.",
          it: "Frammentazione stradale con frequenti investimenti e attacchi di cani ai pulcini.",
        },
      },
    ],
    diet: {
      en: "Frugivore: Hundreds of species of rainforest fruits swallowed whole, distributing intact seeds.",
      es: "Frugívoro: cientos de especies de frutos de la selva que engulle enteros y dispersa intactos.",
      it: "Frugivoro: frutti di bosco inghiottiti interi di cui disperde i semi.",
    },
    keystoneRole: {
      en: "Keystone seed disperser: Sole dispersal agent for over 70 large-seeded tropical rainforest tree species.",
      es: "Dispersor clave: único animal capaz de tragar y dispersar semillas de más de 70 árboles tropicales.",
      it: "Specie chiave per la dispersione di semi giganti di oltre 70 alberi forestali.",
    },
    clues: [
      {
        en: "Massive, flightless solitary bird of dense tropical lowland rainforests, equipped with a 12-cm dagger-like inner claw capable of delivering lethal defensive kicks.",
        es: "Ave no voladora solitaria y corpulenta de selvas tropicales, con una garra interior en forma de daga de 12 cm que usa en patadas defensivas.",
        it: "Grande uccello corridore solitario delle foreste pluviali, armato di un artiglio a pugnale di 12 cm per sferrare calci micidiali.",
      },
      {
        en: "Possesses glossy black plumage, a bright cobalt-blue neck with two dangling red wattles, and a tall keratinous casque atop its skull to deflect rainforest branches.",
        es: "Luce plumaje negro brillante, cuello azul cobalto con dos carúnculas rojas colgantes y un alto casco óseo de queratina sobre la cabeza.",
        it: "Ha piumaggio nero, collo blu cobalto con bargigli rossi e un alto casco corneo sul capo per farsi strada nella vegetazione.",
      },
    ],
    image: {
      url: "/images/species/southern-cassowary.jpg",
      photographer: "Chris Olszewski",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cassowary_at_Coquette_Point,_Queensland,_2025,_05.jpg",
      alt: "Southern cassowary walking across open grass",
    },
    rangeConfig: [
      { minLon: 130.0, maxLon: 151.0, minLat: -18.5, maxLat: -2.0 },
    ],
  },

  // 42. North Island Brown Kiwi
  {
    id: "north-island-brown-kiwi",
    commonName: { en: "North Island Brown Kiwi", es: "Kiwi Marrón de la Isla Norte", it: "Kiwi Bruno dell'Isola del Nord" },
    scientificName: "Apteryx mantelli",
    taxonClass: "Aves",
    order: "Apterygiformes",
    family: "Apterygidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "VU",
    populationTrend: "increasing",
    populationEstimate: "~25,000 – 35,000 individuals",
    populationHistory: [
      { year: 1990, estimate: 60000 },
      { year: 2008, estimate: 25000 },
      { year: 2024, estimate: 30000, label: "Predator-free sanctuary recovery" },
    ],
    climateVulnerability: {
      en: "Summer drought hardens topsoil, making nocturnal probe-foraging for soil invertebrates energetically difficult.",
      es: "La sequía estival endurece el suelo forestal, impidiendo sondear con el pico en busca de lombrices.",
      it: "La siccità estiva indurisce il terreno rendendo difficile la ricerca di lombrichi col becco.",
    },
    keyThreats: [
      {
        threat: "Stoats & roaming domestic dogs",
        impact: "high",
        description: {
          en: "Invasive stoats (Mustela erminea) killing over 90% of unmanaged chicks and dogs killing adult birds.",
          es: "Armiños introducidos que matan el 90% de los polluelos y ataques de perros a adultos.",
          it: "Ermellini introdotti che predano i pulcini e cani che uccidono gli adulti.",
        },
      },
    ],
    diet: {
      en: "Nocturnal invertebrate probe-feeder: Earthworms, cicada larvae, beetles, spiders, and fallen berries.",
      es: "Invertebrados del suelo: lombrices de tierra, larvas de cigarra, escarabajos y frutos caídos.",
      it: "Invertebrati del suolo: lombrichi, larve e ragni scovati sondando il terreno.",
    },
    clues: [
      {
        en: "Nocturnal flightless bird with hair-like plumage, vestigial wings, no tail, and dense marrow-filled bones like a mammal.",
        es: "Ave nocturna no voladora con plumaje deshilachado tipo pelo, alas vestigiales ocultas y huesos densos con médula como un mamífero.",
        it: "Uccello notturno privo di ali funzionali e coda, con piumaggio simile a peli e ossa piene di midollo come i mammiferi.",
      },
      {
        en: "The only bird in the world with nostrils located at the very tip of its long, flexible bill, using a keen sense of smell to forage in subterranean leaf litter.",
        es: "La única ave del mundo con orificios nasales en la punta del pico, guiándose por el olfato para detectar presas bajo la hojarasca.",
        it: "L'unico uccello al mondo con narici all'estremità del becco, con cui fiuta le prede sotto terra.",
      },
    ],
    image: {
      url: "/images/species/north-island-brown-kiwi.jpg",
      photographer: "The.Rohit",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Apteryx_mantelli_-Rotorua,_North_Island,_New_Zealand-8a.jpg",
      alt: "North Island Brown Kiwi foraging with its long bill",
    },
    rangeConfig: [{ minLon: 173.0, maxLon: 178.5, minLat: -39.5, maxLat: -34.5 }],
  },

  // 43. Kakapo
  {
    id: "kakapo",
    commonName: { en: "Kakapo", es: "Kákapu / Kakapo", it: "Kakapo" },
    scientificName: "Strigops habroptilus",
    taxonClass: "Aves",
    order: "Psittaciformes",
    family: "Strigopidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "CR",
    populationTrend: "increasing",
    populationEstimate: "~236 individuals (early 2026 count, managed on predator-free offshore islands)",
    populationHistory: [
      { year: 1995, estimate: 51, label: "Near extinction on Stewart Island" },
      { year: 2005, estimate: 86 },
      { year: 2019, estimate: 211, label: "Record breeding season" },
      { year: 2024, estimate: 247 },
      { year: 2026, estimate: 236, label: "Ahead of a record 95-chick breeding season" },
    ],
    climateVulnerability: {
      en: "Asynchrony in temperature cues triggers false mast-fruiting cycles in rimu trees (Dacrydium cupressinum).",
      es: "Anomalías térmicas desincronizan las fructificaciones masivas del árbol rimu, necesarias para la cría.",
      it: "Anomalie termiche alterano i cicli di fruttificazione del rimu necessari per la riproduzione.",
    },
    keyThreats: [
      {
        threat: "Extreme inbreeding & invasive predators",
        impact: "high",
        description: {
          en: "Complete loss of mainland habitat due to introduced stoats, cats, and rats; low egg fertility.",
          es: "Vulnerabilidad total a depredadores invasores y baja fertilidad por consanguinidad extrema.",
          it: "Elevatissima consanguineità e vulnerabilità totale ai mammiferi introdotti.",
        },
      },
    ],
    diet: {
      en: "Strict herbivore: Rimu fruit, podocarp seeds, ferns, mosses, roots, and tussock bulb stems.",
      es: "Herbívoro estricto: frutos de rimu, semillas de coníferas podocarpáceas, helechos y raíces.",
      it: "Erbivoro: frutti di rimu, semi di conifere, radici e felci.",
    },
    clues: [
      {
        en: "The world's heaviest parrot and the only flightless parrot, weighing up to 4 kg with moss-green mottled camouflage plumage.",
        es: "El loro más pesado del mundo y el único incapaz de volar, pesando hasta 4 kg con plumaje verde musgo moteado.",
        it: "Il pappagallo più pesante del mondo e l'unico incapace di volare, fino a 4 kg con piumaggio verde muschio.",
      },
      {
        en: "The only parrot with a lek breeding system, where solitary males excavate shallow bowl depressions on mountain ridges and emit deep sonic booming calls for months.",
        es: "El único loro con sistema de apareamiento en lek, donde los machos excavan cuencos en crestas y emiten profundos retumbos infrasónicos.",
        it: "L'unico pappagallo con sistema di accoppiamento a lek, con i maschi che scavano buche ed emettono boati a bassa frequenza.",
      },
    ],
    image: {
      url: "/images/species/kakapo.jpg",
      photographer: "Kimberley Collins",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:K%C4%81k%C4%81p%C5%8D_(42241578612).jpg",
      alt: "Kakapo close-up portrait",
    },
    rangeConfig: [{ minLon: 166.0, maxLon: 169.0, minLat: -47.5, maxLat: -45.0 }],
  },

  // 44. Atlantic Puffin
  {
    id: "atlantic-puffin",
    commonName: { en: "Atlantic Puffin", es: "Frailecillo Atlántico", it: "Pulcinella di Mare" },
    scientificName: "Fratercula arctica",
    taxonClass: "Aves",
    order: "Charadriiformes",
    family: "Alcidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~7 – 12 million individuals (estimates vary by source; declining)",
    populationHistory: [
      { year: 2000, estimate: 15000000 },
      { year: 2015, estimate: 12000000, label: "Uplisted to Vulnerable in Europe" },
      { year: 2024, estimate: 10000000 },
    ],
    climateVulnerability: {
      en: "North Atlantic ocean warming shifts cold-water sandeel (Ammodytes) schools northward away from coastal nesting cliffs, causing widespread chick starvation.",
      es: "El calentamiento del Atlántico Norte desplaza los bancos de lanzones hacia el polo, provocando desnutrición en las colonias.",
      it: "Il riscaldamento delle acque sposta verso nord i banchi di cicerelli provocando la morte dei pulcini.",
    },
    keyThreats: [
      {
        threat: "Forage fish crashes & invasive rats",
        impact: "high",
        description: {
          en: "Industrial overfishing of sandeels and introduced rats/mink preying on burrow nests.",
          es: "Sobrepesca de peces forrajeros y depredación de nidos por ratas y visones introducidos.",
          it: "Sovrapesca di piccoli pesci e ratti introdotti che predano i nidi scavati nel suolo.",
        },
      },
    ],
    diet: {
      en: "Small schooling forage fish: Lesser sandeels, sprats, capelin, and Atlantic herring.",
      es: "Pequeños peces pelágicos: lanzones, espadines, capelines y arenques.",
      it: "Piccoli pesci pelagici: cicerelli, aringhe e capelani.",
    },
    clues: [
      {
        en: "Pelagic seabird that spends autumn and winter entirely on the open ocean, returning to grassy clifftops and offshore islands only to breed in excavated burrows.",
        es: "Ave marina pelágica que pasa el invierno en alta mar y acude a acantilados herbosos e islotes para criar en madrigueras excavadas en la turba.",
        it: "Uccello marino pelagico che trascorre l'inverno in mare aperto e nidifica in gallerie scavate su scogliere erbose.",
      },
      {
        en: "Develops a large, laterally flattened bill adorned with vivid orange, blue, and yellow stripes during the breeding season, capable of carrying dozens of small fish crosswise.",
        es: "Desarrolla en primavera un llamativo pico comprimido con vivos tonos naranjas y amarillos, capaz de sujetar decenas de pececillos cruzados.",
        it: "In primavera sviluppa un becco compresso e variopinto d'arancione e giallo, in grado di trattenere decine di pesciolini trasversalmente.",
      },
    ],
    image: {
      url: "/images/species/atlantic-puffin.jpg",
      photographer: "Andreas Trepte",
      license: "CC BY-SA 2.5",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Atlantic_Puffin_Fratercula_arctica.jpg",
      alt: "Atlantic puffin portrait",
    },
    rangeConfig: [
      { minLon: -70.0, maxLon: 35.0, minLat: 48.0, maxLat: 78.0, includeOcean: true },
    ],
  },

  // 45. Resplendent Quetzal
  {
    id: "resplendent-quetzal",
    commonName: { en: "Resplendent Quetzal", es: "Quetzal Resplandeciente", it: "Quetzal Splendente" },
    scientificName: "Pharomachrus mocinno",
    taxonClass: "Aves",
    order: "Trogoniformes",
    family: "Trogonidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate: "~20,000 – 50,000 individuals (regional estimate)",
    populationHistory: [
      { year: 1990, estimate: 80000 },
      { year: 2010, estimate: 40000 },
      { year: 2024, estimate: 30000 },
    ],
    climateVulnerability: {
      en: "Lifting cloud base in montane cloud forests dries epiphyte mosses and reduces wild avocado (Lauraceae) fruiting.",
      es: "La elevación de la base de nubes deseca los musgos epífitos y reduce la producción de aguacatillos silvestres.",
      it: "L'innalzamento della coltre di nubi inaridisce le foreste montane riducendo gli aguacatilli selvatici.",
    },
    keyThreats: [
      {
        threat: "Cloud forest clearing & nest competition",
        impact: "high",
        description: {
          en: "Conversion of cloud forest for coffee and cattle, alongside competition for dead tree cavities with keel-billed toucans.",
          es: "Deforestación para cafetales y competencia por troncos podridos para anidar con tucanes.",
          it: "Deforestazione per piantagioni di caffè e competizione per le cavità nei tronchi morti.",
        },
      },
    ],
    diet: {
      en: "Frugivore specialist: Wild avocados (Lauraceae family) swallowed whole and regurgitated as seeds, plus tree frogs and insects.",
      es: "Frugívoro especialista: frutos de laurisilva (aguacatillos) engullidos enteros, ranitas y lagartijas.",
      it: "Frugivoro: aguacatilli (Lauracee) inghiottiti interi di cui rigurgita i noccioli.",
    },
    clues: [
      {
        en: "Inhabits high-elevation montane cloud forests between 1,400 and 3,000 meters, dependent on dense epiphytic mosses and dead tree snags for nesting cavities.",
        es: "Habita en bosques nublados de alta montaña entre 1.400 y 3.000 m, dependiente de musgos epífitos y troncos secos para anidar.",
        it: "Abita foreste nebulose d'alta quota tra 1.400 e 3.000 m, nidificando in cavità di tronchi marcescenti.",
      },
      {
        en: "Males feature iridescent emerald-green plumage, a crimson-red breast, and two elongated upper tail covert streamers flowing up to 1 meter in length.",
        es: "Los machos lucen plumaje verde esmeralda iridiscente, pecho rojo escarlata y dos larguísimas plumas supracaudales de hasta 1 metro.",
        it: "I maschi hanno piumaggio verde smeraldo brillante, petto rosso cremisi e due penne caudali lunghe fino a 1 metro.",
      },
    ],
    image: {
      url: "/images/species/resplendent-quetzal.jpg",
      photographer: "Giles Laurent",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:059_Male_Resplendent_quetzal_with_a_long_tail_in_Los_Quetzales_National_Park_Photo_by_Giles_Laurent.jpg",
      alt: "Resplendent Quetzal perched with long tail",
    },
    rangeConfig: [{ minLon: -94.0, maxLon: -79.0, minLat: 8.0, maxLat: 16.5 }],
  },

  // 46. Hoatzin
  {
    id: "hoatzin",
    commonName: { en: "Hoatzin", es: "Hoatzín / Pava Hedionda", it: "Hoazin" },
    scientificName: "Opisthocomus hoazin",
    taxonClass: "Aves",
    order: "Opisthocomiformes",
    family: "Opisthocomidae",
    realm: "Freshwater",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate: "Widespread in millions across Amazon and Orinoco basins",
    populationHistory: [
      { year: 1990, estimate: 5000000, label: "Rough order-of-magnitude estimate; no formal census" },
      { year: 2024, estimate: 4500000, label: "Rough order-of-magnitude estimate; no formal census" },
    ],
    climateVulnerability: {
      en: "Drought and altered flood-pulse regimes dry out riparian oxbow lagoons and gallery forest edges.",
      es: "Sequías y alteración del pulso de inundación secan lagunas de meandro y bordes de selva en galería.",
      it: "Le siccità alterano i meandri fluviali e le lagune golenali.",
    },
    keyThreats: [
      {
        threat: "Riparian deforestation",
        impact: "low",
        description: {
          en: "Clearing of riparian gallery vegetation along navigable river banks.",
          es: "Tala de vegetación de ribera en márgenes fluviales.",
          it: "Deforestazione lungo le sponde dei fiumi.",
        },
      },
    ],
    diet: {
      en: "Strict folivore: Leaves, shoots, and flowers of riparian arums and mangrove shrubs fermented in an enlarged crop.",
      es: "Folívoro estricto: hojas y brotes de plantas de ribera fermentadas en su buche gigante.",
      it: "Folivoro specializzato: foglie e germogli fermentati in un enorme gozzo muscolare.",
    },
    clues: [
      {
        en: "The only avian foregut fermenter, using an enormous muscular crop containing symbiotic anaerobic bacteria to digest tough fibrous leaves like a bovine ruminant.",
        es: "La única ave con fermentación digestiva pregástrica, usando un buche enorme con bacterias simbióticas para digerir hojas como una vaca.",
        it: "L'unico uccello con digestione per fermentazione gastrica simile ai ruminanti, con un gozzo enorme ricco di batteri simbiotici.",
      },
      {
        en: "Chicks are born with functional claws on their wing digits, enabling them to climb back into canopy branches after dropping into rivers to escape predators.",
        es: "Los polluelos nacen con garras funcionales en los dedos de las alas para trepar por las ramas tras saltar al agua ante depredadores.",
        it: "I pulcini nascono con artigli funzionali sulle ali con cui si arrampicano sui rami se cadono in acqua per fuggire ai predatori.",
      },
    ],
    image: {
      url: "/images/species/hoatzin.jpg",
      photographer: "ricardo_soul",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hoatzin_(Opisthocomus_hoazin).jpg",
      alt: "Hoatzin perched on branch",
    },
    rangeConfig: [{ minLon: -76.0, maxLon: -48.0, minLat: -18.0, maxLat: 10.0 }],
  },

  // 47. Western Capercaillie
  {
    id: "western-capercaillie",
    commonName: { en: "Western Capercaillie", es: "Urogallo Común", it: "Gallo Cedrone" },
    scientificName: "Tetrao urogallus",
    taxonClass: "Aves",
    order: "Galliformes",
    family: "Phasianidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate: "~4–8.5M mature individuals (severely threatened in southern relicts)",
    populationHistory: [
      { year: 1980, estimate: 3000000, label: "Monitored western/central European range" },
      { year: 2000, estimate: 2000000, label: "Monitored western/central European range" },
      { year: 2024, estimate: 1600000, label: "Declining trend in monitored western/central European range" },
    ],
    climateVulnerability: {
      en: "Milder, wetter springs cause high chick hypothermia during the critical post-hatch insect-feeding phase.",
      es: "Primaveras lluviosas y templadas provocan hipotermia masiva en polluelos durante la eclosión de orugas.",
      it: "Primavere piovose provocano ipotermia nei pulcini durante la fase di alimentazione a insetti.",
    },
    keyThreats: [
      {
        threat: "Commercial forestry & deer fencing",
        impact: "high",
        description: {
          en: "Clear-cut forestry removing old-growth Scots pine / bilberry understories, and collisions with high wire fencing.",
          es: "Talas intensivas de pinares maduros con arándanos y colisiones letales contra vallas cinegéticas.",
          it: "Tagli forestali dei boschi maturi di conifere ricchi di mirtilli e collisioni con recinzioni.",
        },
      },
    ],
    diet: {
      en: "Herbivore: Conifer needles (Pinus sylvestris) in winter; bilberry leaves, shoots, berries, and ants in summer.",
      es: "Herbívoro: acículas de pino albar en invierno; hojas y frutos de arándano e insectos en verano.",
      it: "Aghi di pino silvestre in inverno; foglie e bacche di mirtillo e formiche in estate.",
    },
    clues: [
      {
        en: "The largest grouse species on Earth, strictly associated with mature, mossy old-growth boreal and montane conifer forests rich in bilberry shrubs.",
        es: "El urogallo más grande del planeta, estrictamente ligado a bosques maduros de coníferas de montaña con abundante sotobosque de arándanos.",
        it: "Il più grande tetraonide del mondo, strettamente legato a foreste mature di conifere montane ricche di mirtilli.",
      },
      {
        en: "Famous for spring dawn communal lek displays where massive black cocks fan broad tails, droop wings, and vocalize popping 'cork-sound' calls followed by guttural wheezes.",
        es: "Célebre por sus paradas nupciales en cantaderos primaverales, desplegando su cola en abanico y emitiendo chasquidos metálicos.",
        it: "Famoso per le parate nuziali nei lek primaverili, aprendo la coda a ventaglio ed emettendo caratteristici schiocchi e rullii.",
      },
    ],
    image: {
      url: "/images/species/western-capercaillie.jpg",
      photographer: "Rufus46",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Auerhahn_Tetrao_urogallus_Kiefersfelden-1.jpg",
      alt: "Western Capercaillie cock displaying",
    },
    rangeConfig: [
      { minLon: -5.0, maxLon: 120.0, minLat: 42.0, maxLat: 68.0 },
    ],
  },

  // 48. Peregrine Falcon
  {
    id: "peregrine-falcon",
    commonName: { en: "Peregrine Falcon", es: "Halcón Peregrino", it: "Falco Pellegrino" },
    scientificName: "Falco peregrinus",
    taxonClass: "Aves",
    order: "Falconiformes",
    family: "Falconidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "increasing",
    populationEstimate: "~100,000 – 499,999 mature individuals (cosmopolitan recovery)",
    populationHistory: [
      { year: 1965, estimate: 20000, label: "DDT pesticide reproductive collapse" },
      { year: 1980, estimate: 50000 },
      { year: 2000, estimate: 100000 },
      { year: 2024, estimate: 140000 },
    ],
    climateVulnerability: {
      en: "Heavy unseasonable rainfall events flood cliff ledges and urban building eyries, causing egg chilling.",
      es: "Tormentas torrenciales inundan repisas rocosas y nidos urbanos provocando enfriamiento de huevos.",
      it: "Piogge torrenziali anomale allagano i nidi su falesie e cornicioni urbani.",
    },
    keyThreats: [
      {
        threat: "Pesticide contamination & nest poaching",
        impact: "low",
        description: {
          en: "Organochlorine eggshell thinning (mostly historical) and occasional nest-robbing for falconry.",
          es: "Adelgazamiento de cáscara por pesticidas (histórico) y expolio ocasional para cetrería.",
          it: "Contaminazione da pesticidi (storico) e bracconaggio di nidiacei per falconeria.",
        },
      },
    ],
    diet: {
      en: "Avian aerial hunter: Pigeons, doves, waterfowl, waders, songbirds, and bats struck mid-air.",
      es: "Cazador aéreo de aves: palomas, tórtolas, ánades y limícolas capturadas en pleno vuelo.",
      it: "Cacciatore aereo specializzato: piccioni, anatre e uccelli migratori catturati in volo.",
    },
    clues: [
      {
        en: "The fastest member of the animal kingdom, capable of reaching stoop dive speeds exceeding 320 km/h (200 mph) when pursuing aerial prey.",
        es: "El animal más veloz de la biosfera, alcanzando picados aéreos superiores a los 320 km/h para derribar aves al vuelo.",
        it: "L'animale più veloce del pianeta, capace di picchiate spettacolari a oltre 320 km/h.",
      },
      {
        en: "Possesses aerodynamic pointed wings, a dark 'helmeted' facial hood with black malar stripes, and specialized bony nostrils (baffles) allowing breathing at extreme dive velocities.",
        es: "Presenta alas puntiagudas, bigotera facial negra y conos óseos en los orificios nasales para respirar durante picados extremos.",
        it: "Dotato di ali affusolate, 'baffi' neri sul volto e tubercoli nasali ossei per respirare alle altissime velocità di picchiata.",
      },
    ],
    image: {
      url: "/images/species/peregrine-falcon.jpg",
      photographer: "Andy Morffew",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Winchester_Peregrine_(54078783494).jpg",
      alt: "Peregrine falcon perched portrait",
    },
    rangeConfig: [
      { minLon: -180.0, maxLon: 180.0, minLat: -50.0, maxLat: 72.0 },
    ],
  },

  // 49. Snowy Owl
  {
    id: "snowy-owl",
    commonName: { en: "Snowy Owl", es: "Búho Nival", it: "Civetta delle Nevi" },
    scientificName: "Bubo scandiacus",
    taxonClass: "Aves",
    order: "Strigiformes",
    family: "Strigidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~14,000 – 28,000 mature individuals",
    populationHistory: [
      { year: 2000, estimate: 100000 },
      { year: 2017, estimate: 28000, label: "Uplisted to Vulnerable following a comprehensive population review" },
      { year: 2024, estimate: 20000 },
    ],
    climateVulnerability: {
      en: "Warming Arctic tundra alters snowpack ice crusting, preventing lemmings from breeding beneath subnivean burrows.",
      es: "La descongelación y recongelación del manto nival bloquea la reproducción de lemmings bajo la nieve.",
      it: "Il disgelo e ricongelamento della neve impedisce ai lemming di riprodursi sotto il manto nevoso.",
    },
    keyThreats: [
      {
        threat: "Lemming population crashes & collision",
        impact: "high",
        description: {
          en: "Cyclical collapses of northern lemmings and collisions with powerlines/wind turbines during winter irruptions.",
          es: "Colapsos cíclicos de poblaciones de lemmings y choques con tendidos eléctricos en migraciones.",
          it: "Crolli ciclici dei lemming e collisioni con linee elettriche durante le dispersioni invernali.",
        },
      },
    ],
    diet: {
      en: "Lemming specialist (Dicrostonyx and Lemmus), plus ptarmigans, ducks, seabirds, and hares.",
      es: "Especialista en lemmings, complementado con perdices nivales, patos marinos y liebres árticas.",
      it: "Specialista in lemming, integrato con pernici bianche e anatre marine.",
    },
    clues: [
      {
        en: "Large, diurnal nomadic raptor of the treeless, windswept polar tundra, with dense white feathering extending down over its toes and talons.",
        es: "Gran rapaz nómada diurna de la tundra polar desprovista de árboles, con espeso plumaje blanco que cubre patas y garras.",
        it: "Grande rapace notturno ma diurno nelle abitudini, tipico della tundra polare con zampe densamente piumate.",
      },
      {
        en: "Nests directly in shallow scrape depressions on elevated tundra hummocks or pingos to maintain a 360-degree territorial view.",
        es: "Nidifica en depresiones del suelo sobre montículos o pingos para vigilar el horizonte sin árboles.",
        it: "Nidifica sul terreno su montagnole rialzate per controllare a 360° l'orizzonte della tundra.",
      },
    ],
    image: {
      url: "/images/species/snowy-owl.jpg",
      photographer: "David Syzdek",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bubo_scandiacus_Delta_5.jpg",
      alt: "Snowy owls resting on the ground",
    },
    rangeConfig: [
      { minLon: -180.0, maxLon: 180.0, minLat: 58.0, maxLat: 82.0 },
    ],
  },

  // 50. Kea
  {
    id: "kea",
    commonName: { en: "Kea", es: "Kea", it: "Kea" },
    scientificName: "Nestor notabilis",
    taxonClass: "Aves",
    order: "Psittaciformes",
    family: "Strigopidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~4,000 mature individuals (~6,000 total)",
    populationHistory: [
      { year: 1986, estimate: 15000 },
      { year: 2008, estimate: 5000 },
      { year: 2024, estimate: 4000 },
    ],
    climateVulnerability: {
      en: "Loss of alpine snowpack reduces seasonal food caching opportunities and increases mammalian predator activity at high elevations.",
      es: "La menor persistencia de nieve permite que depredadores invasores alcancen cotas alpinas.",
      it: "La riduzione delle nevi alpine permette ai predatori introdotti di salire a quote elevate.",
    },
    keyThreats: [
      {
        threat: "Invasive predators & lead ingestion",
        impact: "high",
        description: {
          en: "Stoats and possums raiding ground nests, alongside toxic lead poisoning from chewing building flashings.",
          es: "Armiños y pósums que asaltan nidos en oquedades y envenenamiento por plomo de tejados.",
          it: "Predazione dei nidi da parte di ermellini e saturnismo da lamiere di piombo nei rifugi.",
        },
      },
    ],
    diet: {
      en: "Omnivorous opportunist: Alpine berries, roots, beech buds, nectar, insects, and scavenging carcasses.",
      es: "Omnívoro oportunista: bayas alpinas, brotes de haya austral, néctar, larvas y carroña.",
      it: "Onnivoro opportunista: bacche alpine, germogli di faggio australe, insetti e carcasse.",
    },
    clues: [
      {
        en: "The world's only true alpine parrot, renowned for exceptional problem-solving intelligence, curiosity, and play behaviors.",
        es: "El único loro verdaderamente alpino del mundo, célebre por su asombrosa inteligencia resolutiva y conducta de juego.",
        it: "L'unico vero pappagallo alpino del mondo, famoso per l'intelligenza straordinaria e i comportamenti di gioco.",
      },
      {
        en: "Features olive-green plumage with brilliant scarlet-orange underwings revealed in flight, and a slender, curved upper beak used to investigate novel objects.",
        es: "Posee plumaje verde oliva con deslumbrante color rojo escarlata bajo las alas y un pico largo y fino con el que manipula objetos.",
        it: "Ha piumaggio verde oliva con sottomanica scarlatta brillante visibile in volo e un becco ricurvo per esplorare oggetti.",
      },
    ],
    image: {
      url: "/images/species/kea.jpg",
      photographer: "Alexeyevitch",
      license: "Public Domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kea_-_Nestor_notabilis.jpg",
      alt: "Kea perched among rocks",
    },
    rangeConfig: [{ minLon: 167.0, maxLon: 174.0, minLat: -46.5, maxLat: -41.0 }],
  },

  // 51. Wandering Albatross
  {
    id: "wandering-albatross",
    commonName: { en: "Wandering Albatross", es: "Albatros Viajero", it: "Albatro Urlatore" },
    scientificName: "Diomedea exulans",
    taxonClass: "Aves",
    order: "Procellariiformes",
    family: "Diomedeidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~20,100 mature individuals (6,107 breeding pairs); declining under longline fishery bycatch pressure",
    populationHistory: [
      { year: 2007, estimate: 25500, label: "Adult individuals across all breeding colonies (8,114 breeding pairs)" },
      { year: 2018, estimate: 20100, label: "Mature individuals — current IUCN estimate (6,107 breeding pairs)" },
    ],
    climateVulnerability: {
      en: "Shifting Southern Ocean wind belts and warming waters are altering the reliable westerlies this species needs for near-effortless dynamic-soaring flight, while changing prey distributions force longer foraging trips that leave chicks waiting longer between meals.",
      es: "Los cambios en los vientos del Océano Austral y el calentamiento de sus aguas alteran los vientos del oeste de los que depende para su vuelo de planeo dinámico, obligando a viajes de forrajeo más largos que retrasan la alimentación de los polluelos.",
      it: "I mutamenti nei venti dell'Oceano Australe e il riscaldamento delle sue acque alterano i venti occidentali costanti necessari al volo dinamico veleggiato, costringendo a spostamenti di foraggiamento più lunghi che ritardano l'alimentazione dei pulcini.",
    },
    keyThreats: [
      {
        threat: "Longline fishery bycatch",
        impact: "high",
        description: {
          en: "Birds are hooked and drowned while attempting to seize baited hooks set from commercial longline vessels, historically the leading cause of adult mortality.",
          es: "Las aves quedan enganchadas y se ahogan al intentar tomar los anzuelos cebados de los palangres comerciales, históricamente la principal causa de mortalidad adulta.",
          it: "Gli uccelli restano agganciati e annegano nel tentativo di afferrare le esche degli ami dei palangari commerciali, storicamente la principale causa di mortalità degli adulti.",
        },
      },
      {
        threat: "Plastic ingestion and discarded fishing gear",
        impact: "medium",
        description: {
          en: "Floating plastic debris and abandoned hooks or lines are mistaken for food or entangle birds at sea.",
          es: "Los desechos plásticos flotantes y los anzuelos o líneas abandonados se confunden con alimento o enredan a las aves en el mar.",
          it: "I detriti di plastica galleggianti e gli ami o le lenze abbandonati vengono scambiati per cibo o intrappolano gli uccelli in mare.",
        },
      },
    ],
    diet: {
      en: "Squid, fish, and crustaceans snatched from the ocean surface, plus scavenged carrion and offal from fishing vessels.",
      es: "Calamares, peces y crustáceos capturados en la superficie del océano, además de carroña y desechos de barcos pesqueros.",
      it: "Calamari, pesci e crostacei catturati in superficie, oltre a carogne e scarti di pesca recuperati dalle navi.",
    },
    conservationActions: {
      en: "Regional fishery bodies such as CCAMLR now mandate bird-scaring lines, night-setting, and weighted hooks, cutting albatross bycatch around South Georgia by roughly 99%.",
      es: "Organismos pesqueros regionales como la CCRVMA exigen ahora líneas espantapájaros, calado nocturno y anzuelos con peso, reduciendo en un 99% la captura incidental de albatros en Georgia del Sur.",
      it: "Organismi regionali per la pesca come la CCAMLR impongono ora lenze spaventapasseri, cala notturna e ami zavorrati, riducendo del 99% circa la cattura accidentale di albatri intorno alla Georgia del Sud.",
    },
    clues: [
      {
        en: "Possesses the longest wingspan of any living bird species, exceeding 3.5 meters tip to tip, which lets it lock its wings and glide for days over open-ocean swells without a single wingbeat.",
        es: "Posee la envergadura alar más larga de cualquier ave viva, superior a 3,5 metros de punta a punta, lo que le permite bloquear las alas y planear días enteros sobre el oleaje oceánico sin batir ni una vez.",
        it: "Possiede l'apertura alare più lunga di qualsiasi uccello vivente, oltre 3,5 metri da punta a punta, che gli permette di bloccare le ali e veleggiare per giorni sull'oceano aperto senza un solo battito.",
      },
      {
        en: "Spends its first several years entirely airborne over open water without ever touching land, and can circle the entire globe in about two months by riding prevailing westerly winds.",
        es: "Pasa sus primeros años enteramente en vuelo sobre mar abierto sin tocar tierra jamás, y puede circunnavegar el globo en unos dos meses aprovechando los vientos predominantes del oeste.",
        it: "Trascorre i primi anni di vita interamente in volo sul mare aperto senza mai toccare terra, ed è in grado di circumnavigare il globo in circa due mesi sfruttando i venti occidentali prevalenti.",
      },
    ],
    image: {
      url: "/images/species/wandering-albatross.jpg",
      photographer: "JJ Harrison",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Diomedea_exulans_-_SE_Tasmania.jpg",
      alt: "Wandering albatross floating on the ocean surface",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: -65.0, maxLat: -30.0, includeOcean: true }],
    gbifTaxonKey: 5229302,
  },

  // 52. Secretarybird
  {
    id: "secretary-bird",
    commonName: { en: "Secretarybird", es: "Serpentario", it: "Segretario" },
    scientificName: "Sagittarius serpentarius",
    taxonClass: "Aves",
    order: "Accipitriformes",
    family: "Sagittariidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "6,700–67,000 mature individuals (wide uncertainty band); declining rapidly across its range",
    populationHistory: [
      { year: 2020, estimate: 6700, label: "Lower bound of the IUCN population estimate (range: 6,700–67,000) at uplisting to Endangered" },
    ],
    climateVulnerability: {
      en: "Prolonged drought and altered fire regimes favor the woody shrub encroachment that closes off the open grassland this ground-hunting species needs to spot and stalk prey on foot.",
      es: "Las sequías prolongadas y los regímenes de fuego alterados favorecen el avance de la vegetación leñosa que cierra los pastizales abiertos que esta especie necesita para detectar y acechar presas a pie.",
      it: "Le siccità prolungate e i regimi d'incendio alterati favoriscono l'avanzata della vegetazione legnosa che chiude le praterie aperte necessarie a questa specie per individuare e inseguire le prede a piedi.",
    },
    keyThreats: [
      {
        threat: "Grassland loss to woody encroachment & farmland conversion",
        impact: "high",
        description: {
          en: "Fire suppression and overgrazing allow shrubs and trees to close in on open grassland hunting habitat, while cropland conversion removes it outright.",
          es: "La supresión de incendios y el sobrepastoreo permiten que arbustos y árboles invadan el pastizal abierto de caza, mientras la conversión a tierras de cultivo lo elimina por completo.",
          it: "La soppressione degli incendi e il sovrapascolo permettono ad arbusti e alberi di invadere le praterie aperte di caccia, mentre la conversione in terreni agricoli le elimina del tutto.",
        },
      },
      {
        threat: "Collision with fences and power lines",
        impact: "medium",
        description: {
          en: "Low, fast flight across open country brings birds into frequent contact with fence wire and utility lines.",
          es: "Su vuelo bajo y rápido sobre terreno abierto provoca colisiones frecuentes con alambradas y tendidos eléctricos.",
          it: "Il volo basso e veloce sul terreno aperto provoca frequenti collisioni con recinzioni metalliche e linee elettriche.",
        },
      },
    ],
    diet: {
      en: "Ground-hunting carnivore: insects, rodents, lizards, and snakes — including venomous species — dispatched with rapid stomping kicks, plus eggs and nestlings of ground-nesting birds.",
      es: "Carnívoro cazador terrestre: insectos, roedores, lagartos y serpientes —incluidas especies venenosas— rematados a pisotones, además de huevos y polluelos de aves que nidifican en el suelo.",
      it: "Carnivoro cacciatore terrestre: insetti, roditori, lucertole e serpenti — comprese specie velenose — uccisi con rapidi colpi di zampa, oltre a uova e nidiacei di uccelli che nidificano al suolo.",
    },
    clues: [
      {
        en: "Long-legged, mostly terrestrial raptor that strides for up to 30 kilometers a day across open grassland on foot, taking flight only to reach an evening roost.",
        es: "Rapaz de patas largas y hábitos mayormente terrestres que camina hasta 30 kilómetros al día por pastizales abiertos, volando solo para llegar a su dormidero nocturno.",
        it: "Rapace dalle zampe lunghe e abitudini prevalentemente terrestri che percorre fino a 30 chilometri al giorno camminando su praterie aperte, prendendo il volo solo per raggiungere il dormitorio serale.",
      },
      {
        en: "Dispatches venomous snakes and other prey with rapid, targeted stomping kicks delivered with several times its own body weight in force, then swallows victims whole.",
        es: "Remata a serpientes venenosas y otras presas con veloces y precisos pisotones que golpean con varias veces su propio peso corporal, para luego tragarlas enteras.",
        it: "Uccide serpenti velenosi e altre prede con rapidi e precisi colpi di zampa che sprigionano una forza pari a diverse volte il proprio peso corporeo, per poi inghiottirle intere.",
      },
    ],
    image: {
      url: "/images/species/secretary-bird.jpg",
      photographer: "Bernard DUPONT",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Day_33_Secretarybird_(Sagittarius_serpentarius)_(53589117196).jpg",
      alt: "Secretarybird standing upright in tall grass",
    },
    rangeConfig: [{ minLon: -17.0, maxLon: 51.0, minLat: -34.0, maxLat: 20.0 }],
    gbifTaxonKey: 5229409,
  },

  // 53. Bald Eagle
  {
    id: "bald-eagle",
    commonName: { en: "Bald Eagle", es: "Águila Calva", it: "Aquila Testabianca" },
    scientificName: "Haliaeetus leucocephalus",
    taxonClass: "Aves",
    order: "Accipitriformes",
    family: "Accipitridae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "increasing",
    populationEstimate: "~316,700 individuals across the lower 48 states (2020 survey; 71,467 occupied nests) — population has quadrupled since 2009",
    populationHistory: [
      { year: 1963, estimate: 417, label: "Nesting pairs remaining in the lower 48 states — historic low after DDT-driven collapse" },
      { year: 2009, estimate: 72434, label: "Individuals across the lower 48 states (30,548 breeding pairs)" },
      { year: 2020, estimate: 316700, label: "Individuals across the lower 48 states (71,467 occupied nests), national survey" },
    ],
    climateVulnerability: {
      en: "Earlier snowmelt and shifting salmon-run timing can desynchronize egg-laying from peak fish abundance, while more frequent wildfires threaten the old-growth trees this species relies on for nesting along rivers and lakeshores.",
      es: "El deshielo temprano y el desfase en las corridas de salmón pueden desincronizar la puesta de huevos con el pico de abundancia de peces, mientras los incendios forestales más frecuentes amenazan los árboles maduros que usa para anidar junto a ríos y lagos.",
      it: "Il disgelo anticipato e lo sfasamento delle risalite di salmone possono destincronizzare la deposizione delle uova dal picco di abbondanza ittica, mentre incendi boschivi più frequenti minacciano gli alberi maturi usati per nidificare lungo fiumi e laghi.",
    },
    keyThreats: [
      {
        threat: "Lead poisoning from spent ammunition and fishing tackle",
        impact: "high",
        description: {
          en: "Scavenging carcasses and gut piles tainted with lead shot or bullet fragments causes chronic poisoning in more than half of adults sampled across dozens of U.S. states.",
          es: "Alimentarse de restos de caza contaminados con fragmentos de plomo causa intoxicación crónica en más de la mitad de los adultos muestreados en decenas de estados de EE. UU.",
          it: "Il consumo di carcasse e resti di caccia contaminati da frammenti di piombo causa avvelenamento cronico in oltre la metà degli adulti campionati in decine di stati statunitensi.",
        },
      },
      {
        threat: "Vehicle collisions while scavenging roadkill",
        impact: "medium",
        description: {
          en: "Eagles feeding on carrion along roadsides are frequently struck by vehicles, now among the leading documented causes of death.",
          es: "Las águilas que se alimentan de carroña junto a carreteras son atropelladas con frecuencia, hoy una de las principales causas de muerte documentadas.",
          it: "Le aquile che si nutrono di carogne lungo le strade vengono spesso investite dai veicoli, oggi tra le principali cause di morte documentate.",
        },
      },
    ],
    diet: {
      en: "Opportunistic carnivore, chiefly fish snatched from the water's surface, supplemented with waterfowl, carrion, and small mammals; frequently steals kills from other predators.",
      es: "Carnívoro oportunista, principalmente peces capturados en la superficie del agua, complementado con aves acuáticas, carroña y pequeños mamíferos; roba presas a otros depredadores con frecuencia.",
      it: "Carnivoro opportunista, principalmente pesci catturati in superficie, integrato da uccelli acquatici, carogne e piccoli mammiferi; ruba spesso le prede ad altri predatori.",
    },
    keystoneRole: {
      en: "Apex predator along waterways, regulating fish-eating bird and waterfowl populations and redistributing marine-derived nutrients inland via carrion and prey remains.",
      es: "Depredador ápice de los cursos de agua, regula las poblaciones de aves piscívoras y acuáticas y redistribuye tierra adentro nutrientes de origen marino a través de carroña y restos de presas.",
      it: "Predatore apicale lungo i corsi d'acqua, regola le popolazioni di uccelli ittiofagi e acquatici e ridistribuisce nell'entroterra nutrienti di origine marina tramite carogne e resti di prede.",
    },
    conservationActions: {
      en: "The 1972 DDT ban and decades of federal protection drove one of conservation's great recoveries; the species was delisted from the U.S. Endangered Species Act in 2007 and its population has since quadrupled.",
      es: "La prohibición del DDT en 1972 y décadas de protección federal impulsaron una de las grandes recuperaciones de la conservación; la especie fue retirada de la Ley de Especies en Peligro de EE. UU. en 2007 y su población se ha cuadruplicado desde entonces.",
      it: "Il divieto del DDT nel 1972 e decenni di protezione federale hanno guidato uno dei grandi successi della conservazione; la specie è stata rimossa dall'Endangered Species Act statunitense nel 2007 e da allora la sua popolazione è quadruplicata.",
    },
    clues: [
      {
        en: "Builds the largest tree nest of any bird species, with pairs reusing and enlarging the same structure over decades until it can exceed 4 meters deep and weigh over a ton.",
        es: "Construye el nido arbóreo más grande de cualquier ave, reutilizando y ampliando la misma estructura durante décadas hasta superar los 4 metros de profundidad y una tonelada de peso.",
        it: "Costruisce il nido arboreo più grande tra tutti gli uccelli, riutilizzando e ampliando la stessa struttura per decenni fino a superare i 4 metri di profondità e una tonnellata di peso.",
      },
      {
        en: "A fish-hunting sea eagle whose stark white head and tail only emerge after four to five years of mottled brown juvenile plumage, gathering by the hundreds along open, ice-free rivers in winter.",
        es: "Águila pescadora cuya cabeza y cola blancas solo aparecen tras cuatro o cinco años de plumaje juvenil pardo moteado, y que se congrega por cientos en ríos abiertos y libres de hielo en invierno.",
        it: "Aquila pescatrice la cui testa e coda bianche compaiono solo dopo quattro o cinque anni di piumaggio giovanile bruno maculato, che si raduna a centinaia lungo fiumi aperti e liberi dal ghiaccio in inverno.",
      },
    ],
    image: {
      url: "/images/species/bald-eagle.jpg",
      photographer: "Peter Wallack",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:025_Haliaeetus_leucocephalus.jpg",
      alt: "Bald eagle perched on a post against a blue sky",
    },
    rangeConfig: [{ minLon: -170.0, maxLon: -52.0, minLat: 24.0, maxLat: 71.0 }],
    gbifTaxonKey: 2480446,
  },

  // 54. King Penguin
  {
    id: "king-penguin",
    commonName: { en: "King Penguin", es: "Pingüino Rey", it: "Pinguino Reale" },
    scientificName: "Aptenodytes patagonicus",
    taxonClass: "Aves",
    order: "Sphenisciformes",
    family: "Spheniscidae",
    realm: "Marine",
    difficulty: "endemic",
    iucnStatus: "LC",
    populationTrend: "increasing",
    populationEstimate: "~2.23 million breeding pairs globally; increasing overall, though individual colonies have collapsed",
    populationHistory: [
      { year: 1982, estimate: 500000, label: "Breeding pairs at Île aux Cochons — once the largest king penguin colony on Earth" },
      { year: 2017, estimate: 60000, label: "Breeding pairs at Île aux Cochons after an 88% crash linked to a shifting oceanic feeding front" },
      { year: 2023, estimate: 2230000, label: "Total breeding pairs across all colonies worldwide" },
    ],
    climateVulnerability: {
      en: "Poleward retreat of the nutrient-rich oceanic front this species depends on for foraging is forcing breeding colonies to swim ever-greater distances to find food, already implicated in the catastrophic collapse of the world's largest colony.",
      es: "El desplazamiento hacia el polo del frente oceánico rico en nutrientes del que depende para alimentarse obliga a las colonias a nadar distancias cada vez mayores en busca de comida, un factor ya implicado en el colapso catastrófico de la mayor colonia del mundo.",
      it: "Lo spostamento verso il polo del fronte oceanico ricco di nutrienti da cui dipende per l'alimentazione costringe le colonie a nuotare distanze sempre maggiori in cerca di cibo, un fattore già collegato al crollo catastrofico della più grande colonia al mondo.",
    },
    keyThreats: [
      {
        threat: "Ocean warming shifting the polar feeding front",
        impact: "high",
        description: {
          en: "As the nutrient-rich Antarctic Polar Front shifts away from breeding islands, foraging trips lengthen and chick provisioning fails.",
          es: "A medida que el frente polar antártico, rico en nutrientes, se aleja de las islas de cría, los viajes de forrajeo se alargan y falla el aprovisionamiento de los polluelos.",
          it: "Con lo spostamento del fronte polare antartico, ricco di nutrienti, lontano dalle isole di nidificazione, i viaggi di foraggiamento si allungano e l'approvvigionamento dei pulcini viene meno.",
        },
      },
      {
        threat: "Avian influenza outbreaks",
        impact: "medium",
        description: {
          en: "Highly pathogenic avian influenza has recently reached dense subantarctic penguin colonies, raising the risk of mass mortality events.",
          es: "La gripe aviar altamente patógena ha llegado recientemente a densas colonias de pingüinos subantárticos, aumentando el riesgo de episodios de mortalidad masiva.",
          it: "L'influenza aviaria ad alta patogenicità ha recentemente raggiunto le fitte colonie di pinguini subantartiche, aumentando il rischio di eventi di mortalità di massa.",
        },
      },
    ],
    diet: {
      en: "Deep-diving piscivore: lanternfish and other mesopelagic fish, plus squid, caught on dives exceeding 300 meters deep.",
      es: "Piscívoro de buceo profundo: peces linterna y otros peces mesopelágicos, además de calamares, capturados en inmersiones de más de 300 metros.",
      it: "Piscivoro che effettua immersioni profonde: pesci lanterna e altri pesci mesopelagici, oltre a calamari, catturati in immersioni oltre i 300 metri.",
    },
    clues: [
      {
        en: "Second-largest of all penguin species, with such a prolonged breeding cycle — 14 to 16 months from laying to fledging — that successful pairs typically raise only two chicks every three years.",
        es: "El segundo pingüino más grande del mundo, con un ciclo reproductivo tan largo —de 14 a 16 meses desde la puesta hasta el vuelo del polluelo— que las parejas exitosas suelen criar solo dos polluelos cada tres años.",
        it: "Il secondo pinguino più grande al mondo, con un ciclo riproduttivo così lungo — da 14 a 16 mesi dalla deposizione all'involo — che le coppie di successo allevano in genere solo due pulcini ogni tre anni.",
      },
      {
        en: "Forms colonies of extraordinary density on treeless, wind-scoured shores, sporting a vivid orange-gold ear patch and throat bib bright enough to stand out against dark volcanic gravel.",
        es: "Forma colonias de una densidad extraordinaria en costas sin árboles y azotadas por el viento, luciendo una vistosa mancha auricular y un babero anaranjado dorado que resalta sobre la grava volcánica oscura.",
        it: "Forma colonie di densità straordinaria su coste prive di alberi e spazzate dal vento, sfoggiando una vistosa macchia auricolare e un bavaglino arancio dorato che risalta sulla ghiaia vulcanica scura.",
      },
    ],
    image: {
      url: "/images/species/king-penguin.jpg",
      photographer: "Isiwal",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:King_penguin_Aptenodytes_patagonicus-4932.jpg",
      alt: "Close-up portrait of a king penguin's head and orange neck markings",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: -60.0, maxLat: -45.0, includeOcean: true }],
    gbifTaxonKey: 2481660,
  },

  // 55. Bearded Vulture
  {
    id: "bearded-vulture",
    commonName: { en: "Bearded Vulture", es: "Quebrantahuesos", it: "Gipeto" },
    scientificName: "Gypaetus barbatus",
    taxonClass: "Aves",
    order: "Accipitriformes",
    family: "Accipitridae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate: "Global total uncertain; largest stronghold in Ethiopia's highlands (1,400–2,200 breeding pairs), with fragmented relict populations elsewhere numbering from a dozen to a few hundred pairs per mountain range",
    populationHistory: [
      { year: 1994, estimate: 30, label: "Individuals remaining in the Pyrenees before dedicated recovery efforts (Spain)" },
      { year: 2020, estimate: 1000, label: "Individuals recorded across Spain after 25 years of reintroduction work" },
    ],
    climateVulnerability: {
      en: "Rising treelines and shifting snowpack reduce the open, cliff-lined alpine terrain this species forages over, while warmer temperatures speed carcass decomposition and shrink the window in which bones remain edible.",
      es: "El ascenso del límite del bosque y los cambios en el manto de nieve reducen el terreno alpino abierto y rocoso donde forrajea, mientras las temperaturas más cálidas aceleran la descomposición de las carroñas y acortan el tiempo en que los huesos siguen siendo comestibles.",
      it: "L'innalzamento del limite del bosco e i mutamenti del manto nevoso riducono il terreno alpino aperto e roccioso su cui si alimenta, mentre le temperature più calde accelerano la decomposizione delle carcasse e riducono il tempo in cui le ossa restano commestibili.",
    },
    keyThreats: [
      {
        threat: "Secondary poisoning and power-line collisions",
        impact: "high",
        description: {
          en: "Baits and carcasses poisoned to target other carnivores kill vultures that scavenge them, while low-visibility power lines cause frequent fatal collisions.",
          es: "Los cebos y carroñas envenenados para eliminar a otros carnívoros matan también a los buitres que se alimentan de ellos, mientras los tendidos eléctricos poco visibles causan colisiones mortales frecuentes.",
          it: "Esche e carcasse avvelenate per eliminare altri carnivori uccidono anche gli avvoltoi che se ne nutrono, mentre le linee elettriche poco visibili causano frequenti collisioni mortali.",
        },
      },
      {
        threat: "Low genetic diversity in relict populations",
        impact: "medium",
        description: {
          en: "Small, isolated mountain populations suffer inbreeding depression that lowers fertility and chick survival.",
          es: "Las poblaciones montanas pequeñas y aisladas sufren depresión endogámica, lo que reduce la fertilidad y la supervivencia de los polluelos.",
          it: "Le piccole popolazioni montane isolate soffrono di depressione da consanguineità, che riduce la fertilità e la sopravvivenza dei pulcini.",
        },
      },
    ],
    diet: {
      en: "Near-obligate osteophage: bone fragments and marrow from ungulate and other carcasses, occasionally supplemented by live tortoises and small animals dropped from height onto rock.",
      es: "Osteófago casi obligado: fragmentos de hueso y médula de carroñas de ungulados y otros animales, complementado ocasionalmente con tortugas vivas y pequeños animales que deja caer sobre rocas.",
      it: "Osteofago quasi obbligato: frammenti d'osso e midollo da carcasse di ungulati e altri animali, integrati occasionalmente da tartarughe vive e piccoli animali lasciati cadere sulle rocce.",
    },
    conservationActions: {
      en: "Captive-bred juveniles have been hand-reared and released ('hacked') into the wild since 1986, reestablishing breeding populations in the Alps and expanding reintroduction efforts across Spain, France, and the Balkans.",
      es: "Desde 1986 se han criado en cautividad y liberado ('hacking') juveniles en libertad, restableciendo poblaciones reproductoras en los Alpes y ampliando los esfuerzos de reintroducción en España, Francia y los Balcanes.",
      it: "Dal 1986 giovani nati in cattività vengono allevati a mano e rilasciati in natura ('hacking'), ristabilendo popolazioni riproduttive sulle Alpi ed estendendo gli sforzi di reintroduzione in Spagna, Francia e Balcani.",
    },
    clues: [
      {
        en: "The only vertebrate whose diet consists almost entirely (70–90%) of bone, swallowing small fragments whole and dropping larger ones from height onto rocky slabs to shatter them into edible pieces.",
        es: "El único vertebrado cuya dieta consiste casi por completo (70–90%) en hueso, tragando fragmentos pequeños enteros y dejando caer los grandes desde altura sobre losas rocosas para partirlos en trozos comestibles.",
        it: "L'unico vertebrato la cui dieta è composta quasi interamente (70–90%) da ossa, che ingoia intere se piccole e lascia cadere da grande altezza su lastre rocciose per frantumarle in pezzi commestibili.",
      },
      {
        en: "Deliberately stains its own naturally white head and chest feathers a deep rust-orange by bathing in iron-oxide-rich mud and dust, a cosmetic habit unique among birds of prey.",
        es: "Tiñe deliberadamente su plumaje blanco natural de la cabeza y el pecho de un intenso naranja óxido bañándose en barro y polvo ricos en óxido de hierro, un hábito cosmético único entre las aves rapaces.",
        it: "Tinge deliberatamente il piumaggio bianco naturale di testa e petto di un intenso arancio ruggine bagnandosi in fango e polvere ricchi di ossido di ferro, un'abitudine cosmetica unica tra i rapaci.",
      },
    ],
    image: {
      url: "/images/species/bearded-vulture.jpg",
      photographer: "Richard Bartz",
      license: "CC BY-SA 2.5",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bartgeier_Gypaetus_barbatus_closeup1_Richard_Bartz.jpg",
      alt: "Close-up of a bearded vulture's head and rust-orange chest feathers",
    },
    rangeConfig: [{ minLon: -10.0, maxLon: 105.0, minLat: -35.0, maxLat: 48.0 }],
    gbifTaxonKey: 2480649,
  },

  // 56. Toco Toucan
  {
    id: "toco-toucan",
    commonName: { en: "Toco Toucan", es: "Tucán Toco", it: "Tucano Toco" },
    scientificName: "Ramphastos toco",
    taxonClass: "Aves",
    order: "Piciformes",
    family: "Ramphastidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate: "No comprehensive global census; IUCN describes it as common and widespread, though numbers are suspected to be in slow decline from hunting and capture for the pet trade",
    populationHistory: [
      { year: 2000, estimate: 500000, label: "Rough order-of-magnitude estimate across its range; no formal census" },
      { year: 2024, estimate: 450000, label: "Rough order-of-magnitude estimate across its range; no formal census" },
    ],
    climateVulnerability: {
      en: "Longer dry seasons in fragmented forest patches reduce fruit-crop synchrony, forcing this large-bodied, weak-flying bird into longer, riskier movements across increasingly open, cleared landscapes.",
      es: "Las estaciones secas más largas en fragmentos de bosque reducen la sincronía en la producción de frutos, obligando a esta ave grande y de vuelo débil a desplazamientos más largos y arriesgados por paisajes cada vez más abiertos y despejados.",
      it: "Le stagioni secche più lunghe nei frammenti forestali riducono la sincronia della fruttificazione, costringendo questo uccello grande e dal volo debole a spostamenti più lunghi e rischiosi in paesaggi sempre più aperti e disboscati.",
    },
    keyThreats: [
      {
        threat: "Capture for the pet trade",
        impact: "medium",
        description: {
          en: "Nestlings and fledglings are taken from nest cavities for the domestic and international cage-bird trade.",
          es: "Se capturan pichones y volantones de las cavidades del nido para el comercio nacional e internacional de aves de jaula.",
          it: "Nidiacei e giovani involati vengono prelevati dalle cavità del nido per il commercio nazionale e internazionale di uccelli da gabbia.",
        },
      },
      {
        threat: "Forest fragmentation",
        impact: "low",
        description: {
          en: "Clearing of gallery and edge forest reduces the scattered tree cover this species uses for fruiting trees and nest cavities.",
          es: "La tala del bosque en galería y de borde reduce la cobertura arbórea dispersa que esta especie usa para frutales y cavidades de anidación.",
          it: "Il disboscamento della foresta a galleria e di margine riduce la copertura arborea sparsa usata per gli alberi da frutto e le cavità di nidificazione.",
        },
      },
    ],
    diet: {
      en: "Fruit-based omnivore: a wide range of fruit swallowed whole, plus insects, small reptiles, and the eggs and nestlings of other birds.",
      es: "Omnívoro de base frugívora: una amplia variedad de frutos engullidos enteros, además de insectos, pequeños reptiles y huevos o polluelos de otras aves.",
      it: "Onnivoro a base frugivora: un'ampia varietà di frutti inghiottiti interi, oltre a insetti, piccoli rettili e uova o nidiacei di altri uccelli.",
    },
    keystoneRole: {
      en: "Important long-distance seed disperser: fruit pits pass through its gut unharmed and are deposited far from the parent tree, shaping forest regeneration patterns.",
      es: "Importante dispersor de semillas a larga distancia: los huesos de los frutos atraviesan su tracto digestivo intactos y se depositan lejos del árbol progenitor, moldeando los patrones de regeneración del bosque.",
      it: "Importante disperditore di semi a lunga distanza: i noccioli attraversano il suo apparato digerente intatti e vengono depositati lontano dalla pianta madre, modellando i modelli di rigenerazione forestale.",
    },
    clues: [
      {
        en: "Carries the largest beak relative to body size of any bird, a lightweight lattice of keratin over bone that also functions as an efficient radiator for shedding excess body heat.",
        es: "Posee el pico proporcionalmente más grande de cualquier ave, una liviana estructura de queratina sobre hueso que también funciona como eficiente radiador para disipar el exceso de calor corporal.",
        it: "Possiede il becco proporzionalmente più grande di ogni uccello, una leggera struttura reticolare di cheratina su osso che funge anche da efficiente radiatore per disperdere il calore corporeo in eccesso.",
      },
      {
        en: "Nests in natural tree cavities it cannot excavate itself, tossing fruit into the air and catching it in its bill tip before swallowing it whole to later regurgitate the intact seeds.",
        es: "Anida en cavidades naturales de árboles que no puede excavar por sí mismo, lanza el fruto al aire y lo atrapa con la punta del pico antes de tragarlo entero para luego regurgitar las semillas intactas.",
        it: "Nidifica in cavità naturali degli alberi che non è in grado di scavare da solo, lancia il frutto in aria e lo afferra con la punta del becco prima di inghiottirlo intero per poi rigurgitare i semi intatti.",
      },
    ],
    image: {
      url: "/images/species/toco-toucan.jpg",
      photographer: "Giles Laurent",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:006_Toco_toucan_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
      alt: "Toco toucan perched on a branch showing its large orange bill",
    },
    rangeConfig: [{ minLon: -74.0, maxLon: -35.0, minLat: -35.0, maxLat: 10.0 }],
    gbifTaxonKey: 2478765,
  },

  // 57. Scarlet Macaw
  {
    id: "scarlet-macaw",
    commonName: { en: "Scarlet Macaw", es: "Guacamayo Rojo", it: "Ara Rossa" },
    scientificName: "Ara macao",
    taxonClass: "Aves",
    order: "Psittaciformes",
    family: "Psittacidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate: "50,000–499,999 individuals worldwide (wide IUCN band); healthy across the core Amazon but reduced to small fragmented populations across much of Central America",
    populationHistory: [
      { year: 2016, estimate: 50000, label: "IUCN lower-bound population estimate (assessed range: 50,000–499,999 individuals)" },
    ],
    climateVulnerability: {
      en: "Longer dry seasons raise the frequency and intensity of forest fires in already-fragmented habitat, and can desynchronize the availability of ripe fruit and seed with the breeding season.",
      es: "Las estaciones secas más largas aumentan la frecuencia e intensidad de los incendios forestales en un hábitat ya fragmentado, y pueden desincronizar la disponibilidad de frutos y semillas maduras con la temporada de cría.",
      it: "Le stagioni secche più lunghe aumentano la frequenza e l'intensità degli incendi boschivi in un habitat già frammentato, e possono destincronizzare la disponibilità di frutti e semi maturi rispetto alla stagione riproduttiva.",
    },
    keyThreats: [
      {
        threat: "Nest poaching for the pet trade",
        impact: "high",
        description: {
          en: "Chicks are taken from tree-cavity nests, often destroying the cavity in the process, to supply domestic and international pet markets.",
          es: "Los pichones se extraen de nidos en cavidades de árboles, a menudo destruyendo la cavidad en el proceso, para abastecer los mercados nacionales e internacionales de mascotas.",
          it: "I pulcini vengono prelevati dai nidi nelle cavità degli alberi, spesso distruggendo la cavità stessa, per rifornire i mercati nazionali e internazionali di animali da compagnia.",
        },
      },
      {
        threat: "Deforestation and habitat fragmentation",
        impact: "high",
        description: {
          en: "Clearing of lowland forest for agriculture and cattle has eliminated the species entirely from parts of its historical Central American range.",
          es: "La tala del bosque de tierras bajas para agricultura y ganadería ha eliminado por completo a la especie de partes de su área histórica en Centroamérica.",
          it: "Il disboscamento della foresta di pianura per l'agricoltura e l'allevamento ha eliminato completamente la specie da parti del suo areale storico in America Centrale.",
        },
      },
    ],
    diet: {
      en: "Fruit, nuts, and seeds, including unripe and toxic varieties made safe to eat by regularly consuming mineral-rich clay.",
      es: "Frutos, nueces y semillas, incluidas variedades verdes y tóxicas que hace seguras al comer regularmente arcilla rica en minerales.",
      it: "Frutti, noci e semi, comprese varietà acerbe e tossiche rese sicure dal consumo regolare di argilla ricca di minerali.",
    },
    keystoneRole: {
      en: "Long-distance seed disperser for large-fruited canopy trees, and a key visitor to riverbank clay licks that also serve dozens of other species.",
      es: "Dispersor de semillas a larga distancia para árboles del dosel de fruto grande, y visitante clave de las collpas de arcilla ribereñas que también usan decenas de otras especies.",
      it: "Disperditore di semi a lunga distanza per alberi del baldacchino dai frutti grandi, e visitatore chiave delle pareti di argilla fluviali usate anche da decine di altre specie.",
    },
    clues: [
      {
        en: "Visits exposed riverbank clay walls in noisy flocks to eat mineral-rich clay that neutralizes toxic alkaloids in the unripe seeds and fruit making up much of its diet.",
        es: "Visita en bulliciosas bandadas paredes de arcilla expuestas junto a los ríos para comer arcilla rica en minerales que neutraliza los alcaloides tóxicos de las semillas y frutos verdes que componen gran parte de su dieta.",
        it: "Visita in chiassose bande le pareti di argilla esposte lungo i fiumi per mangiare argilla ricca di minerali che neutralizza gli alcaloidi tossici presenti nei semi e frutti acerbi che compongono gran parte della sua dieta.",
      },
      {
        en: "Mates for life and can live over 50 years, its brilliant scarlet, yellow, and blue plumage among the most vivid of any parrot species.",
        es: "Se empareja de por vida y puede vivir más de 50 años, con un plumaje escarlata, amarillo y azul entre los más vívidos de cualquier especie de loro.",
        it: "Si accoppia per la vita e può vivere oltre 50 anni, con un piumaggio scarlatto, giallo e blu tra i più sgargianti di ogni specie di pappagallo.",
      },
    ],
    image: {
      url: "/images/species/scarlet-macaw.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Scarlet_macaw_(Ara_macao_cyanopterus)_Copan.jpg",
      alt: "Scarlet macaw perched in a tree with vivid red, yellow, and blue plumage",
    },
    rangeConfig: [{ minLon: -105.0, maxLon: -35.0, minLat: -20.0, maxLat: 24.0 }],
    gbifTaxonKey: 5959227,
  },

  // 58. Superb Lyrebird
  {
    id: "superb-lyrebird",
    commonName: { en: "Superb Lyrebird", es: "Ave Lira Soberbia", it: "Uccello Lira Superbo" },
    scientificName: "Menura novaehollandiae",
    taxonClass: "Aves",
    order: "Passeriformes",
    family: "Menuridae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate: "No formal census; historically common and secure across a wide range, but the 2019–2020 megafires burned an estimated 41.5% (~2.1 million hectares) of its habitat, sharply reducing occurrence in the most severely burned areas",
    populationHistory: [
      { year: 2015, estimate: 100000, label: "Rough order-of-magnitude estimate across its range; no formal census, pre-megafire baseline" },
    ],
    climateVulnerability: {
      en: "Longer, more intense fire seasons directly destroy the dense, moist understorey leaf litter this species depends on for both foraging and mound-building, with recovery in badly burned areas taking many years.",
      es: "Las temporadas de incendios más largas e intensas destruyen directamente la densa y húmeda hojarasca del sotobosque de la que depende esta especie tanto para alimentarse como para construir sus montículos, con una recuperación de varios años en las zonas más quemadas.",
      it: "Le stagioni degli incendi più lunghe e intense distruggono direttamente la densa e umida lettiera del sottobosco da cui questa specie dipende sia per l'alimentazione sia per la costruzione dei tumuli, con una ripresa che richiede molti anni nelle aree più gravemente bruciate.",
    },
    keyThreats: [
      {
        threat: "Megafire habitat destruction",
        impact: "high",
        description: {
          en: "The 2019–2020 Black Summer fires burned an estimated 41.5% of preferred nesting habitat, with foraging almost entirely absent from high-severity burn sites afterward.",
          es: "Los incendios del 'Verano Negro' de 2019–2020 quemaron un 41,5% estimado del hábitat de nidificación preferido, con una ausencia casi total de forrajeo en los sitios de mayor severidad de quema.",
          it: "Gli incendi del 'Black Summer' 2019–2020 hanno bruciato circa il 41,5% dell'habitat di nidificazione preferito, con un foraggiamento quasi del tutto assente nei siti bruciati con maggiore gravità.",
        },
      },
      {
        threat: "Predation by introduced foxes and cats",
        impact: "medium",
        description: {
          en: "Ground nests and flightless young are vulnerable to introduced red foxes and feral cats, especially in fire-opened terrain offering less cover.",
          es: "Los nidos en el suelo y las crías incapaces de volar son vulnerables a zorros rojos y gatos ferales introducidos, sobre todo en terreno abierto por el fuego que ofrece menos cobertura.",
          it: "I nidi al suolo e i piccoli incapaci di volare sono vulnerabili a volpi rosse e gatti inselvatichiti introdotti, soprattutto nei terreni aperti dal fuoco che offrono meno copertura.",
        },
      },
    ],
    diet: {
      en: "Ground-foraging invertebrate specialist: earthworms, beetles, and other invertebrates unearthed by raking through deep leaf litter.",
      es: "Especialista en invertebrados de forrajeo terrestre: lombrices, escarabajos y otros invertebrados desenterrados al escarbar la profunda hojarasca.",
      it: "Specialista in invertebrati che forraggia al suolo: lombrichi, coleotteri e altri invertebrati scovati rastrellando la spessa lettiera di foglie.",
    },
    keystoneRole: {
      en: "Ecosystem engineer that turns over and buries up to 200 tonnes of leaf litter and soil per hectare each year while foraging, accelerating nutrient cycling and reducing the fuel available for wildfires.",
      es: "Ingeniero del ecosistema que remueve y entierra hasta 200 toneladas de hojarasca y suelo por hectárea al año mientras forrajea, acelerando el ciclo de nutrientes y reduciendo el combustible disponible para incendios forestales.",
      it: "Ingegnere dell'ecosistema che rivolta e interra fino a 200 tonnellate di lettiera e suolo per ettaro all'anno mentre foraggia, accelerando il ciclo dei nutrienti e riducendo il combustibile disponibile per gli incendi boschivi.",
    },
    clues: [
      {
        en: "Unrivaled vocal mimic capable of reproducing the calls of dozens of other bird species plus mechanical sounds like chainsaws and camera shutters, performed atop a mound of raked earth it builds and defends on the forest floor.",
        es: "Imitador vocal sin rival, capaz de reproducir los cantos de decenas de otras especies de aves además de sonidos mecánicos como motosierras y disparadores de cámara, interpretados sobre un montículo de tierra rastrillada que construye y defiende en el suelo del bosque.",
        it: "Impareggiabile imitatore vocale, capace di riprodurre i richiami di decine di altre specie di uccelli oltre a suoni meccanici come motoseghe e otturatori di macchine fotografiche, eseguiti su un tumulo di terra rastrellata che costruisce e difende sul terreno del bosco.",
      },
      {
        en: "Rakes and overturns leaf litter and topsoil at a rate of up to 200 tonnes per hectare annually while foraging for invertebrates, functioning as a one-bird tiller of the forest floor.",
        es: "Rastrilla y remueve la hojarasca y el suelo superficial a un ritmo de hasta 200 toneladas por hectárea al año mientras busca invertebrados, funcionando como un arado unipersonal del suelo forestal.",
        it: "Rastrella e rivolta lettiera e terreno superficiale fino a 200 tonnellate per ettaro all'anno mentre cerca invertebrati, funzionando come un aratro a uccello singolo del suolo forestale.",
      },
    ],
    image: {
      url: "/images/species/superb-lyrebird.jpg",
      photographer: "John Manger, CSIRO",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_10356_Superb_Lyrebird.jpg",
      alt: "Superb lyrebird displaying its long tail feathers on the forest floor",
    },
    rangeConfig: [{ minLon: 143.0, maxLon: 151.0, minLat: -43.7, maxLat: -28.0 }],
    gbifTaxonKey: 2488980,
  },

  // 59. Greater Flamingo
  {
    id: "greater-flamingo",
    commonName: { en: "Greater Flamingo", es: "Flamenco Común", it: "Fenicottero Rosa" },
    scientificName: "Phoenicopterus roseus",
    taxonClass: "Aves",
    order: "Phoenicopteriformes",
    family: "Phoenicopteridae",
    realm: "Coastal",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "increasing",
    populationEstimate: "~550,000–680,000 individuals worldwide (IUCN estimate); increasing overall, though regional populations have fluctuated sharply",
    populationHistory: [
      { year: 1975, estimate: 165000, label: "African regional population" },
      { year: 1995, estimate: 85000, label: "African regional population, after a sharp decline" },
      { year: 2005, estimate: 115000, label: "African regional population, partial recovery" },
    ],
    climateVulnerability: {
      en: "Prolonged drought and water diversion for agriculture are drying out the shallow saline lakes and lagoons this species needs for both feeding and breeding, concentrating pollutants and disease outbreaks in the pools that remain.",
      es: "Las sequías prolongadas y el desvío de agua para la agricultura secan los lagos y lagunas salinas poco profundas que esta especie necesita para alimentarse y criar, concentrando contaminantes y brotes de enfermedades en las charcas que quedan.",
      it: "Le siccità prolungate e la deviazione delle acque per l'agricoltura prosciugano i laghi e le lagune saline poco profonde di cui questa specie ha bisogno per alimentarsi e riprodursi, concentrando inquinanti e focolai di malattie nelle pozze rimaste.",
    },
    keyThreats: [
      {
        threat: "Wetland drainage and pollution",
        impact: "high",
        description: {
          en: "Diversion of freshwater inflows and industrial or agricultural runoff degrade the shallow saline wetlands this species depends on.",
          es: "El desvío de aportes de agua dulce y la escorrentía industrial o agrícola degradan los humedales salinos poco profundos de los que depende esta especie.",
          it: "La deviazione degli afflussi di acqua dolce e il deflusso industriale o agricolo degradano le zone umide saline poco profonde da cui questa specie dipende.",
        },
      },
      {
        threat: "Avian botulism and disease outbreaks",
        impact: "medium",
        description: {
          en: "Dense colonies concentrated in shrinking wetlands are vulnerable to periodic mass die-offs from avian botulism and other pathogens.",
          es: "Las densas colonias concentradas en humedales menguantes son vulnerables a episodios periódicos de mortandad masiva por botulismo aviar y otros patógenos.",
          it: "Le fitte colonie concentrate in zone umide in contrazione sono vulnerabili a periodici episodi di mortalità di massa per botulismo aviario e altri patogeni.",
        },
      },
    ],
    diet: {
      en: "Filter-feeds on small invertebrates, algae, and diatoms strained from shallow saline water and mud through a specialized comb-lined bill.",
      es: "Se alimenta por filtración de pequeños invertebrados, algas y diatomeas que cuela del agua salina poco profunda y el lodo mediante un pico especializado con laminillas.",
      it: "Si nutre per filtrazione di piccoli invertebrati, alghe e diatomee filtrati da acqua salina poco profonda e fango tramite un becco specializzato munito di lamelle.",
    },
    clues: [
      {
        en: "Filter-feeds upside-down through a sharply bent, comb-lined bill, pumping muddy water with its thick tongue to strain out tiny invertebrates and algae — pigments from that diet are what turn its plumage pink.",
        es: "Se alimenta por filtración con la cabeza invertida a través de un pico agudamente curvado con laminillas, bombeando agua fangosa con su gruesa lengua para colar diminutos invertebrados y algas —los pigmentos de esa dieta son los que tiñen su plumaje de rosa.",
        it: "Si nutre per filtrazione a testa in giù attraverso un becco fortemente ricurvo munito di lamelle, pompando acqua fangosa con la sua spessa lingua per filtrare minuscoli invertebrati e alghe — i pigmenti di questa dieta sono ciò che tinge di rosa il suo piumaggio.",
      },
      {
        en: "Breeds in dense colonies of thousands on shadeless, hypersaline mudflats too caustic for most ground predators to cross, with chicks gathering into crèches shepherded by only a few adults.",
        es: "Cría en densas colonias de miles de individuos sobre marismas hipersalinas sin sombra, demasiado cáusticas para que la mayoría de los depredadores terrestres las crucen, con los polluelos agrupados en guarderías vigiladas por solo unos pocos adultos.",
        it: "Si riproduce in fitte colonie di migliaia di individui su distese fangose ipersaline prive di ombra, troppo caustiche perché la maggior parte dei predatori terrestri possa attraversarle, con i pulcini radunati in asili sorvegliati da pochi adulti.",
      },
    ],
    image: {
      url: "/images/species/greater-flamingo.jpg",
      photographer: "Giles Laurent",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:003_Greater_flamingo_close-up_in_the_Camargue_Photo_by_Giles_Laurent.jpg",
      alt: "Close-up of a greater flamingo's head and curved bill",
    },
    rangeConfig: [{ minLon: -10.0, maxLon: 90.0, minLat: -35.0, maxLat: 50.0 }],
    gbifTaxonKey: 4352332,
  },

  // 60. Magnificent Frigatebird
  {
    id: "magnificent-frigatebird",
    commonName: { en: "Magnificent Frigatebird", es: "Fragata Magnífica", it: "Fregata Magnifica" },
    scientificName: "Fregata magnificens",
    taxonClass: "Aves",
    order: "Suliformes",
    family: "Fregatidae",
    realm: "Coastal",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "Global total not comprehensively censused; common and widespread across tropical Atlantic and Pacific American coasts, but the genetically distinct Galápagos population is a vulnerable ~2,000 individuals and the historic Cape Verde colony is now considered functionally extinct",
    populationHistory: [
      { year: 2011, estimate: 2000, label: "Genetically distinct breeding population on the Galápagos Islands" },
    ],
    climateVulnerability: {
      en: "Warming sea surface temperatures shift the distribution of the surface-schooling fish and flying fish this species relies on, a critical vulnerability since it cannot dive or swim and can only snatch prey from at or just above the water's surface.",
      es: "El calentamiento de la temperatura superficial del mar desplaza la distribución de los peces de superficie y peces voladores de los que depende, una vulnerabilidad crítica ya que no puede bucear ni nadar y solo puede capturar presas justo en o sobre la superficie del agua.",
      it: "Il riscaldamento della temperatura superficiale del mare sposta la distribuzione dei pesci di superficie e dei pesci volanti da cui dipende, una vulnerabilità critica poiché non è in grado di immergersi né nuotare e può solo ghermire le prede a livello o appena sopra la superficie dell'acqua.",
    },
    keyThreats: [
      {
        threat: "Invasive predators at island breeding colonies",
        impact: "high",
        description: {
          en: "Introduced rats and feral cats prey on eggs and chicks at small, isolated colonies such as those on the Cape Verde and Galápagos islands.",
          es: "Ratas y gatos ferales introducidos depredan huevos y polluelos en colonias pequeñas y aisladas, como las de las islas de Cabo Verde y Galápagos.",
          it: "Ratti e gatti inselvatichiti introdotti predano uova e pulcini nelle colonie piccole e isolate, come quelle delle isole di Capo Verde e delle Galápagos.",
        },
      },
      {
        threat: "Marine plastic ingestion and fishing-line entanglement",
        impact: "medium",
        description: {
          en: "Surface-feeding birds mistake floating plastic for food and become entangled in discarded fishing line at colonies and foraging grounds.",
          es: "Las aves que se alimentan en superficie confunden el plástico flotante con comida y quedan enredadas en sedales de pesca desechados en colonias y zonas de forrajeo.",
          it: "Gli uccelli che si nutrono in superficie scambiano la plastica galleggiante per cibo e restano intrappolati nelle lenze da pesca abbandonate presso colonie e aree di foraggiamento.",
        },
      },
    ],
    diet: {
      en: "Surface-snatched flying fish and other fish, jellyfish, and squid, heavily supplemented by kleptoparasitic theft of prey from other seabirds in mid-air.",
      es: "Peces voladores y otros peces capturados en superficie, medusas y calamares, complementados en gran medida con el robo cleptoparásito de presas a otras aves marinas en pleno vuelo.",
      it: "Pesci volanti e altri pesci ghermiti in superficie, meduse e calamari, integrati in gran parte dal furto cleptoparassitario di prede ad altri uccelli marini in pieno volo.",
    },
    clues: [
      {
        en: "Cannot walk well or land on water despite its oceanic lifestyle, since its plumage lacks waterproofing oils — it must snatch all food from the surface in flight and never dives or swims.",
        es: "No puede caminar bien ni posarse en el agua pese a su vida oceánica, ya que su plumaje carece de aceites impermeabilizantes: debe capturar todo su alimento en la superficie en pleno vuelo y jamás bucea ni nada.",
        it: "Non riesce a camminare bene né a posarsi sull'acqua nonostante il suo stile di vita oceanico, poiché il suo piumaggio è privo di oli impermeabilizzanti: deve ghermire tutto il cibo in superficie in volo e non si immerge né nuota mai.",
      },
      {
        en: "Males inflate a balloon-like scarlet throat pouch to roughly twice head size and drum it with their bill to attract mates, visible from great distances across dense breeding colonies.",
        es: "Los machos inflan un saco gular escarlata en forma de globo hasta casi el doble del tamaño de la cabeza y lo golpetean con el pico para atraer pareja, visible a gran distancia en las densas colonias de cría.",
        it: "I maschi gonfiano un sacco golare scarlatto a forma di palloncino fino a circa il doppio della dimensione della testa e lo tamburellano con il becco per attirare le compagne, visibile a grande distanza nelle fitte colonie riproduttive.",
      },
    ],
    image: {
      url: "/images/species/magnificent-frigatebird.jpg",
      photographer: "Andrew Turner",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fregata_magnificens_-Galapagos,_Ecuador_-male-8.jpg",
      alt: "Male magnificent frigatebird displaying its inflated red throat pouch",
    },
    rangeConfig: [{ minLon: -110.0, maxLon: -20.0, minLat: -20.0, maxLat: 30.0, includeOcean: true }],
    gbifTaxonKey: 2480189,
  },
];
