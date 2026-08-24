import type { RawSpeciesEntry } from "./types";

export const mammals: RawSpeciesEntry[] = [
  // 1. Iberian Lynx
  {
    id: "iberian-lynx",
    commonName: { en: "Iberian Lynx", es: "Lince Ibérico", it: "Lince Iberica" },
    scientificName: "Lynx pardinus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "increasing",
    populationEstimate: "~2,021 individuals (2024 census)",
    populationHistory: [
      { year: 2002, estimate: 94, label: "Critically Endangered" },
      { year: 2010, estimate: 275 },
      { year: 2015, estimate: 404, label: "Endangered" },
      { year: 2020, estimate: 1111 },
      { year: 2024, estimate: 2021, label: "Vulnerable" },
    ],
    climateVulnerability: {
      en: "Severe drought and heatwaves in southern Mediterranean scrublands threaten European rabbit populations, which comprise 80-90% of its specialized diet.",
      es: "Las sequías severas y olas de calor en el matorral mediterráneo amenazan las poblaciones de conejo de monte, su presa básica.",
      it: "Siccità e ondate di calore nella macchia mediterranea minacciano le popolazioni di coniglio selvatico.",
    },
    keyThreats: [
      {
        threat: "Prey depletion",
        impact: "high",
        description: {
          en: "Viral hemorrhagic disease (RHDV) outbreaks causing catastrophic rabbit crashes.",
          es: "Brotes de enfermedad hemorrágica vírica que provocan desplomes del conejo.",
          it: "Epidemie virali che riducono drasticamente i conigli selvatici.",
        },
      },
    ],
    diet: {
      en: "Strict specialist: European rabbit (Oryctolagus cuniculus).",
      es: "Especialista estricto: conejo de monte (Oryctolagus cuniculus).",
      it: "Specialista assoluto: coniglio selvatico.",
    },
    clues: [
      {
        en: "Solitary ambush hunter specialized on wild lagomorphs, stalking through dense evergreen scrubland and cork oak savannahs.",
        es: "Cazador solitario especializado en lagomorfos silvestres, acechando en monte bajo y dehesas de encinas y alcornoques.",
        it: "Cacciatore solitario specializzato in lagomorfi selvatici, attivo nella macchia a lecci e sughere.",
      },
      {
        en: "Distinguished from boreal relatives by a heavily spotted pelt, pronounced facial beard-like ruffs, and prominent ear tufts.",
        es: "Se distingue de sus parientes boreales por su pelaje intensamente moteado, marcadas patillas y pinceles auriculares.",
        it: "Distinto dai parenti boreali per il mantello a macchie dense, basette pronunciate e ciuffi auricolari.",
      },
    ],
    image: {
      url: "/images/species/iberian-lynx.jpg",
      photographer: "Diego Delso",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Lince_ib%C3%A9rico_(Lynx_pardinus),_Almuradiel,_Ciudad_Real,_Espa%C3%B1a,_2021-12-19,_DD_07.jpg",
      alt: "Iberian Lynx in wild Mediterranean habitat",
    },
    rangeConfig: [{ minLon: -8.5, maxLon: -2.5, minLat: 36.5, maxLat: 40.0 }],
  },

  // 2. Snow Leopard
  {
    id: "snow-leopard",
    commonName: { en: "Snow Leopard", es: "Leopardo de las Nieves", it: "Leopardo delle Nevi" },
    scientificName: "Panthera uncia",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "4,000 – 6,500 mature individuals",
    populationHistory: [
      { year: 1990, estimate: 7500 },
      { year: 2003, estimate: 6000 },
      { year: 2016, estimate: 4500 },
    ],
    climateVulnerability: {
      en: "Climate warming is pushing the alpine tree line upward, fragmenting high-altitude montane habitats.",
      es: "El calentamiento global empuja el límite arbóreo alpino hacia arriba en los macizos montañosos.",
      it: "Il riscaldamento globale sposta il limite degli alberi verso l'alto nelle alte vette montane.",
    },
    keyThreats: [
      {
        threat: "Retaliatory killing",
        impact: "high",
        description: {
          en: "Pastoralists kill leopards in response to livestock predation.",
          es: "Pastores matan felinos en represalia por ataques a rebaños.",
          it: "Uccisioni per ritorsione da parte dei pastori.",
        },
      },
    ],
    diet: {
      en: "High-altitude ungulates: Blue sheep (Bharal), Siberian ibex, argali, and markhor.",
      es: "Ungulados de alta montaña: carnero azul (bharal), íbice siberiano y argalí.",
      it: "Ungulati d'alta quota: bharal e stambecco siberiano.",
    },
    clues: [
      {
        en: "Adapted to steep, rocky terrain at altitudes from 3,000 to 5,500 meters, with wide, fur-cushioned paws that act as natural snowshoes.",
        es: "Adaptado a laderas rocosas escarpadas entre 3.000 y 5.500 m, con patas anchas y acolchadas de pelo que actúan como raquetas de nieve.",
        it: "Adattato a dirupi rocciosi tra 3.000 e 5.500 m, con zampe larghe e pelose che fungono da racchette da neve.",
      },
      {
        en: "Features an exceptionally long, thick tail nearly matching its body length, used for balance when leaping and wrapped around the face for warmth.",
        es: "Posee una cola extremadamente larga y gruesa que equilibra saltos en riscos y cubre su hocico contra el frío extremo.",
        it: "Dotato di una coda lunghissima e folta usata per bilanciare i balzi e coprirsi il muso dal gelo.",
      },
    ],
    image: {
      url: "/images/species/snow-leopard.jpg",
      photographer: "Irbis1983",
      license: "Public Domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Irbis4.JPG",
      alt: "Snow leopard on mountain rocks",
    },
    rangeConfig: [{ minLon: 68.0, maxLon: 105.0, minLat: 27.0, maxLat: 53.0 }],
  },

  // 3. Giant Panda
  {
    id: "giant-panda",
    commonName: { en: "Giant Panda", es: "Panda Gigante", it: "Panda Gigante" },
    scientificName: "Ailuropoda melanoleuca",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Ursidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "increasing",
    populationEstimate: "~1,864 wild individuals",
    populationHistory: [
      { year: 1980, estimate: 1114 },
      { year: 2000, estimate: 1596 },
      { year: 2014, estimate: 1864, label: "4th National Giant Panda Survey" },
    ],
    climateVulnerability: {
      en: "Warming models project significant loss in montane bamboo understories due to synchronous flowering die-offs.",
      es: "Se proyectan pérdidas en el sotobosque de bambú por floraciones sincrónicas y estrés térmico.",
      it: "I modelli prevedono una riduzione del bambù di sottobosco dovuta al riscaldamento.",
    },
    keyThreats: [
      {
        threat: "Habitat fragmentation",
        impact: "high",
        description: {
          en: "Roads and infrastructure isolate small sub-populations across mist-shrouded montane ridges.",
          es: "Carreteras e infraestructuras aíslan subpoblaciones en crestas montañosas neblinosas.",
          it: "Infrastrutture che frammentano le popolazioni in creste isolate.",
        },
      },
    ],
    diet: {
      en: "99% bamboo, consuming 12-38 kg daily.",
      es: "99% bambú, consumiendo 12-38 kg diarios.",
      it: "99% bambù, consumando 12-38 kg al giorno.",
    },
    clues: [
      {
        en: "Strictly herbivorous member of the bear family whose digestive system retains carnivore-like morphology, requiring 12+ hours of daily feeding.",
        es: "Miembro estrictamente herbívoro de la familia de los osos cuyo tracto digestivo conserva anatomía carnívora, exigiendo más de 12 horas de ingesta diaria.",
        it: "Urside quasi esclusivamente erbivoro con apparato digerente carnivoro, costretto a nutrirsi per oltre 12 ore al giorno.",
      },
      {
        en: "Possesses a specialized wrist bone (enlarged radial sesamoid) functioning as a 'pseudo-thumb' to strip tough fibrous stalks.",
        es: "Posee un hueso modificado en la muñeca (sesamoideo radial) que actúa como 'falso pulgar' para manipular tallos fibrosos.",
        it: "Dotato di un 'falso pollice' osseo al polso per afferrare e sbucciare fusti legnosi.",
      },
    ],
    image: {
      url: "/images/species/giant-panda.jpg",
      photographer: "J. Patrick Fischer",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Grosser_Panda.JPG",
      alt: "Giant Panda eating bamboo",
    },
    rangeConfig: [{ minLon: 101.5, maxLon: 108.5, minLat: 28.0, maxLat: 34.5 }],
  },

  // 4. Jaguar
  {
    id: "jaguar",
    commonName: { en: "Jaguar", es: "Jaguar / Yaguareté", it: "Giaguaro" },
    scientificName: "Panthera onca",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate: "~173,000 individuals",
    populationHistory: [
      { year: 1970, estimate: 300000 },
      { year: 1995, estimate: 220000 },
      { year: 2010, estimate: 185000 },
      { year: 2024, estimate: 173000 },
    ],
    climateVulnerability: {
      en: "Extreme drought and megafires destroy core riparian floodplain forest and wetland refuges.",
      es: "Sequías extremas y megaincendios destruyen selvas en galería y humedales de llanura aluvial.",
      it: "Incendi e siccità distruggono le foreste a galleria e le zone umide.",
    },
    keyThreats: [
      {
        threat: "Deforestation",
        impact: "high",
        description: {
          en: "Conversion of tropical forests and savannas to intensive agriculture and ranching.",
          es: "Conversión de selvas y sabanas a pastos ganaderos y monocultivos.",
          it: "Deforestazione per pascoli e monocolture intensive.",
        },
      },
    ],
    diet: {
      en: "Apex carnivore: Capybaras, caimans, peccaries, tapirs, and river turtles.",
      es: "Superdepredador: carpinchos, yacarés, pecaríes, tapires y tortugas.",
      it: "Carnivoro apicale: capibara, caimani, pecari e tapiri.",
    },
    clues: [
      {
        en: "Heavily built apex felid with an affinity for water, actively swimming to ambush semi-aquatic reptiles and large rodents.",
        es: "Felino robusto con gran afinidad por el agua, nadando para emboscar reptiles acorazados y grandes roedores en llanuras inundables.",
        it: "Robusto felino con spiccata affinità per l'acqua, abile nuotatore e predatore di rettili corazzati.",
      },
      {
        en: "Unlike other big cats that bite the throat, it uses an exceptionally crushing bite to pierce the temporal bones of the skull and turtle carapaces.",
        es: "A diferencia de otros grandes félidos que asfixian la garganta, muerde directamente los huesos craneales y caparazones óseos.",
        it: "A differenza di altri grandi felini, perfora direttamente le ossa del cranio o i carapaci delle prede.",
      },
    ],
    image: {
      url: "/images/species/jaguar.jpg",
      photographer: "USFWS",
      license: "Public Domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Standing_jaguar.jpg",
      alt: "Jaguar standing in wetland forest",
    },
    rangeConfig: [{ minLon: -95.0, maxLon: -35.0, minLat: -28.0, maxLat: 22.0 }],
  },

  // 5. Polar Bear
  {
    id: "polar-bear",
    commonName: { en: "Polar Bear", es: "Oso Polar", it: "Orso Polare" },
    scientificName: "Ursus maritimus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Ursidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~26,000 individuals",
    populationHistory: [
      { year: 1975, estimate: 12000 },
      { year: 1995, estimate: 28000 },
      { year: 2015, estimate: 26000, label: "IUCN global assessment (range 20,129–32,558)" },
    ],
    climateVulnerability: {
      en: "Rapid ocean warming and seasonal pack-ice retreat lengthens nutritional fasting periods.",
      es: "El retroceso del hielo marino alarga periodos de ayuno forzado en tierra firme.",
      it: "La riduzione dei ghiacci marini prolunga i digiuni obbligati.",
    },
    keyThreats: [
      {
        threat: "Sea ice loss",
        impact: "high",
        description: {
          en: "Loss of marine hunting platforms over continental shelf waters.",
          es: "Pérdida de plataformas de caza sobre la plataforma continental marina.",
          it: "Perdita delle piattaforme di caccia sulla banchisa marina.",
        },
      },
    ],
    diet: {
      en: "Ringed seals (Pusa hispida) and bearded seals (Erignathus barbatus).",
      es: "Focas anilladas y focas barbudas.",
      it: "Foche dagli anelli e foche barbute.",
    },
    clues: [
      {
        en: "Classified ecologically as a marine mammal, spending the majority of its annual life cycle hunting on frozen ocean pack ice.",
        es: "Clasificado ecológicamente como mamífero marino, pasando la mayor parte del año cazando sobre la banquisa helada marina.",
        it: "Classificato come mammifero marino, trascorre gran parte dell'anno cacciando sulla banchisa polare.",
      },
      {
        en: "Possesses pitch-black skin beneath a dense coat of pigment-free, hollow guard hairs that channel radiant solar energy.",
        es: "Posee piel completamente negra bajo un pelaje translúcido y hueco que canaliza y retiene la radiación térmica.",
        it: "Ha la pelle nera sotto una pelliccia priva di pigmento e cava che trattiene il calore.",
      },
    ],
    image: {
      url: "/images/species/polar-bear.jpg",
      photographer: "Alan D. Wilson",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Polar_Bear_-_Alaska_(cropped).jpg",
      alt: "Polar bear walking on ice",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: 60.0, maxLat: 89.0, includeOcean: true }],
  },

  // 6. Koala
  {
    id: "koala",
    commonName: { en: "Koala", es: "Koala", it: "Koala" },
    scientificName: "Phascolarctos cinereus",
    taxonClass: "Mammalia",
    order: "Diprotodontia",
    family: "Phascolarctidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~250,000 – 400,000 individuals (national total; the widely-reported ~92,000 figure covers only the eastern QLD/NSW/ACT population)",
    populationHistory: [
      { year: 1920, estimate: 1000000 },
      { year: 2000, estimate: 500000 },
      { year: 2016, estimate: 330000, label: "IUCN assessment (~329,000 mature individuals)" },
      { year: 2022, estimate: 280000 },
    ],
    climateVulnerability: {
      en: "Elevated atmospheric CO2 reduces nutritional protein in leaves while increasing toxic tannins; severe heatwaves trigger canopy dehydration.",
      es: "El aumento de CO2 reduce las proteínas en hojas e incrementa taninos tóxicos; las olas de calor deshidratan las copas arbóreas.",
      it: "L'aumento di CO2 riduce i nutrienti nelle foglie ed espone a disidratazione da ondate di calore.",
    },
    keyThreats: [
      {
        threat: "Bushfires & habitat loss",
        impact: "high",
        description: {
          en: "High-intensity canopy fires and land clearing for pastoral development.",
          es: "Megaincendios de copas y fragmentación de bosques abiertos de eucalipto.",
          it: "Incendi boschivi e deforestazione per terreni agricoli.",
        },
      },
    ],
    diet: {
      en: "Exclusive folivore: Leaves of selected Eucalyptus species.",
      es: "Folívoro exclusivo: hojas de eucalipto.",
      it: "Folivoro specializzato: foglie di eucalipto.",
    },
    clues: [
      {
        en: "Specialized folivore with an enlarged 2-meter digestive caecum harboring specialized bacteria to detoxify aromatic oils and phenolic compounds.",
        es: "Folívoro especializado con un ciego digestivo de 2 metros que alberga bacterias para degradar aceites aromáticos y fenoles tóxicos.",
        it: "Folivoro specializzato con un cieco di 2 metri per digerire composti fenolici e oli tossici.",
      },
      {
        en: "Arboreal marsupial with two opposable digits on front paws and fused second/third digits on hind feet for fur grooming, sleeping up to 20 hours daily.",
        es: "Marsupial arborícola con dos pulgares oponibles en manos delanteras y dedos fusionados en patas traseras, durmiendo hasta 20 h al día.",
        it: "Marsupiale arboricolo con due dita opponibili sulle zampe anteriori, dorme fino a 20 ore al giorno.",
      },
    ],
    image: {
      url: "/images/species/koala.jpg",
      photographer: "Diliff",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Koala_climbing_tree.jpg",
      alt: "Koala climbing eucalyptus tree",
    },
    rangeConfig: [{ minLon: 137.0, maxLon: 154.0, minLat: -39.0, maxLat: -16.0 }],
  },

  // 7. Mountain Gorilla
  {
    id: "mountain-gorilla",
    commonName: { en: "Mountain Gorilla", es: "Gorila de Montaña", it: "Gorilla di Montagna" },
    scientificName: "Gorilla beringei beringei",
    taxonClass: "Mammalia",
    order: "Primates",
    family: "Hominidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "increasing",
    populationEstimate: "~1,063 individuals",
    populationHistory: [
      { year: 1989, estimate: 620 },
      { year: 2003, estimate: 700 },
      { year: 2010, estimate: 880 },
      { year: 2018, estimate: 1004 },
      { year: 2024, estimate: 1063 },
    ],
    climateVulnerability: {
      en: "Confined to volcanic cloud forest mountain summits; warming temperatures push optimal vegetation zones higher up isolated slopes.",
      es: "Confinado a cumbres volcánicas de bosque nublado; el calor desplaza la vegetación óptima hacia zonas más reducidas.",
      it: "Limitato alle vette vulcaniche di foresta nebulosa, vulnerabile allo spostamento altitudinale della vegetazione.",
    },
    keyThreats: [
      {
        threat: "Human encroachment",
        impact: "high",
        description: {
          en: "Dense agricultural borders surrounding steep protected volcanic park slopes.",
          es: "Fronteras agrícolas densas rodeando las laderas volcánicas protegidas.",
          it: "Pressione agricola ai margini delle riserve vulcaniche.",
        },
      },
    ],
    diet: {
      en: "Herbivore: Bamboo shoots, giant lobelias, wild celery, and nettles.",
      es: "Herbívoro: brotes de bambú, lobelias gigantes, apio silvestre y ortigas.",
      it: "Erbivoro: germogli di bambù, lobelie e sedano selvatico.",
    },
    clues: [
      {
        en: "The largest living primate subspecies, inhabiting high-elevation montane cloud forests between 2,200 and 4,000 meters.",
        es: "La subespecie de primate vivo más grande, habitando bosques nublados de alta montaña entre 2.200 y 4.000 metros.",
        it: "La più grande sottospecie di primate vivente, abitatrice di foreste montane nebulose tra 2.200 e 4.000 metri.",
      },
      {
        en: "Grows thicker, longer, and jet-black hair compared to lowland relatives to insulate against near-freezing summit nights.",
        es: "Desarrolla pelaje más largo, denso y negro azabache que sus congéneres de tierras bajas para soportar el frío nocturno.",
        it: "Sviluppa una pelliccia più lunga e scura rispetto ai parenti di pianura per isolarsi dalle notti gelide.",
      },
    ],
    image: {
      url: "/images/species/mountain-gorilla.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mountain_gorilla_(Gorilla_beringei_beringei)_eating.jpg",
      alt: "Mountain Gorilla feeding on vegetation",
    },
    rangeConfig: [{ minLon: 29.0, maxLon: 30.2, minLat: -1.7, maxLat: -0.8 }],
  },

  // 8. Cheetah
  {
    id: "cheetah",
    commonName: { en: "Cheetah", es: "Guepardo", it: "Ghepardo" },
    scientificName: "Acinonyx jubatus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~6,500 – 7,100 mature individuals",
    populationHistory: [
      { year: 1975, estimate: 15000 },
      { year: 2000, estimate: 10000 },
      { year: 2024, estimate: 6800 },
    ],
    climateVulnerability: {
      en: "Rising midday temperatures in arid savannas restrict hunting windows and increase energetic competition with nocturnal apex carnivores.",
      es: "El aumento de temperaturas diurnas reduce las horas de caza e incrementa competencia con carnívoros nocturnos.",
      it: "L'aumento delle temperature riduce i tempi utili di caccia nella savana.",
    },
    keyThreats: [
      {
        threat: "Habitat fragmentation & cub poaching",
        impact: "high",
        description: {
          en: "Wide-ranging home territories overlap heavily with un-fenced pastoral lands.",
          es: "Sus amplios territorios de campeo coinciden con tierras ganaderas abiertas.",
          it: "Ampi territori sovrapposti ad aree di pascolo non protette.",
        },
      },
    ],
    diet: {
      en: "Small to medium ungulates: Thomson's gazelles, springbok, impala, and hares.",
      es: "Ungulados medianos: gacelas de Thomson, gacelas saltarinas (springbok), impalas y liebres.",
      it: "Gazzelle di Thomson, springbok e impala.",
    },
    clues: [
      {
        en: "Morphologically specialized for high-speed diurnal coursing, with semi-retractile claws functioning like athletic cleats and an enlarged respiratory tract.",
        es: "Especializado morfológicamente en carreras diurnas de alta velocidad, con garras semi-retráctiles tipo clavos de atletismo y vías respiratorias ampliadas.",
        it: "Morfologicamente specializzato per scatti ad altissima velocità, con artigli semi-retrattili che fungono da tacchetti.",
      },
      {
        en: "Features prominent black facial 'tear marks' extending from the inner eye corners to deflect blinding daytime solar glare.",
        es: "Presenta características líneas negras lagrimales que absorben y desvían el resplandor solar diurno.",
        it: "Caratterizzato da strie nere sotto gli occhi che riducono il riverbero della luce solare.",
      },
    ],
    image: {
      url: "/images/species/cheetah.jpg",
      photographer: "Hein Waschefort",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cheetah_chase.jpg",
      alt: "Cheetah running in savanna grassland",
    },
    rangeConfig: [
      { minLon: 12.0, maxLon: 42.0, minLat: -34.0, maxLat: 5.0 },
      { minLon: 34.0, maxLon: 44.0, minLat: -4.0, maxLat: 12.0 },
    ],
  },

  // 9. Capybara
  {
    id: "capybara",
    commonName: { en: "Capybara", es: "Carpincho / Capibara", it: "Capibara" },
    scientificName: "Hydrochoerus hydrochaeris",
    taxonClass: "Mammalia",
    order: "Rodentia",
    family: "Caviidae",
    realm: "Freshwater",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "Millions of individuals (widespread)",
    populationHistory: [
      { year: 1990, estimate: 3000000 },
      { year: 2024, estimate: 3500000 },
    ],
    climateVulnerability: {
      en: "Vulnerable to drying of seasonal wetlands and river marshes during extended El Niño droughts.",
      es: "Vulnerable a la desecación de humedales y esteros durante sequías prolongadas.",
      it: "Sensibile al prosciugamento delle zone umide durante le siccità.",
    },
    keyThreats: [
      {
        threat: "Commercial hunting for leather & meat",
        impact: "low",
        description: {
          en: "Regulated harvest and ranching around wetland borders.",
          es: "Aprovechamiento regulado en zonas húmedas y sabanas inundables.",
          it: "Caccia commerciale regolamentata per pelle e carne.",
        },
      },
    ],
    diet: {
      en: "Herbivore: Water hyacinth, aquatic grasses, marsh plants, and tree bark.",
      es: "Herbívoro: jacintos de agua, pastos acuáticos, juncos y cortezas.",
      it: "Erbivoro: piante acquatiche, erbe palustri e cortecce.",
    },
    clues: [
      {
        en: "The world's largest living rodent, highly adapted to life in and around tropical wetland basins, lakes, and seasonal floodplains.",
        es: "El roedor viviente más voluminoso, altamente adaptado a la vida en humedales tropicales, lagunas y esteros inundables.",
        it: "Il più grande roditore vivente, strettamente legato a zone umide tropicali, paludi e fiumi.",
      },
      {
        en: "Features slightly webbed feet and facial sensory organs (eyes, ears, nostrils) aligned high on the head for swimming stealth.",
        es: "Posee pies parcialmente palmeados y órganos sensoriales (ojos, orejas, nariz) alineados en la parte superior de la cabeza para nadar sumergido.",
        it: "Presenta zampe parzialmente palmate e occhi, narici e orecchie allineati in alto sulla testa per nuotare a pelo d'acqua.",
      },
    ],
    image: {
      url: "/images/species/capybara.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Capybara_(Hydrochoerus_hydrochaeris).JPG",
      alt: "Capybara in marshland",
    },
    rangeConfig: [{ minLon: -75.0, maxLon: -35.0, minLat: -35.0, maxLat: 11.0 }],
  },

  // 10. Tasmanian Devil
  {
    id: "tasmanian-devil",
    commonName: { en: "Tasmanian Devil", es: "Demonio de Tasmania", it: "Diavolo della Tasmania" },
    scientificName: "Sarcophilus harrisii",
    taxonClass: "Mammalia",
    order: "Dasyuromorphia",
    family: "Dasyuridae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~10,000 – 15,000 mature individuals",
    populationHistory: [
      { year: 1996, estimate: 140000, label: "First detection of DFTD contagious tumor" },
      { year: 2005, estimate: 50000 },
      { year: 2008, estimate: 25000, label: "Uplisted to Endangered" },
      { year: 2024, estimate: 14000 },
    ],
    climateVulnerability: {
      en: "Hotter, drier summers alter carrion breakdown rates and increase bushfire hazards in coastal scrub.",
      es: "Veranos más calurosos y secos aceleran descomposición de carroñas e incendios en matorral costero.",
      it: "Estati più calde e secche alterano la decomposizione delle carcasse e aumentano il rischio di incendi.",
    },
    keyThreats: [
      {
        threat: "Devil Facial Tumour Disease (DFTD)",
        impact: "high",
        description: {
          en: "A fatal transmissible clonal cell line cancer spread by biting during communal feeding and mating.",
          es: "Cáncer facial transmisible por mordeduras durante alimentación comunal y apareamiento.",
          it: "Tumore facciale clonale trasmissibile tramite morsi durante i pasti comuni.",
        },
      },
    ],
    diet: {
      en: "Carnivorous scavenger: Wallabies, wombats, pademelons, sheep carrion, bones and fur.",
      es: "Carroñero carnívoro: ualabíes, wómbats, ganado y carroña que tritura entera con sus mandíbulas.",
      it: "Carnivoro necrofago: wallaby, vombati e carogne di mammiferi.",
    },
    clues: [
      {
        en: "The world's largest extant carnivorous marsupial, nocturnal and stocky with a specialized bite force quotient exceeding that of most larger predators.",
        es: "El marsupial carnívoro vivo más grande, de hábitos nocturnos y con una fuerza de mordida relativa superior a la de la mayoría de grandes depredadores.",
        it: "Il più grande marsupiale carnivoro vivente, notturno e con un morso proporzionalmente tra i più potenti del regno animale.",
      },
      {
        en: "Characterized by pitch-black fur with an irregular white chest crescent, producing piercing guttural screeches and a strong musk when agitated.",
        es: "Se caracteriza por pelaje negro azabache con medialuna blanca en el pecho, emitiendo chillidos guturales y un fuerte almizcle.",
        it: "Caratterizzato da pelliccia nera con una mezzaluna bianca sul petto e grida stridenti quando eccitato.",
      },
    ],
    image: {
      url: "/images/species/tasmanian-devil.jpg",
      photographer: "JJ Harrison",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sarcophilus_harrisii_taranna.jpg",
      alt: "Tasmanian Devil standing on grass",
    },
    rangeConfig: [{ minLon: 144.5, maxLon: 148.5, minLat: -43.8, maxLat: -40.5 }],
  },

  // 12. Bengal Tiger
  {
    id: "bengal-tiger",
    commonName: { en: "Bengal Tiger", es: "Tigre de Bengala", it: "Tigre del Bengala" },
    scientificName: "Panthera tigris tigris",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "increasing",
    populationEstimate: "~3,682 wild individuals (2023 census)",
    populationHistory: [
      { year: 1972, estimate: 1800 },
      { year: 2006, estimate: 1411 },
      { year: 2014, estimate: 2226 },
      { year: 2023, estimate: 3682 },
    ],
    climateVulnerability: {
      en: "Sea level rise in coastal mangrove deltas inundates freshwater drinking ponds and reduces core mangrove breeding territory.",
      es: "El ascenso del nivel del mar en los manglares saliniza fuentes de agua dulce y reduce islas de cría.",
      it: "L'innalzamento del mare nelle mangrovie salinizza le pozze d'acqua dolce.",
    },
    keyThreats: [
      {
        threat: "Poaching & linear infrastructure",
        impact: "high",
        description: {
          en: "Targeted poaching for illegal trade in skins and bones alongside highway and railway mortality.",
          es: "Caza furtiva por el tráfico ilegal de huesos y pieles, y atropellos en infraestructuras lineales.",
          it: "Bracconaggio per il commercio illegale e frammentazione dovuta a ferrovie e strade.",
        },
      },
    ],
    diet: {
      en: "Large ungulates: Chital (spotted deer), sambar, gaur, wild boar, and water buffalo.",
      es: "Grandes ungulados: ciervo chital, sambar, gaur, jabalí y búfalo de agua.",
      it: "Grandi ungulati: cervo pomellato, sambar, gaur e cinghiale.",
    },
    clues: [
      {
        en: "Apex solitary felid adapted to varied habitats ranging from moist tropical deciduous forests and tall alluvial grasslands to mangrove swamps.",
        es: "Gran felino solitario adaptado a bosques tropicales caducifolios, pastizales aluviales altos y manglares mareales.",
        it: "Grande felino solitario presente in foreste decidue tropicali, praterie alluvionali e mangrovie.",
      },
      {
        en: "Possesses a distinctive camouflage coat of dark vertical stripes unique to each individual, functioning as an exceptional ambush predator.",
        es: "Posee un patrón de rayas verticales oscuras único e irrepetible para cada individuo que desdibuja su silueta en pastizales densos.",
        it: "Caratterizzato da strisce verticali nere uniche per ogni individuo per mimetizzarsi nell'erba alta.",
      },
    ],
    image: {
      url: "/images/species/bengal-tiger.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bengal_tiger_(Panthera_tigris_tigris)_female_3.jpg",
      alt: "Bengal tiger in high grass",
    },
    rangeConfig: [{ minLon: 69.0, maxLon: 94.0, minLat: 8.0, maxLat: 31.0 }],
  },

  // 13. African Bush Elephant
  {
    id: "african-bush-elephant",
    commonName: { en: "African Bush Elephant", es: "Elefante Africano de Sabana", it: "Elefante Africano di Savana" },
    scientificName: "Loxodonta africana",
    taxonClass: "Mammalia",
    order: "Proboscidea",
    family: "Elephantidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~350,000 individuals (savanna elephants only; ~415,000 was the combined 2016 estimate for savanna and forest elephants together, before the two were assessed as separate species in 2021)",
    populationHistory: [
      { year: 1979, estimate: 1300000 },
      { year: 1995, estimate: 500000 },
      { year: 2016, estimate: 415000, label: "Combined savanna + forest elephant estimate (pre-2021 species split)" },
    ],
    climateVulnerability: {
      en: "Severe multi-year droughts dry out seasonal water pans, causing calf dehydration and escalating conflict with smallholder farmers around boreholes.",
      es: "Sequías severas secan abrevaderos estacionales, causando mortandad de crías y conflicto con agricultores.",
      it: "Gravi siccità prosciugano le pozze d'acqua aumentando la mortalità dei cuccioli.",
    },
    keyThreats: [
      {
        threat: "Ivory poaching & range loss",
        impact: "high",
        description: {
          en: "Commercial poaching for ivory and conversion of traditional migration corridors to fenced agricultural fields.",
          es: "Furtivismo por marfil y bloqueo de corredores migratorios tradicionales por vallas agrícolas.",
          it: "Bracconaggio per l'avorio e blocco dei corridoi migratori.",
        },
      },
    ],
    diet: {
      en: "Mega-herbivore consuming up to 150-300 kg of grasses, bark, roots, and foliage daily.",
      es: "Megaherbívoro que ingiere entre 150 y 300 kg diarios de pastos, cortezas, raíces y follaje.",
      it: "Mega-erbivoro che consuma fino a 300 kg di vegetazione al giorno.",
    },
    clues: [
      {
        en: "The largest living terrestrial animal, possessing massive fan-shaped ears filled with rich capillary networks to radiate excess body heat.",
        es: "El animal terrestre más voluminoso del planeta, con enormes orejas en abanico repletas de capilares para disipar el calor corporal.",
        it: "Il più grande animale terrestre vivente, con enormi padiglioni auricolari per disperdere il calore corporeo.",
      },
      {
        en: "Features a complex prehensile proboscis (trunk) containing over 40,000 distinct muscles and two finger-like projections at its tip.",
        es: "Dotado de una trompa prensil con más de 40.000 músculos independientes y dos prolongaciones dactilares en su extremo.",
        it: "Dotato di una proboscide prensile con oltre 40.000 fasci muscolari e due lobi digitali all'apice.",
      },
    ],
    image: {
      url: "/images/species/african-bush-elephant.jpg",
      photographer: "Muhammad Mahdi Karim",
      license: "GNU FDL 1.2 / Free Art License",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:African_Bush_Elephant.jpg",
      alt: "African Bush Elephant bull",
    },
    rangeConfig: [{ minLon: 10.0, maxLon: 42.0, minLat: -34.0, maxLat: 15.0 }],
  },

  // 14. Red Panda
  {
    id: "red-panda",
    commonName: { en: "Red Panda", es: "Panda Rojo", it: "Panda Rosso" },
    scientificName: "Ailurus fulgens",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Ailuridae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "< 10,000 mature individuals",
    populationHistory: [
      { year: 1994, estimate: 20000 },
      { year: 2008, estimate: 10000 },
      { year: 2024, estimate: 8000 },
    ],
    climateVulnerability: {
      en: "Montane warming shifts the temperate mixed broadleaf-conifer belt upward, compressing available habitat on narrow ridges.",
      es: "El calentamiento desplaza el cinturón templado de coníferas y rododendros hacia cotas más altas y estrechas.",
      it: "Lo spostamento altitudinale dei boschi di conifere e rododendri comprime l'habitat disponibile.",
    },
    keyThreats: [
      {
        threat: "Deforestation & livestock grazing",
        impact: "high",
        description: {
          en: "Clearing of temperate forests for timber, fuelwood, and livestock bamboo trampling.",
          es: "Tala de bosques templados de montaña y pisoteo del bambú por ganado doméstico.",
          it: "Deforestazione e pascolo che danneggia il sottobosco di bambù.",
        },
      },
    ],
    diet: {
      en: "Specialist folivore: Bamboo shoots and leaves, supplemented with berries, blossoms, and bird eggs.",
      es: "Folívoro especialista: brotes y hojas de bambú, complementado con bayas, flores y huevos.",
      it: "Specialista di bambù, integrato con bacche e uova.",
    },
    clues: [
      {
        en: "The sole living representative of the distinct family Ailuridae, inhabiting high-altitude temperate forests with dense bamboo understories between 2,200 and 4,800 m.",
        es: "Único representante vivo de la familia Ailuridae, habitando bosques templados de alta montaña con sotobosque de bambú entre 2.200 y 4.800 m.",
        it: "Unico membro vivente della famiglia Ailuridae, abita foreste temperate montane ricche di bambù tra 2.200 e 4.800 m.",
      },
      {
        en: "Features russet-red fur, a long ringed bushy tail used as a blanket, and a modified false thumb used to grasp bamboo twigs.",
        es: "Posee pelaje pardo rojizo, una cola anillada muy tupida que usa como manta térmica y un falso pulgar en las muñecas.",
        it: "Ha pelliccia rosso-ruggine, una coda folta ad anelli e un falso pollice per afferrare i ramoscelli.",
      },
    ],
    image: {
      url: "/images/species/red-panda.jpg",
      photographer: "Mathias Appel",
      license: "CC0 1.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_Panda_(25193861686).jpg",
      alt: "Red panda resting in a tree",
    },
    rangeConfig: [{ minLon: 80.0, maxLon: 104.0, minLat: 24.0, maxLat: 32.0 }],
  },

  // 15. Platypus
  {
    id: "platypus",
    commonName: { en: "Platypus", es: "Ornitorrinco", it: "Ornitorinco" },
    scientificName: "Ornithorhynchus anatinus",
    taxonClass: "Mammalia",
    order: "Monotremata",
    family: "Ornithorhynchidae",
    realm: "Freshwater",
    difficulty: "iconic",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate: "~30,000 – 50,000 individuals",
    populationHistory: [
      { year: 1980, estimate: 100000 },
      { year: 2000, estimate: 65000 },
      { year: 2016, estimate: 45000 },
      { year: 2024, estimate: 38000 },
    ],
    climateVulnerability: {
      en: "Severe hydrological drought dries riparian river systems, isolating genetic pools and exposing individuals to heat stress without sweat glands.",
      es: "Sequías severas secan cuencas fluviales, aislando poblaciones y provocando estrés térmico al carecer de glándulas sudoríparas.",
      it: "Gravi siccità prosciugano i corsi fluviali isolando i nuclei riproduttivi.",
    },
    keyThreats: [
      {
        threat: "River regulation & gill nets",
        impact: "high",
        description: {
          en: "Dams altering riverflow ecology and accidental drowning in enclosed yabby traps.",
          es: "Presas que alteran el caudal ecológico y ahogamientos accidentales en nasas de pesca.",
          it: "Regolamentazione dei fiumi e annegamento in trappole per crostacei.",
        },
      },
    ],
    diet: {
      en: "Benthic invertebrates: Insect larvae, freshwater crayfish, and shrimp detected with electrolocation.",
      es: "Invertebrados bentónicos: larvas de insectos acuáticos y cangrejos de río mediante electrorrecepción.",
      it: "Invertebrati bentonici individuati tramite elettro-recettori sul becco.",
    },
    clues: [
      {
        en: "An egg-laying semi-aquatic monotreme with a duck-like leathery bill, beaver-like flattened tail, and otter-like webbed feet.",
        es: "Monotrema semiacuático ovíparo con hocico gomoso en forma de pico de pato, cola aplanada de castor y patas palmeadas.",
        it: "Monotrema oviparo semi-acquatico con becco gommoso d'anatra e coda piatta di castoro.",
      },
      {
        en: "Males possess a venomous calcaneus spur on each hind ankle connected to a crural gland, and hunt underwater using electro-receptive bill sensors.",
        es: "Los machos poseen un espolón calcáneo venenoso en los tobillos y cazan bajo el agua cerrando ojos y oídos gracias a electrorreceptores.",
        it: "I maschi possiedono uno sperone velenoso sulle zampe posteriori e cacciano a occhi chiusi tramite elettrolocalizzazione.",
      },
    ],
    image: {
      url: "/images/species/platypus.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Duck-billed_platypus_(Ornithorhynchus_anatinus)_Scottsdale.jpg",
      alt: "Platypus swimming at the surface of a river",
    },
    rangeConfig: [{ minLon: 140.0, maxLon: 153.5, minLat: -43.5, maxLat: -15.5 }],
  },

  // 16. Red Kangaroo
  {
    id: "red-kangaroo",
    commonName: { en: "Red Kangaroo", es: "Canguro Rojo", it: "Canguro Rosso" },
    scientificName: "Osphranter rufus",
    taxonClass: "Mammalia",
    order: "Diprotodontia",
    family: "Macropodidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "~10 – 15 million individuals",
    populationHistory: [
      { year: 1990, estimate: 8000000 },
      { year: 2005, estimate: 12000000 },
      { year: 2018, estimate: 14000000 },
      { year: 2024, estimate: 13500000 },
    ],
    climateVulnerability: {
      en: "Multi-year aridification causes boom-and-bust reproductive recruitment in dry desert scrublands.",
      es: "Sequías prolongadas provocan grandes fluctuaciones demográficas en pastizales áridos.",
      it: "Le siccità nell'outback arido causano forti oscillazioni riproduttive.",
    },
    keyThreats: [
      {
        threat: "Commercial harvesting",
        impact: "low",
        description: {
          en: "Government quotas regulate meat and hide harvest sustainably.",
          es: "Cuotas gubernamentales regulan la caza comercial de carne y pieles.",
          it: "Prelievi commerciali regolamentati da quote governative.",
        },
      },
    ],
    diet: {
      en: "Herbivorous grazer: Native arid grasses, forbs, and saltbush shrubs.",
      es: "Herbívoro pastador: gramíneas autóctonas de zonas áridas y arbustos halófitos.",
      it: "Erbivoro: graminacee native delle zone aride e arbusti del deserto.",
    },
    clues: [
      {
        en: "The largest surviving marsupial and largest terrestrial mammal native to its continent, roaming vast arid shrublands and open interior plains.",
        es: "El marsupial vivo de mayor tamaño y el mayor mamífero terrestre autóctono de su continente, vagando por llanuras áridas interiores.",
        it: "Il più grande marsupiale vivente, adattato alle grandi pianure aride dell'interno continentale.",
      },
      {
        en: "Uses saltatory locomotion (bipedal hopping) propelled by large elastic tendons in elongated hind legs, reaching speeds over 60 km/h.",
        es: "Se desplaza mediante saltos bípedos propulsados por tendones elásticos en sus largas patas traseras, superando los 60 km/h.",
        it: "Si muove con potenti balzi bipedi grazie a tendini elastici nelle zampe posteriori, superando i 60 km/h.",
      },
    ],
    image: {
      url: "/images/species/red-kangaroo.jpg",
      photographer: "PotMart186",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_Kangaroos_at_Sturt_National_Park_NSW.jpg",
      alt: "Adult and young red kangaroo in arid grassland",
    },
    rangeConfig: [{ minLon: 115.0, maxLon: 148.0, minLat: -35.0, maxLat: -18.0 }],
  },

  // 17. Okapi
  {
    id: "okapi",
    commonName: { en: "Okapi", es: "Okapi", it: "Okapi" },
    scientificName: "Okapia johnstoni",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Giraffidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~10,000 – 15,000 individuals (no reliable census exists; IUCN cites a wide range of 10,000–50,000)",
    populationHistory: [
      { year: 2013, estimate: 35000, label: "Dung-survey based estimate" },
      { year: 2024, estimate: 12000 },
    ],
    climateVulnerability: {
      en: "Shifts in tropical rainfall cycles threaten primary dense rainforest canopy cover and understory diversity.",
      es: "Alteraciones en el régimen de lluvias tropicales amenazan el dosel denso de selva primaria.",
      it: "Alterazioni delle piogge tropicali minacciano la foresta primaria e il sottobosco.",
    },
    keyThreats: [
      {
        threat: "Illegal mining & armed conflict",
        impact: "high",
        description: {
          en: "Artisanal gold and coltan mining camps and bushmeat hunting inside nature reserves.",
          es: "Minería ilegal de oro y coltán y caza de carne de monte en reservas protegidas.",
          it: "Estrazioni illegali di coltan e oro e caccia di frodo nelle riserve.",
        },
      },
    ],
    diet: {
      en: "Herbivore: Tree leaves, buds, grasses, ferns, and fungi stripped with a 45-cm prehensile tongue.",
      es: "Herbívoro: hojas de árboles, brotes, helechos y hongos que arranca con su lengua prensil de 45 cm.",
      it: "Erbivoro: foglie, germogli e funghi colti con una lingua prensile di 45 cm.",
    },
    clues: [
      {
        en: "The only living relative of the giraffe, adapted to solitary life in dense, impenetrable tropical lowland rainforests.",
        es: "El único pariente vivo cercano de la jirafa, adaptado a la vida solitaria en densas selvas pluviales tropicales primarias.",
        it: "L'unico parente vivente della giraffa, solitario nelle fitte foreste pluviali di pianura.",
      },
      {
        en: "Possesses a chocolate-brown velvet coat with contrasting horizontal zebra-like white stripes on its haunches and upper legs.",
        es: "Presenta un pelaje aterciopelado marrón chocolate con rayas horizontales blancas tipo cebra en ancas y cuartos traseros.",
        it: "Ha un mantello vellutato color cioccolato con caratteristiche strisce zebrate bianche sulle zampe posteriori.",
      },
    ],
    image: {
      url: "/images/species/okapi.jpg",
      photographer: "StephanieRutan",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Male_okapi_at_White_Oak.jpg",
      alt: "Okapi showing zebra-striped hindquarters",
    },
    rangeConfig: [{ minLon: 25.0, maxLon: 30.5, minLat: -1.0, maxLat: 4.0 }],
  },

  // 18. Ring-tailed Lemur
  {
    id: "ring-tailed-lemur",
    commonName: { en: "Ring-tailed Lemur", es: "Lémur de Cola Anillada", it: "Lemure dalla Coda ad Anelli" },
    scientificName: "Lemur catta",
    taxonClass: "Mammalia",
    order: "Primates",
    family: "Lemuridae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~2,000 – 2,500 individuals",
    populationHistory: [
      { year: 2000, estimate: 20000 },
      { year: 2014, estimate: 5000 },
      { year: 2020, estimate: 2500 },
      { year: 2024, estimate: 2200 },
    ],
    climateVulnerability: {
      en: "Severe multi-year droughts in dry spiny scrub and gallery forest ecosystems desiccate crucial tamarind fruit crops.",
      es: "Sequías severas en el bosque espinoso desecan los frutos de tamarindo, alimento básico.",
      it: "Gravi siccità nelle foreste spinose colpiscono la produzione di frutti di tamarindo.",
    },
    keyThreats: [
      {
        threat: "Slash-and-burn agriculture & pet trade",
        impact: "high",
        description: {
          en: "Clearing of dry forest for charcoal production and illegal capture of infants for local pet trade.",
          es: "Tala y quema de bosque para carbón vegetal y tráfico ilegal de crías.",
          it: "Deforestazione per carbone e cattura illegale di cuccioli.",
        },
      },
    ],
    diet: {
      en: "Omnivore: Tamarind fruit and leaves, supplemented by flowers, bark, sap, and insects.",
      es: "Omnívoro: frutos y hojas de tamarindo, flores, cortezas y pequeños insectos.",
      it: "Onnivoro: frutti di tamarindo, foglie, fiori e insetti.",
    },
    clues: [
      {
        en: "Highly terrestrial strepsirrhine primate living in female-dominant social troops within arid spiny forests and riverine galleries.",
        es: "Primate estrepsirrino de marcados hábitos terrestres organizado en tropas matriarcales en bosques espinosos secos y galerías fluviales.",
        it: "Primate strepsirrino con società matriarcale, molto terricolo in foreste spinose e boschi a galleria.",
      },
      {
        en: "Features a dramatic black-and-white alternating banded tail used for visual signaling during group travel and 'stink fights'.",
        es: "Luce una llamativa cola con anillos alternos blancos y negros que mantiene erguida para comunicarse y librar 'duelos de olores'.",
        it: "Presenta una lunga coda ad anelli alternati bianchi e neri usata come segnale visivo e per 'sfide olfattive'.",
      },
    ],
    image: {
      url: "/images/species/ring-tailed-lemur.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ring-tailed_lemur_(Lemur_catta).jpg",
      alt: "Ring-tailed lemur in sunbathing pose",
    },
    rangeConfig: [{ minLon: 43.5, maxLon: 47.5, minLat: -25.5, maxLat: -21.0 }],
  },

  // 19. Blue Whale
  {
    id: "blue-whale",
    commonName: { en: "Blue Whale", es: "Ballena Azul", it: "Balenottera Azzurra" },
    scientificName: "Balaenoptera musculus",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Balaenopteridae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "increasing",
    populationEstimate: "~10,000 – 25,000 individuals",
    populationHistory: [
      { year: 1900, estimate: 350000 },
      { year: 1966, estimate: 1500, label: "Commercial whaling ban" },
      { year: 2000, estimate: 8000 },
      { year: 2024, estimate: 18000 },
    ],
    climateVulnerability: {
      en: "Ocean warming and sea-ice acidification disrupt seasonal upwelling blooms of polar euphausiid krill.",
      es: "El calentamiento oceánico y la acidificación perjudican las poblaciones polares de krill.",
      it: "Il riscaldamento degli oceani minaccia le concentrazioni polari di krill.",
    },
    keyThreats: [
      {
        threat: "Ship collisions & underwater noise",
        impact: "high",
        description: {
          en: "Lethal strikes from ultra-large container ships along major maritime shipping lanes.",
          es: "Colisiones letales con buques mercantes en rutas de navegación marítima.",
          it: "Collisioni letali con grandi navi mercantili e inquinamento acustico.",
        },
      },
    ],
    diet: {
      en: "Filter-feeder: Consumes up to 4 to 6 metric tons of krill daily using fringed baleen plates.",
      es: "Filtrador: consume de 4 a 6 toneladas diarias de krill mediante placas de barbas.",
      it: "Filtratore: fino a 6 tonnellate di krill al giorno grazie ai fanoni.",
    },
    clues: [
      {
        en: "The largest animal ever known to have lived on Earth, reaching lengths of up to 30 meters and body masses exceeding 190 metric tons.",
        es: "El animal de mayor masa que jamás ha existido en la historia del planeta, alcanzando hasta 30 metros de longitud y 190 toneladas.",
        it: "Il più grande animale mai vissuto sulla Terra, lungo fino a 30 metri e pesante fino a 190 tonnellate.",
      },
      {
        en: "Undertakes vast oceanic migrations between polar summer feeding grounds and equatorial winter calving waters, communicating with low-frequency infrasonic pulses.",
        es: "Emprende migraciones oceánicas entre zonas de alimentación polares y aguas tropicales de cría, comunicándose con pulsos infrasónicos.",
        it: "Compie grandi migrazioni oceaniche tra mari polari e tropicali, emettendo potenti richiami a infrasuoni.",
      },
    ],
    image: {
      url: "/images/species/blue-whale.jpg",
      photographer: "NOAA Photo Library",
      license: "Public Domain / NOAA",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg",
      alt: "Blue whale surfacing in open ocean",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: -70.0, maxLat: 75.0, includeOcean: true }],
  },

  // 20. Bornean Orangutan
  {
    id: "bornean-orangutan",
    commonName: { en: "Bornean Orangutan", es: "Orangután de Borneo", it: "Orangotango del Borneo" },
    scientificName: "Pongo pygmaeus",
    taxonClass: "Mammalia",
    order: "Primates",
    family: "Hominidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "CR",
    populationTrend: "decreasing",
    populationEstimate: "~104,700 individuals",
    populationHistory: [
      { year: 1973, estimate: 288000 },
      { year: 2000, estimate: 150000 },
      { year: 2016, estimate: 104700, label: "Uplisted to Critically Endangered" },
      { year: 2024, estimate: 95000 },
    ],
    climateVulnerability: {
      en: "Intensifying El Niño droughts drive catastrophic peat-swamp forest fires, destroying mast-fruiting dipterocarp trees.",
      es: "Las sequías de El Niño provocan incendios en turberas tropicales, destruyendo árboles dipterocarpáceos.",
      it: "Gli incendi di torbiere legati a El Niño distruggono le foreste di dipterocarpi.",
    },
    keyThreats: [
      {
        threat: "Oil palm conversion",
        impact: "high",
        description: {
          en: "Extensive clear-cutting and draining of peat swamp forests for monoculture oil palm plantations.",
          es: "Tala masiva y drenaje de turberas para plantaciones de palma aceitera.",
          it: "Deforestazione massiccia per le piantagioni di palma da olio.",
        },
      },
    ],
    diet: {
      en: "Frugivore: Wild figs, durians, dipterocarp seeds, young leaves, bark, and honey.",
      es: "Frugívoro: higos silvestres, durianes, semillas de dipterocarpáceas, brotes y miel.",
      it: "Frugivoro: fichi selvatici, durian, semi, germogli e miele.",
    },
    clues: [
      {
        en: "The world's largest exclusively arboreal animal, spending over 90% of its waking life high in tropical dipterocarp canopy trees.",
        es: "El animal arborícola más grande del mundo, pasando más del 90% de su vida en el dosel de selvas tropicales de tierras bajas.",
        it: "Il più grande animale arboricolo vivente, trascorre oltre il 90% del tempo sulle chiome della foresta pluviale.",
      },
      {
        en: "Adult males develop large fleshy cheek pads (flanges) and an inflatable throat pouch to resonate booming territorial 'long calls'.",
        es: "Los machos adultos dominantes desarrollan prominentes valonas carnosas en las mejillas y un saco laríngeo para emitir potentes llamadas.",
        it: "I maschi adulti sviluppano flange carnose sulle guance e un sacco gola per emettere profondi richiami territoriali.",
      },
    ],
    image: {
      url: "/images/species/bornean-orangutan.jpg",
      photographer: "Thomas Fuhrmann",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bornean_orangutan_(Pongo_pygmaeus),_Tanjung_Putting_National_Park_01.jpg",
      alt: "Bornean orangutan mother and infant in rainforest canopy",
    },
    rangeConfig: [{ minLon: 108.8, maxLon: 119.2, minLat: -4.3, maxLat: 7.2 }],
  },

  // 21. Sea Otter
  {
    id: "sea-otter",
    commonName: { en: "Sea Otter", es: "Nutria Marina", it: "Lontra Marina" },
    scientificName: "Enhydra lutris",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Mustelidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~125,000 individuals",
    populationHistory: [
      { year: 1911, estimate: 2000 },
      { year: 1980, estimate: 100000 },
      { year: 2024, estimate: 125000 },
    ],
    climateVulnerability: {
      en: "Marine heatwaves trigger catastrophic kelp forest die-offs and warm water expansion of toxoplasmosis pathogens.",
      es: "Las olas de calor marinas provocan el colapso de bosques de algas kelp y proliferación de parásitos.",
      it: "Le ondate di calore marine provocano la morte delle foreste di kelp.",
    },
    keyThreats: [
      {
        threat: "Oil spills & orca predation",
        impact: "high",
        description: {
          en: "Vulnerability of fur insulation to crude oil fouling and increased killer whale predation in Alaska.",
          es: "Vulnerabilidad extrema del pelaje al petróleo y aumento de depredación por orcas.",
          it: "Fuoriuscite di petrolio che distruggono l'isolamento del pelo e predazione da orche.",
        },
      },
    ],
    diet: {
      en: "Benthic invertebrates: Sea urchins, abalone, clams, crabs, and sea snails cracked with rocks.",
      es: "Invertebrados bentónicos: erizos de mar, abulones, almejas y cangrejos abiertos con piedras.",
      it: "Echinodermi e molluschi: ricci di mare, abaloni e granchi aperti usando pietre.",
    },
    clues: [
      {
        en: "Possesses the densest fur of any animal on Earth (up to 150,000 hairs per square centimeter) and lacks blubber entirely.",
        es: "Posee el pelaje más denso de todo el reino animal (hasta 150.000 pelos por cm²) y carece completamente de grasa subcutánea.",
        it: "Ha la pelliccia più densa del regno animale (fino a 150.000 peli per cm²) e non ha grasso sottocutaneo.",
      },
      {
        en: "One of the few non-primate mammals known to use stone tools, balancing flat rocks on its chest to crack open tough bivalve shells while floating on its back.",
        es: "Uno de los pocos mamíferos no primates que usa herramientas de piedra, apoyando rocas en su pecho para romper conchas flotando boca arriba.",
        it: "Uno dei rari mammiferi a usare strumenti litici, appoggiando pietre sul petto per aprire i gusci mentre galleggia sul dorso.",
      },
    ],
    image: {
      url: "/images/species/sea-otter.jpg",
      photographer: "Mike Baird",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sea_otter_cropped.jpg",
      alt: "Sea otter floating on water",
    },
    rangeConfig: [
      { minLon: 140.0, maxLon: 180.0, minLat: 45.0, maxLat: 62.0, includeOcean: true },
      { minLon: -180.0, maxLon: -120.0, minLat: 33.0, maxLat: 61.0, includeOcean: true },
    ],
  },

  // 22. Saiga Antelope
  {
    id: "saiga-antelope",
    commonName: { en: "Saiga Antelope", es: "Antílope Saiga", it: "Saiga" },
    scientificName: "Saiga tatarica",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Bovidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "NT",
    populationTrend: "increasing",
    populationEstimate: "~1,900,000 individuals (2023 Kazakhstan census recovery)",
    populationHistory: [
      { year: 2003, estimate: 21000 },
      { year: 2015, estimate: 100000 },
      { year: 2023, estimate: 1900000 },
    ],
    climateVulnerability: {
      en: "Abnormal temperature-humidity spikes trigger latent opportunistic Pasteurella bacteria into mass hemorrhagic septicemia die-offs.",
      es: "Picos anómalos de calor y humedad activan bacterias latentes que causan mortandades masivas repentinas.",
      it: "Picchi di calore e umidità innescano morie di massa dovute a infezioni batteriche fulminanti.",
    },
    keyThreats: [
      {
        threat: "Horn poaching & border fences",
        impact: "medium",
        description: {
          en: "Targeted poaching of males for traditional horn medicine and linear border fences blocking seasonal migrations.",
          es: "Furtivismo de cuernos para medicina tradicional y vallas fronterizas que cortan la migración.",
          it: "Bracconaggio per i corni e recinzioni di confine che ostacolano le migrazioni.",
        },
      },
    ],
    diet: {
      en: "Herbivorous nomad: Steppe grasses, halophytes, sagebrush, and saltworts.",
      es: "Herbívoro nómada: gramíneas esteparias, artemisas y plantas halófitas.",
      it: "Erbivoro nomade: erbe della steppa, artemisie e piante alofile.",
    },
    clues: [
      {
        en: "Nomadic ungulate of semi-desert temperate grasslands with an extraordinarily bulbous, flexible downward-pointing snout (proboscis).",
        es: "Ungulado nómada de estepas y semidesiertos templados con un morro bulboso e hinchado orientado hacia abajo.",
        it: "Ungulato nomade delle steppe temperate con un caratteristico muso bulboso e flessibile rivolto in basso.",
      },
      {
        en: "Its unique internal nasal chambers filter out blinding summer steppe dust storms and warm freezing winter air before reaching the lungs.",
        es: "Sus cámaras nasales internas filtran el polvo de las tormentas estivales y calientan el aire gélido invernal antes de llegar a los pulmones.",
        it: "La particolare struttura nasale filtra la polvere estiva e riscalda l'aria gelida invernale.",
      },
    ],
    image: {
      url: "/images/species/saiga-antelope.jpg",
      photographer: "Andrey Giljov",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Saiga_antelope_at_the_Stepnoi_Sanctuary.jpg",
      alt: "Saiga antelope male with horns",
    },
    rangeConfig: [{ minLon: 46.0, maxLon: 80.0, minLat: 42.0, maxLat: 53.0 }],
  },

  // 23. Ethiopian Wolf
  {
    id: "ethiopian-wolf",
    commonName: { en: "Ethiopian Wolf", es: "Lobo Etíope", it: "Lupo Etiope" },
    scientificName: "Canis simensis",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Canidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~400 – 500 individuals",
    populationHistory: [
      { year: 1990, estimate: 600 },
      { year: 2008, estimate: 500 },
      { year: 2024, estimate: 450 },
    ],
    climateVulnerability: {
      en: "Rising temperatures push high-altitude Afroalpine ericaceous moorland higher up mountain massifs, compressing rodent prey belts.",
      es: "El calentamiento desplaza los páramos afroalpinos hacia cumbres estrechas, comprimiendo las poblaciones de roedores presa.",
      it: "Il riscaldamento comprime l'habitat afroalpino verso le cime montuose più elevate.",
    },
    keyThreats: [
      {
        threat: "Rabies & dog hybridization",
        impact: "high",
        description: {
          en: "Rabies and canine distemper viral outbreaks transmitted by pastoral domestic dogs.",
          es: "Brotes virales de rabia y moquillo canino transmitidos por perros de pastoreo.",
          it: "Epidemie di rabbia e cimurro trasmesse da cani domestici.",
        },
      },
    ],
    diet: {
      en: "Specialist rodent hunter: Giant root-rats (Tachyoryctes macrocephalus) and grass rats.",
      es: "Especialista en roedores: rata topo gigante afroalpina y ratones de hierba.",
      it: "Specialista in roditori d'alta quota: ratti-talpa giganti.",
    },
    clues: [
      {
        en: "One of the world's most endangered carnivores, adapted strictly to open high-altitude ericaceous moorlands above 3,000 meters altitude.",
        es: "Uno de los carnívoros más amenazados del planeta, adaptado estrictamente a páramos de alta montaña por encima de los 3.000 m de altitud.",
        it: "Uno dei carnivori più minacciati al mondo, limitato alle brughiere d'alta quota sopra i 3.000 metri.",
      },
      {
        en: "Features a slender, elongated fox-like muzzle specialized for excavating giant root-rats from deep subterranean alpine burrows.",
        es: "Presenta un hocico alargado y fino similar al de un zorro, especializado en excavar madrigueras subterráneas de roedores gigantes.",
        it: "Ha un muso sottile e allungato specializzato nello scovare roditori alpini nelle gallerie sotterranee.",
      },
    ],
    image: {
      url: "/images/species/ethiopian-wolf.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ethiopian_wolf_(Canis_simensis_citernii).jpg",
      alt: "Ethiopian wolf in high moorland",
    },
    rangeConfig: [{ minLon: 36.5, maxLon: 40.5, minLat: 6.5, maxLat: 13.5 }],
  },

  // 24. Fossa
  {
    id: "fossa",
    commonName: { en: "Fossa", es: "Fosa", it: "Fossa" },
    scientificName: "Cryptoprocta ferox",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Eupleridae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~2,600 – 8,600 mature individuals (IUCN range)",
    populationHistory: [
      { year: 2000, estimate: 5000 },
      { year: 2016, estimate: 2635, label: "IUCN assessment (lower bound of 2,635–8,626)" },
    ],
    climateVulnerability: {
      en: "Desiccation of deciduous western dry forests increases forest wildfire vulnerability and reduces canopy arboreal continuity.",
      es: "La desecación de bosques secos caducifolios aumenta incendios y corta la continuidad del dosel arbóreo.",
      it: "L'inaridimento delle foreste secche aumenta il rischio incendi e frammenta le chiome.",
    },
    keyThreats: [
      {
        threat: "Deforestation & retaliatory killing",
        impact: "high",
        description: {
          en: "Slash-and-burn clearing (tavy) for subsistence maize farming and persecution for poultry predation.",
          es: "Tala y quema para cultivos de maíz y persecución por ataques a corrales de aves.",
          it: "Deforestazione per agricoltura e abbattimenti per protezione del pollame.",
        },
      },
    ],
    diet: {
      en: "Apex carnivore: Lemurs, tenrecs, rodents, lizards, and birds pursued through high canopy branches.",
      es: "Superdepredador: lémures, tenrecs, roedores y reptiles perseguidos ágilmente por las copas de los árboles.",
      it: "Predatore apicale: lemuri, tenrec e piccoli vertebrati cacciati sugli alberi.",
    },
    clues: [
      {
        en: "The largest native mammalian carnivore on its isolated oceanic island, closely related to mongooses despite resembling a small cougar.",
        es: "El mayor mamífero carnívoro autóctono de su aislada isla oceánica, emparentado con las mangostas pese a parecer un pequeño puma.",
        it: "Il più grande carnivoro nativo della sua isola, imparentato con le manguste ma simile a un piccolo puma.",
      },
      {
        en: "Possesses semi-retractile claws, flexible ankle joints that can rotate 180 degrees to climb down trees headfirst, and a tail as long as its body.",
        es: "Posee tobillos flexibles que rotan 180° para descender árboles cabeza abajo, garras retráctiles y una cola tan larga como su cuerpo.",
        it: "Ha caviglie snodabili che ruotano di 180° per scendere dagli alberi a testa in giù e una lunghissima coda.",
      },
    ],
    image: {
      url: "/images/species/fossa.jpg",
      photographer: "Heinonlein",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fossa_01.JPG",
      alt: "Fossa climbing on a log",
    },
    rangeConfig: [{ minLon: 43.5, maxLon: 50.5, minLat: -25.5, maxLat: -12.0 }],
  },

  // 25. Sunda Pangolin
  {
    id: "sunda-pangolin",
    commonName: { en: "Sunda Pangolin", es: "Pangolín Malayo", it: "Pangolino di Giava" },
    scientificName: "Manis javanica",
    taxonClass: "Mammalia",
    order: "Pholidota",
    family: "Manidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "CR",
    populationTrend: "decreasing",
    populationEstimate: "Critically low (declined >85% over 2 decades)",
    populationHistory: [
      { year: 2000, estimate: 500000 },
      { year: 2014, estimate: 100000 },
      { year: 2024, estimate: 50000 },
    ],
    climateVulnerability: {
      en: "Forest drying alters subterranean ant and termite mound colonies and increases soil compaction.",
      es: "La sequedad forestal altera termiteros y colonias de hormigas subterráneas.",
      it: "La siccità forestale altera la disponibilità di formicai e termitai.",
    },
    keyThreats: [
      {
        threat: "Illegal international wildlife trafficking",
        impact: "high",
        description: {
          en: "The most heavily trafficked wild mammal on Earth, hunted for keratin scales in traditional medicine and luxury meat.",
          es: "El mamífero salvaje más traficado del planeta, cazado por sus escamas de queratina y carne gourmet.",
          it: "Il mammifero selvatico più trafficato al mondo, bracconato per le scaglie di cheratina.",
        },
      },
    ],
    diet: {
      en: "Myrmecophage: Ants and termites consumed with a 40-cm sticky tongue extending into the abdominal cavity.",
      es: "Mirmecófago: hormigas y termitas ingeridas con una lengua viscosa de 40 cm anclada en la pelvis.",
      it: "Mirmecofago: formiche e termiti catturate con una lingua viscosa di 40 cm.",
    },
    clues: [
      {
        en: "Nocturnal, toothless mammal covered in protective overlapping keratin scales that rolls into an impenetrable ball when threatened.",
        es: "Mamífero nocturno y desdentado cubierto de escamas superpuestas de queratina que se enrolla en una bola acorazada al sentirse amenazado.",
        it: "Mammifero notturno privo di denti, ricoperto di scaglie di cheratina e capace di appallottolarsi a sfera.",
      },
      {
        en: "Features powerful curved foreclaws used to rip open rock-hard termite mounds and a prehensile tail used for arboreal climbing.",
        es: "Posee garras delanteras curvadas y fortísimas para destrozar termiteros duros como rocas y una cola prensil para trepar.",
        it: "Dotato di potenti artigli anteriori per sventrare i termitai e una coda prensile per arrampicarsi.",
      },
    ],
    image: {
      url: "/images/species/sunda-pangolin.jpg",
      photographer: "Frendi Apen Irawan",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trenggiling_Sunda_Sunda_Pangolin_Manis_javanica.jpg",
      alt: "Sunda pangolin walking with scale armor",
    },
    rangeConfig: [{ minLon: 95.0, maxLon: 119.0, minLat: -8.8, maxLat: 20.0 }],
  },

  // 26. Giant Anteater
  {
    id: "giant-anteater",
    commonName: { en: "Giant Anteater", es: "Oso Hormiguero Gigante / Yurumí", it: "Formichiere Gigante" },
    scientificName: "Myrmecophaga tridactyla",
    taxonClass: "Mammalia",
    order: "Pilosa",
    family: "Myrmecophagidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~5,000 – 10,000 in Central America, larger in South America",
    populationHistory: [
      { year: 1990, estimate: 100000 },
      { year: 2014, estimate: 60000 },
      { year: 2024, estimate: 50000 },
    ],
    climateVulnerability: {
      en: "Intense savanna brushfires in the Cerrado and Gran Chaco cause high mortality due to slow locomotion and dense combustible fur.",
      es: "Incendios en sabanas y pastizales causan alta mortalidad por su lento desplazamiento y espeso pelaje inflamable.",
      it: "Gli incendi nella savana provocano un'alta mortalità a causa della lentezza nei movimenti.",
    },
    keyThreats: [
      {
        threat: "Highway collisions & fire",
        impact: "high",
        description: {
          en: "Severe roadkill mortality on expanding highway networks and agricultural grassland burning.",
          es: "Atropellos masivos en carreteras y quemas agrícolas de pastizales.",
          it: "Mortalità da investimento stradale e incendi per pascoli.",
        },
      },
    ],
    diet: {
      en: "Specialist myrmecophage consuming up to 30,000 ants and termites daily.",
      es: "Mirmecófago estricto que consume hasta 30.000 hormigas y termitas al día.",
      it: "Mirmecofago specializzato che consuma fino a 30.000 formiche al giorno.",
    },
    clues: [
      {
        en: "Edentate mammal with an elongated tubular snout and a 60-cm sticky tongue capable of flicking in and out 150 times per minute.",
        es: "Mamífero desdentado con un hocico tubular alargado y una lengua pegajosa de 60 cm que proyecta 150 veces por minuto.",
        it: "Mammifero privo di denti con muso allungato e una lingua vischiosa di 60 cm estraibile 150 volte al minuto.",
      },
      {
        en: "Walks on its knuckles to prevent its 10-cm razor-sharp curved digging claws from dulling, accompanied by a massive bushy broom-like tail.",
        es: "Camina sobre los nudillos para no desgastar sus poderosas garras cavadoras de 10 cm, luciendo una inmensa cola plumosa en escobillón.",
        it: "Cammina sulle nocche per preservare gli artigli ricurvi e ha una folta coda a pennacchio.",
      },
    ],
    image: {
      url: "/images/species/giant-anteater.jpg",
      photographer: "Ron Knight",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Giant_Anteater_(Myrmecophaga_tridactyla).jpg",
      alt: "Giant anteater in grassland",
    },
    rangeConfig: [{ minLon: -85.0, maxLon: -35.0, minLat: -30.0, maxLat: 15.0 }],
  },

  // 27. Quokka
  {
    id: "quokka",
    commonName: { en: "Quokka", es: "Quokka", it: "Quokka" },
    scientificName: "Setonix brachyurus",
    taxonClass: "Mammalia",
    order: "Diprotodontia",
    family: "Macropodidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~7,500 – 15,000 individuals",
    populationHistory: [
      { year: 1980, estimate: 25000 },
      { year: 2000, estimate: 14000 },
      { year: 2024, estimate: 11000 },
    ],
    climateVulnerability: {
      en: "Drying winter rainfall patterns reduce freshwater soak quality on offshore island sanctuaries.",
      es: "La disminución de lluvias invernales reduce la disponibilidad de agua dulce en islas refugio.",
      it: "La riduzione delle piogge invernali minaccia le sorgenti d'acqua sulle isole rifugio.",
    },
    keyThreats: [
      {
        threat: "Invasive feral predators",
        impact: "high",
        description: {
          en: "Predation by introduced European red foxes and feral cats decimated all mainland populations.",
          es: "Depredación por zorros rojos y gatos asilvestrados invasores en el continente.",
          it: "Predazione da parte di volpi e gatti randagi introdotti.",
        },
      },
    ],
    diet: {
      en: "Herbivore: Leaves, shrubs, sedges, succulents, and grasses.",
      es: "Herbívoro: hojas, arbustos suculentos, juncos y gramíneas.",
      it: "Erbivoro: foglie, arbusti, piante succulente ed erbe.",
    },
    clues: [
      {
        en: "Small, nocturnal cat-sized macropod known for dense offshore island refuge populations that lack native terrestrial mammalian predators.",
        es: "Pequeño macrópodo nocturno del tamaño de un gato, célebre por sus poblaciones insulares libres de depredadores mamíferos.",
        it: "Piccolo macropode notturno grande come un gatto, rifugiatosi su isole prive di predatori carnivori.",
      },
      {
        en: "Possesses a compact body, short rounded ears, a tail lacking thick fur, and a facial bone structure that creates a cheerful 'smiling' appearance.",
        es: "Posee cuerpo redondeado, orejas cortas y redondeadas, cola con poco pelo y una mandíbula que aparenta una sonrisa permanente.",
        it: "Ha corpo compatto, orecchie corte arrotondate e una conformazione facciale che ricorda un sorriso.",
      },
    ],
    image: {
      url: "/images/species/quokka.jpg",
      photographer: "Cecilia Broderick",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Quokka_Rottnest_Island.jpg",
      alt: "Quokka on Rottnest Island",
    },
    rangeConfig: [{ minLon: 115.0, maxLon: 116.2, minLat: -35.2, maxLat: -31.8 }],
  },

  // 28. Chimpanzee
  {
    id: "chimpanzee",
    commonName: { en: "Chimpanzee", es: "Chimpancé Común", it: "Scimpanzé Comune" },
    scientificName: "Pan troglodytes",
    taxonClass: "Mammalia",
    order: "Primates",
    family: "Hominidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~150,000 – 250,000 individuals",
    populationHistory: [
      { year: 1960, estimate: 1000000 },
      { year: 1990, estimate: 400000 },
      { year: 2016, estimate: 200000 },
      { year: 2024, estimate: 170000 },
    ],
    climateVulnerability: {
      en: "Seasonal drought intensifies forest fire spread through transitional forest-savanna mosaic borders.",
      es: "Sequías prolongadas intensifican incendios en el mosaico de selva y sabana arbolada.",
      it: "Siccità stagionali intensificano gli incendi nelle foreste a mosaico con la savana.",
    },
    keyThreats: [
      {
        threat: "Bushmeat hunting & disease",
        impact: "high",
        description: {
          en: "Commercial bushmeat trade and zoonotic pathogens (Ebola virus, respiratory outbreaks).",
          es: "Caza comercial de carne de monte y brotes víricos zoonóticos (ébola, patógenos respiratorios).",
          it: "Bracconaggio per carne di foresta e virus zoonotici come l'ebola.",
        },
      },
    ],
    diet: {
      en: "Omnivorous frugivore: Ripe fruits, leaves, insects (termites fished with twigs), honey, and hunted red colobus monkeys.",
      es: "Frugívoro omnívoro: frutos maduros, hojas, termitas pescadas con ramas y pequeños monos colobos cazados en grupo.",
      it: "Onnivoro frugivoro: frutti, termiti pescate con rametti e scimmie colobo cacciate in gruppo.",
    },
    clues: [
      {
        en: "Our closest living evolutionary relative, exhibiting complex multi-male multi-female fission-fusion social communities and cultural tool use.",
        es: "Nuestro pariente evolutivo vivo más cercano, con sociedades complejas de fisión-fusión y tradiciones culturales en el uso de herramientas.",
        it: "Il nostro parente evolutivo più prossimo, vive in società a fissione-fusione e usa strumenti complessi.",
      },
      {
        en: "Constructs nightly fresh arboreal sleeping nests out of bent leafy branches and uses stone/wooden anvils to crack open hard oil palm nuts.",
        es: "Construye nidos nocturnos en las ramas de los árboles y emplea yunques de piedra y madera para cascar nueces duras.",
        it: "Costruisce nidi notturni tra i rami e usa sassi come incudini per spaccare noci dure.",
      },
    ],
    image: {
      url: "/images/species/chimpanzee.jpg",
      photographer: "Thomas Lersch",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Chimpanzee-Head.jpg",
      alt: "Chimpanzee portrait",
    },
    rangeConfig: [{ minLon: -14.0, maxLon: 32.0, minLat: -8.0, maxLat: 10.0 }],
  },

  // 29. Walrus
  {
    id: "walrus",
    commonName: { en: "Walrus", es: "Morsa", it: "Tricheco" },
    scientificName: "Odobenus rosmarus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Odobenidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~225,000 individuals",
    populationHistory: [
      { year: 1980, estimate: 250000 },
      { year: 2000, estimate: 230000 },
      { year: 2024, estimate: 210000 },
    ],
    climateVulnerability: {
      en: "Summer pack-ice retreat forces massive coastal haul-outs on rocky shores, leading to fatal stampedes of calves.",
      es: "La retirada estival del hielo marino obliga a hacinarse en costas rocosas, causando estampidas mortales de crías.",
      it: "Il ritiro dei ghiacci estivi costringe a raduni costieri su terraferma con calpestamento letale dei cuccioli.",
    },
    keyThreats: [
      {
        threat: "Arctic sea ice reduction",
        impact: "high",
        description: {
          en: "Loss of floating sea ice resting platforms over shallow benthic foraging banks.",
          es: "Pérdida de plataformas de hielo flotante sobre bancos marinos someros de moluscos.",
          it: "Perdita della banchisa galleggiante sopra i banchi di foraggiamento bentonico.",
        },
      },
    ],
    diet: {
      en: "Benthic specialist: Bivalve mollusks (clams) siphoned from muddy sea floors with strong muscular tongues.",
      es: "Especialista bentónico: almejas y moluscos succionados del fondo fangoso con su potente lengua muscular.",
      it: "Specialista bentonico: molluschi bivalvi risucchiati dai fondali marini fangosi.",
    },
    clues: [
      {
        en: "Enormous pinniped of icy, ice-covered coastal shelf seas, weighing up to 1.5 metric tons with thick, heavily wrinkled cinnamon-brown hide.",
        es: "Enorme pinnípedo de gélidas aguas costeras cubiertas de hielo, que supera 1,5 toneladas de peso, con piel canela gruesa y muy arrugada.",
        it: "Imponente pinnipede di gelidi mari costieri coperti di ghiaccio, pesante fino a 1,5 tonnellate con spessa pelle rugosa.",
      },
      {
        en: "Both sexes possess elongated upper canine tusks reaching up to 1 meter in length, used for hauling out onto ice floes, display, and breaking breathing holes.",
        es: "Machos y hembras lucen largos colmillos superiores de hasta 1 m que usan para izarse al hielo, exhibición y abrir respiraderos.",
        it: "Entrambi i sessi possiedono zanne superiori lunghe fino a 1 metro per issarsi sul ghiaccio e per difesa.",
      },
    ],
    image: {
      url: "/images/species/walrus.jpg",
      photographer: "Joel Garlich-Miller / USFWS",
      license: "Public Domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Pacific_Walrus_-_Bull_(8247646168).jpg",
      alt: "Walrus on ice floe",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: 63.0, maxLat: 85.0, includeOcean: true }],
  },

  // 30. Narwhal
  {
    id: "narwhal",
    commonName: { en: "Narwhal", es: "Narval", it: "Narvalo" },
    scientificName: "Monodon monoceros",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Monodontidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "~170,000 individuals",
    populationHistory: [
      { year: 1990, estimate: 80000 },
      { year: 2008, estimate: 120000 },
      { year: 2024, estimate: 170000 },
    ],
    climateVulnerability: {
      en: "Rapid shifts in Arctic freeze-up dates trap pods in small ice entrapments (sassats) and increase killer whale predation.",
      es: "Cambios en las fechas de congelación marina atrapan grupos en el hielo e incrementan ataques de orcas.",
      it: "I cambiamenti nei cicli di gelo provocano intrappolamenti nei ghiacci e aumentano la predazione da orche.",
    },
    keyThreats: [
      {
        threat: "Noise pollution & industrial shipping",
        impact: "medium",
        description: {
          en: "Seismic surveys and opening of northwest maritime routes causing acoustic disruption.",
          es: "Prospecciones sísmicas y nuevas rutas navieras que alteran su comunicación acústica.",
          it: "Inquinamento acustico da prospezioni sismiche e traffico navale.",
        },
      },
    ],
    diet: {
      en: "Deep benthic diver: Greenland halibut, polar cod, cuttlefish, and Arctic squid.",
      es: "Buceador profundo: fletán negro, bacalao polar, sepias y calamares árticos.",
      it: "Pesci e cefalopodi d'alta profondità: ippoglosso di Groenlandia e merluzzo polare.",
    },
    clues: [
      {
        en: "Medium-sized toothed whale that lives year-round beneath sea ice, lacking a dorsal fin so it can maneuver easily beneath dense pack ice.",
        es: "Cetáceo odontoceto de tamaño medio que vive todo el año bajo el hielo marino, carente de aleta dorsal para nadar bajo la banquisa.",
        it: "Cetaceo odontoceto di taglia media che vive tutto l'anno sotto il ghiaccio marino, privo di pinna dorsale per muoversi agevolmente sotto i lastroni di ghiaccio.",
      },
      {
        en: "Males possess a helical, counter-clockwise spiraled elongated left canine tooth projecting up to 3 meters like a sensory ivory tusk.",
        es: "Los machos desarrollan un colmillo superior izquierdo helicoidal de hasta 3 m con millones de terminaciones nerviosas sensoriales.",
        it: "I maschi possiedono una zanna spirale lunga fino a 3 metri ricca di terminazioni sensoriali.",
      },
    ],
    image: {
      url: "/images/species/narwhal.jpg",
      photographer: "Dr. Kristin Laidre / NOAA",
      license: "Public Domain / NOAA",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Pod_Monodon_monoceros.jpg",
      alt: "Narwhals breaching in icy waters",
    },
    rangeConfig: [{ minLon: -100.0, maxLon: 60.0, minLat: 68.0, maxLat: 85.0, includeOcean: true }],
  },

  // 31. European Bison
  {
    id: "european-bison",
    commonName: { en: "European Bison (Wisent)", es: "Bisonte Europeo", it: "Bisonte Europeo" },
    scientificName: "Bison bonasus",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Bovidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "NT",
    populationTrend: "increasing",
    populationEstimate: "~9,700 – 9,800 wild individuals (2024 status)",
    populationHistory: [
      { year: 1927, estimate: 0, label: "Extinct in the wild; survived in 54 zoo founders" },
      { year: 1952, estimate: 38, label: "First reintroduction into Białowieża Forest" },
      { year: 2000, estimate: 2800 },
      { year: 2024, estimate: 9762 },
    ],
    climateVulnerability: {
      en: "Warm winters reduce snowpack insulation and disrupt winter foraging of bark and canopy shoots.",
      es: "Inviernos más cálidos alteran los patrones de ramoneo de cortezas y brotes invernales.",
      it: "Inverni miti alterano il foraggiamento nei boschi decidui misti.",
    },
    keyThreats: [
      {
        threat: "Low genetic diversity & disease",
        impact: "high",
        description: {
          en: "Extreme genetic bottleneck descended from just 12 founding individuals, leaving susceptibility to balanoposthitis.",
          es: "Cuello de botella extremo derivado de solo 12 ejemplares fundadores, con alta vulnerabilidad a patologías.",
          it: "Elevata consanguineità dovuta alla discendenza da soli 12 esemplari fondatori.",
        },
      },
    ],
    diet: {
      en: "Herbivore grazer and browser: Grasses, sedges, oak acorns, hazel, hornbeam bark, and willow twigs.",
      es: "Herbívoro mixto: gramíneas, bellotas de roble, cortezas de carpe y brotes de sauce.",
      it: "Erbivoro: graminacee, ghiande di quercia e cortecce di nocciolo e carpino.",
    },
    clues: [
      {
        en: "The heaviest surviving wild land mammal in its temperate forest range, roaming primeval mixed deciduous broadleaf and conifer woodlands.",
        es: "El mamífero terrestre autóctono más pesado de su área de bosque templado, habitando bosques primarios mixtos.",
        it: "Il più pesante mammifero terrestre vivente della sua area di bosco temperato, tipico delle foreste primarie miste.",
      },
      {
        en: "Compared to its closely related bovine cousin, it possesses longer legs, a less sloping hindquarter profile, and feeds more extensively by browsing woody vegetation.",
        es: "A diferencia de su primo bovino más cercano, tiene patas más largas, cuartos traseros menos inclinados y ramonea más árboles.",
        it: "Ha zampe più lunghe e profilo meno spiovente rispetto al suo cugino bovino più prossimo, e bruca più cortecce e rami.",
      },
    ],
    image: {
      url: "/images/species/european-bison.jpg",
      photographer: "Michael Gäbler",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bison_bonasus_bonasus.jpg",
      alt: "European bison in forest clearing",
    },
    rangeConfig: [{ minLon: 19.0, maxLon: 32.0, minLat: 48.0, maxLat: 56.0 }],
  },

  // 32. American Bison
  {
    id: "american-bison",
    commonName: { en: "American Bison", es: "Bisonte Americano", it: "Bisonte Americano" },
    scientificName: "Bison bison",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Bovidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "NT",
    populationTrend: "stable",
    populationEstimate: "~31,000 wild conservation herds (~400,000 commercial)",
    populationHistory: [
      { year: 1800, estimate: 40000000 },
      { year: 1889, estimate: 541, label: "Near extinction from commercial slaughter" },
      { year: 2000, estimate: 25000 },
      { year: 2024, estimate: 31000 },
    ],
    climateVulnerability: {
      en: "Severe prairie droughts reduce forage nutritional biomass and seasonal watering hole persistence across the Great Plains.",
      es: "Sequías severas en las grandes llanuras reducen biomasa nutritiva y abrevaderos estacionales.",
      it: "Gravi siccità nelle grandi praterie riducono la disponibilità di pascolo nutriente.",
    },
    keyThreats: [
      {
        threat: "Cattle hybridization & boundary culling",
        impact: "medium",
        description: {
          en: "Introgression of domestic cattle genes and lethal culling outside national park borders over brucellosis concerns.",
          es: "Hibridación con ganado vacuno y sacrificios fuera de parques por temor a la brucelosis.",
          it: "Ibridazione con bovini domestici e abbattimenti ai confini dei parchi per la brucellosi.",
        },
      },
    ],
    diet: {
      en: "Strict grazer: Native C3 and C4 prairie grasses, sedges, and forbs.",
      es: "Pastador estricto: gramíneas autóctonas de pradera y ciperáceas.",
      it: "Pascolatore specializzato in graminacee della prateria.",
    },
    clues: [
      {
        en: "Massive bovine megafauna characterized by a pronounced shoulder hump, shaggy dark brown winter cape, and bearded chin.",
        es: "Imponente bóvido salvaje caracterizado por una marcada joroba dorsal, espeso manto invernal y barba bajo el mentón.",
        it: "Grande bovide selvatico con una gobba dorsale prominente e folta pelliccia sul treno anteriore.",
      },
      {
        en: "Creates circular prairie depressions (wallows) by vigorously rolling in dust and mud to shed fur and deter biting insects.",
        es: "Crea depresiones circulares en la pradera (revolcaderos) al revolcarse en tierra para mudar pelo y protegerse de insectos.",
        it: "Scava caratteristiche buche nel terreno rotolandosi nella polvere per liberarsi dai parassiti.",
      },
    ],
    image: {
      url: "/images/species/american-bison.jpg",
      photographer: "Jack Dykinga / USDA",
      license: "Public Domain / USDA",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:American_bison_k5680-1.jpg",
      alt: "American bison standing in prairie",
    },
    rangeConfig: [{ minLon: -120.0, maxLon: -95.0, minLat: 35.0, maxLat: 60.0 }],
  },

  // 33. Sloth Bear
  {
    id: "sloth-bear",
    commonName: { en: "Sloth Bear", es: "Oso Perezoso / Oso Bezudo", it: "Orso Labiato" },
    scientificName: "Melursus ursinus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Ursidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~10,000 – 20,000 individuals",
    populationHistory: [
      { year: 1990, estimate: 25000 },
      { year: 2008, estimate: 18000 },
      { year: 2024, estimate: 14000 },
    ],
    climateVulnerability: {
      en: "Seasonal drying of tropical scrub and deciduous forests triggers severe summer fruit scarcity and conflicts at village water boreholes.",
      es: "La desecación de bosques tropicales secos agrava la escasez de frutos y genera conflictos en abrevaderos.",
      it: "La siccità estiva riduce la disponibilità di frutti selvatici e aumenta i conflitti con l'uomo.",
    },
    keyThreats: [
      {
        threat: "Human-bear conflict & habitat loss",
        impact: "high",
        description: {
          en: "Defensive attacks on forest resource gatherers and agricultural encroachment around scrub reserves.",
          es: "Ataques defensivos a recolectores forestales y pérdida de matorral seco por cultivos.",
          it: "Conflitti con le popolazioni rurali durante la raccolta di prodotti del bosco.",
        },
      },
    ],
    diet: {
      en: "Myrmecophage: Termites, ants, supplemented seasonally by mahua flowers, wood apples, and wild mangoes.",
      es: "Mirmecófago: termitas y hormigas, complementado con flores de mahua, mangos y frutos caídos.",
      it: "Mirmecofago: termiti, formiche, integrati stagionalmente con fiori e frutti selvatici.",
    },
    clues: [
      {
        en: "Nocturnal, shaggy black bear specialized in feeding on colonial subterranean termites and social insects.",
        es: "Oso nocturno de pelaje negro desgreñado especializado en alimentarse de termitas y hormigas coloniales.",
        it: "Orso notturno dal pelo nero arruffato, specializzato nel nutrirsi di termiti coloniali.",
      },
      {
        en: "Lacks upper middle incisors and features flexible protruding lips and nostrils that seal shut to vacuum-suck termites out of rock mounds.",
        es: "Carece de incisivos superiores centrales y posee labios elásticos protáctiles para succionar termitas como una aspiradora.",
        it: "Privo degli incisivi superiori centrali, usa labbra mobili per risucchiare termiti con forza.",
      },
    ],
    image: {
      url: "/images/species/sloth-bear.jpg",
      photographer: "Samadkottur",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Indian_Sloth_Bear.jpg",
      alt: "Sloth bear at Daroji Sloth Bear Sanctuary",
    },
    rangeConfig: [{ minLon: 69.0, maxLon: 88.0, minLat: 6.0, maxLat: 30.0 }],
  },

  // 34. Spectacled Bear
  {
    id: "spectacled-bear",
    commonName: { en: "Spectacled Bear (Andean Bear)", es: "Oso Andino / Oso de Anteojos", it: "Orso Andino" },
    scientificName: "Tremarctos ornatus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Ursidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~2,500 – 10,000 mature individuals (IUCN range)",
    populationHistory: [
      { year: 1995, estimate: 18000 },
      { year: 2008, estimate: 12000 },
      { year: 2024, estimate: 8500 },
    ],
    climateVulnerability: {
      en: "Warming shifts paramo grasslands and high cloud forest biomes upward, fragmenting narrow Andean corridor passes.",
      es: "El calentamiento desplaza los páramos andinos y bosques de niebla hacia cotas altas más fragmentadas.",
      it: "Il riscaldamento sposta verso l'alto i páramos e le foreste nebulose andine.",
    },
    keyThreats: [
      {
        threat: "Agricultural expansion & retaliatory killing",
        impact: "high",
        description: {
          en: "Clearing of cloud forest for cattle grazing and retaliatory killing over alleged livestock predation.",
          es: "Tala de bosque nublado para pastos y caza en represalia por ataques al ganado.",
          it: "Deforestazione per pascoli e uccisioni per ritorsione da parte degli allevatori.",
        },
      },
    ],
    diet: {
      en: "Largely herbivorous: Bromeliad hearts, palm nuts, frailejones (Espeletia), bamboo shoots, and berries.",
      es: "Principalmente herbívoro: corazones de bromelias, frutos de palmas, frailejones y brotes de bambú.",
      it: "Prevalentemente vegetariano: cuori di bromelie, frutti di palma e germogli di bambù.",
    },
    clues: [
      {
        en: "The only surviving native bear species adapted to high-altitude cloud forests and páramo shrublands, having evolved for millions of years in isolation from every other living bear lineage.",
        es: "La única especie de oso autóctona adaptada a bosques nublados de montaña y páramos de gran altitud, tras millones de años de aislamiento evolutivo del resto de los úrsidos.",
        it: "L'unica specie di orso vivente adattata a foreste nebulose di montagna e páramo d'alta quota, evolutasi per milioni di anni isolata da ogni altro lignaggio di orsi.",
      },
      {
        en: "Features distinctive yellowish or creamy-white facial markings ringing the eyes and muzzle, and builds platform feeding nests high in trees.",
        es: "Presenta anillos amarillentos o blanquecinos alrededor de los ojos y el hocico, y construye plataformas en las copas de los árboles.",
        it: "Mostra anelli chiari attorno agli occhi simili a occhiali e costruisce piattaforme sugli alberi per nutrirsi.",
      },
    ],
    image: {
      url: "/images/species/spectacled-bear.jpg",
      photographer: "Kuribo",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Spectacled_Bear_Tennoji_2.jpg",
      alt: "Spectacled bear in cloud forest vegetation",
    },
    rangeConfig: [{ minLon: -80.0, maxLon: -65.0, minLat: -20.0, maxLat: 11.0 }],
  },

  // 35. Gray Wolf
  {
    id: "gray-wolf",
    commonName: { en: "Gray Wolf", es: "Lobo Gris", it: "Lupo Grigio" },
    scientificName: "Canis lupus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Canidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "~250,000 – 300,000 individuals globally",
    populationHistory: [
      { year: 1970, estimate: 150000 },
      { year: 2000, estimate: 220000 },
      { year: 2024, estimate: 280000 },
    ],
    climateVulnerability: {
      en: "Shifts in winter snowpack depth affect ungulate vulnerability and hunting energetic efficiency.",
      es: "Cambios en el espesor del manto de nieve afectan la vulnerabilidad de sus presas unguladas.",
      it: "Variazioni nel manto nevoso invernale influenzano l'efficienza predatoria sugli ungulati.",
    },
    keyThreats: [
      {
        threat: "Human-carnivore conflict",
        impact: "medium",
        description: {
          en: "Lethal control and poaching driven by livestock depredation controversies.",
          es: "Control cinegético y furtivismo motivados por conflictos con la ganadería extensiva.",
          it: "Bracconaggio e abbattimenti legati a predazioni di bestiame.",
        },
      },
    ],
    diet: {
      en: "Apex pack predator: Elk, deer, moose, wild boar, roe deer, and caribou.",
      es: "Superdepredador social: ciervo común, corzo, jabalí, alce y reno.",
      it: "Predatore sociale: cervi, caprioli, cinghiali e alci.",
    },
    clues: [
      {
        en: "Highly social pack-hunting apex canid roaming boreal forests, taiga, tundra, and temperate scrublands wherever cold-adapted ungulate herds roam.",
        es: "Cánido superdepredador de caza en manada organizada, distribuido por taiga, tundra y bosques templados fríos, allí donde abundan grandes manadas de ungulados.",
        it: "Canide sociale che caccia in branco organizzato, diffuso in foreste boreali, tundra e montagne.",
      },
      {
        en: "Communicates across vast territorial distances using harmonized acoustic howling choruses and complex body posture hierarchies.",
        es: "Se comunica a kilómetros de distancia mediante aullidos corales armonizados y jerarquías posturales complejas.",
        it: "Comunica a grandi distanze tramite ululati corali e complesse gerarchie sociali nel branco.",
      },
    ],
    image: {
      url: "/images/species/gray-wolf.jpg",
      photographer: "Tracy Brooks / USFWS",
      license: "Public Domain / USFWS",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Canis_lupus_standing_in_snow.jpg",
      alt: "Gray wolf standing in snow",
    },
    rangeConfig: [
      { minLon: -170.0, maxLon: -55.0, minLat: 40.0, maxLat: 80.0 },
      { minLon: -10.0, maxLon: 175.0, minLat: 35.0, maxLat: 75.0 },
    ],
  },

  // 62. Wild Yak
  {
    id: "wild-yak",
    commonName: { en: "Wild Yak", es: "Yak Salvaje", it: "Yak Selvatico" },
    scientificName: "Bos mutus",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Bovidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~7,000 – 10,000 mature individuals",
    populationHistory: [
      { year: 2008, estimate: 10000, label: "IUCN assessment (no more than 10,000 mature individuals)" },
      { year: 2020, estimate: 8500, label: "Current IUCN range midpoint (~7,000–10,000, decreasing)" },
    ],
    climateVulnerability: {
      en: "Thawing permafrost degrades high-altitude alpine steppe sedges and creates unstable marshlands.",
      es: "La descongelación del permafrost degrada las praderas esteparias alpinas y los humedales de altura.",
      it: "Il disgelo del permafrost degrada i pascoli d'alta quota dell'altopiano.",
    },
    keyThreats: [
      {
        threat: "Hybridization with domestic yaks & pastoral conflict",
        impact: "medium",
        description: {
          en: "Genetic introgression from free-ranging domestic yaks and competition for high pastures.",
          es: "Hibridación genética con yaks domésticos y competencia por pastos de altura.",
          it: "Ibridazione genetica con yak domestici e competizione con le greggi dei pastori.",
        },
      },
    ],
    diet: {
      en: "Herbivore: Alpine sedges (Kobresia), grasses, forbs, mosses, and lichens.",
      es: "Herbívoro: ciperáceas alpinas (Kobresia), pastos esteparios y líquenes.",
      it: "Erbivoro: erbe alpine, muschi e licheni d'alta quota.",
    },
    clues: [
      {
        en: "Massive bovine megafauna uniquely adapted to survive extreme hypoxia and temperatures below -40°C on desolate alpine plateaus between 4,000 and 6,000 meters altitude.",
        es: "Masivo bóvido salvaje adaptado a sobrevivir a hipoxia extrema y -40°C en mesetas alpinas desérticas entre 4.000 y 6.000 metros de altitud.",
        it: "Imponente bovide selvatico adattato a resistere a grave ipossia e a -40°C su altopiani freddi tra 4.000 e 6.000 metri.",
      },
      {
        en: "Possesses lungs and a heart three times larger than lowland cattle, un-lobed hemoglobin that absorbs oxygen with extreme affinity, and a dense skirt of shaggy black fleece hanging to its hooves.",
        es: "Posee pulmones y corazón tres veces mayores que el ganado de llanura, hemoglobina hiperafín al oxígeno y un manto de lana que casi roza el suelo.",
        it: "Ha polmoni e cuore tre volte più grandi dei bovini di pianura, emoglobina speciale per l'ossigeno e una folta 'gonna' di pelo lungo fino agli zoccoli.",
      },
    ],
    image: {
      url: "/images/species/wild-yak.jpg",
      photographer: "Drashokk",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Wild_Yak_at_Eaglenest_sanctuary.jpg",
      alt: "Wild yak on high alpine plateau",
    },
    rangeConfig: [{ minLon: 78.0, maxLon: 102.0, minLat: 31.0, maxLat: 39.0 }],
  },

  // 63. Dugong
  {
    id: "dugong",
    commonName: { en: "Dugong", es: "Dugongo", it: "Dugongo" },
    scientificName: "Dugong dugon",
    taxonClass: "Mammalia",
    order: "Sirenia",
    family: "Dugongidae",
    realm: "Coastal",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "Precise global total unknown; subpopulations range from tens of thousands in the largest coastal strongholds to fewer than 250 mature individuals in the most depleted remnants",
    populationHistory: [
      { year: 1962, estimate: 72000, label: "Reconstructed count along the urban Queensland coast (shark-net bycatch & aerial survey data)" },
      { year: 1996, estimate: 4220, label: "Same urban Queensland coastal stretch, after steep decline to under 6% of the 1962 count" },
    ],
    climateVulnerability: {
      en: "Marine heatwaves can collapse entire seagrass meadows within weeks, forcing mass emigration and starvation; a single 2011 heatwave event triggered years of depressed birth rates in a major surveyed population.",
      es: "Las olas de calor marinas pueden colapsar praderas de fanerógamas marinas enteras en semanas, forzando migraciones masivas e inanición; un evento de calor extremo en 2011 provocó años de tasas de natalidad reducidas en una población estudiada.",
      it: "Le ondate di calore marine possono far collassare intere praterie di fanerogame marine in poche settimane, causando migrazioni di massa e carestia; un'ondata di calore nel 2011 ha causato anni di natalità ridotta in una popolazione monitorata.",
    },
    keyThreats: [
      {
        threat: "Bycatch entanglement",
        impact: "high",
        description: {
          en: "Fatal entanglement in gillnets and shark-control nets is the leading direct cause of death across most of its range.",
          es: "El enmalle mortal en redes de pesca y redes de control de tiburones es la principal causa directa de muerte en la mayor parte de su área de distribución.",
          it: "L'intrappolamento fatale nelle reti da pesca e nelle reti anti-squalo è la principale causa diretta di morte.",
        },
      },
      {
        threat: "Seagrass habitat loss",
        impact: "high",
        description: {
          en: "Coastal development, dredging, and sediment runoff smother the shallow seagrass meadows it depends on entirely for food.",
          es: "El desarrollo costero, el dragado y la escorrentía de sedimentos asfixian las praderas marinas someras de las que depende por completo para alimentarse.",
          it: "Lo sviluppo costiero, il dragaggio e i sedimenti soffocano le praterie sommerse da cui dipende interamente per il nutrimento.",
        },
      },
    ],
    diet: {
      en: "Strict seagrass specialist: crops soft, nutrient-rich shoots and rhizomes of Halophila and Halodule species almost exclusively.",
      es: "Especialista estricto en fanerógamas marinas: se alimenta casi exclusivamente de brotes y rizomas blandos y ricos en nutrientes de los géneros Halophila y Halodule.",
      it: "Specialista assoluto delle fanerogame marine: si nutre quasi esclusivamente di germogli e rizomi teneri e ricchi di nutrienti dei generi Halophila e Halodule.",
    },
    clues: [
      {
        en: "Large marine herbivore with a fluked, dolphin-like tail and a sharply downturned, bristle-lined snout that plows through soft seafloor sediment, leaving long serpentine feeding trails behind.",
        es: "Gran herbívoro marino con una cola bifurcada similar a la de un delfín y un hocico muy curvado hacia abajo bordeado de cerdas, que ara el sedimento blando del fondo dejando largos rastros de alimentación serpenteantes.",
        it: "Grande erbivoro marino con una coda bilobata simile a quella dei delfini e un muso fortemente ricurvo verso il basso bordato di setole, che ara il sedimento morbido del fondale lasciando lunghe tracce di alimentazione serpeggianti.",
      },
      {
        en: "Grazes so precisely and repeatedly on the same shoots that its feeding stimulates faster regrowth of its preferred, most nutritious plants, gardening the very meadows it depends on.",
        es: "Pace de forma tan precisa y repetida sobre los mismos brotes que su alimentación estimula un rebrote más rápido de las plantas más nutritivas que prefiere, cultivando así las mismas praderas de las que depende.",
        it: "Bruca in modo così preciso e ripetuto sugli stessi germogli che la sua alimentazione stimola una ricrescita più rapida delle piante più nutrienti che preferisce, coltivando di fatto le praterie da cui dipende.",
      },
      {
        en: "Confined to warm, current-sheltered shallow bays and lagoons where sunlight reaches dense meadows on the seafloor, rarely straying far from these food-rich shallows despite living entirely at sea.",
        es: "Confinado a bahías y lagunas cálidas, someras y resguardadas de corrientes donde la luz solar alcanza densas praderas en el fondo marino, rara vez se aleja de estas aguas someras ricas en alimento pese a vivir enteramente en el mar.",
        it: "Confinato in baie e lagune calde, poco profonde e riparate dalle correnti dove la luce solare raggiunge dense praterie sul fondale, si allontana raramente da queste acque basse ricche di cibo pur vivendo interamente in mare.",
      },
    ],
    image: {
      url: "/images/species/dugong.jpg",
      photographer: "Jerome Paillet (IFREMER)",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dugong_(Dugong_dugon)_(Ifremer_00617-72913).jpg",
      alt: "Dugong grazing on seagrass over a sandy seafloor",
    },
    rangeConfig: [{ minLon: 30.0, maxLon: 179.0, minLat: -26.0, maxLat: 30.0, includeOcean: true }],
  },

  // 64. Maned Wolf
  {
    id: "maned-wolf",
    commonName: { en: "Maned Wolf", es: "Lobo de Crin", it: "Lupo dalla Criniera" },
    scientificName: "Chrysocyon brachyurus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Canidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate: "~17,000 mature individuals (over 90% within a single country)",
    populationHistory: [
      { year: 2005, estimate: 23600, label: "Population and Habitat Viability Assessment: total population estimate" },
      { year: 2016, estimate: 17000, label: "IUCN Red List reassessment: mature individuals only" },
    ],
    climateVulnerability: {
      en: "Ongoing conversion of its tall-grassland habitat to agriculture and pasture is projected to compound with drought stress, with population-viability models showing metapopulation declines of up to several tens of percent over coming decades under continued habitat loss.",
      es: "La conversión continua de su hábitat de pastizales altos a agricultura y pastoreo se suma al estrés hídrico, y los modelos de viabilidad poblacional muestran caídas de metapoblación de hasta varias decenas de puntos porcentuales en las próximas décadas si la pérdida de hábitat continúa.",
      it: "La continua conversione del suo habitat di prateria alta in terreni agricoli e pascoli si somma allo stress da siccità, e i modelli di viabilità di popolazione mostrano cali di metapopolazione fino a diverse decine di punti percentuali nei prossimi decenni se la perdita di habitat continua.",
    },
    keyThreats: [
      {
        threat: "Grassland conversion",
        impact: "high",
        description: {
          en: "Large-scale conversion of open grassland habitat to cropland and cattle pasture fragments territories and reduces prey availability.",
          es: "La conversión a gran escala de pastizales abiertos en tierras de cultivo y pastos para ganado fragmenta los territorios y reduce la disponibilidad de presas.",
          it: "La conversione su larga scala degli habitat di prateria aperta in campi coltivati e pascoli frammenta i territori e riduce la disponibilità di prede.",
        },
      },
      {
        threat: "Vehicle collisions",
        impact: "medium",
        description: {
          en: "Roads bisecting its range cause frequent fatal collisions as individuals cross between fragmented habitat patches.",
          es: "Las carreteras que atraviesan su área de distribución causan frecuentes colisiones mortales al cruzar entre parches de hábitat fragmentado.",
          it: "Le strade che attraversano il suo areale causano frequenti collisioni mortali durante gli spostamenti tra le porzioni di habitat frammentato.",
        },
      },
    ],
    diet: {
      en: "Omnivorous generalist: a single tomato-like fruit makes up nearly half its diet by volume, supplemented with small mammals, ground-nesting birds, insects, and other fruit.",
      es: "Omnívoro generalista: un fruto parecido a un tomate constituye casi la mitad de su dieta en volumen, complementada con pequeños mamíferos, aves que nidifican en el suelo, insectos y otras frutas.",
      it: "Onnivoro generalista: un frutto simile a un pomodoro costituisce quasi la metà della sua dieta in volume, integrata da piccoli mammiferi, uccelli nidificanti a terra, insetti e altra frutta.",
    },
    clues: [
      {
        en: "Exceptionally long-legged canid, the tallest of all living wild dog species relative to its slender body, letting it scan over dense, chest-high grasses while stalking alone at dusk.",
        es: "Cánido de patas extraordinariamente largas, el más alto de todas las especies de cánidos silvestres vivos en relación con su cuerpo esbelto, lo que le permite otear por encima de densos pastizales tan altos como su pecho mientras acecha solo al atardecer.",
        it: "Canide dalle zampe eccezionalmente lunghe, il più alto tra tutti i canidi selvatici viventi in rapporto al corpo snello, che gli permette di scrutare al di sopra di erbe dense alte quanto il suo petto mentre caccia da solo al crepuscolo.",
      },
      {
        en: "Marks territory with urine carrying a pungent compound so distinctive it is nicknamed for its skunk-like odor, and buries fruit pits in latrine piles that later sprout into new plants far from the parent.",
        es: "Marca su territorio con orina que contiene un compuesto tan penetrante que le vale el apodo de 'lobo zorrino' por su olor, y entierra semillas de fruta en montones de letrina que luego germinan en nuevas plantas lejos de la planta madre.",
        it: "Marca il territorio con urina contenente un composto così pungente da valergli il soprannome di 'lupo puzzola' per il suo odore, e seppellisce semi di frutta in cumuli di latrina che poi germogliano in nuove piante lontano dalla pianta madre.",
      },
    ],
    image: {
      url: "/images/species/maned-wolf.jpg",
      photographer: "Max Raffi",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Lobo-guar%C3%A1-PARNA_da_Chapada_dos_Veadeiros-Max_Raffi(001).jpg",
      alt: "Maned wolf standing in tall grassland",
    },
    rangeConfig: [{ minLon: -65.0, maxLon: -40.0, minLat: -34.0, maxLat: -6.0 }],
  },

  // 65. Musk Ox
  {
    id: "musk-ox",
    commonName: { en: "Musk Ox", es: "Buey Almizclero", it: "Bue Muschiato" },
    scientificName: "Ovibos moschatus",
    taxonClass: "Mammalia",
    order: "Artiodactyla",
    family: "Bovidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate: "~170,000 individuals globally (2019 estimate); IUCN-assessed at roughly 134,000 mature individuals",
    populationHistory: [
      { year: 1920, estimate: 0, label: "Extirpated from Alaska by overhunting" },
      { year: 1936, estimate: 31, label: "Reintroduced to Nunivak Island, Alaska, from wild-caught Greenland founder stock" },
      { year: 2019, estimate: 170000, label: "Global abundance estimate (Cuyler et al., Ambio)" },
    ],
    climateVulnerability: {
      en: "Warming winters increase rain-on-snow events that refreeze into thick ice layers sealing off ground forage, triggering mass starvation die-offs in affected herds.",
      es: "Los inviernos más cálidos aumentan los episodios de lluvia sobre nieve que se congelan en gruesas capas de hielo que sellan el forraje del suelo, provocando muertes masivas por inanición en los rebaños afectados.",
      it: "Gli inverni più caldi aumentano gli episodi di pioggia sulla neve che rigela in spesse lastre di ghiaccio, sigillando il foraggio al suolo e causando morie di massa per fame nelle mandrie colpite.",
    },
    keyThreats: [
      {
        threat: "Rain-on-snow icing events",
        impact: "medium",
        description: {
          en: "Ice-sealed forage during winter can cause localized mass mortality even as the global population trend remains positive.",
          es: "El forraje sellado por hielo en invierno puede causar mortalidad masiva localizada incluso mientras la tendencia poblacional global sigue siendo positiva.",
          it: "Il foraggio sigillato dal ghiaccio in inverno può causare mortalità di massa localizzata anche mentre la tendenza globale della popolazione resta positiva.",
        },
      },
      {
        threat: "Historical overhunting legacy",
        impact: "low",
        description: {
          en: "Regulated subsistence and trophy hunting continues at sustainable levels following near-total historical extirpation across parts of its range.",
          es: "La caza de subsistencia y trofeos, regulada, continúa a niveles sostenibles tras la extirpación histórica casi total en partes de su área de distribución.",
          it: "La caccia di sussistenza e la caccia regolamentata continuano a livelli sostenibili dopo l'estirpazione storica quasi totale in parte del suo areale.",
        },
      },
    ],
    diet: {
      en: "Herbivorous grazer-browser: grasses, sedges, and forbs in summer, switching to woody willow twigs and lichens when snow covers other forage.",
      es: "Herbívoro pastador-ramoneador: gramíneas, ciperáceas y hierbas en verano, cambiando a ramitas leñosas de sauce y líquenes cuando la nieve cubre otro forraje.",
      it: "Erbivoro pascolatore-brucatore: graminacee, ciperacee ed erbe in estate, passando a rametti legnosi di salice e licheni quando la neve copre l'altro foraggio.",
    },
    clues: [
      {
        en: "When threatened, adults form a tight stationary ring or semicircle facing outward around their calves, standing their ground rather than fleeing across open terrain.",
        es: "Cuando se sienten amenazados, los adultos forman un anillo o semicírculo compacto e inmóvil orientado hacia afuera alrededor de sus crías, plantando cara en lugar de huir por terreno abierto.",
        it: "Quando minacciati, gli adulti formano un anello o semicerchio compatto e immobile rivolto verso l'esterno attorno ai piccoli, tenendo testa invece di fuggire su terreno aperto.",
      },
      {
        en: "Insulated by an extraordinarily fine, dense underwool combed out rather than sheared, prized as roughly eight times warmer by weight than sheep's wool, worn beneath a heavy skirt of guard hair reaching nearly to the ground.",
        es: "Aislado por un subpelo extraordinariamente fino y denso que se peina en lugar de esquilarse, valorado por ser hasta ocho veces más cálido en peso que la lana de oveja, bajo una pesada capa de pelos de guarda que casi roza el suelo.",
        it: "Isolato da un sottopelo straordinariamente fine e denso che viene pettinato anziché tosato, apprezzato perché fino a otto volte più caldo a parità di peso rispetto alla lana di pecora, sotto una pesante 'gonna' di pelo di guardia che sfiora quasi il suolo.",
      },
      {
        en: "Rival males clash foreheads reinforced by a fused bony boss in ritualized combat, while selectively cooling blood flow to the lower legs to conserve core body heat during extreme cold.",
        es: "Los machos rivales chocan sus frentes reforzadas por una placa ósea fusionada en combates ritualizados, mientras enfrían selectivamente el flujo sanguíneo hacia las patas inferiores para conservar el calor corporal en el frío extremo.",
        it: "I maschi rivali si scontrano frontalmente con una placca ossea fusa in combattimenti rituali, raffreddando selettivamente il flusso sanguigno verso le zampe inferiori per conservare il calore corporeo nel freddo estremo.",
      },
    ],
    image: {
      url: "/images/species/musk-ox.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Muskox_(Ovibos_moschatus)_male_Dovrefjell_8.jpg",
      alt: "Musk ox grazing beside a river",
    },
    rangeConfig: [
      { minLon: -170.0, maxLon: -50.0, minLat: 58.0, maxLat: 83.0 },
      { minLon: -25.0, maxLon: -15.0, minLat: 76.0, maxLat: 83.5 },
    ],
  },

  // 66. Aye-aye
  {
    id: "aye-aye",
    commonName: { en: "Aye-aye", es: "Aye-aye", it: "Aye-aye" },
    scientificName: "Daubentonia madagascariensis",
    taxonClass: "Mammalia",
    order: "Primates",
    family: "Daubentoniidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "No rangewide census exists; the last published rangewide estimate (1992) put total numbers between 1,000 and 10,000 individuals, with a suspected decline of at least 50% since over roughly three generations",
    populationHistory: [
      { year: 1992, estimate: 1000, label: "IUCN rangewide estimate, lower bound (range: 1,000–10,000; wide uncertainty, no repeat census since)" },
      { year: 1992, estimate: 10000, label: "IUCN rangewide estimate, upper bound (same 1992 assessment)" },
    ],
    climateVulnerability: {
      en: "Ongoing deforestation removes the large, decaying trees this species depends on for both nest cavities and grub-riddled deadwood foraging, with fragmentation compounding as remaining forest patches shrink and dry out.",
      es: "La deforestación continua elimina los árboles grandes y en descomposición de los que depende esta especie tanto para cavidades de anidación como para forrajear madera muerta infestada de larvas, y la fragmentación se agrava a medida que los fragmentos de bosque restantes se reducen y secan.",
      it: "La deforestazione in corso elimina i grandi alberi in decomposizione da cui questa specie dipende sia per le cavità di nidificazione sia per la ricerca di larve nel legno morto, mentre la frammentazione si aggrava con il restringersi e l'inaridirsi dei frammenti di foresta rimasti.",
    },
    keyThreats: [
      {
        threat: "Habitat loss",
        impact: "high",
        description: {
          en: "Slash-and-burn agriculture and logging continue to shrink and fragment the humid forest this species depends on entirely.",
          es: "La agricultura de tala y quema y la explotación forestal siguen reduciendo y fragmentando el bosque húmedo del que esta especie depende por completo.",
          it: "L'agricoltura taglia-e-brucia e il disboscamento continuano a ridurre e frammentare la foresta umida da cui questa specie dipende interamente.",
        },
      },
      {
        threat: "Superstition-driven killing",
        impact: "medium",
        description: {
          en: "Local taboos regard the animal as an omen of death or misfortune, leading to killing on sight despite no evidence it poses any threat to people or crops.",
          es: "Tabúes locales lo consideran un presagio de muerte o desgracia, lo que lleva a matarlo en cuanto se avista, pese a no existir evidencia de que represente ninguna amenaza para las personas o los cultivos.",
          it: "Tabù locali lo considerano un presagio di morte o sventura, portando alla sua uccisione a vista, nonostante non vi sia alcuna prova che rappresenti una minaccia per le persone o le colture.",
        },
      },
    ],
    diet: {
      en: "Omnivorous forager: wood-boring beetle larvae extracted from deadwood, supplemented with large seeds, nectar, fungi, and bird or reptile eggs.",
      es: "Forrajeador omnívoro: larvas de escarabajos xilófagos extraídas de madera muerta, complementadas con semillas grandes, néctar, hongos y huevos de aves o reptiles.",
      it: "Foraggiatore onnivoro: larve di coleotteri xilofagi estratte dal legno morto, integrate da semi grandi, nettare, funghi e uova di uccelli o rettili.",
    },
    clues: [
      {
        en: "Nocturnal primate that taps rapidly along tree bark with a thin, elongated, skeletal middle finger, listening through disproportionately large ears for the hollow echo of wood-boring grub tunnels, then gnaws a hole with perpetually growing incisors and hooks the larvae out with that same finger.",
        es: "Primate nocturno que golpetea rápidamente la corteza de los árboles con un dedo medio delgado, alargado y esquelético, escuchando con orejas desproporcionadamente grandes el eco hueco de los túneles de larvas xilófagas, para luego roer un agujero con incisivos de crecimiento continuo y extraer la larva con ese mismo dedo.",
        it: "Primate notturno che tamburella rapidamente sulla corteccia degli alberi con un dito medio sottile, allungato e scheletrico, ascoltando con orecchie sproporzionatamente grandi l'eco cavo delle gallerie scavate da larve xilofaghe, per poi rosicchiare un foro con incisivi a crescita continua ed estrarre la larva con lo stesso dito.",
      },
      {
        en: "Possesses a bushy tail longer than its own body and enormous, forward-facing eyes with a reflective layer behind the retina, allowing it to forage through the forest canopy in near-total darkness.",
        es: "Posee una cola tupida más larga que su propio cuerpo y ojos enormes orientados hacia adelante con una capa reflectante detrás de la retina, lo que le permite forrajear en el dosel forestal en una oscuridad casi total.",
        it: "Possiede una coda folta più lunga del proprio corpo e occhi enormi rivolti in avanti con uno strato riflettente dietro la retina, che le permette di foraggiare nella volta forestale in un'oscurità quasi totale.",
      },
    ],
    image: {
      url: "/images/species/aye-aye.jpg",
      photographer: "nomis-simon",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Wild_aye_aye.jpg",
      alt: "Wild aye-aye peering from a tree branch at night",
    },
    rangeConfig: [{ minLon: 43.0, maxLon: 50.5, minLat: -25.5, maxLat: -12.0 }],
  },
];
