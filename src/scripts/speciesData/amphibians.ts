import type { RawSpeciesEntry } from "./types";

export const amphibians: RawSpeciesEntry[] = [
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
    populationEstimate: "~50 – 1,000 wild individuals (Xochimilco canals, IUCN)",
    populationHistory: [
      { year: 1998, estimate: 6000, label: "6,000 axolotls per km² recorded" },
      { year: 2008, estimate: 100, label: "100 axolotls per km² recorded" },
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
      photographer: "Bildflut",
      license: "CC0 1.0",
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
    populationEstimate: "< 5,000 individuals (extent of occurrence ~1,473 km²)",
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
      photographer: "Brian Gratwicke",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Golden_Poison_dart_frog_Phyllobates_terribilis.jpg",
      alt: "Golden poison frog perched on a mossy log",
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
      { year: 2024, estimate: 500, label: "Critically Endangered; wild numbers highly uncertain" },
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
      photographer: "J. Patrick Fischer",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2009_Andrias_davidianus.JPG",
      alt: "Chinese giant salamander resting on a riverbed in an aquarium enclosure",
    },
    rangeConfig: [{ minLon: 102.0, maxLon: 118.0, minLat: 24.0, maxLat: 34.0 }],
  },

  // Red-eyed Tree Frog
  {
    id: "red-eyed-tree-frog",
    commonName: {
      en: "Red-eyed Tree Frog",
      es: "Rana Arborícola de Ojos Rojos",
      it: "Raganella dagli Occhi Rossi",
    },
    scientificName: "Agalychnis callidryas",
    taxonClass: "Amphibia",
    order: "Anura",
    family: "Phyllomedusidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate:
      "No formal population count exists; considered common to locally abundant within intact forest, though numbers are believed to be declining as habitat is cleared and animals are collected for the pet trade",
    populationHistory: [],
    climateVulnerability: {
      en: "Breeding depends on rainy-season pools forming reliably; shifting rainfall timing and drought threaten the ephemeral standing water its eggs and tadpoles require.",
      es: "Su reproducción depende de que se formen charcas fiables en la temporada de lluvias; los cambios en el momento de las precipitaciones y la sequía amenazan las aguas temporales que necesitan huevos y renacuajos.",
      it: "La riproduzione dipende dalla formazione affidabile di pozze durante la stagione delle piogge; i cambiamenti nei tempi delle precipitazioni e la siccità minacciano le acque temporanee necessarie a uova e girini.",
    },
    keyThreats: [
      {
        threat: "Deforestation & pet-trade collection",
        impact: "medium",
        description: {
          en: "Clearing of lowland rainforest for agriculture and small-scale collection of wild individuals for the international pet trade.",
          es: "Tala de selva tropical de tierras bajas para agricultura y captura a pequeña escala de ejemplares silvestres para el comercio internacional de mascotas.",
          it: "Disboscamento della foresta pluviale di bassa quota per l'agricoltura e cattura su piccola scala di esemplari selvatici per il commercio internazionale di animali da compagnia.",
        },
      },
    ],
    diet: {
      en: "Nocturnal insectivore: moths, crickets, flies, and other small arthropods.",
      es: "Insectívoro nocturno: polillas, grillos, moscas y otros pequeños artrópodos.",
      it: "Insettivoro notturno: falene, grilli, mosche e altri piccoli artropodi.",
    },
    clues: [
      {
        en: "Nocturnal amphibian that sleeps by day with eyes fully closed and limbs tucked tight against its body, becoming almost invisible with its bright flank colors hidden — flashing vivid red irises and blue-and-yellow sides only in a startle display when disturbed.",
        es: "Anfibio nocturno que duerme de día con los ojos completamente cerrados y las extremidades pegadas al cuerpo, casi invisible al ocultar sus colores vivos, y que solo muestra sus iris rojos y flancos azules y amarillos como despliegue de sobresalto al ser molestado.",
        it: "Anfibio notturno che dorme di giorno con gli occhi completamente chiusi e gli arti stretti al corpo, quasi invisibile nascondendo i suoi colori vivaci, e che mostra le iridi rosse e i fianchi blu e gialli solo come reazione di allarme se disturbato.",
      },
      {
        en: "Lays gelatinous egg clutches on the undersides of leaves overhanging still water, so that hatching tadpoles simply drop directly into the pool below.",
        es: "Deposita puestas gelatinosas en el envés de hojas que cuelgan sobre agua quieta, de modo que los renacuajos al eclosionar caen directamente al agua.",
        it: "Depone ovature gelatinose sulla pagina inferiore di foglie sospese sopra acqua ferma, così che i girini alla schiusa cadono direttamente nella pozza sottostante.",
      },
      {
        en: "Thin, permeable skin secretes a specialized mucus that limits water loss during the day, letting this climber sleep fully exposed on leaf surfaces despite tropical heat.",
        es: "Su piel fina y permeable segrega un moco especial que limita la pérdida de agua durante el día, permitiéndole dormir totalmente expuesta sobre hojas pese al calor tropical.",
        it: "La pelle sottile e permeabile secerne un muco speciale che limita la perdita d'acqua durante il giorno, permettendole di dormire completamente esposta sulle foglie nonostante il calore tropicale.",
      },
    ],
    image: {
      url: "/images/species/red-eyed-tree-frog.jpg",
      photographer: "Geoff Gallice",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Red-eyed_Tree_Frog_(Agalychnis_callidryas)_3.jpg",
      alt: "Red-eyed tree frog gripping a plant stem with a leaf overhead",
    },
    rangeConfig: [{ minLon: -92.0, maxLon: -76.5, minLat: 7.0, maxLat: 19.0 }],
  },

  // Hellbender
  {
    id: "hellbender",
    commonName: {
      en: "Hellbender",
      es: "Salamandra Gigante Americana",
      it: "Salamandra Gigante Americana",
    },
    scientificName: "Cryptobranchus alleganiensis",
    taxonClass: "Amphibia",
    order: "Urodela",
    family: "Cryptobranchidae",
    realm: "Freshwater",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate:
      "No range-wide headcount exists; surveys of 626 known historical stream populations found roughly 41% already extirpated and most survivors declining, at an estimated rate of about 1% per year; one isolated subspecies population has fallen to only around 600 individuals",
    populationHistory: [],
    climateVulnerability: {
      en: "Breathes almost entirely through its skin and needs cold, highly oxygenated flowing water; warming streams hold less dissolved oxygen than its cutaneous respiration can compensate for.",
      es: "Respira casi por completo a través de la piel y necesita agua corriente fría y muy oxigenada; los arroyos más cálidos retienen menos oxígeno disuelto del que su respiración cutánea puede compensar.",
      it: "Respira quasi interamente attraverso la pelle e necessita di acqua corrente fredda e molto ossigenata; i torrenti più caldi trattengono meno ossigeno disciolto di quanto la respirazione cutanea possa compensare.",
    },
    keyThreats: [
      {
        threat: "Siltation & water quality degradation",
        impact: "high",
        description: {
          en: "Sediment from upstream land disturbance smothers the large flat rocks it shelters beneath, compounded by pollution runoff and dams altering stream flow.",
          es: "Los sedimentos por alteraciones del terreno aguas arriba cubren las grandes rocas planas bajo las que se refugia, agravado por la contaminación y presas que alteran el caudal.",
          it: "I sedimenti provenienti da alterazioni del terreno a monte ricoprono le grandi rocce piatte sotto cui si rifugia, aggravati da inquinamento e dighe che alterano il flusso del torrente.",
        },
      },
    ],
    diet: {
      en: "Nocturnal ambush carnivore: crayfish, aquatic insect larvae, small fish, and other stream invertebrates.",
      es: "Carnívoro nocturno de emboscada: cangrejos de río, larvas acuáticas, peces pequeños y otros invertebrados de arroyo.",
      it: "Carnivoro notturno d'agguato: gamberi di fiume, larve acquatiche, piccoli pesci e altri invertebrati di torrente.",
    },
    clues: [
      {
        en: "Fully aquatic giant salamander that breathes almost entirely through deeply wrinkled, fold-covered skin rather than lungs or gills, requiring cold, fast-flowing, oxygen-rich water beneath large flat rocks.",
        es: "Salamandra gigante totalmente acuática que respira casi por completo a través de una piel profundamente arrugada y plegada, no por pulmones ni branquias, y que necesita agua fría, rápida y rica en oxígeno bajo grandes rocas planas.",
        it: "Salamandra gigante completamente acquatica che respira quasi interamente attraverso una pelle profondamente rugosa e ripiegata, non con polmoni o branchie, e necessita di acqua fredda, veloce e ricca di ossigeno sotto grandi rocce piatte.",
      },
      {
        en: "Spends nearly its entire life wedged beneath a single large submerged rock, rarely straying from its chosen territory for years and using smell and water-vibration sensing rather than eyesight to ambush prey at night.",
        es: "Pasa casi toda su vida encajada bajo una misma roca sumergida, rara vez se aleja de su territorio durante años, y usa el olfato y la detección de vibraciones en el agua, más que la vista, para acechar presas de noche.",
        it: "Trascorre quasi tutta la vita incuneata sotto un'unica grande roccia sommersa, allontanandosi raramente dal proprio territorio per anni, e usa olfatto e percezione delle vibrazioni dell'acqua, più che la vista, per attaccare le prede di notte.",
      },
      {
        en: "So sensitive to pollution and sediment that the presence and health of its population functions as a living gauge of a stream's water quality.",
        es: "Tan sensible a la contaminación y al sedimento que la presencia y el estado de su población funcionan como un indicador vivo de la calidad del agua de un arroyo.",
        it: "Così sensibile all'inquinamento e ai sedimenti che la presenza e lo stato della sua popolazione fungono da indicatore vivente della qualità dell'acqua di un torrente.",
      },
    ],
    image: {
      url: "/images/species/hellbender.jpg",
      photographer: "Gary Peeples / U.S. Fish and Wildlife Service",
      license: "Public Domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Eastern_hellbender_salamander_FWS_18501.jpg",
      alt: "Hellbender salamander resting among river rocks underwater",
    },
    rangeConfig: [{ minLon: -91.0, maxLon: -76.0, minLat: 33.0, maxLat: 43.0 }],
  },

  // Olm
  {
    id: "olm",
    commonName: { en: "Olm", es: "Proteo", it: "Proteo" },
    scientificName: "Proteus anguinus",
    taxonClass: "Amphibia",
    order: "Urodela",
    family: "Proteidae",
    realm: "Freshwater",
    difficulty: "endemic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate:
      "No reliable total population count exists for this cryptic cave endemic; localized cave surveys record densities from under 0.5 up to roughly 11 individuals per 10 square meters of submerged cave floor",
    populationHistory: [],
    climateVulnerability: {
      en: "Lives entirely within karst groundwater, so altered rainfall and drought change aquifer levels directly, while agricultural runoff seeps through the porous limestone straight into its habitat.",
      es: "Vive por completo en aguas subterráneas kársticas, por lo que la lluvia irregular y la sequía alteran directamente el nivel del acuífero, mientras que los vertidos agrícolas se filtran por la caliza porosa hasta su hábitat.",
      it: "Vive interamente nelle acque sotterranee carsiche, per cui piogge irregolari e siccità alterano direttamente il livello della falda, mentre i reflui agricoli filtrano attraverso il calcare poroso fino al suo habitat.",
    },
    keyThreats: [
      {
        threat: "Groundwater pollution",
        impact: "medium",
        description: {
          en: "Agricultural runoff and wastewater seep through porous karst rock directly into the aquifers it inhabits, along with disturbance from water extraction and cave tourism.",
          es: "Los vertidos agrícolas y aguas residuales se filtran por la roca kárstica porosa hasta los acuíferos que habita, junto con la alteración por extracción de agua y turismo de cuevas.",
          it: "I reflui agricoli e le acque reflue filtrano attraverso la roccia carsica porosa fino alle falde che abita, insieme al disturbo dovuto all'estrazione d'acqua e al turismo speleologico.",
        },
      },
    ],
    diet: {
      en: "Opportunistic carnivore of small cave-dwelling invertebrates — amphipods, snails, and insect larvae — located by smell, taste, and electroreception rather than sight.",
      es: "Carnívoro oportunista de pequeños invertebrados cavernícolas —anfípodos, caracoles y larvas de insectos— que localiza por olfato, gusto y electrorrecepción, no por la vista.",
      it: "Carnivoro opportunista di piccoli invertebrati cavernicoli — anfipodi, chiocciole e larve di insetti — che localizza tramite olfatto, gusto ed elettrorecezione, non con la vista.",
    },
    clues: [
      {
        en: "Fully aquatic cave salamander, blind and unpigmented, that retains feathery external gills and an eel-like body for its entire life without ever completing metamorphosis.",
        es: "Salamandra cavernícola totalmente acuática, ciega y despigmentada, que conserva branquias externas plumosas y un cuerpo similar al de una anguila durante toda su vida sin completar jamás la metamorfosis.",
        it: "Salamandra cavernicola completamente acquatica, cieca e depigmentata, che conserva branchie esterne piumose e un corpo simile a quello di un'anguilla per tutta la vita senza mai completare la metamorfosi.",
      },
      {
        en: "Can survive up to a decade without eating by drastically slowing its metabolism and storing energy reserves in its liver, and may live over a century.",
        es: "Puede sobrevivir hasta una década sin comer al ralentizar drásticamente su metabolismo y almacenar reservas de energía en el hígado, y puede vivir más de un siglo.",
        it: "Può sopravvivere fino a un decennio senza mangiare rallentando drasticamente il metabolismo e accumulando riserve energetiche nel fegato, e può vivere oltre un secolo.",
      },
      {
        en: "Hunts entirely in permanent darkness using electroreception and vibration-sensing rather than sight, its skin-covered eyes atrophied beneath a translucent, permanently pale hide.",
        es: "Caza por completo en oscuridad permanente mediante electrorrecepción y detección de vibraciones, no por la vista, con ojos atrofiados y cubiertos de piel bajo una piel translúcida y siempre pálida.",
        it: "Caccia interamente al buio assoluto usando elettrorecezione e percezione delle vibrazioni, non la vista, con occhi atrofizzati coperti di pelle sotto una cute traslucida e sempre pallida.",
      },
    ],
    image: {
      url: "/images/species/olm.jpg",
      photographer: "Arne Hodalič",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:P_anguinus1.jpg",
      alt: "Pale, blind olm salamander swimming in a dark cave pool",
    },
    rangeConfig: [{ minLon: 13.0, maxLon: 19.5, minLat: 42.0, maxLat: 46.5 }],
  },

  // Fire Salamander
  {
    id: "fire-salamander",
    commonName: { en: "Fire Salamander", es: "Salamandra Común", it: "Salamandra Pezzata" },
    scientificName: "Salamandra salamandra",
    taxonClass: "Amphibia",
    order: "Urodela",
    family: "Salamandridae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate:
      "No global count exists; widespread and locally abundant across suitable damp forest habitat, though some populations at the northwestern edge of its range have been extirpated within a few years of a lethal salamander-killing fungus arriving",
    populationHistory: [],
    climateVulnerability: {
      en: "Depends on consistently damp forest floor and cool, humid nights for activity; warming and drying forest conditions shrink the nocturnal window it can safely forage in and stress its permeable skin.",
      es: "Depende de un suelo forestal constantemente húmedo y noches frescas y húmedas para su actividad; el calentamiento y la sequedad del bosque acortan la ventana nocturna en la que puede forrajear con seguridad y estresan su piel permeable.",
      it: "Dipende da un suolo forestale costantemente umido e da notti fresche e umide per la sua attività; il riscaldamento e l'inaridimento del bosco riducono la finestra notturna in cui può cercare cibo in sicurezza e mettono sotto stress la sua pelle permeabile.",
    },
    keyThreats: [
      {
        threat: "Batrachochytrium salamandrivorans (Bsal) fungal disease",
        impact: "high",
        description: {
          en: "A lethal skin-eating fungus related to amphibian chytrid has caused rapid local population collapses since around 2010 in parts of its range, alongside ongoing forest fragmentation and road mortality.",
          es: "Un hongo letal que devora la piel, emparentado con el quitridio anfibio, ha causado colapsos poblacionales locales rápidos desde alrededor de 2010 en parte de su área, junto con la fragmentación forestal y los atropellos.",
          it: "Un fungo letale che divora la pelle, imparentato con il chitride degli anfibi, ha causato rapidi collassi di popolazioni locali dal 2010 circa in parte del suo areale, insieme alla frammentazione forestale e alla mortalità stradale.",
        },
      },
    ],
    diet: {
      en: "Nocturnal invertebrate carnivore: earthworms, slugs, insects, and other small invertebrates.",
      es: "Carnívoro nocturno de invertebrados: lombrices, babosas, insectos y otros pequeños invertebrados.",
      it: "Carnivoro notturno di invertebrati: lombrichi, lumache, insetti e altri piccoli invertebrati.",
    },
    clues: [
      {
        en: "Glossy black-skinned amphibian marked with bold yellow or orange blotches that warn of the potent steroidal alkaloid toxins its skin glands secrete when threatened.",
        es: "Anfibio de piel negra brillante marcada con llamativas manchas amarillas o naranjas que advierten de las potentes toxinas alcaloides esteroideas que segregan sus glándulas cutáneas al sentirse amenazada.",
        it: "Anfibio dalla pelle nera lucida marcata da vistose macchie gialle o arancioni che avvertono delle potenti tossine alcaloidee steroidee secrete dalle ghiandole cutanee quando si sente minacciata.",
      },
      {
        en: "Unlike most amphibians, gives birth to live aquatic larvae — or in some populations, fully metamorphosed juveniles — rather than laying eggs, depositing offspring directly into cold streams and pools.",
        es: "A diferencia de la mayoría de los anfibios, pare larvas acuáticas vivas —o, en algunas poblaciones, crías ya metamorfoseadas— en lugar de poner huevos, depositando a sus crías directamente en arroyos y charcas frías.",
        it: "A differenza della maggior parte degli anfibi, partorisce larve acquatiche vive — o, in alcune popolazioni, giovani già metamorfosati — invece di deporre uova, depositando la prole direttamente in torrenti e pozze fredde.",
      },
      {
        en: "Almost entirely nocturnal, sheltering by day under logs and stones and emerging to hunt only on humid, rainy nights when moisture and darkness align.",
        es: "Casi exclusivamente nocturna, se refugia de día bajo troncos y piedras y solo sale a cazar en noches húmedas y lluviosas cuando coinciden humedad y oscuridad.",
        it: "Quasi esclusivamente notturna, di giorno si rifugia sotto tronchi e pietre ed esce a cacciare solo nelle notti umide e piovose, quando umidità e oscurità coincidono.",
      },
    ],
    image: {
      url: "/images/species/fire-salamander.jpg",
      photographer: "Petar Milošević",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fire_salamander_(Salamandra_Salamandra).jpg",
      alt: "Fire salamander with black and yellow markings on the ground",
    },
    rangeConfig: [{ minLon: -9.5, maxLon: 28.0, minLat: 36.0, maxLat: 54.0 }],
  },

  // Darwin's Frog
  {
    id: "darwins-frog",
    commonName: { en: "Darwin's Frog", es: "Rana de Darwin", it: "Rana di Darwin" },
    scientificName: "Rhinoderma darwinii",
    taxonClass: "Amphibia",
    order: "Anura",
    family: "Rhinodermatidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate:
      "Estimated occupied area of roughly 264 km²; surveyed populations average about 33 frogs each (range 10-56), severely fragmented between remaining sites",
    populationHistory: [],
    climateVulnerability: {
      en: "Relies on consistently moist forest-floor leaf litter for both foraging and camouflage; drier conditions degrade the damp microhabitat its eggs and brooding males depend on.",
      es: "Depende de una hojarasca del suelo forestal constantemente húmeda tanto para alimentarse como para camuflarse; la sequedad degrada el microhábitat húmedo del que dependen sus huevos y los machos incubadores.",
      it: "Dipende da una lettiera del suolo forestale costantemente umida sia per l'alimentazione sia per il mimetismo; condizioni più secche degradano il microhabitat umido da cui dipendono le uova e i maschi incubatori.",
    },
    keyThreats: [
      {
        threat: "Chytrid fungus & native forest conversion",
        impact: "high",
        description: {
          en: "The amphibian chytrid fungus Batrachochytrium dendrobatidis has been implicated in regional die-offs, compounded by ongoing logging and conversion of native forest to plantation.",
          es: "El hongo quitridio Batrachochytrium dendrobatidis se ha vinculado a mortandades regionales, agravadas por la tala continua y la conversión de bosque nativo en plantaciones.",
          it: "Il fungo chitride Batrachochytrium dendrobatidis è stato collegato a morie regionali, aggravate dal disboscamento continuo e dalla conversione della foresta nativa in piantagioni.",
        },
      },
    ],
    diet: {
      en: "Sit-and-wait predator of small leaf-litter arthropods: springtails, mites, and small insects and spiders.",
      es: "Depredador al acecho de pequeños artrópodos de la hojarasca: colémbolos, ácaros y pequeños insectos y arañas.",
      it: "Predatore d'agguato di piccoli artropodi della lettiera: collemboli, acari e piccoli insetti e ragni.",
    },
    clues: [
      {
        en: "One of only two frog species on Earth in which the male swallows his mate's fertilized eggs and broods the developing tadpoles inside his own vocal sac until they emerge as fully formed froglets.",
        es: "Una de las dos únicas especies de rana del mundo en las que el macho traga los huevos fecundados de su pareja e incuba a los renacuajos en desarrollo dentro de su propio saco vocal hasta que emergen como ranitas ya formadas.",
        it: "Una delle sole due specie di rana al mondo in cui il maschio ingoia le uova fecondate della compagna e cova i girini in sviluppo all'interno del proprio sacco vocale finché non emergono come ranocchie già formate.",
      },
      {
        en: "A triangular, pointed snout and mottled brown coloration mimic a dead leaf on the forest floor, camouflage so effective the frog can freeze in the open and go unnoticed by predators.",
        es: "Su hocico triangular y puntiagudo y su coloración parda moteada imitan una hoja muerta en el suelo del bosque, un camuflaje tan eficaz que puede quedarse inmóvil a la vista sin que la detecten los depredadores.",
        it: "Il muso triangolare e appuntito e la colorazione bruna screziata imitano una foglia morta sul suolo del bosco, un mimetismo così efficace che la rana può restare immobile allo scoperto senza essere notata dai predatori.",
      },
      {
        en: "Highly susceptible to a lethal skin fungus implicated in the disappearance of an entire sister species, even though infection rates recorded in its own remaining populations are lower than in many other frogs sharing its habitat.",
        es: "Muy susceptible a un hongo cutáneo letal vinculado a la desaparición de toda una especie hermana, aunque las tasas de infección registradas en sus poblaciones remanentes son menores que en muchas otras ranas de su hábitat.",
        it: "Molto sensibile a un fungo cutaneo letale collegato alla scomparsa di un'intera specie sorella, sebbene i tassi di infezione registrati nelle sue popolazioni superstiti siano inferiori a quelli di molte altre rane del suo habitat.",
      },
    ],
    image: {
      url: "/images/species/darwins-frog.jpg",
      photographer: "Jalmonacida",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ranita_de_Darwin_(Rhinoderma_darwinii).jpg",
      alt: "Darwin's frog camouflaged among fallen leaves",
    },
    rangeConfig: [{ minLon: -74.0, maxLon: -71.0, minLat: -43.5, maxLat: -36.0 }],
  },

  // Panamanian Golden Frog
  {
    id: "panamanian-golden-frog",
    commonName: {
      en: "Panamanian Golden Frog",
      es: "Rana Dorada de Panamá",
      it: "Rana Dorata di Panama",
    },
    scientificName: "Atelopus zeteki",
    taxonClass: "Amphibia",
    order: "Anura",
    family: "Bufonidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "CR",
    populationTrend: "decreasing",
    populationEstimate:
      "Believed extinct in the wild since 2007 following a rapid, fungal-driven population collapse; a few hundred individuals survive only in managed assurance-colony breeding programs",
    populationHistory: [],
    climateVulnerability: {
      en: "Its remaining hope rests entirely on climate-controlled captive facilities, since a warming, more variable climate is expected to further favor the growth of the pathogenic fungus that eliminated it from the wild.",
      es: "Su única esperanza depende hoy por completo de instalaciones cautivas con clima controlado, ya que un clima más cálido y variable tiende a favorecer aún más el crecimiento del hongo patógeno que la eliminó de la naturaleza.",
      it: "La sua unica speranza dipende oggi interamente da strutture in cattività a clima controllato, poiché un clima più caldo e variabile tende a favorire ulteriormente la crescita del fungo patogeno che l'ha eliminata dalla natura.",
    },
    keyThreats: [
      {
        threat: "Chytrid fungus epidemic",
        impact: "high",
        description: {
          en: "The amphibian chytrid fungus Batrachochytrium dendrobatidis swept through its stream habitat in the mid-2000s and is the primary, near-total cause of its disappearance from the wild.",
          es: "El hongo quitridio Batrachochytrium dendrobatidis arrasó su hábitat de arroyos a mediados de la década de 2000 y es la causa principal, casi total, de su desaparición en estado silvestre.",
          it: "Il fungo chitride Batrachochytrium dendrobatidis ha devastato il suo habitat torrentizio a metà degli anni 2000 ed è la causa principale, quasi totale, della sua scomparsa in natura.",
        },
      },
    ],
    diet: {
      en: "Insectivore: small forest and streamside invertebrates.",
      es: "Insectívoro: pequeños invertebrados de bosque y ribera.",
      it: "Insettivoro: piccoli invertebrati di bosco e di ripa.",
    },
    conservationActions: {
      en: "Survives only through managed assurance-colony breeding programs in Panama and abroad; reintroduction to the wild remains impossible until a method exists to control the fungus in natural stream habitats.",
      es: "Sobrevive únicamente gracias a programas de cría en colonias de resguardo en Panamá y en el extranjero; su reintroducción en la naturaleza sigue siendo inviable hasta que exista un método para controlar el hongo en los arroyos.",
      it: "Sopravvive solo grazie a programmi di allevamento in colonie di salvaguardia a Panama e all'estero; la reintroduzione in natura resta impossibile finché non esisterà un metodo per controllare il fungo nei torrenti naturali.",
    },
    clues: [
      {
        en: "Brilliant, uniformly toxic yellow-gold skin advertises a potent nerve toxin to predators, a warning coloration so effective the species needs no camouflage at all.",
        es: "Su piel de un dorado amarillo brillante y uniformemente tóxico anuncia a los depredadores una potente neurotoxina, una coloración de advertencia tan eficaz que la especie no necesita camuflaje alguno.",
        it: "La sua pelle di un giallo dorato brillante e uniformemente tossico segnala ai predatori una potente neurotossina, una colorazione di avvertimento così efficace da non richiedere alcun mimetismo.",
      },
      {
        en: "Because the rushing streams it lives beside are too loud for calls to carry, this toad evolved a visual 'semaphore' language, waving a forelimb in a conspicuous flagging gesture to signal rivals and potential mates.",
        es: "Como los torrentes junto a los que vive son demasiado ruidosos para que los cantos se propaguen, este sapo desarrolló un lenguaje visual de 'semáforo', agitando una pata delantera en un gesto llamativo para señalar a rivales y posibles parejas.",
        it: "Poiché i torrenti impetuosi accanto a cui vive sono troppo rumorosi perché i richiami si propaghino, questo rospo ha sviluppato un linguaggio visivo a 'semaforo', agitando un arto anteriore in un gesto vistoso per segnalare rivali e potenziali compagni.",
      },
      {
        en: "Once locally common along fast-flowing forest streams, its entire wild population collapsed within about a year of a lethal skin fungus sweeping through its range, and it has not been confirmed in the wild since.",
        es: "Antes localmente común a lo largo de torrentes forestales de aguas rápidas, toda su población silvestre colapsó en apenas un año tras la irrupción de un hongo cutáneo letal, y no se ha vuelto a confirmar en la naturaleza desde entonces.",
        it: "Un tempo localmente comune lungo torrenti forestali dalle acque rapide, l'intera popolazione selvatica è collassata in circa un anno dopo l'arrivo di un fungo cutaneo letale, e da allora non è più stata confermata in natura.",
      },
    ],
    image: {
      url: "/images/species/panamanian-golden-frog.jpg",
      photographer: "Brian Gratwicke",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Panamanian_Golden_Frog.jpg",
      alt: "Panamanian golden frog with orange and black banded pattern",
    },
    rangeConfig: [{ minLon: -80.7, maxLon: -80.0, minLat: 8.4, maxLat: 8.9 }],
  },
];
