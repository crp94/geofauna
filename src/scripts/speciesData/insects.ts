import type { RawSpeciesEntry } from "./types";

export const insects: RawSpeciesEntry[] = [
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
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate: "~Millions (migratory populations)",
    populationHistory: [
      { year: 1995, estimate: 300000000 },
      { year: 2010, estimate: 100000000 },
      { year: 2022, estimate: 50000000, label: "Migratory subspecies assessed Endangered on IUCN Red List" },
      { year: 2024, estimate: 45000000 },
    ],
    climateVulnerability: {
      en: "Unseasonable winter cold snaps and storms in high-altitude fir microclimates cause severe freezing mortality.",
      es: "Heladas extemporáneas y tormentas en microclimas de bosque de abetos causan alta mortandad.",
      it: "Gelate anomale e tempeste nei boschi montani provocano elevata mortalità invernale.",
    },
    conservationActions: {
      en: "The species Danaus plexippus as a whole is assessed Least Concern, since it includes many stable non-migratory populations worldwide. The migratory North American subspecies (D. p. plexippus) described here was separately assessed Endangered by the IUCN in 2022, then reassessed Vulnerable in December 2023 after further data review — it remains a conservation priority even though the full species is not threatened.",
      es: "La especie Danaus plexippus en su conjunto está catalogada como de Preocupación Menor, ya que incluye numerosas poblaciones no migratorias estables en todo el mundo. La subespecie migratoria norteamericana (D. p. plexippus) descrita aquí fue evaluada por separado como En Peligro por la UICN en 2022, y reclasificada como Vulnerable en diciembre de 2023 tras revisar más datos; sigue siendo una prioridad de conservación aunque la especie completa no esté amenazada.",
      it: "La specie Danaus plexippus nel suo insieme è classificata come a Minore Preoccupazione, poiché comprende numerose popolazioni non migratorie stabili in tutto il mondo. La sottospecie migratoria nordamericana (D. p. plexippus) qui descritta è stata valutata separatamente come In Pericolo dalla IUCN nel 2022, per poi essere riclassificata come Vulnerabile nel dicembre 2023 dopo un'ulteriore revisione dei dati; resta una priorità di conservazione anche se la specie nel complesso non è minacciata.",
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

  // 12. Apollo Butterfly
  {
    id: "apollo-butterfly",
    commonName: { en: "Apollo Butterfly", es: "Mariposa Apolo", it: "Parnassio Apollo" },
    scientificName: "Parnassius apollo",
    taxonClass: "Insecta",
    order: "Lepidoptera",
    family: "Papilionidae",
    realm: "Terrestrial",
    difficulty: "iconic",
    iucnStatus: "LC",
    populationTrend: "decreasing",
    populationEstimate:
      "Not quantified rangewide; still locally common in favorable habitat but in long-term regional decline, with entire subpopulations lost from parts of its range",
    populationHistory: [],
    climateVulnerability: {
      en: "A cold-adapted mountain specialist already living near its thermal limits; warming temperatures push suitable open, rocky habitat further upslope and let encroaching scrub and forest shade out the low, sun-loving plants its caterpillars depend on.",
      es: "Especialista de montaña adaptado al frío que ya vive cerca de su límite térmico; el calentamiento empuja el hábitat rocoso y abierto hacia mayores altitudes y permite que matorrales y bosque invasor sombreen las plantas de sol que necesitan sus orugas.",
      it: "Specialista montano adattato al freddo che vive già vicino al proprio limite termico; il riscaldamento spinge l'habitat roccioso e aperto verso quote più elevate e permette a cespugli e foresta di invadere ombreggiando le piante amanti del sole da cui dipendono i bruchi.",
    },
    keyThreats: [
      {
        threat: "Habitat succession & afforestation",
        impact: "high",
        description: {
          en: "Abandonment of traditional grazing and controlled burning lets scrub and conifer plantations close over the open, sun-exposed slopes its larval host plants require.",
          es: "El abandono del pastoreo tradicional y las quemas controladas permite que matorrales y plantaciones de coníferas cubran las laderas abiertas y soleadas que necesitan sus plantas nutricias.",
          it: "L'abbandono del pascolo tradizionale e degli incendi controllati permette a cespugli e piantagioni di conifere di richiudere i versanti aperti e soleggiati necessari alle piante nutrici delle larve.",
        },
      },
      {
        threat: "Historical over-collecting",
        impact: "medium",
        description: {
          en: "Prized by collectors for over a century for its size and eyespot pattern, with some isolated mountain colonies depleted directly by unregulated capture.",
          es: "Codiciada por coleccionistas durante más de un siglo por su tamaño y sus ocelos, con algunas colonias montañosas aisladas mermadas directamente por la captura no regulada.",
          it: "Ricercata dai collezionisti per oltre un secolo per le dimensioni e gli ocelli, con alcune colonie montane isolate impoverite direttamente dalla cattura non regolamentata.",
        },
      },
    ],
    diet: {
      en: "Larvae feed exclusively on low, fleshy-leaved stonecrop and houseleek plants; adults sip nectar from thistles and other alpine flowers.",
      es: "Las orugas se alimentan exclusivamente de crasuláceas de hoja carnosa (uvas de gato y siemprevivas); los adultos liban néctar de cardos y otras flores de montaña.",
      it: "I bruchi si nutrono esclusivamente di piante grasse a foglia carnosa (borracine e semprevivi); gli adulti succhiano nettare da cardi e altri fiori di montagna.",
    },
    keystoneRole: {
      en: "A flagship indicator of intact, sun-exposed montane grassland — its presence signals low shrub cover and an undisturbed rocky-meadow plant community.",
      es: "Especie bandera indicadora de pastizales de montaña intactos y soleados; su presencia señala baja cobertura de matorral y una comunidad vegetal rocosa no perturbada.",
      it: "Specie bandiera indicatrice di praterie montane intatte e soleggiate; la sua presenza segnala scarsa copertura arbustiva e una comunità vegetale rupestre non disturbata.",
    },
    conservationActions: {
      en: "Assessed Least Concern globally in 2021 because the species remains widespread across many mountain systems, but this masks severe regional collapse: numbers crashed in the 1950s across part of its northern range, and one national-park population fell to only about 20 individuals in the early 1990s before recovering through captive breeding and habitat management. It was the first butterfly ever granted legal protection, and is now listed on CITES Appendix II and protected by law in several countries.",
      es: "Catalogada como de Preocupación Menor a nivel global en 2021 porque la especie sigue ampliamente distribuida por numerosos macizos montañosos, pero esto oculta un colapso regional severo: sus poblaciones se desplomaron en la década de 1950 en parte de su área septentrional, y una población en un parque nacional cayó a solo unos 20 individuos a principios de los años 1990 antes de recuperarse mediante cría en cautividad y gestión del hábitat. Fue la primera mariposa protegida legalmente en la historia y hoy figura en el Apéndice II de CITES y está protegida por ley en varios países.",
      it: "Classificata come a Minore Preoccupazione a livello globale nel 2021 poiché la specie resta ampiamente distribuita su numerosi sistemi montuosi, ma ciò nasconde un grave collasso regionale: le popolazioni crollarono negli anni '50 in parte del suo areale settentrionale, e una popolazione in un parco nazionale scese a soli 20 individui circa nei primi anni '90 prima di riprendersi grazie ad allevamento in cattività e gestione dell'habitat. Fu la prima farfalla ad ottenere una tutela legale nella storia ed è oggi inclusa nell'Appendice II CITES e protetta per legge in diversi paesi.",
    },
    clues: [
      {
        en: "Found on open, sun-baked rocky slopes and meadows at high elevation, where its caterpillars feed only on low, fleshy-leaved stonecrop growing between exposed stones.",
        es: "Habita laderas rocosas soleadas y prados de altitud, donde sus orugas se alimentan solo de crasuláceas de hoja carnosa que crecen entre piedras expuestas.",
        it: "Vive su versanti rocciosi soleggiati e prati d'alta quota, dove i suoi bruchi si nutrono solo di piante grasse a foglia carnosa che crescono tra le pietre esposte.",
      },
      {
        en: "Carries large red eyespots ringed in black on its hindwings that intensify in strong sunlight, while males seal each newly mated female with an external waxy plug to block further mating.",
        es: "Presenta grandes ocelos rojos bordeados de negro en las alas posteriores que se intensifican con el sol, mientras los machos sellan a cada hembra recién apareada con un tapón externo de cera para impedir más apareamientos.",
        it: "Porta grandi ocelli rossi bordati di nero sulle ali posteriori che si intensificano sotto il sole forte, mentre i maschi sigillano ogni femmina appena fecondata con un tappo di cera esterno per impedire ulteriori accoppiamenti.",
      },
      {
        en: "Single-brooded and slow to develop, overwintering as an egg through the cold season and restricted to places with cold winters, sunny summers, and almost no woody shrub cover.",
        es: "Univoltina y de desarrollo lento, pasa el invierno en forma de huevo y solo persiste donde los inviernos son fríos, los veranos soleados y la cobertura de matorral es casi nula.",
        it: "Univoltina e a sviluppo lento, sverna come uovo e sopravvive solo dove gli inverni sono freddi, le estati soleggiate e la copertura arbustiva quasi assente.",
      },
    ],
    image: {
      url: "/images/species/apollo-butterfly.jpg",
      photographer: "Björn S...",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Apollo_-_Parnassius_apollo_(14380769256).jpg",
      alt: "Apollo butterfly with red eyespots resting on a thistle flower",
    },
    rangeConfig: [{ minLon: -9.0, maxLon: 145.0, minLat: 36.0, maxLat: 68.0 }],
  },

  // 13. Rosalia Longicorn
  {
    id: "rosalia-longicorn",
    commonName: { en: "Rosalia Longicorn", es: "Escarabajo Rosalia", it: "Cerambice del Faggio" },
    scientificName: "Rosalia alpina",
    taxonClass: "Insecta",
    order: "Coleoptera",
    family: "Cerambycidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "VU",
    populationTrend: "decreasing",
    populationEstimate:
      "Not quantified rangewide; a naturally low-density, patchily distributed specialist increasingly confined to isolated pockets of old-growth forest",
    populationHistory: [],
    climateVulnerability: {
      en: "Bound to old, sun-warmed broadleaf trunks at mid-elevation; rising temperatures and shifting rainfall are altering the forests it depends on faster than the beetle, with a multi-year larval stage, can track.",
      es: "Ligado a troncos viejos y soleados de frondosas en media montaña; el aumento de temperaturas y los cambios en las lluvias están alterando los bosques de los que depende más rápido de lo que el escarabajo, con una fase larvaria de varios años, puede seguir.",
      it: "Legato a vecchi tronchi di latifoglie riscaldati dal sole a media quota; l'aumento delle temperature e i cambiamenti delle piogge stanno alterando i boschi da cui dipende più rapidamente di quanto lo stadio larvale pluriennale del coleottero possa seguire.",
    },
    keyThreats: [
      {
        threat: "Removal of dead & veteran trees",
        impact: "high",
        description: {
          en: "Modern forestry that clears dead wood, felled trunks, and old hollowing trees eliminates the only substrate in which its larvae can develop.",
          es: "La silvicultura moderna que elimina madera muerta, troncos caídos y árboles viejos huecos suprime el único sustrato donde pueden desarrollarse sus larvas.",
          it: "La selvicoltura moderna che rimuove legno morto, tronchi abbattuti e alberi vecchi cavi elimina l'unico substrato in cui le larve possono svilupparsi.",
        },
      },
    ],
    diet: {
      en: "Larvae bore and feed within dead or dying broadleaf wood for several years; adults feed on pollen and on sap oozing from injured bark.",
      es: "Las larvas excavan y se alimentan durante varios años de madera muerta o moribunda de frondosas; los adultos se alimentan de polen y savia que rezuma de la corteza dañada.",
      it: "Le larve scavano e si nutrono per diversi anni di legno morto o deperiente di latifoglie; gli adulti si nutrono di polline e linfa che trasuda dalla corteccia danneggiata.",
    },
    keystoneRole: {
      en: "A flagship saproxylic (deadwood-dependent) species: its presence indicates a forest old enough and undisturbed enough to sustain a whole community of wood-recycling insects.",
      es: "Especie bandera saproxílica (dependiente de madera muerta): su presencia indica un bosque suficientemente viejo y no perturbado para sustentar toda una comunidad de insectos recicladores de madera.",
      it: "Specie bandiera saproxilica (dipendente dal legno morto): la sua presenza indica una foresta abbastanza vecchia e indisturbata da sostenere un'intera comunità di insetti riciclatori del legno.",
    },
    conservationActions: {
      en: "Strictly protected under EU law and by national legislation in several countries. Its global IUCN assessment (Vulnerable, criteria A1c) dates to 1996 and has not been formally revisited since, even though range contraction from forest management has continued.",
      es: "Estrictamente protegida por la legislación de la UE y por leyes nacionales en varios países. Su evaluación global de la UICN (Vulnerable, criterio A1c) data de 1996 y no se ha actualizado formalmente desde entonces, aunque la contracción de su área por la gestión forestal ha continuado.",
      it: "Rigorosamente protetta dalla normativa dell'UE e dalla legge nazionale in diversi paesi. La sua valutazione IUCN globale (Vulnerabile, criterio A1c) risale al 1996 e non è stata formalmente aggiornata da allora, sebbene la contrazione dell'areale dovuta alla gestione forestale sia proseguita.",
    },
    clues: [
      {
        en: "Restricted to old, unmanaged broadleaf forest with standing dead wood and sun-exposed trunks, where its larvae need several years inside the timber to complete development.",
        es: "Restringido a bosques caducifolios viejos y no gestionados con madera muerta en pie y troncos soleados, donde sus larvas necesitan varios años dentro de la madera para completar su desarrollo.",
        it: "Limitato a boschi decidui vecchi e non gestiti con legno morto in piedi e tronchi soleggiati, dove le larve necessitano di diversi anni all'interno del legno per completare lo sviluppo.",
      },
      {
        en: "Powder blue-gray body with black patches that can rub off when handled, plus antennae in males that can reach roughly twice the length of the body.",
        es: "Cuerpo gris azulado polvoriento con manchas negras que pueden desprenderse al manipularlo, y antenas que en los machos pueden alcanzar casi el doble de la longitud del cuerpo.",
        it: "Corpo grigio-azzurro polveroso con macchie nere che possono staccarsi al tatto, e antenne che nei maschi possono raggiungere quasi il doppio della lunghezza del corpo.",
      },
      {
        en: "Communicates by stridulation, rasping specialized ridges on its body to produce an audible squeak when threatened or during encounters with rivals.",
        es: "Se comunica por estridulación, raspando crestas especializadas de su cuerpo para producir un chirrido audible cuando se siente amenazado o al encontrarse con rivales.",
        it: "Comunica per stridulazione, sfregando creste specializzate del corpo per produrre uno stridio udibile quando è minacciato o durante incontri con rivali.",
      },
    ],
    image: {
      url: "/images/species/rosalia-longicorn.jpg",
      photographer: "Frank Vassen",
      license: "CC BY 2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Alpenbock_Rosalia_longicorn_(Rosalia_alpina),_Domogled-Valea_Cernei_National_Park,_Romania_(53293396065).jpg",
      alt: "Blue-gray Rosalia longicorn beetle with long banded antennae resting on cut beech wood",
    },
    rangeConfig: [{ minLon: -9.0, maxLon: 45.0, minLat: 36.0, maxLat: 50.0 }],
  },

  // 14. Rusty Patched Bumblebee
  {
    id: "rusty-patched-bumblebee",
    commonName: { en: "Rusty Patched Bumblebee", es: "Abejorro de Parche Oxidado", it: "Bombo dalla Toppa Rugginosa" },
    scientificName: "Bombus affinis",
    taxonClass: "Insecta",
    order: "Hymenoptera",
    family: "Apidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "CR",
    populationTrend: "decreasing",
    populationEstimate:
      "Not quantified in absolute numbers; relative abundance fell an estimated 92.54% between the 1990s and 2010s, and the species has vanished from roughly 87% of its historical range",
    populationHistory: [],
    climateVulnerability: {
      en: "Colonies depend on a narrow spring-to-fall active season timed to flower bloom; shifting bloom timing and more frequent early- and late-season frosts can strand solitary queens before or after the flowers they need are available.",
      es: "Las colonias dependen de una estrecha temporada activa de primavera a otoño sincronizada con la floración; los cambios en el momento de floración y las heladas tempranas o tardías más frecuentes pueden dejar a las reinas solitarias sin flores disponibles.",
      it: "Le colonie dipendono da una stretta stagione attiva dalla primavera all'autunno sincronizzata con la fioritura; i cambiamenti nei tempi di fioritura e gelate precoci o tardive più frequenti possono lasciare le regine solitarie senza fiori disponibili.",
    },
    keyThreats: [
      {
        threat: "Pathogen spillover from commercial pollinators",
        impact: "high",
        description: {
          en: "Parasites and disease amplified in commercially reared bumblebee colonies spilled over into wild populations, coinciding with the species' catastrophic 1990s crash.",
          es: "Parásitos y enfermedades amplificados en colonias de abejorros criadas comercialmente se propagaron a poblaciones silvestres, coincidiendo con el colapso catastrófico de la especie en la década de 1990.",
          it: "Parassiti e malattie amplificati nelle colonie di bombi allevate commercialmente si sono propagati alle popolazioni selvatiche, coincidendo con il crollo catastrofico della specie negli anni '90.",
        },
      },
      {
        threat: "Pesticide exposure",
        impact: "high",
        description: {
          en: "Systemic insecticides applied to farmland and gardens accumulate in nectar and pollen and in the soil above underground nests and hibernating queens.",
          es: "Los insecticidas sistémicos aplicados en cultivos y jardines se acumulan en el néctar, el polen y el suelo sobre los nidos subterráneos y las reinas hibernantes.",
          it: "Gli insetticidi sistemici applicati su coltivi e giardini si accumulano nel nettare, nel polline e nel suolo sopra i nidi sotterranei e le regine in ibernazione.",
        },
      },
    ],
    diet: {
      en: "Generalist pollinator visiting a wide range of native wildflowers; uses buzz pollination to shake pollen loose from flowers such as cranberry relatives that many other bees cannot pollinate efficiently.",
      es: "Polinizador generalista que visita una amplia variedad de flores silvestres nativas; emplea la polinización por vibración para liberar el polen de flores como los arándanos rojos, que muchas otras abejas no pueden polinizar eficazmente.",
      it: "Impollinatore generalista che visita un'ampia varietà di fiori selvatici nativi; utilizza l'impollinazione a vibrazione per liberare il polline da fiori come i mirtilli rossi, che molte altre api non riescono a impollinare efficacemente.",
    },
    keystoneRole: {
      en: "A wide-foraging pollinator once common enough to help sustain both wild plant communities and insect-pollinated crops across its range; its collapse is treated as a bellwether for wild bee decline generally.",
      es: "Polinizador de amplio radio de forrajeo, antaño lo bastante común como para sostener tanto comunidades de plantas silvestres como cultivos polinizados por insectos; su colapso se considera un indicador temprano del declive general de las abejas silvestres.",
      it: "Impollinatore dal raggio di foraggiamento ampio, un tempo abbastanza comune da sostenere sia comunità di piante selvatiche sia colture impollinate da insetti; il suo collasso è considerato un segnale d'allarme per il declino generale delle api selvatiche.",
    },
    conservationActions: {
      en: "Assessed Critically Endangered by the IUCN in 2015 after relative abundance fell an estimated 92.54% in about a decade; became the first bee species granted federal endangered-species protection in the continental United States in 2017. Surviving colonies now persist only in small, scattered patches rather than as a continuous population.",
      es: "Catalogada En Peligro Crítico por la UICN en 2015 tras una caída estimada del 92,54% en su abundancia relativa en aproximadamente una década; se convirtió en 2017 en la primera especie de abeja con protección federal como especie en peligro en el territorio continental de Estados Unidos. Las colonias supervivientes persisten hoy solo en parches pequeños y dispersos, no como una población continua.",
      it: "Classificata In Pericolo Critico dalla IUCN nel 2015 dopo un calo stimato del 92,54% nell'abbondanza relativa in circa un decennio; nel 2017 è diventata la prima specie di ape a ottenere protezione federale come specie in pericolo negli Stati Uniti continentali. Le colonie superstiti sopravvivono oggi solo in piccole macchie disperse, non come popolazione continua.",
    },
    clues: [
      {
        en: "Workers and males show a distinct rust-colored patch on the second abdominal segment, set against otherwise black-and-yellow banding.",
        es: "Las obreras y los machos muestran un parche de color óxido en el segundo segmento abdominal, sobre un fondo de bandas negras y amarillas.",
        it: "Le operaie e i maschi mostrano una macchia color ruggine sul secondo segmento addominale, su uno sfondo di bande nere e gialle.",
      },
      {
        en: "Each spring a single mated queen, having overwintered alone underground, must found an entire colony by herself before any workers exist to help her.",
        es: "Cada primavera, una única reina fecundada que ha hibernado sola bajo tierra debe fundar toda una colonia por sí misma antes de que existan obreras que la ayuden.",
        it: "Ogni primavera un'unica regina fecondata, dopo aver svernato da sola sottoterra, deve fondare da sola un'intera colonia prima che esistano operaie ad aiutarla.",
      },
      {
        en: "Nests underground in abandoned rodent burrows and needs three separate habitat types within close reach: open foraging ground, a hidden nest site, and loose soil for winter hibernation.",
        es: "Anida bajo tierra en madrigueras abandonadas de roedores y necesita tres tipos de hábitat distintos muy próximos entre sí: terreno abierto para forrajear, un nido oculto y suelo suelto para hibernar en invierno.",
        it: "Nidifica sottoterra in tane abbandonate di roditori e necessita di tre tipi di habitat distinti molto vicini tra loro: terreno aperto per il foraggiamento, un nido nascosto e suolo soffice per l'ibernazione invernale.",
      },
    ],
    image: {
      url: "/images/species/rusty-patched-bumblebee.jpg",
      photographer: "Jill Utrup / USFWS Midwest Region",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rusty_Patched_Bumble_Bee_on_Wild_Bergamot_(28626833097).jpg",
      alt: "Rusty patched bumblebee with a rust-colored abdominal patch foraging on wild bergamot",
    },
    rangeConfig: [{ minLon: -97.0, maxLon: -75.0, minLat: 36.0, maxLat: 50.0 }],
  },

  // 15. Pharaoh Cicada
  {
    id: "periodical-cicada",
    commonName: { en: "Pharaoh Cicada", es: "Cigarra del Faraón", it: "Cicala del Faraone" },
    scientificName: "Magicicada septendecim",
    taxonClass: "Insecta",
    order: "Hemiptera",
    family: "Cicadidae",
    realm: "Terrestrial",
    difficulty: "regional",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate:
      "Not quantified rangewide; local emergence densities can exceed 1 million individuals per hectare in peak years, yet several regional broods have been extirpated entirely since the 19th century",
    populationHistory: [],
    climateVulnerability: {
      en: "Nymphs rely on a precise underground thermal cue to trigger synchronized emergence after 17 years; warmer soil temperatures are causing some broods to emerge several years earlier than expected, breaking the synchrony that protects them from predators.",
      es: "Las ninfas dependen de una señal térmica subterránea precisa para desencadenar una emergencia sincronizada tras 17 años; el aumento de la temperatura del suelo hace que algunas generaciones emerjan varios años antes de lo esperado, rompiendo la sincronía que las protege de los depredadores.",
      it: "Le ninfe dipendono da un preciso segnale termico sotterraneo per innescare un'emersione sincronizzata dopo 17 anni; l'aumento della temperatura del suolo fa sì che alcune generazioni emergano diversi anni prima del previsto, rompendo la sincronia che le protegge dai predatori.",
    },
    keyThreats: [
      {
        threat: "Deforestation & urban development",
        impact: "high",
        description: {
          en: "Because nymphs need 17 uninterrupted years of root-feeding underground, clearing or paving a woodland just once can permanently erase an entire brood, even where the adults were once seen in the billions.",
          es: "Como las ninfas necesitan 17 años ininterrumpidos alimentándose de raíces bajo tierra, talar o pavimentar un bosque una sola vez puede borrar de forma permanente toda una generación, incluso donde antes se veían miles de millones de adultos.",
          it: "Poiché le ninfe necessitano di 17 anni ininterrotti di alimentazione sulle radici sotterranee, disboscare o asfaltare un bosco anche una sola volta può cancellare permanentemente un'intera generazione, anche dove un tempo si vedevano miliardi di adulti.",
        },
      },
    ],
    diet: {
      en: "Nymphs spend nearly their entire 17-year life underground feeding on dilute xylem sap from tree roots; adults feed little, if at all, during their few above-ground weeks.",
      es: "Las ninfas pasan casi toda su vida de 17 años bajo tierra alimentándose de savia diluida del xilema de las raíces; los adultos apenas se alimentan, si es que lo hacen, durante sus pocas semanas en superficie.",
      it: "Le ninfe trascorrono quasi tutta la loro vita di 17 anni sottoterra nutrendosi di linfa xilematica diluita dalle radici; gli adulti si nutrono poco o nulla durante le poche settimane trascorse in superficie.",
    },
    keystoneRole: {
      en: "Mass emergences deliver an enormous, brief pulse of food and nutrients into forest ecosystems, briefly satiating predators and later decomposing to fertilize the very trees whose roots fed the nymphs.",
      es: "Las emergencias masivas aportan un pulso enorme y breve de alimento y nutrientes a los ecosistemas forestales, saciando temporalmente a los depredadores y, tras descomponerse, fertilizando los mismos árboles cuyas raíces alimentaron a las ninfas.",
      it: "Le emersioni di massa forniscono un impulso enorme e breve di cibo e nutrienti agli ecosistemi forestali, saziando temporaneamente i predatori e, decomponendosi, fertilizzando gli stessi alberi le cui radici avevano nutrito le ninfe.",
    },
    conservationActions: {
      en: "Its IUCN assessment (Near Threatened) dates to 1996 and has not been formally revisited, despite well-documented local extinctions of individual broods — most famously one last seen in the 1950s — driven by land clearing that eliminated the unbroken tree cover nymphs need for their multi-decade underground development.",
      es: "Su evaluación de la UICN (Casi Amenazada) data de 1996 y no ha sido revisada formalmente, pese a extinciones locales bien documentadas de generaciones concretas —la más conocida, observada por última vez en la década de 1950— provocadas por la tala que eliminó la cubierta arbórea continua que las ninfas necesitan para su desarrollo subterráneo de varias décadas.",
      it: "La sua valutazione IUCN (Quasi Minacciata) risale al 1996 e non è stata formalmente rivista, nonostante estinzioni locali ben documentate di singole generazioni — la più nota, osservata per l'ultima volta negli anni '50 — causate dal disboscamento che ha eliminato la copertura arborea continua necessaria alle ninfe per il loro sviluppo sotterraneo pluridecennale.",
    },
    clues: [
      {
        en: "Nymphs tunnel and feed on root sap several meters underground for exactly seventeen years before emerging in perfect synchrony, sometimes in densities exceeding a million individuals per hectare.",
        es: "Las ninfas excavan y se alimentan de savia de raíces a varios metros bajo tierra durante exactamente diecisiete años antes de emerger en perfecta sincronía, a veces en densidades que superan el millón de individuos por hectárea.",
        it: "Le ninfe scavano e si nutrono della linfa delle radici a diversi metri di profondità per esattamente diciassette anni prima di emergere in perfetta sincronia, a volte con densità che superano il milione di individui per ettaro.",
      },
      {
        en: "Adults have piercing red compound eyes and produce one of the loudest sounds in the insect world through a pair of ribbed membranes on the abdomen, forming a deafening chorus for a few weeks each generation.",
        es: "Los adultos tienen llamativos ojos compuestos rojos y producen uno de los sonidos más fuertes del mundo de los insectos mediante un par de membranas acanaladas en el abdomen, formando un coro ensordecedor durante unas pocas semanas cada generación.",
        it: "Gli adulti hanno vistosi occhi composti rossi e producono uno dei suoni più forti del mondo degli insetti tramite un paio di membrane rigate sull'addome, formando un coro assordante per poche settimane ad ogni generazione.",
      },
      {
        en: "Its precisely timed, prime-numbered life cycle is thought to have evolved so that no predator population can synchronize its own reproduction to reliably exploit the emergence.",
        es: "Se cree que su ciclo de vida, temporizado con precisión y de duración un número primo de años, evolucionó para que ningún depredador pueda sincronizar su propia reproducción y explotar de forma fiable la emergencia.",
        it: "Si ritiene che il suo ciclo vitale, calibrato con precisione e della durata di un numero primo di anni, si sia evoluto affinché nessun predatore possa sincronizzare la propria riproduzione per sfruttare in modo affidabile l'emersione.",
      },
    ],
    image: {
      url: "/images/species/periodical-cicada.jpg",
      photographer: "Judy Gallagher",
      license: "CC BY 2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Periodical_Cicada_-_Magicicada_septendecim,_Merrimac_Farm_Wildlife_Management_Area,_Aden,_Virginia.jpg",
      alt: "Freshly emerged periodical cicada with red eyes beside its shed nymphal skin on a leaf",
    },
    rangeConfig: [{ minLon: -95.0, maxLon: -70.0, minLat: 33.0, maxLat: 45.0 }],
  },

  // 16. Richmond Birdwing
  {
    id: "richmond-birdwing",
    commonName: {
      en: "Richmond Birdwing",
      es: "Mariposa Ala de Pájaro de Richmond",
      it: "Farfalla Ali d'Uccello di Richmond",
    },
    scientificName: "Ornithoptera richmondia",
    taxonClass: "Insecta",
    order: "Lepidoptera",
    family: "Papilionidae",
    realm: "Terrestrial",
    difficulty: "endemic",
    iucnStatus: "NT",
    populationTrend: "decreasing",
    populationEstimate:
      "Not quantified; now absent from major cities within its former range and persisting only in scattered rainforest remnants after its core lowland habitat was reduced to roughly 1% of its original extent",
    populationHistory: [],
    climateVulnerability: {
      en: "Highland colonies depend on cool, moist rainforest and shift seasonally to lower elevations to survive winter; a warming climate compresses the narrow altitude band in which both its habitat and its larval host vines can persist.",
      es: "Las colonias de montaña dependen de selva fresca y húmeda y se desplazan estacionalmente a menor altitud para sobrevivir al invierno; el calentamiento climático comprime la estrecha franja de altitud en la que pueden persistir tanto su hábitat como sus lianas nutricias larvales.",
      it: "Le colonie d'altura dipendono da foresta pluviale fresca e umida e si spostano stagionalmente a quote più basse per sopravvivere all'inverno; il riscaldamento climatico comprime la stretta fascia altitudinale in cui possono persistere sia il suo habitat sia le liane nutrici delle larve.",
    },
    keyThreats: [
      {
        threat: "Rainforest clearing & fragmentation",
        impact: "high",
        description: {
          en: "Land clearing for settlement and agriculture destroyed most of the lowland rainforest that once held its native larval host vine, leaving only fragmented, edge-degraded patches.",
          es: "La tala para asentamientos y agricultura destruyó la mayor parte de la selva de tierras bajas que albergaba su liana nutricia nativa, dejando solo parches fragmentados y degradados en sus bordes.",
          it: "Il disboscamento per insediamenti e agricoltura ha distrutto gran parte della foresta pluviale di pianura che un tempo ospitava la sua liana nutrice nativa, lasciando solo lembi frammentati e degradati ai margini.",
        },
      },
      {
        threat: "Toxic invasive host-plant lookalike",
        impact: "high",
        description: {
          en: "An ornamental vine from a related genus, planted widely as a garden substitute, closely resembles the native host but is toxic to caterpillars that mistakenly feed on it, creating an ecological trap.",
          es: "Una liana ornamental de un género emparentado, plantada ampliamente como sustituto de jardín, se parece mucho a la planta nutricia nativa pero es tóxica para las orugas que se alimentan de ella por error, creando una trampa ecológica.",
          it: "Una liana ornamentale di un genere affine, piantata diffusamente come sostituto da giardino, somiglia molto alla pianta nutrice nativa ma è tossica per i bruchi che se ne nutrono per errore, creando una trappola ecologica.",
        },
      },
    ],
    diet: {
      en: "Larvae feed exclusively on one native vine species in the lowlands and a second, related vine at higher elevation; adults take nectar from a range of flowering trees and shrubs.",
      es: "Las orugas se alimentan exclusivamente de una especie de liana nativa en tierras bajas y de una segunda liana emparentada en altitud; los adultos toman néctar de diversos árboles y arbustos en flor.",
      it: "I bruchi si nutrono esclusivamente di una specie di liana nativa in pianura e di una seconda liana affine in quota; gli adulti si nutrono di nettare da vari alberi e arbusti in fiore.",
    },
    keystoneRole: {
      en: "A flagship species for rainforest restoration, motivating community replanting of its native larval host vines along corridors intended to reconnect fragmented forest patches.",
      es: "Especie bandera para la restauración de la selva, que impulsa la replantación comunitaria de sus lianas nutricias nativas a lo largo de corredores destinados a reconectar fragmentos de bosque.",
      it: "Specie bandiera per il ripristino della foresta pluviale, che promuove la ripiantumazione comunitaria delle sue liane nutrici native lungo corridoi destinati a riconnettere i frammenti forestali.",
    },
    historicalContraction: {
      percentageLoss: 99,
      description: {
        en: "The lowland subtropical rainforest that once held its core native larval host vine has been reduced to roughly 1% of its original extent, eliminating the butterfly entirely from areas where it was once common.",
        es: "La selva subtropical de tierras bajas que antaño albergaba su principal liana nutricia nativa se ha reducido a aproximadamente el 1% de su extensión original, eliminando por completo a la mariposa de zonas donde antes era común.",
        it: "La foresta pluviale subtropicale di pianura che un tempo ospitava la sua principale liana nutrice nativa si è ridotta a circa l'1% della sua estensione originaria, eliminando del tutto la farfalla da aree dove un tempo era comune.",
      },
    },
    conservationActions: {
      en: "Assessed Near Threatened by the IUCN (2022); a dedicated recovery network now runs community plantings of the native host vines along habitat corridors and campaigns against the toxic ornamental lookalike vine to reverse a century of decline.",
      es: "Catalogada Casi Amenazada por la UICN (2022); una red de recuperación dedicada organiza actualmente plantaciones comunitarias de las lianas nutricias nativas a lo largo de corredores de hábitat y campañas contra la liana ornamental tóxica que la imita, para revertir un siglo de declive.",
      it: "Classificata Quasi Minacciata dalla IUCN (2022); una rete di recupero dedicata organizza oggi piantumazioni comunitarie delle liane nutrici native lungo corridoi di habitat e campagne contro la liana ornamentale tossica che la imita, per invertire un secolo di declino.",
    },
    clues: [
      {
        en: "Caterpillars can develop on only one native vine species in warm lowland forest and a second, related vine at cooler higher elevation, forcing highland colonies to shift downslope each winter to survive.",
        es: "Las orugas solo pueden desarrollarse en una especie de liana nativa en la selva cálida de tierras bajas y en una segunda liana emparentada en altitudes más frescas, lo que obliga a las colonias de montaña a desplazarse a menor altitud cada invierno para sobrevivir.",
        it: "I bruchi possono svilupparsi solo su un'unica specie di liana nativa nella foresta calda di pianura e su una seconda liana affine alle quote più fresche, costringendo le colonie d'altura a spostarsi a quote inferiori ogni inverno per sopravvivere.",
      },
      {
        en: "Iridescent green and gold wing patches flash against black margins, with males marked by a small red patch at the base of the wings and a rapid, powerful flight generated mainly by the forewings.",
        es: "Manchas alares verdes y doradas iridiscentes destacan sobre márgenes negros; los machos presentan una pequeña mancha roja en la base de las alas y un vuelo rápido y potente generado principalmente por las alas anteriores.",
        it: "Macchie alari verdi e dorate iridescenti risaltano su margini neri; i maschi presentano una piccola macchia rossa alla base delle ali e un volo rapido e potente generato principalmente dalle ali anteriori.",
      },
      {
        en: "Larvae die if they mistakenly feed on a toxic ornamental vine that closely resembles their native host plant, an ecological trap that appears wherever the lookalike has been planted as garden cover.",
        es: "Las orugas mueren si se alimentan por error de una liana ornamental tóxica muy parecida a su planta nutricia nativa, una trampa ecológica que aparece allí donde se ha plantado esa liana similar como cobertura de jardín.",
        it: "I bruchi muoiono se si nutrono per errore di una liana ornamentale tossica molto simile alla loro pianta nutrice nativa, una trappola ecologica che compare ovunque questa liana simile sia stata piantata come copertura da giardino.",
      },
    ],
    image: {
      url: "/images/species/richmond-birdwing.jpg",
      photographer: "Dr Don Sands, CSIRO",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_11322_Richmond_Birdwing_butterfly.jpg",
      alt: "Freshly emerged Richmond birdwing butterfly with iridescent green wings beside its empty chrysalis",
    },
    rangeConfig: [{ minLon: 152.0, maxLon: 154.0, minLat: -29.0, maxLat: -25.0 }],
  },
];
