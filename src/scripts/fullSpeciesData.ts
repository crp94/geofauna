import { Species } from "../types/species";

export type RawSpeciesEntry = Omit<Species, "range"> & {
  rangeConfig: Array<{
    minLon: number;
    maxLon: number;
    minLat: number;
    maxLat: number;
    includeOcean?: boolean;
    filterPolygon?: (lon: number, lat: number) => boolean;
  }>;
};

export const allScholarlySpecies: RawSpeciesEntry[] = [
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
        en: "Solitary ambush hunter specialized on wild lagomorphs, stalking through dense Mediterranean maquis and cork oak savannahs.",
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
      { year: 2024, estimate: 4200 },
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
      photographer: "Bernard Landgraf",
      license: "CC BY-SA 3.0",
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
      { year: 2014, estimate: 1864 },
      { year: 2024, estimate: 1900 },
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
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
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
      { year: 2015, estimate: 26000 },
      { year: 2024, estimate: 25000 },
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
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "~250,000 – 400,000 individuals",
    populationHistory: [
      { year: 1920, estimate: 1000000 },
      { year: 2000, estimate: 500000 },
      { year: 2016, estimate: 330000 },
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
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mountain_Gorilla_(Gorilla_beringei_beringei)_male.jpg",
      alt: "Mountain Gorilla male",
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
      photographer: "Frederic Salein",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cheetah_running.jpg",
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
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tasmanian_Devil_(Sarcophilus_harrisii).jpg",
      alt: "Tasmanian Devil standing on grass",
    },
    rangeConfig: [{ minLon: 144.5, maxLon: 148.5, minLat: -43.8, maxLat: -40.5 }],
  },

  // 11. Monarch Butterfly
  {
    id: "monarch-butterfly",
    commonName: { en: "Monarch Butterfly", es: "Mariposa Monarca", it: "Farfalla Monarca" },
    scientificName: "Danaus plexippus",
    taxonClass: "Insecta",
    order: "Lepidoptera",
    family: "Nymphalidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate: "~Millions (migratory populations)",
    populationHistory: [
      { year: 1995, estimate: 300000000 },
      { year: 2010, estimate: 100000000 },
      { year: 2022, estimate: 50000000, label: "Assessed on IUCN Red List" },
      { year: 2024, estimate: 45000000 },
    ],
    climateVulnerability: {
      en: "Unseasonable winter cold snaps and storms in high-altitude fir microclimates cause severe freezing mortality.",
      es: "Heladas extemporáneas y tormentas en microclimas de bosque de abetos causan alta mortandad.",
      it: "Gelate anomale e tempeste nei boschi montani provocano elevata mortalità invernale.",
    },
    keyThreats: [
      {
        threat: "Herbicide eradication of larval host plants",
        impact: "high",
        description: {
          en: "Agricultural herbicide spraying eliminating milkweed (Asclepias) species along breeding flyways.",
          es: "Uso de herbicidas que erradica el algodoncillo (Asclepias), planta nutricia de sus orugas.",
          it: "Uso di erbicidi che distrugge le piante di asclepiade lungo le rotte riproduttive.",
        },
      },
    ],
    diet: {
      en: "Larvae feed exclusively on toxic milkweed (Asclepias); adults drink floral nectar.",
      es: "Las orugas se alimentan exclusivamente de algodoncillo tóxico; los adultos liban néctar de flores.",
      it: "I bruchi si nutrono solo di asclepiade; gli adulti di nettare floreale.",
    },
    clues: [
      {
        en: "Caterpillars sequester toxic cardenolides (cardiac glycosides) from their host plants, rendering both larvae and bright orange adults unpalatable to birds.",
        es: "Las orugas acumulan cardenólidos tóxicos de sus plantas nutricias, haciendo que orugas y adultos naranjas resulten venenosos para las aves.",
        it: "I bruchi accumulano glicosidi cardioattivi tossici dalle piante nutrici, rendendo adulti e larve sgradevoli ai predatori.",
      },
      {
        en: "Undertakes extraordinary multi-thousand kilometer annual migrations across vast continental flyways using a time-compensated solar compass in its antennae.",
        es: "Emprende una migración anual de miles de kilómetros orientándose con un compás solar con compensación horaria en sus antenas.",
        it: "Compie migrazioni di migliaia di chilometri orientandosi grazie a una bussola solare biologica nelle antenne.",
      },
    ],
    image: {
      url: "/images/species/monarch-butterfly.jpg",
      photographer: "Kenneth Dwain Harrelson",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Monarch_In_May.jpg",
      alt: "Monarch butterfly on a flower",
    },
    rangeConfig: [{ minLon: -125.0, maxLon: -65.0, minLat: 18.0, maxLat: 52.0 }],
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
      photographer: "Koshy Koshy",
      license: "CC BY 2.0",
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
    populationEstimate: "~415,000 individuals",
    populationHistory: [
      { year: 1979, estimate: 1300000 },
      { year: 1995, estimate: 500000 },
      { year: 2016, estimate: 415000 },
      { year: 2024, estimate: 400000 },
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
      license: "GNU FDL / CC BY-SA",
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
      photographer: "Greg Hume",
      license: "CC BY-SA 3.0",
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
      photographer: "John Gould",
      license: "Public Domain / CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Platypus-sketch.jpg",
      alt: "Platypus drawing",
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
      photographer: "Fir0002",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_kangaroo_-_melbourne_zoo.jpg",
      alt: "Red kangaroo resting on arid ground",
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
    populationEstimate: "~10,000 – 15,000 individuals",
    populationHistory: [
      { year: 1995, estimate: 35000 },
      { year: 2008, estimate: 20000 },
      { year: 2013, estimate: 15000 },
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
      photographer: "Trisha M Shears",
      license: "Public Domain / CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Okapia_johnstoni_-Zoo_de_Doue-8a.jpg",
      alt: "Okapi in rainforest foliage",
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
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bornean_orangutan_(Pongo_pygmaeus)_female.jpg",
      alt: "Bornean orangutan in rainforest canopy",
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
    populationTrend: "stable",
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
        en: "Nomadic ungulate of semi-desert Eurasian grasslands with an extraordinarily bulbous, flexible downward-pointing snout (proboscis).",
        es: "Ungulado nómada de estepas y semidesiertos euroasiáticos con un morro bulboso e hinchado orientado hacia abajo.",
        it: "Ungulato nomade delle steppe eurasiatiche con un caratteristico muso bulboso e flessibile rivolto in basso.",
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
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Saiga_tatarica_male.jpg",
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
        en: "Africa's most endangered carnivore, adapted strictly to open Afroalpine ericaceous moorlands above 3,000 meters altitude.",
        es: "El carnívoro más amenazado de África, adaptado estrictamente a páramos afroalpinos por encima de los 3.000 m de altitud.",
        it: "Il carnivoro più minacciato d'Africa, limitato alle brughiere afroalpine sopra i 3.000 metri.",
      },
      {
        en: "Features a slender, elongated fox-like muzzle specialized for excavating giant root-rats from deep subterranean alpine burrows.",
        es: "Presenta un hocico alargado y fino similar al de un zorro, especializado en excavar madrigueras subterráneas de roedores gigantes.",
        it: "Ha un muso sottile e allungato specializzato nello scovare roditori alpini nelle gallerie sotterranee.",
      },
    ],
    image: {
      url: "/images/species/ethiopian-wolf.jpg",
      photographer: "Will Jones",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ethiopian_Wolf_(Canis_simensis).jpg",
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
    populationEstimate: "~2,500 mature individuals",
    populationHistory: [
      { year: 2000, estimate: 5000 },
      { year: 2016, estimate: 2500 },
      { year: 2024, estimate: 2200 },
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
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fossa_(Cryptoprocta_ferox).jpg",
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
    populationEstimate: "Critically low (declined >80% over 2 decades)",
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
      photographer: "Pangolin Specialist Group / IUCN",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sunda_pangolin_(Manis_javanica)_walking.jpg",
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
      photographer: "Fernando Flores",
      license: "CC BY-SA 2.0",
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
      en: "Herbivore: Leaves, shrubs, sedges, succulent succulents, and grasses.",
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
      photographer: "Shannon Verhagen",
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
        en: "Enormous pinniped of circumpolar Arctic shelf seas, weighing up to 1.5 metric tons with thick, heavily wrinkled cinnamon-brown hide.",
        es: "Enorme pinnípedo de aguas árticas someras que supera 1,5 toneladas de peso, con piel canela gruesa y muy arrugada.",
        it: "Imponente pinnipede dei mari artici costieri, pesante fino a 1,5 tonnellate con spessa pelle rugosa.",
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
      license: "Public Domain / USFWS",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Walrus_on_ice.jpg",
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
        en: "Medium-sized toothed whale endemic year-round to Arctic waters, lacking a dorsal fin to maneuver easily beneath dense pack ice.",
        es: "Cetáceo odontoceto de tamaño medio endémico del océano Ártico, carente de aleta dorsal para nadar bajo la banquisa.",
        it: "Cetaceo odontoceto artico privo di pinna dorsale per muoversi agevolmente sotto i lastroni di ghiaccio.",
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
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Narwhals_breaching.jpg",
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
    populationEstimate: "~9,500 individuals (2023 status)",
    populationHistory: [
      { year: 1927, estimate: 0, label: "Extinct in the wild; survived in 54 zoo founders" },
      { year: 1952, estimate: 38, label: "First reintroduction into Białowieża Forest" },
      { year: 2000, estimate: 2800 },
      { year: 2024, estimate: 9500 },
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
        en: "The heaviest surviving wild land mammal in Europe, roaming primeval mixed deciduous broadleaf and conifer woodlands.",
        es: "El mamífero terrestre autóctono más pesado de Europa, habitando bosques primarios mixtos templados.",
        it: "Il più pesante mammifero terrestre europeo vivente, tipico delle foreste primarie miste.",
      },
      {
        en: "Compared to its American relative, it possesses longer legs, a less sloping hindquarter profile, and feeds more extensively by browsing woody vegetation.",
        es: "A diferencia de su pariente americano, tiene patas más largas, cuartos traseros menos inclinados y ramonea más árboles.",
        it: "Ha zampe più lunghe e profilo meno spiovente rispetto al cugino americano, e bruca più cortecce e rami.",
      },
    ],
    image: {
      url: "/images/species/european-bison.jpg",
      photographer: "Michael Gäbler",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Wisent_Bia%C5%82owie%C5%BCa_2.jpg",
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
      photographer: "Kalyanvarma",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sloth_Bear_with_cubs.jpg",
      alt: "Sloth bear mother with cubs",
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
    populationEstimate: "~6,000 – 10,000 mature individuals",
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
        en: "The only surviving native bear species in South America, roaming high montane cloud forests and páramo shrublands.",
        es: "La única especie de oso autóctona que habita en América del Sur, presente en bosques nublados y páramos andinos.",
        it: "L'unica specie di orso vivente originaria del Sud America, abitatrice di foreste nebulose e páramo.",
      },
      {
        en: "Features distinctive yellowish or creamy-white facial markings ringing the eyes and muzzle, and builds platform feeding nests high in trees.",
        es: "Presenta anillos amarillentos o blanquecinos alrededor de los ojos y el hocico, y construye plataformas en las copas de los árboles.",
        it: "Mostra anelli chiari attorno agli occhi simili a occhiali e costruisce piattaforme sugli alberi per nutrirsi.",
      },
    ],
    image: {
      url: "/images/species/spectacled-bear.jpg",
      photographer: "Bjarte Sorensen",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tremarctos_ornatus_19.jpg",
      alt: "Spectacled bear in cloud forest vegetation",
    },
    rangeConfig: [{ minLon: -80.0, maxLon: -65.0, minLat: -20.0, maxLat: 11.0 }],
  },

  // 35. Gray Wolf
  {
    id: "gray-wolf",
    commonName: { en: "Gray Wolf", es: "Lobo Gris / Lobo Ibérico", it: "Lupo Grigio" },
    scientificName: "Canis lupus",
    taxonClass: "Mammalia",
    order: "Carnivora",
    family: "Canidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "increasing",
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
        en: "Highly social pack-hunting apex canid roaming boreal forests, taiga, tundra, and temperate scrublands across the Holarctic.",
        es: "Cánido superdepredador de caza en manada organizada, distribuido por taiga, tundra y bosques templados holárticos.",
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
      photographer: "Gary Kramer / USFWS",
      license: "Public Domain / USFWS",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Canis_lupus_standing_in_snow.jpg",
      alt: "Gray wolf standing in snow",
    },
    rangeConfig: [
      { minLon: -170.0, maxLon: -55.0, minLat: 40.0, maxLat: 80.0 },
      { minLon: -10.0, maxLon: 175.0, minLat: 35.0, maxLat: 75.0 },
    ],
  },

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
    iucnStatus: "NT",
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
        en: "The tallest and heaviest of all living penguin species, breeding exclusively on Antarctic fast ice during the pitch-black polar winter at -50°C.",
        es: "El más alto y pesado de todos los pingüinos vivos, criando exclusivamente sobre el hielo marino antártico en pleno invierno polar a -50°C.",
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
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Emperor_Penguins_in_Antarctica.jpg",
      alt: "Emperor penguins on sea ice",
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
      photographer: "Arturo de Frias Marques",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Andean_condor_(Vultur_gryphus)_male_flapping.jpg",
      alt: "Andean condor soaring",
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
    populationEstimate: "~561 individuals (~347 in the wild)",
    populationHistory: [
      { year: 1987, estimate: 22, label: "All wild survivors taken into captive breeding" },
      { year: 1992, estimate: 63, label: "First captive-reared releases" },
      { year: 2010, estimate: 381 },
      { year: 2024, estimate: 561 },
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
        en: "The largest flying land bird in North America, brought back from the brink of total extinction through rigorous captive breeding after declining to just 22 individuals in 1987.",
        es: "El ave terrestre voladora más grande de Norteamérica, salvada de la extinción total tras quedar reducida a solo 22 individuos en 1987.",
        it: "Il più grande uccello terrestre nordamericano, salvato dall'estinzione grazie all'allevamento in cattività di soli 22 superstiti nel 1987.",
      },
      {
        en: "Features a 3-meter wingspan with conspicuous triangular white patches under the wing linings and a bare orange head in mature adults.",
        es: "Luce 3 metros de envergadura con parches triangulares blancos bajo las alas y cabeza desnuda anaranjada en adultos.",
        it: "Vanta 3 metri di apertura alare con vistose bande bianche sotto le ali e testa nuda arancione.",
      },
    ],
    image: {
      url: "/images/species/california-condor.jpg",
      photographer: "Stacy / USFWS",
      license: "Public Domain / USFWS",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:California_Condor_in_flight.jpg",
      alt: "California condor in flight",
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
    populationEstimate: "~50,000 – 100,000 individuals (declined sharply)",
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
        en: "The most powerful raptor in the Neotropics, possessing massive rear talons up to 13 cm long—larger than the claws of a grizzly bear.",
        es: "La rapaz más poderosa del neotrópico, con garras traseras de hasta 13 cm, más grandes que las garras de un oso pardo.",
        it: "Il rapace più potente dei neotropici, con artigli posteriori lunghi fino a 13 cm, pari a quelli di un orso.",
      },
      {
        en: "Features a divided double-feathered erectile crown on its head, short broad wings, and a long banded tail designed for high-speed maneuvering through dense tropical rainforest canopy.",
        es: "Luce una doble cresta eréctil en la coronilla, alas anchas y cola larga adaptada a maniobrar a toda velocidad entre las ramas de la selva.",
        it: "Presenta una doppia cresta erigibile sul capo e ali corte e larghe per sfrecciare agilmente tra i rami fitti.",
      },
    ],
    image: {
      url: "/images/species/harpy-eagle.jpg",
      photographer: "Jonathan Wilkins",
      license: "CC BY-SA 3.0",
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
        it: "Uccello trampoliere dall'aspetto preistorico tipico delle vaste paludi di papiro africane.",
      },
      {
        en: "Features a gigantic, swollen bulbous bill ending in a sharp nail-like hook, used to execute explosive head-first 'collapse' strikes onto surfaced lungfish.",
        es: "Posee un pico gigantesco con forma de zueco rematado en un afilado gancho, con el que se desploma de cabeza sobre peces pulmonados.",
        it: "Dotato di un enorme becco a forma di zoccolo uncinato all'apice per catturare pesci polmonati con attacchi fulminei.",
      },
    ],
    image: {
      url: "/images/species/shoebill.jpg",
      photographer: "Trisha M Shears",
      license: "Public Domain / CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Balaeniceps_rex_3.jpg",
      alt: "Shoebill standing in marsh",
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
    populationTrend: "stable",
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
      photographer: "Summerdrought",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Casuarius_casuarius_-_Daintree_National_Park.jpg",
      alt: "Southern cassowary in rainforest",
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
      photographer: "Maungatautari Ecological Island Trust",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Te_Tuhi_the_kiwi.jpg",
      alt: "North Island Brown Kiwi",
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
    populationEstimate: "~247 individuals (managed on predator-free offshore islands)",
    populationHistory: [
      { year: 1995, estimate: 51, label: "Near extinction on Stewart Island" },
      { year: 2005, estimate: 86 },
      { year: 2019, estimate: 211, label: "Record breeding season" },
      { year: 2024, estimate: 247 },
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
      photographer: "Department of Conservation NZ",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sirocco_full_length.jpg",
      alt: "Kakapo walking on moss ground",
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
    populationEstimate: "~10 – 12 million individuals",
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
      photographer: "Richard Bartz",
      license: "CC BY-SA 2.5",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Atlantic_Puffin_Fratercula_arctica.jpg",
      alt: "Atlantic puffin standing on cliff",
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
    populationEstimate: "~20,000 – 50,000 individuals",
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
      photographer: "Francesco Veronesi",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Resplendent_Quetzal_-_Costa_Rica_S4E7985.jpg",
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
    populationTrend: "stable",
    populationEstimate: "Widespread in millions across Amazon and Orinoco basins",
    populationHistory: [
      { year: 1990, estimate: 5000000 },
      { year: 2024, estimate: 4500000 },
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
      photographer: "Murray Foubister",
      license: "CC BY-SA 2.0",
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
    populationEstimate: "~1,500,000 – 2,000,000 individuals (severely threatened in southern relicts)",
    populationHistory: [
      { year: 1980, estimate: 3000000 },
      { year: 2000, estimate: 2000000 },
      { year: 2024, estimate: 1600000 },
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
      photographer: "Lukas Blik",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tetrao_urogallus_2.jpg",
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
    populationEstimate: "~140,000 mature individuals (cosmopolitan recovery)",
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
      photographer: "Carlos Delgado",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Falco_peregrinus_head_close_up.jpg",
      alt: "Peregrine falcon portrait",
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
      { year: 2017, estimate: 28000, label: "Uplisted to Vulnerable following telemetry data" },
      { year: 2024, estimate: 20000 },
    ],
    climateVulnerability: {
      en: "Warming Arctic tundra alters snowpack ice crusting, preventing lemmings from breeding beneath subnivean burrows.",
      es: "La descongelación y recongelación del manto nival bloquea la reproducción de lemmings bajo la nieve.",
      it: "Il disgelo e ricongelamento della neve impedisce ai lemming di riprodursi sotto il manto nevoso.",
    },
    keyThreats: [
      {
        threat: "Lemmy population crashes & collision",
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
        en: "Large, diurnal nomadic raptor of the treeless circumpolar Arctic tundra, with dense white feathering extending down over its toes and talons.",
        es: "Gran rapaz nómada diurna de la tundra ártica desprovista de árboles, con espeso plumaje blanco que cubre patas y garras.",
        it: "Grande rapace notturno ma diurno nelle abitudini, tipico della tundra artica con zampe densamente piumate.",
      },
      {
        en: "Nests directly in shallow scrape depressions on elevated tundra hummocks or pingos to maintain a 360-degree territorial view.",
        es: "Nidifica en depresiones del suelo sobre montículos o pingos para vigilar el horizonte sin árboles.",
        it: "Nidifica sul terreno su montagnole rialzate per controllare a 360° l'orizzonte della tundra.",
      },
    ],
    image: {
      url: "/images/species/snowy-owl.jpg",
      photographer: "Alan D. Wilson",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Snowy_Owl_-_Alaska_(cropped).jpg",
      alt: "Snowy owl on snow",
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
    populationEstimate: "~3,000 – 7,000 individuals",
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
      photographer: "Bernard Spragg",
      license: "Public Domain / CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kea_(Nestor_notabilis).jpg",
      alt: "Kea perched on alpine rock",
    },
    rangeConfig: [{ minLon: 167.0, maxLon: 174.0, minLat: -46.5, maxLat: -41.0 }],
  },

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
    populationEstimate: "~3,458 individuals (Komodo National Park & Flores)",
    populationHistory: [
      { year: 1990, estimate: 5000 },
      { year: 2021, estimate: 3458, label: "Uplisted to Endangered on climate criteria" },
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
    realm: "Marine",
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
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Marine_iguana_(Amblyrhynchus_cristatus_albemarlensis)_2.jpg",
      alt: "Marine iguana on lava rock",
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
      { year: 1970, estimate: 3000, label: "Historic whaling exploitation collapse" },
      { year: 2000, estimate: 15000 },
      { year: 2024, estimate: 22000 },
    ],
    climateVulnerability: {
      en: "Altered cloud mist (garúa) elevation shifts highland pasture moisture and affects nest incubation temperatures.",
      es: "La alteración de la garúa neblinosa seca pastos altos y modifica la temperatura de incubación de huevos.",
      it: "I cambiamenti nella nebbia estiva alterano i pascoli e le temperature di incubazione delle uova.",
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
      photographer: "David Cook",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Galapagos_Tortoise_(3530663363).jpg",
      alt: "Galapagos giant tortoise grazing",
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
      photographer: "Bernard Spragg",
      license: "Public Domain / CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Leatherback_Sea_Turtle.jpg",
      alt: "Leatherback sea turtle swimming",
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
        en: "Africa's largest freshwater predator, reaching lengths up to 5 to 6 meters and exerting one of the most powerful crushing bite forces ever measured in nature.",
        es: "El mayor depredador de agua dulce de África, alcanzando hasta 6 metros de longitud y una de las mordeduras más potentes del reino animal.",
        it: "Il più grande predatore d'acqua dolce d'Africa, lungo fino a 6 metri con un morso dalla potenza devastante.",
      },
      {
        en: "Lies submerged with only raised nostrils and eyes exposed before launching explosive shoreline ambush attacks, dragging large terrestrial mammals underwater.",
        es: "Acecha sumergido asomando únicamente ojos y narinas antes de lanzarse como un resorte sobre mamíferos que beben en la orilla.",
        it: "Attende sommerso lasciando emergere solo occhi e narici prima di scattare per trascinare in acqua grandi mammiferi.",
      },
    ],
    image: {
      url: "/images/species/nile-crocodile.jpg",
      photographer: "Bernard Dupont",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nile_Crocodile_(Crocodylus_niloticus)_(29828551694).jpg",
      alt: "Nile crocodile basking on riverbank",
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
    realm: "Marine",
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
        en: "Equipped with specialized lingual salt-secreting glands on its tongue, enabling long-distance open-ocean transits between distant Indo-Pacific islands.",
        es: "Posee glándulas salinas excretoras en la lengua que le permiten navegar grandes distancias oceánicas entre archipiélagos.",
        it: "Dotato di ghiandole saline linguali che espellono il sale, permettendogli traversate oceaniche tra le isole.",
      },
    ],
    image: {
      url: "/images/species/saltwater-crocodile.jpg",
      photographer: "Bernard Dupont",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Saltwater_Crocodile_(Crocodylus_porosus)_(30251147571).jpg",
      alt: "Saltwater crocodile in mangrove water",
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
      photographer: "KeresH",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tuatara_Brothers_Island.jpg",
      alt: "Tuatara on rocky ground",
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
        en: "Heavy, sluggish venomous lizard of arid Sonoran and Mojave desert scrublands, spending over 90% of its life hidden in underground burrows.",
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
      photographer: "Bernard Dupont",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Gila_Monster_(Heloderma_suspectum)_(30251147571).jpg",
      alt: "Gila monster crawling on sand",
    },
    rangeConfig: [{ minLon: -115.5, maxLon: -108.0, minLat: 27.5, maxLat: 37.0 }],
  },

  // 59. Axolotl
  {
    id: "axolotl",
    commonName: { en: "Axolotl", es: "Ajolote Mexicano", it: "Axolotl" },
    scientificName: "Ambystoma mexicanum",
    taxonClass: "Amphibia",
    order: "Urodela",
    family: "Ambystomatidae",
    realm: "Freshwater",
    difficulty: "endemic",
    iucnStatus: "CR",
    populationTrend: "decreasing",
    populationEstimate: "< 100 wild individuals remaining (Xochimilco canals)",
    populationHistory: [
      { year: 1998, estimate: 6000, label: "6,000 axolotls per km² recorded" },
      { year: 2008, estimate: 100 },
      { year: 2024, estimate: 50, label: "Nearly extinct in the wild; millions in lab colonies" },
    ],
    climateVulnerability: {
      en: "Urban warming and reduced aquifer recharge degrade dissolved oxygen levels in shallow canal networks.",
      es: "El calor urbano y la sobreexplotación de acuíferos degradan el oxígeno disuelto en los canales lacustres.",
      it: "L'inquinamento e il surriscaldamento urbano riducono l'ossigeno disciolto nelle acque dei canali.",
    },
    keyThreats: [
      {
        threat: "Canal pollution & invasive carp/tilapia",
        impact: "high",
        description: {
          en: "Agricultural sewage runoff and introduced invasive predatory fish devouring axolotl eggs and larvae.",
          es: "Contaminación por vertidos urbanos y carpas y tilapias introducidas que devoran sus puestas.",
          it: "Inquinamento da scarichi fognari e pesci alloctoni (carpe e tilapie) che divorano uova e larve.",
        },
      },
    ],
    diet: {
      en: "Benthic carnivore: Small freshwater crustaceans, insect larvae, aquatic worms, and small native fish.",
      es: "Carnívoro bentónico: acociles (crustáceos de agua dulce), larvas de insectos y pequeños peces.",
      it: "Carnivoro acquatico: crostacei d'acqua dolce, larve di insetti e anellidi.",
    },
    clues: [
      {
        en: "Obligate paedomorphic salamander that retains its aquatic larval form throughout its entire adult life without undergoing metamorphosis.",
        es: "Salamandra pedomórfica que retiene su estado larvario acuático toda la vida adulta sin sufrir metamorfosis.",
        it: "Salamandra pedomorfica che mantiene la forma larvale acquatica per tutta la vita adulta senza compiere metamorfosi.",
      },
      {
        en: "Possesses feathery external gill ruffs flanking its head, a wide smiling mouth, and extraordinary biomedical cellular regeneration capable of regrowing entire limbs and organs.",
        es: "Luce penachos branquiales externos plumosos a los lados de la cabeza y una asombrosa capacidad de regenerar extremidades y órganos enteros.",
        it: "Dotato di branchie esterne piumate ai lati della testa e straordinaria capacità di rigenerare arti e organi interni danneggiati.",
      },
    ],
    image: {
      url: "/images/species/axolotl.jpg",
      photographer: "Stephen Dalton",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Axolotl_in_aquarium.jpg",
      alt: "Axolotl in clear water",
    },
    rangeConfig: [{ minLon: -99.15, maxLon: -99.02, minLat: 19.24, maxLat: 19.32 }],
  },

  // 60. Golden Poison Frog
  {
    id: "golden-poison-frog",
    commonName: { en: "Golden Poison Frog", es: "Rana Dorada Venenosa", it: "Rana Freccia Dorata" },
    scientificName: "Phyllobates terribilis",
    taxonClass: "Amphibia",
    order: "Anura",
    family: "Dendrobatidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate: "< 5,000 individuals (restricted to ~250 km²)",
    populationHistory: [
      { year: 1990, estimate: 20000 },
      { year: 2014, estimate: 5000 },
      { year: 2024, estimate: 3500 },
    ],
    climateVulnerability: {
      en: "Drying of primary lowland Pacific rainforest litter layers disrupts moist egg-laying microclimates.",
      es: "La sequedad de la hojarasca de la selva tropical del Pacífico destruye microclimas húmedos de puesta.",
      it: "L'inaridimento della lettiera forestale minaccia i microclimi umidi per le uova.",
    },
    keyThreats: [
      {
        threat: "Deforestation & illegal gold mining",
        impact: "high",
        description: {
          en: "Clearing of lowland primary rainforest for illicit coca crops and alluvial gold dredging.",
          es: "Tala de selva primaria húmeda para cultivos ilícitos y minería aluvial de oro con dragas.",
          it: "Deforestazione per monocolture e inquinamento da estrazione aurifera.",
        },
      },
    ],
    diet: {
      en: "Formicivore: Native melyrid beetles, formicid ants, and small arthropods whose chemical alkaloids synthesize batrachotoxins.",
      es: "Formicívoro: pequeños escarabajos melíridos y hormigas de cuya dieta extrae precursores alcaloides.",
      it: "Formiche e coleotteri forestali da cui sintetizza potenti alcaloidi batracotossici.",
    },
    clues: [
      {
        en: "Considered the most toxic vertebrate on Earth, containing enough deadly batrachotoxin steroid alkaloids in its skin to kill over 10 adult humans.",
        es: "Considerado el animal vertebrado más venenoso del planeta, con suficiente batracotoxina en su piel para matar a más de 10 personas adultas.",
        it: "Ritenuto il vertebrato più tossico al mondo, con abbastanza batracotossina nella pelle da uccidere oltre 10 uomini adulti.",
      },
      {
        en: "Displays brilliant uniform aposematic warning coloration ranging from metallic gold to mint-green, actively foraging during daylight on the wet rainforest floor without fear.",
        es: "Luce una llamativa coloración aposemática amarilla dorada o verde menta, forrajeando de día sobre la hojarasca sin temor a depredadores.",
        it: "Esibisce una brillante colorazione aposematica d'avvertimento giallo oro e si muove di giorno senza timore sul suolo della foresta.",
      },
    ],
    image: {
      url: "/images/species/golden-poison-frog.jpg",
      photographer: "Wilfried Berns",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Phyllobates_terribilis_yellow.jpg",
      alt: "Golden poison frog on leaf",
    },
    rangeConfig: [{ minLon: -77.5, maxLon: -76.8, minLat: 2.8, maxLat: 3.5 }],
  },

  // 61. Chinese Giant Salamander
  {
    id: "chinese-giant-salamander",
    commonName: { en: "Chinese Giant Salamander", es: "Salamandra Gigante China", it: "Salamandra Gigante Cinese" },
    scientificName: "Andrias davidianus",
    taxonClass: "Amphibia",
    order: "Urodela",
    family: "Cryptobranchidae",
    realm: "Freshwater",
    difficulty: "regional",
    iucnStatus: "CR",
    populationTrend: "decreasing",
    populationEstimate: "Extremely rare in the wild (millions in commercial luxury farms)",
    populationHistory: [
      { year: 1980, estimate: 50000 },
      { year: 2000, estimate: 5000 },
      { year: 2024, estimate: 500, label: "Critically Endangered in wild streams" },
    ],
    climateVulnerability: {
      en: "Warming mountain river temperatures reduce dissolved oxygen in fast-flowing rocky streams.",
      es: "El calentamiento de arroyos montañosos reduce el oxígeno disuelto en torrentes pedregosos.",
      it: "L'aumento termico dei fiumi montani riduce l'ossigeno disciolto nelle rapide rocciose.",
    },
    keyThreats: [
      {
        threat: "Commercial over-harvesting & damming",
        impact: "high",
        description: {
          en: "Intense poaching for luxury gourmet consumption and concrete damming of clean headwater streams.",
          es: "Furtivismo masivo para gastronomía de lujo y represamiento de torrentes de cabecera.",
          it: "Bracconaggio intensivo per il consumo gastronomico di lusso e dighe fluviali.",
        },
      },
    ],
    diet: {
      en: "Aquatic carnivore: Freshwater crabs, fish, smaller salamanders, frogs, and river snails.",
      es: "Carnívoro acuático: cangrejos de río, peces de torrente, ranas y moluscos.",
      it: "Crostacei d'acqua dolce, pesci di torrente, rane e molluschi.",
    },
    clues: [
      {
        en: "The world's largest living amphibian, reaching lengths up to 1.8 meters and weighing over 50 kg, inhabiting cold, fast-flowing mountain streams and subterranean limestone caves.",
        es: "El anfibio vivo más grande y pesado del planeta, alcanzando hasta 1,8 metros de longitud en arroyos cársticos de montaña.",
        it: "Il più grande anfibio vivente al mondo, lungo fino a 1,8 metri e pesante oltre 50 kg, legato a torrenti montani freddi e grotte calcaree.",
      },
      {
        en: "Possesses heavily wrinkled, porous dark brown skin through which it breathes entirely, small lidless eyes with poor vision, and an eerie vocalization resembling a crying infant.",
        es: "Posee piel porosa muy arrugada por la que respira directamente, ojos diminutos sin párpados y emite sonidos que recuerdan el llanto de un bebé.",
        it: "Respira attraverso la pelle rugosa e porosa, ha occhi minuscoli atrofizzati ed emette suoni simili al pianto di un neonato.",
      },
    ],
    image: {
      url: "/images/species/chinese-giant-salamander.jpg",
      photographer: "Petr Hamernik",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Andrias_davidianus_Prague_Zoo.jpg",
      alt: "Chinese giant salamander underwater",
    },
    rangeConfig: [{ minLon: 102.0, maxLon: 118.0, minLat: 24.0, maxLat: 34.0 }],
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
    populationTrend: "increasing",
    populationEstimate: "~10,000 – 15,000 mature individuals",
    populationHistory: [
      { year: 1990, estimate: 5000 },
      { year: 2008, estimate: 10000 },
      { year: 2024, estimate: 14000 },
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
      photographer: "Vincent van Zalinge",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Wild_Yak_Tibet.jpg",
      alt: "Wild yak on high alpine plateau",
    },
    rangeConfig: [{ minLon: 78.0, maxLon: 102.0, minLat: 31.0, maxLat: 39.0 }],
  },
];
