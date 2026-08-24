import type { RawSpeciesEntry } from "./types";

// Actinopterygii/Chondrichthyes entries — GeoFauna's first fish, authored under
// the Workstream E catalog expansion. All ranges are left to the GBIF-derived
// pipeline (see AGENTS.md); no rangeConfig fallback boxes are hand-authored.
export const fish: RawSpeciesEntry[] = [
  // 63. Whale Shark
  {
    id: "whale-shark",
    commonName: { en: "Whale Shark", es: "Tiburón Ballena", it: "Squalo Balena" },
    scientificName: "Rhincodon typus",
    taxonClass: "Chondrichthyes",
    order: "Orectolobiformes",
    family: "Rhincodontidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate:
      "No reliable global census exists; a long-studied reef aggregation held 300-500 resident sharks with its relative sighting rate falling ~40% within one decade, and a global photo-identification catalog held over 15,700 individually recognized sharks as of 2025",
    populationHistory: [
      { year: 1995, estimate: 500, label: "Resident aggregation size at a long-studied reef site (Bradshaw et al. 2008 photo-ID study)" },
      { year: 2004, estimate: 300, label: "Same aggregation's relative sighting abundance falls roughly 40% within one decade" },
    ],
    climateVulnerability: {
      en: "Ocean warming and shifting current patterns are altering the timing and location of the plankton blooms and mass coral-and-fish spawning events the species depends on, potentially decoupling its long migrations from the food pulses that make them worthwhile.",
      es: "El calentamiento oceánico y los cambios en los patrones de corrientes están alterando el momento y la ubicación de las proliferaciones de plancton y los eventos de desove masivo de coral y peces de los que depende la especie, lo que podría desincronizar sus largas migraciones de los pulsos de alimento que las justifican.",
      it: "Il riscaldamento oceanico e i mutamenti nei modelli di corrente stanno alterando i tempi e la localizzazione delle fioriture planctoniche e degli eventi di riproduzione di massa di coralli e pesci da cui la specie dipende, rischiando di scollegare le sue lunghe migrazioni dagli impulsi di cibo che le rendono vantaggiose.",
    },
    keyThreats: [
      {
        threat: "Vessel strikes & historic target fishing",
        impact: "high",
        description: {
          en: "Ship strikes in busy shipping lanes and historic harpoon fisheries for meat, fins, and liver oil drove sharp population declines before broad legal protection in the 1990s-2000s.",
          es: "Las colisiones con embarcaciones en rutas de navegación concurridas y la caza histórica con arpón para obtener carne, aletas y aceite de hígado provocaron fuertes descensos poblacionales antes de su protección legal generalizada en los años 90 y 2000.",
          it: "Le collisioni con imbarcazioni lungo rotte di navigazione trafficate e la caccia storica con arpione per carne, pinne e olio di fegato hanno causato forti cali demografici prima della protezione legale diffusa negli anni '90 e 2000.",
        },
      },
      {
        threat: "Bycatch in purse-seine tuna fisheries",
        impact: "high",
        description: {
          en: "Frequently entangled in nets set around floating objects to catch tuna, since juveniles often associate with the same drifting debris used to attract schooling fish.",
          es: "Con frecuencia queda atrapado en redes de cerco colocadas junto a objetos flotantes para capturar atún, ya que los juveniles suelen asociarse con los mismos restos a la deriva que atraen a los peces en cardumen.",
          it: "Rimane spesso intrappolato nelle reti a circuizione calate attorno a oggetti galleggianti per catturare il tonno, poiché i giovani si associano spesso agli stessi detriti alla deriva che attirano i pesci in banco.",
        },
      },
    ],
    diet: {
      en: "Filter feeder: plankton, krill, small schooling fish, and fish eggs, sieved through modified gill rakers as it swims with its enormous mouth open.",
      es: "Filtrador: plancton, kril, peces pequeños en cardumen y huevos de peces, cribados a través de branquiespinas modificadas mientras nada con la boca abierta.",
      it: "Filtratore: plancton, krill, piccoli pesci in banco e uova di pesce, filtrati attraverso branchiospine modificate mentre nuota a bocca spalancata.",
    },
    clues: [
      {
        en: "Largest living fish, exceeding 12 meters, filter-feeding through gill rakers modified into a fine porous mesh while cruising just beneath the sea surface.",
        es: "El pez más grande que existe, con más de 12 metros de longitud, filtra su alimento a través de branquiespinas modificadas en una fina malla porosa mientras nada justo bajo la superficie.",
        it: "Il pesce vivente più grande, lungo oltre 12 metri, filtra il cibo attraverso branchiospine modificate in una fine rete porosa mentre nuota appena sotto la superficie.",
      },
      {
        en: "Skin patterned with a unique grid of pale spots and stripes over dark grey, as individually distinctive as a fingerprint, thickened to over 10 centimeters to resist predation.",
        es: "Su piel presenta un patrón único de manchas y rayas claras sobre fondo gris oscuro, tan distintivo como una huella dactilar, y llega a engrosarse más de 10 centímetros para resistir a los depredadores.",
        it: "La pelle presenta un motivo unico di macchie e strisce chiare su sfondo grigio scuro, distintivo come un'impronta digitale, e si ispessisce oltre i 10 centimetri per resistere ai predatori.",
      },
      {
        en: "Migrates thousands of kilometers to synchronize its arrival with mass spawning events of reef fish and coral, gorging on the resulting slicks of eggs.",
        es: "Migra miles de kilómetros para hacer coincidir su llegada con eventos de desove masivo de peces y corales de arrecife, y se alimenta vorazmente de las manchas de huevos resultantes.",
        it: "Migra per migliaia di chilometri per far coincidere il proprio arrivo con eventi di riproduzione di massa di pesci e coralli di barriera, nutrendosi voracemente delle chiazze di uova che ne risultano.",
      },
    ],
    image: {
      url: "/images/species/whale-shark.jpg",
      photographer: "Matthew T Rader",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Whale_Shark_(Rhincodon_typus)_with_open_mouth_in_La_Paz,_Mexico.jpg",
      alt: "Whale shark feeding near the surface with its mouth open, surrounded by small fish",
    },
    gbifTaxonKey: 2417522,
    rangeConfig: [],
  },

  // 64. Great White Shark
  {
    id: "great-white-shark",
    commonName: { en: "Great White Shark", es: "Gran Tiburón Blanco", it: "Grande Squalo Bianco" },
    scientificName: "Carcharodon carcharias",
    taxonClass: "Chondrichthyes",
    order: "Lamniformes",
    family: "Lamnidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate:
      "No global count exists; the best-studied regional population was estimated at 219 individuals in 2011 (95% CI 130-275) and had grown modestly to roughly 300 by 2018",
    populationHistory: [
      { year: 2011, estimate: 219, label: "Mark-recapture estimate for one well-studied regional population from dorsal-fin photo ID (Chapple et al. 2011); 95% CI 130-275" },
      { year: 2018, estimate: 300, label: "Same regional population shows modest positive growth across 2011-2018 (Kanive et al. 2021)" },
    ],
    climateVulnerability: {
      en: "Warming coastal waters are shifting pinniped prey and the sharks themselves poleward, with juveniles increasingly recorded in historically cooler waters outside traditional nursery areas.",
      es: "El calentamiento de las aguas costeras está desplazando hacia latitudes más frías tanto a las presas pinnípedas como a los propios tiburones, con juveniles registrados cada vez más en aguas históricamente frías fuera de las zonas de cría tradicionales.",
      it: "Il riscaldamento delle acque costiere sta spingendo verso latitudini più fredde sia le prede pinnipedi sia gli squali stessi, con giovani sempre più registrati in acque storicamente più fredde al di fuori delle tradizionali aree di nursery.",
    },
    keyThreats: [
      {
        threat: "Bycatch in longline & gillnet fisheries",
        impact: "high",
        description: {
          en: "Regularly hooked or entangled as non-target catch in longline and gillnet gear set for tuna, swordfish, and other species.",
          es: "Capturado con regularidad como fauna acompañante en palangres y redes de enmalle calados para atún, pez espada y otras especies.",
          it: "Catturato regolarmente come specie accessoria in palamiti e reti da posta calati per tonno, pesce spada e altre specie.",
        },
      },
      {
        threat: "Protective beach nets & trophy demand",
        impact: "medium",
        description: {
          en: "Culled by shark-control nets and drumlines installed to protect swimming beaches, and historically targeted for jaws, teeth, and fins as trophies.",
          es: "Eliminado por redes y palangres de control instalados para proteger playas de baño, y perseguido históricamente por sus mandíbulas, dientes y aletas como trofeos.",
          it: "Eliminato dalle reti e dai palamiti di controllo installati per proteggere le spiagge balneari, e storicamente cacciato per mascelle, denti e pinne come trofei.",
        },
      },
    ],
    diet: {
      en: "Apex predator: pinnipeds (seals and sea lions) as adults, supplemented by fish, rays, cetacean carrion, and seabirds; juveniles feed mainly on fish and rays.",
      es: "Superdepredador: pinnípedos (focas y lobos marinos) en su etapa adulta, complementado con peces, rayas, carroña de cetáceos y aves marinas; los juveniles se alimentan sobre todo de peces y rayas.",
      it: "Superpredatore: pinnipedi (foche e otarie) da adulto, integrati da pesci, razze, carogne di cetacei e uccelli marini; i giovani si nutrono soprattutto di pesci e razze.",
    },
    clues: [
      {
        en: "Apex predator reaching up to 6 meters, using electroreceptive ampullae of Lorenzini in its snout to detect the faint bioelectric fields of hidden prey.",
        es: "Superdepredador que alcanza hasta 6 metros, usa las ampollas de Lorenzini electrorreceptoras de su hocico para detectar los tenues campos bioeléctricos de presas ocultas.",
        it: "Superpredatore che raggiunge i 6 metri, utilizza le ampolle di Lorenzini elettrorecettrici del muso per rilevare i deboli campi bioelettrici delle prede nascoste.",
      },
      {
        en: "Endothermic circulatory rete mirabile keeps stomach and swimming muscles up to 14°C warmer than surrounding water, letting it hunt efficiently in cool temperate seas.",
        es: "Una red circulatoria endotérmica (rete mirabile) mantiene su estómago y músculos natatorios hasta 14 °C más cálidos que el agua circundante, lo que le permite cazar con eficacia en mares templados fríos.",
        it: "Una rete circolatoria endotermica (rete mirabile) mantiene stomaco e muscoli natatori fino a 14°C più caldi dell'acqua circostante, permettendogli di cacciare con efficacia in mari temperati freddi.",
      },
      {
        en: "Ambushes seals from below with explosive vertical breaches near rocky pinniped colonies, launching its entire body clear of the surface.",
        es: "Emboscar focas desde abajo con explosivos saltos verticales cerca de colonias rocosas de pinnípedos, lanzando todo su cuerpo fuera del agua.",
        it: "Tende agguati alle foche dal basso con esplosivi balzi verticali vicino a colonie rocciose di pinnipedi, lanciando l'intero corpo fuori dall'acqua.",
      },
    ],
    image: {
      url: "/images/species/great-white-shark.jpg",
      photographer: "Bernard DUPONT",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Great_White_Shark_(Carcharodon_carcharias)_(32872319266).jpg",
      alt: "Great white shark swimming just below the water's surface, dorsal fin visible",
    },
    gbifTaxonKey: 2420694,
    rangeConfig: [],
  },

  // 65. Giant Oceanic Manta Ray
  {
    id: "giant-oceanic-manta-ray",
    commonName: { en: "Giant Oceanic Manta Ray", es: "Manta Gigante Oceánica", it: "Manta Oceanica Gigante" },
    scientificName: "Mobula birostris",
    taxonClass: "Chondrichthyes",
    order: "Myliobatiformes",
    family: "Myliobatidae",
    realm: "Marine",
    difficulty: "regional",
    iucnStatus: "EN",
    populationTrend: "decreasing",
    populationEstimate:
      "No global count exists; most studied aggregation sites hold only 42-2,000 individually identified rays, though the world's largest known population held over 22,000 individuals as of a 2022 study",
    populationHistory: [
      { year: 2022, estimate: 22000, label: "World's largest known aggregation, confirmed via 14 years of photo-identification (Harty et al. 2022) - over 10x any other studied site" },
    ],
    climateVulnerability: {
      en: "Depends on reliable upwelling and thermocline dynamics to concentrate the zooplankton it filters; ocean warming and increased stratification threaten to reduce productivity at key feeding aggregations.",
      es: "Depende de una dinámica fiable de afloramiento y termoclina para concentrar el zooplancton que filtra; el calentamiento oceánico y el aumento de la estratificación amenazan con reducir la productividad en sus principales zonas de alimentación.",
      it: "Dipende da una dinamica affidabile di risalita delle acque profonde e di termoclino per concentrare lo zooplancton che filtra; il riscaldamento oceanico e la crescente stratificazione minacciano di ridurre la produttività nelle principali aree di alimentazione.",
    },
    keyThreats: [
      {
        threat: "Targeted gill-plate fisheries",
        impact: "high",
        description: {
          en: "Hunted specifically for its feathery gill plates, dried and sold into traditional Asian medicine markets for as much as $400 per kilogram.",
          es: "Cazada específicamente por sus branquiespinas plumosas, que se secan y venden en mercados de medicina tradicional asiática por hasta 400 dólares el kilogramo.",
          it: "Cacciata specificamente per le sue branchiospine piumose, essiccate e vendute nei mercati della medicina tradizionale asiatica fino a 400 dollari al chilogrammo.",
        },
      },
      {
        threat: "Bycatch & entanglement",
        impact: "medium",
        description: {
          en: "Its large size, slow swimming speed, and tendency to aggregate make it prone to entanglement in gillnets and purse-seine gear set for other species.",
          es: "Su gran tamaño, su velocidad de nado lenta y su tendencia a agregarse la hacen propensa a enredarse en redes de enmalle y de cerco destinadas a otras especies.",
          it: "Le sue grandi dimensioni, la velocità di nuoto ridotta e la tendenza ad aggregarsi la rendono soggetta a impigliamento in reti da posta e reti a circuizione destinate ad altre specie.",
        },
      },
    ],
    diet: {
      en: "Filter feeder: zooplankton, copepods, shrimp larvae, and small fish, funneled into its mouth by paddle-like cephalic fins at both the surface and depths beyond 1,000 meters.",
      es: "Filtradora: zooplancton, copépodos, larvas de camarón y peces pequeños, dirigidos a su boca mediante aletas cefálicas en forma de pala, tanto en superficie como a más de 1.000 metros de profundidad.",
      it: "Filtratrice: zooplancton, copepodi, larve di gamberetto e piccoli pesci, incanalati verso la bocca da pinne cefaliche a forma di pagaia, sia in superficie sia a oltre 1.000 metri di profondità.",
    },
    clues: [
      {
        en: "Largest ray in the world, with a wingspan exceeding 7 meters, funneling plankton into its mouth using forward-facing cephalic lobes that unfurl like paddles while swimming.",
        es: "La raya más grande del mundo, con una envergadura de más de 7 metros, dirige el plancton hacia su boca mediante lóbulos cefálicos frontales que se despliegan como remos al nadar.",
        it: "La razza più grande del mondo, con un'apertura alare di oltre 7 metri, convoglia il plancton verso la bocca grazie a lobi cefalici anteriori che si dispiegano come remi durante il nuoto.",
      },
      {
        en: "Possesses the largest brain-to-body ratio of any fish and a distinctive dark ventral spot pattern unique to each individual, used by researchers for photo-identification.",
        es: "Posee la mayor proporción cerebro-cuerpo de cualquier pez y un patrón de manchas oscuras en el vientre único para cada individuo, empleado por los investigadores para la identificación fotográfica.",
        it: "Possiede il più alto rapporto cervello-corpo tra tutti i pesci e un motivo di macchie scure ventrali unico per ogni individuo, usato dai ricercatori per il fotoidentificazione.",
      },
      {
        en: "Performs repeated deep dives exceeding 1,000 meters into cold mesopelagic layers to forage, then returns to warm surface layers to rewarm its body.",
        es: "Realiza repetidas inmersiones profundas de más de 1.000 metros en frías capas mesopelágicas para alimentarse, y luego regresa a las cálidas capas superficiales para recalentar su cuerpo.",
        it: "Compie ripetute immersioni profonde oltre i 1.000 metri negli strati mesopelagici freddi per nutrirsi, per poi risalire agli strati superficiali caldi per riscaldare il corpo.",
      },
    ],
    image: {
      url: "/images/species/giant-oceanic-manta-ray.jpg",
      photographer: "Daniel Sasse",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Giant_oceanic_manta_ray.jpg",
      alt: "Giant oceanic manta ray gliding past a scuba diver amid a cloud of reef fish",
    },
    gbifTaxonKey: 9548142,
    rangeConfig: [],
  },

  // 66. Ocean Sunfish
  {
    id: "ocean-sunfish",
    commonName: { en: "Ocean Sunfish", es: "Pez Luna", it: "Pesce Luna" },
    scientificName: "Mola mola",
    taxonClass: "Actinopterygii",
    order: "Tetraodontiformes",
    family: "Molidae",
    realm: "Marine",
    difficulty: "iconic",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate:
      "No reliable count exists for this open-ocean species; suspected to have declined at least 30% over the last three generations (~30 years), chiefly from fisheries bycatch (IUCN 2015 assessment)",
    populationHistory: [],
    climateVulnerability: {
      en: "As a species that regularly dives below the thermocline to feed on deep-water prey then baskets at the surface to rewarm, shifts in thermocline depth and surface temperature from ocean warming could raise the energetic cost of every foraging dive.",
      es: "Al tratarse de una especie que se sumerge regularmente bajo la termoclina para alimentarse de presas de aguas profundas y luego se asolea en la superficie para recalentarse, los cambios en la profundidad de la termoclina y la temperatura superficial por el calentamiento oceánico podrían encarecer energéticamente cada inmersión de alimentación.",
      it: "Trattandosi di una specie che si immerge regolarmente sotto il termoclino per nutrirsi di prede di profondità per poi crogiolarsi in superficie per riscaldarsi, i cambiamenti nella profondità del termoclino e nella temperatura superficiale dovuti al riscaldamento oceanico potrebbero aumentare il costo energetico di ogni immersione di foraggiamento.",
    },
    keyThreats: [
      {
        threat: "Bycatch in swordfish drift-net fisheries",
        impact: "high",
        description: {
          en: "Comprises up to 71-90% of the total catch in some Mediterranean swordfish drift-net fisheries and roughly 29% of the California swordfish fishery's catch, despite having no commercial value.",
          es: "Constituye hasta el 71-90% de la captura total en algunas pesquerías mediterráneas de pez espada con redes de deriva, y cerca del 29% de la captura de la pesquería californiana de pez espada, pese a carecer de valor comercial.",
          it: "Costituisce fino al 71-90% della cattura totale in alcune pescherie mediterranee di pesce spada con reti derivanti, e circa il 29% della cattura della pesca californiana al pesce spada, pur non avendo valore commerciale.",
        },
      },
      {
        threat: "Plastic ingestion",
        impact: "medium",
        description: {
          en: "Mistakes floating plastic bags for its jellyfish and salp prey, leading to fatal digestive blockages.",
          es: "Confunde las bolsas de plástico flotantes con sus presas, medusas y salpas, lo que provoca obstrucciones digestivas mortales.",
          it: "Scambia i sacchetti di plastica galleggianti per le sue prede, meduse e salpe, causando ostruzioni digestive letali.",
        },
      },
    ],
    diet: {
      en: "Generalist predator: small fish, fish larvae, squid and other molluscs, crustaceans, and soft-bodied invertebrates; jellyfish and salps make up only a minor share of the diet.",
      es: "Depredador generalista: peces pequeños, larvas de peces, calamares y otros moluscos, crustáceos e invertebrados de cuerpo blando; las medusas y salpas representan solo una parte menor de la dieta.",
      it: "Predatore generalista: piccoli pesci, larve di pesce, calamari e altri molluschi, crostacei e invertebrati dal corpo molle; meduse e salpe costituiscono solo una parte minore della dieta.",
    },
    clues: [
      {
        en: "The heaviest bony fish alive, a nearly disc-shaped body lacking a true tail that can weigh over 2 tonnes, propelled by tall dorsal and anal fins beating in unison like a pair of wings.",
        es: "El pez óseo vivo más pesado, con un cuerpo casi discoidal que carece de una cola verdadera y puede superar las 2 toneladas, impulsado por altas aletas dorsal y anal que baten al unísono como un par de alas.",
        it: "Il pesce osseo vivente più pesante, con un corpo quasi discoidale privo di una vera coda che può superare le 2 tonnellate, spinto da alte pinne dorsale e anale che battono all'unisono come un paio di ali.",
      },
      {
        en: "Basks flat at the surface to let scavenging birds pick parasites from its thick, sandpaper-rough skin, then dives to depths below 600 meters to feed before returning to rewarm.",
        es: "Se tumba de lado en la superficie para que aves carroñeras le retiren parásitos de su piel gruesa y áspera como papel de lija, y luego se sumerge a más de 600 metros para alimentarse antes de regresar a recalentarse.",
        it: "Si adagia di lato in superficie lasciando che uccelli necrofagi le tolgano i parassiti dalla pelle spessa e ruvida come carta vetrata, per poi immergersi oltre i 600 metri di profondità per nutrirsi e infine risalire a riscaldarsi.",
      },
      {
        en: "A single female can release up to 300 million eggs in one spawning event, more than any other known vertebrate, though only a minute fraction ever reach adulthood.",
        es: "Una sola hembra puede liberar hasta 300 millones de huevos en un único evento de desove, más que cualquier otro vertebrado conocido, aunque solo una fracción mínima llega a la edad adulta.",
        it: "Una singola femmina può rilasciare fino a 300 milioni di uova in un solo evento riproduttivo, più di qualsiasi altro vertebrato conosciuto, sebbene solo una minima frazione raggiunga l'età adulta.",
      },
    ],
    image: {
      url: "/images/species/ocean-sunfish.jpg",
      photographer: "Photoabc",
      license: "CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sunfish_In_Blue_Water.jpg",
      alt: "Ocean sunfish basking sideways at the water's surface",
    },
    gbifTaxonKey: 5213725,
    rangeConfig: [],
  },

  // 67. Atlantic Bluefin Tuna
  {
    id: "atlantic-bluefin-tuna",
    commonName: { en: "Atlantic Bluefin Tuna", es: "Atún Rojo del Atlántico", it: "Tonno Rosso dell'Atlantico" },
    scientificName: "Thunnus thynnus",
    taxonClass: "Actinopterygii",
    order: "Perciformes",
    family: "Scombridae",
    realm: "Marine",
    difficulty: "regional",
    iucnStatus: "LC",
    populationTrend: "increasing",
    populationEstimate:
      "Stock status is tracked by spawning biomass rather than a headcount; ICCAT's assessments show the eastern Atlantic-Mediterranean spawning stock biomass collapsed roughly 74% between 1957-2007 before rebuilding to its highest level since the 1960s",
    populationHistory: [
      { year: 2006, estimate: 63039, label: "Total Atlantic-wide reported catch (landings + discards, tonnes; ICCAT) peaks amid stock-collapse warnings" },
      { year: 2011, estimate: 10382, label: "Catch bottoms out after emergency quota cuts under ICCAT's 2007 recovery plan" },
      { year: 2024, estimate: 42397, label: "Catch rebounds four-fold as the stock recovers; IUCN down-listed the species from Endangered to Least Concern in 2021" },
    ],
    climateVulnerability: {
      en: "Warming spawning-ground temperatures could shorten the viable spawning season and shift larval survival rates, while range shifts of prey species may alter traditional feeding migrations.",
      es: "El calentamiento de las temperaturas en las zonas de desove podría acortar la temporada reproductiva viable y alterar las tasas de supervivencia larvaria, mientras que los desplazamientos de las presas podrían modificar las migraciones tróficas tradicionales.",
      it: "Il riscaldamento delle temperature nelle aree di riproduzione potrebbe accorciare la stagione riproduttiva utile e alterare i tassi di sopravvivenza larvale, mentre gli spostamenti delle prede potrebbero modificare le tradizionali migrazioni trofiche.",
    },
    keyThreats: [
      {
        threat: "Historic overfishing for global sashimi markets",
        impact: "medium",
        description: {
          en: "Decades of catches far exceeding scientific quota advice, driven by intense demand from sashimi and sushi markets, pushed both Atlantic stocks toward collapse by the mid-2000s.",
          es: "Décadas de capturas muy superiores a las cuotas recomendadas científicamente, impulsadas por la intensa demanda de los mercados de sashimi y sushi, llevaron a ambas poblaciones atlánticas al borde del colapso a mediados de la década de 2000.",
          it: "Decenni di catture ben superiori alle quote raccomandate dalla scienza, spinte dall'intensa domanda dei mercati di sashimi e sushi, hanno portato entrambi gli stock atlantici sull'orlo del collasso a metà degli anni 2000.",
        },
      },
      {
        threat: "Aquaculture ranching of wild juveniles",
        impact: "medium",
        description: {
          en: "Wild juveniles are captured live and fattened in sea cages before slaughter, a practice that can remove fish before they reach spawning age if poorly regulated.",
          es: "Los juveniles silvestres se capturan vivos y se engordan en jaulas marinas antes del sacrificio, una práctica que, si no se regula bien, puede retirar peces antes de que alcancen la edad reproductiva.",
          it: "I giovani selvatici vengono catturati vivi e ingrassati in gabbie marine prima della macellazione, una pratica che, se non ben regolamentata, può sottrarre pesci prima che raggiungano l'età riproduttiva.",
        },
      },
    ],
    diet: {
      en: "Opportunistic pelagic predator: small schooling fish such as sardines, herring, mackerel, and sand eels, plus squid and crustaceans.",
      es: "Depredador pelágico oportunista: peces pequeños en cardumen como sardinas, arenques, caballas y lanzones, además de calamares y crustáceos.",
      it: "Predatore pelagico opportunista: piccoli pesci in banco come sardine, aringhe, sgombri e cicerelli, oltre a calamari e crostacei.",
    },
    keystoneRole: {
      en: "As one of the ocean's largest and fastest apex predators, it structures pelagic food webs by regulating populations of small schooling fish across vast areas of open ocean.",
      es: "Como uno de los depredadores apicales más grandes y veloces del océano, estructura las redes tróficas pelágicas al regular las poblaciones de peces pequeños en cardumen en vastas áreas de mar abierto.",
      it: "Essendo uno dei predatori apicali più grandi e veloci dell'oceano, struttura le reti trofiche pelagiche regolando le popolazioni di piccoli pesci in banco su vaste aree di mare aperto.",
    },
    conservationActions: {
      en: "ICCAT's 2007 multi-year recovery plan sharply cut catch quotas and introduced stricter monitoring, closed spawning-season fisheries, and minimum size limits; the resulting stock rebuild is widely cited as one of fisheries management's clearest success stories.",
      es: "El plan de recuperación plurianual de ICCAT de 2007 redujo drásticamente las cuotas de captura e introdujo un control más estricto, el cierre de pesquerías durante la temporada de desove y tallas mínimas; la recuperación resultante de la población se cita habitualmente como uno de los mayores éxitos de la gestión pesquera.",
      it: "Il piano di recupero pluriennale ICCAT del 2007 ha ridotto drasticamente le quote di cattura e introdotto controlli più severi, la chiusura della pesca durante la stagione riproduttiva e taglie minime; il conseguente recupero dello stock è spesso citato come uno dei maggiori successi della gestione della pesca.",
    },
    clues: [
      {
        en: "Endothermic pelagic predator maintaining core muscle temperatures up to 20°C above the surrounding water via a specialized counter-current heat exchanger, allowing sustained cruising speeds through cold water far from any coast.",
        es: "Depredador pelágico endotérmico que mantiene la temperatura muscular hasta 20 °C por encima del agua circundante gracias a un intercambiador de calor a contracorriente, lo que le permite mantener velocidades de crucero en aguas frías lejos de cualquier costa.",
        it: "Predatore pelagico endotermico che mantiene la temperatura muscolare fino a 20°C sopra quella dell'acqua circostante grazie a uno scambiatore di calore in controcorrente, consentendogli velocità di crociera sostenute in acque fredde lontano da qualsiasi costa.",
      },
      {
        en: "Undertakes transoceanic migrations exceeding 10,000 kilometers between cold-water feeding grounds and a warm, enclosed spawning sea where floating eggs hatch within two days.",
        es: "Realiza migraciones transoceánicas de más de 10.000 kilómetros entre zonas de alimentación en aguas frías y un mar cálido y cerrado donde desova, y sus huevos flotantes eclosionan en apenas dos días.",
        it: "Compie migrazioni transoceaniche di oltre 10.000 chilometri tra aree di alimentazione in acque fredde e un mare caldo e chiuso dove si riproduce, con le uova galleggianti che si schiudono in appena due giorni.",
      },
      {
        en: "Sports a sickle-shaped first dorsal fin and rows of small yellow finlets along its back, retracting its pectoral and dorsal fins into shallow body grooves to slice through the water at bursts beyond 70 km/h.",
        es: "Luce una primera aleta dorsal en forma de hoz y filas de pequeñas pínnulas amarillas en el dorso, y retrae las aletas pectoral y dorsal en surcos corporales para cortar el agua en arrancadas de más de 70 km/h.",
        it: "Sfoggia una prima pinna dorsale a forma di falce e file di piccole pinnule gialle lungo il dorso, e retrae le pinne pettorali e dorsale in solchi corporei per tagliare l'acqua in scatti oltre i 70 km/h.",
      },
    ],
    image: {
      url: "/images/species/atlantic-bluefin-tuna.jpg",
      photographer: "Danilo Cedrone (FAO)",
      license: "Public Domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Group_of_tuna.jpg",
      alt: "A school of Atlantic bluefin tuna swimming in open blue water",
    },
    gbifTaxonKey: 2373980,
    rangeConfig: [],
  },

  // 68. Greenland Shark
  {
    id: "greenland-shark",
    commonName: { en: "Greenland Shark", es: "Tiburón de Groenlandia", it: "Squalo della Groenlandia" },
    scientificName: "Somniosus microcephalus",
    taxonClass: "Chondrichthyes",
    order: "Squaliformes",
    family: "Somniosidae",
    realm: "Marine",
    difficulty: "endemic",
    iucnStatus: "VU",
    populationTrend: "unknown",
    populationEstimate:
      "Absolute population size is unknown. IUCN's 2020 reassessment inferred a 30-49% decline from historic liver-oil fishing and bycatch, while a 2025 Canadian demographic model spans a plausible range from a 57% increase to near-total collapse over the past century - reflecting how little is known about a species that may take 150 years to mature",
    populationHistory: [],
    climateVulnerability: {
      en: "Loss of sea ice is opening previously inaccessible deep, cold habitat to expanding fishing fleets, while shifting distributions of seal and fish prey may force a slow-growing species to alter foraging ranges it has used for centuries.",
      es: "La pérdida de hielo marino está abriendo hábitats profundos y fríos antes inaccesibles a flotas pesqueras en expansión, mientras que los cambios en la distribución de focas y peces presa podrían obligar a una especie de crecimiento lento a modificar zonas de forrajeo que ha usado durante siglos.",
      it: "La perdita di ghiaccio marino sta aprendo habitat profondi e freddi prima inaccessibili a flotte di pesca in espansione, mentre i cambiamenti nella distribuzione di foche e pesci preda potrebbero costringere una specie a crescita lenta a modificare aree di foraggiamento usate da secoli.",
    },
    keyThreats: [
      {
        threat: "Bycatch in bottom-trawl & longline fisheries",
        impact: "high",
        description: {
          en: "An estimated 3,500 individuals are caught incidentally each year in deep-water trawl and longline fisheries targeting other cold-water species.",
          es: "Se estima que unos 3.500 ejemplares quedan capturados accidentalmente cada año en pesquerías de arrastre de fondo y palangre dirigidas a otras especies de aguas frías.",
          it: "Si stima che circa 3.500 esemplari vengano catturati accidentalmente ogni anno nella pesca a strascico di profondità e con palamiti diretta ad altre specie di acque fredde.",
        },
      },
      {
        threat: "Historic liver-oil fishery",
        impact: "medium",
        description: {
          en: "Targeted through the mid-20th century for its oil-rich liver, once a major source of industrial lubricant and vitamin A, causing regional depletions that a slow-growing, late-maturing species struggles to reverse.",
          es: "Fue objeto de pesca dirigida hasta mediados del siglo XX por su hígado rico en aceite, antaño una fuente importante de lubricante industrial y vitamina A, lo que provocó agotamientos regionales que una especie de crecimiento lento y maduración tardía apenas logra revertir.",
          it: "Fu oggetto di pesca mirata fino alla metà del XX secolo per il suo fegato ricco di olio, un tempo importante fonte di lubrificante industriale e vitamina A, causando riduzioni regionali che una specie a crescita lenta e maturazione tardiva fatica a invertire.",
        },
      },
    ],
    diet: {
      en: "Opportunistic apex predator and scavenger: fish (cod, herring, halibut, redfish), seals, and carrion, including the occasional remains of large cetaceans and even land mammals swept out to sea.",
      es: "Superdepredador oportunista y carroñero: peces (bacalao, arenque, fletán, gallineta), focas y carroña, incluyendo ocasionalmente restos de grandes cetáceos e incluso de mamíferos terrestres arrastrados al mar.",
      it: "Superpredatore opportunista e necrofago: pesci (merluzzo, aringa, halibut, scorfano), foche e carogne, compresi occasionalmente resti di grandi cetacei e persino di mammiferi terrestri trascinati in mare.",
    },
    keystoneRole: {
      en: "As one of the only large apex predators in the cold, deep benthic zone it inhabits, it likely exerts top-down control on fish and pinniped populations in an ecosystem few other predators can access.",
      es: "Al ser uno de los pocos grandes depredadores apicales en la fría y profunda zona bentónica que habita, probablemente ejerce un control descendente sobre las poblaciones de peces y pinnípedos en un ecosistema al que pocos otros depredadores pueden acceder.",
      it: "Essendo uno dei pochi grandi predatori apicali della fredda e profonda zona bentonica che abita, esercita probabilmente un controllo dall'alto sulle popolazioni di pesci e pinnipedi in un ecosistema a cui pochi altri predatori possono accedere.",
    },
    clues: [
      {
        en: "Vertebrate record-holder for longevity, with radiocarbon dating of eye-lens proteins indicating lifespans of at least 272 years and possibly up to 400, reaching sexual maturity only after roughly 150 years of growth.",
        es: "Poseedor del récord de longevidad entre los vertebrados: la datación por radiocarbono de proteínas del cristalino ocular indica una esperanza de vida de al menos 272 años, posiblemente hasta 400, alcanzando la madurez sexual solo tras unos 150 años de crecimiento.",
        it: "Detentore del record di longevità tra i vertebrati: la datazione al radiocarbonio delle proteine del cristallino indica una durata di vita di almeno 272 anni, forse fino a 400, raggiungendo la maturità sessuale solo dopo circa 150 anni di crescita.",
      },
      {
        en: "Endures near-freezing deep water by loading its tissues with urea and trimethylamine N-oxide for osmotic balance, rendering the raw flesh toxic unless fermented or dried at length before eating.",
        es: "Soporta las aguas profundas casi congeladas cargando sus tejidos de urea y óxido de trimetilamina para el equilibrio osmótico, lo que hace tóxica su carne cruda a menos que se fermente o seque largamente antes de comerla.",
        it: "Sopporta le acque profonde quasi ghiacciate caricando i propri tessuti di urea e ossido di trimetilammina per l'equilibrio osmotico, rendendo la carne cruda tossica se non fermentata o essiccata a lungo prima di essere consumata.",
      },
      {
        en: "Nearly blind in adulthood, its corneas commonly clouded by a parasitic copepod that dangles from each eye, yet it hunts fast-swimming seals by ambush in perpetual darkness hundreds of meters down.",
        es: "Casi ciego en la edad adulta, con las córneas frecuentemente nubladas por un copépodo parásito que cuelga de cada ojo, aun así emboscar a focas veloces en la oscuridad perpetua a cientos de metros de profundidad.",
        it: "Quasi cieco in età adulta, con le cornee spesso annebbiate da un copepode parassita che pende da ciascun occhio, riesce comunque a tendere agguati a foche veloci nell'oscurità perpetua a centinaia di metri di profondità.",
      },
    ],
    image: {
      url: "/images/species/greenland-shark.jpg",
      photographer: "Hemming1952",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Greenland_shark_profile.jpg",
      alt: "Greenland shark swimming in dark, cold deep water with a parasite visible on its eye",
    },
    gbifTaxonKey: 2421162,
    rangeConfig: [],
  },

  // 69. European Eel
  {
    id: "european-eel",
    commonName: { en: "European Eel", es: "Anguila Europea", it: "Anguilla Europea" },
    scientificName: "Anguilla anguilla",
    taxonClass: "Actinopterygii",
    order: "Anguilliformes",
    family: "Anguillidae",
    realm: "Freshwater",
    difficulty: "regional",
    iucnStatus: "CR",
    populationTrend: "decreasing",
    populationEstimate:
      "No absolute population count exists; the standard glass-eel recruitment index used by European fisheries scientists has fallen below 5% of its 1980 baseline across monitored rivers",
    populationHistory: [
      { year: 1980, estimate: 100, label: "Glass-eel recruitment index baseline used by European fisheries scientists (ICES/WGEEL), set to 100 for reference" },
      { year: 2020, estimate: 3, label: "Recruitment index falls below 5% of the 1980 baseline across monitored rivers" },
    ],
    climateVulnerability: {
      en: "Shifting ocean currents and warming sea-surface temperatures in the mid-ocean spawning grounds may already be altering larval drift routes and survival, compounding a recruitment collapse already underway from other causes.",
      es: "Los cambios en las corrientes oceánicas y el calentamiento de la temperatura superficial del mar en las zonas de desove en alta mar podrían estar ya alterando las rutas de deriva larvaria y su supervivencia, agravando un colapso del reclutamiento ya en marcha por otras causas.",
      it: "I cambiamenti nelle correnti oceaniche e il riscaldamento della temperatura superficiale del mare nelle aree di riproduzione in mare aperto potrebbero già alterare le rotte di deriva larvale e la sopravvivenza, aggravando un collasso del reclutamento già in corso per altre cause.",
    },
    keyThreats: [
      {
        threat: "Illegal glass-eel trafficking",
        impact: "high",
        description: {
          en: "Juvenile glass eels are smuggled by the tonne to aquaculture farms in Asia, forming one of the largest wildlife-trafficking flows by value anywhere in the world.",
          es: "Las angulas juveniles son contrabandeadas por toneladas hacia granjas acuícolas en Asia, constituyendo uno de los mayores flujos de tráfico de fauna silvestre por valor económico en todo el mundo.",
          it: "Le ceche giovanili vengono contrabbandate a tonnellate verso allevamenti acquicoli in Asia, costituendo uno dei maggiori flussi di traffico di fauna selvatica per valore economico al mondo.",
        },
      },
      {
        threat: "River barriers & habitat loss",
        impact: "high",
        description: {
          en: "Dams, weirs, and pumping stations block migration routes between the sea and inland freshwater habitat, while wetland drainage has shrunk available growing habitat.",
          es: "Presas, azudes y estaciones de bombeo bloquean las rutas migratorias entre el mar y el hábitat de agua dulce interior, mientras que el drenaje de humedales ha reducido el hábitat de crecimiento disponible.",
          it: "Dighe, sbarramenti e stazioni di pompaggio bloccano le rotte migratorie tra il mare e l'habitat d'acqua dolce interno, mentre il prosciugamento delle zone umide ha ridotto l'habitat di crescita disponibile.",
        },
      },
    ],
    diet: {
      en: "Carnivorous generalist: aquatic insects, worms, molluscs, crustaceans, and small fish, hunted mostly at night by smell in murky fresh water; feeds heavily before migrating and then fasts entirely during its ocean spawning journey.",
      es: "Carnívoro generalista: insectos acuáticos, gusanos, moluscos, crustáceos y peces pequeños, cazados sobre todo de noche mediante el olfato en aguas dulces turbias; se alimenta intensamente antes de migrar y luego ayuna por completo durante su viaje reproductor oceánico.",
      it: "Carnivoro generalista: insetti acquatici, vermi, molluschi, crostacei e piccoli pesci, cacciati soprattutto di notte tramite l'olfatto in acque dolci torbide; si alimenta intensamente prima di migrare e poi digiuna completamente durante il viaggio riproduttivo oceanico.",
    },
    conservationActions: {
      en: "Listed on CITES Appendix II since 2009, banning exports outside the EU; the EU Eel Regulation (2007) requires member states to let at least 40% of pristine silver-eel biomass escape to sea, and Europol-coordinated operations have seized millions of illegally trafficked glass eels in recent years.",
      es: "Incluida en el Apéndice II de CITES desde 2009, lo que prohíbe su exportación fuera de la UE; el Reglamento europeo de la Anguila (2007) exige a los Estados miembros permitir que al menos el 40% de la biomasa virgen de angulas plateadas escape al mar, y operaciones coordinadas por Europol han incautado millones de angulas de contrabando en los últimos años.",
      it: "Inserita nell'Appendice II CITES dal 2009, con divieto di esportazione fuori dall'UE; il Regolamento europeo Anguilla (2007) impone agli Stati membri di lasciar fuggire in mare almeno il 40% della biomassa vergine di anguille argentate, e operazioni coordinate da Europol hanno sequestrato milioni di ceche di contrabbando negli ultimi anni.",
    },
    clues: [
      {
        en: "Undergoes a radical multi-stage metamorphosis: a flat, transparent larva drifts across the open ocean for up to three years before transforming into a glass-clear juvenile that swims up rivers.",
        es: "Sufre una radical metamorfosis en varias etapas: una larva plana y transparente deriva por mar abierto hasta tres años antes de transformarse en un juvenil transparente como el cristal que remonta los ríos.",
        it: "Subisce una radicale metamorfosi in più fasi: una larva piatta e trasparente deriva in mare aperto fino a tre anni prima di trasformarsi in un giovane trasparente come il vetro che risale i fiumi.",
      },
      {
        en: "Spends up to two decades maturing in fresh water before undergoing a final transformation-darkening skin, enlarging eyes, degenerating its gut-to swim thousands of kilometers back to the open ocean to spawn once and die.",
        es: "Pasa hasta dos décadas madurando en agua dulce antes de sufrir una transformación final -piel oscurecida, ojos agrandados, aparato digestivo atrofiado- para nadar miles de kilómetros de vuelta al océano abierto, desovar una sola vez y morir.",
        it: "Trascorre fino a due decenni maturando in acqua dolce prima di subire una trasformazione finale -pelle scurita, occhi ingranditi, apparato digerente atrofizzato- per nuotare migliaia di chilometri fino all'oceano aperto, riprodursi una sola volta e morire.",
      },
      {
        en: "Can absorb oxygen directly through its skin and survive out of water for hours if kept moist, allowing it to wriggle overland between isolated ponds and wetlands.",
        es: "Puede absorber oxígeno directamente a través de la piel y sobrevivir fuera del agua durante horas si se mantiene húmeda, lo que le permite reptar por tierra entre estanques y humedales aislados.",
        it: "Può assorbire ossigeno direttamente attraverso la pelle e sopravvivere fuori dall'acqua per ore se mantenuta umida, il che le permette di strisciare sulla terraferma tra stagni e zone umide isolate.",
      },
    ],
    image: {
      url: "/images/species/european-eel.jpg",
      photographer: "Nevit Dilmen",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Freshwater_eel_00997_Nevit.jpg",
      alt: "European eel resting on a river bed among stones",
    },
    gbifTaxonKey: 5212973,
    rangeConfig: [],
  },

  // 70. Electric Eel
  {
    id: "electric-eel",
    commonName: { en: "Electric Eel", es: "Anguila Eléctrica", it: "Anguilla Elettrica" },
    scientificName: "Electrophorus electricus",
    taxonClass: "Actinopterygii",
    order: "Gymnotiformes",
    family: "Gymnotidae",
    realm: "Freshwater",
    difficulty: "endemic",
    iucnStatus: "LC",
    populationTrend: "stable",
    populationEstimate:
      "No formal census exists for this widespread, cryptic, mostly nocturnal fish; considered common throughout its range, though a 2019 genetic study revealed the species long treated as one is actually three, complicating any historical population comparisons",
    populationHistory: [],
    climateVulnerability: {
      en: "Its obligate air-breathing already buffers it against the low-oxygen stress that warming water causes most fish, but longer and more extreme seasonal droughts could shrink or fragment the floodplain channels it depends on.",
      es: "Su respiración aérea obligada ya la protege del estrés por bajo oxígeno que el calentamiento del agua provoca en la mayoría de los peces, pero sequías estacionales más largas e intensas podrían reducir o fragmentar los canales de las llanuras inundables de los que depende.",
      it: "La sua respirazione aerea obbligata la protegge già dallo stress da scarsità di ossigeno che il riscaldamento dell'acqua provoca nella maggior parte dei pesci, ma siccità stagionali più lunghe e intense potrebbero ridurre o frammentare i canali delle pianure alluvionali da cui dipende.",
    },
    keyThreats: [
      {
        threat: "Habitat degradation & aquarium collection",
        impact: "low",
        description: {
          en: "Deforestation of riverbank vegetation and localized water pollution degrade floodplain habitat, while limited collection for the aquarium trade adds minor pressure in some areas.",
          es: "La deforestación de la vegetación ribereña y la contaminación localizada del agua degradan el hábitat de las llanuras inundables, mientras que la recolección limitada para el comercio de acuariofilia añade una presión menor en algunas zonas.",
          it: "La deforestazione della vegetazione ripariale e l'inquinamento localizzato dell'acqua degradano l'habitat delle pianure alluvionali, mentre la raccolta limitata per il commercio d'acquariofilia aggiunge una pressione minore in alcune aree.",
        },
      },
    ],
    diet: {
      en: "Carnivore: fish and, opportunistically, amphibians, small mammals, and invertebrates, often stunned with electric discharges before capture; juveniles rely mainly on aquatic invertebrates.",
      es: "Carnívoro: peces y, de forma oportunista, anfibios, pequeños mamíferos e invertebrados, a menudo aturdidos con descargas eléctricas antes de ser capturados; los juveniles dependen principalmente de invertebrados acuáticos.",
      it: "Carnivoro: pesci e, in modo opportunistico, anfibi, piccoli mammiferi e invertebrati, spesso storditi con scariche elettriche prima della cattura; i giovani dipendono principalmente da invertebrati acquatici.",
    },
    clues: [
      {
        en: "Generates biological electricity up to 860 volts and 1 ampere from three specialized abdominal organs, delivering pulses at up to 500 hertz to stun prey or deter predators.",
        es: "Genera electricidad biológica de hasta 860 voltios y 1 amperio a partir de tres órganos abdominales especializados, emitiendo pulsos de hasta 500 hercios para aturdir presas o disuadir depredadores.",
        it: "Genera elettricità biologica fino a 860 volt e 1 ampere grazie a tre organi addominali specializzati, emettendo impulsi fino a 500 hertz per stordire le prede o dissuadere i predatori.",
      },
      {
        en: "An obligate air-breather that must surface roughly every ten minutes to gulp air through a modified, richly vascularized mouth lining, tolerating profoundly oxygen-poor water in seasonally flooded forest channels.",
        es: "Respirador aéreo obligado que debe salir a la superficie cada diez minutos aproximadamente para tragar aire a través de un revestimiento bucal modificado y muy vascularizado, tolerando aguas extremadamente pobres en oxígeno en canales de bosques inundados estacionalmente.",
        it: "Respiratore aereo obbligato che deve emergere circa ogni dieci minuti per inghiottire aria attraverso una mucosa boccale modificata e riccamente vascolarizzata, tollerando acque estremamente povere di ossigeno nei canali di foreste allagate stagionalmente.",
      },
      {
        en: "Nearly blind and covered in electroreceptive skin, it navigates murky blackwater channels almost entirely by continuously emitting low-voltage electrolocation pulses.",
        es: "Casi ciega y cubierta de piel electrorreceptora, se orienta en canales de aguas oscuras y turbias casi por completo mediante la emisión continua de pulsos de electrolocalización de bajo voltaje.",
        it: "Quasi cieca e ricoperta di pelle elettrorecettrice, si orienta in canali di acque scure e torbide quasi esclusivamente emettendo in continuazione impulsi di elettrolocalizzazione a basso voltaggio.",
      },
    ],
    image: {
      url: "/images/species/electric-eel.jpg",
      photographer: "Stan Shebs",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Electrophorus_electricus_3.jpg",
      alt: "Close-up of an electric eel's head and eye",
    },
    gbifTaxonKey: 2401958,
    rangeConfig: [],
  },
];
