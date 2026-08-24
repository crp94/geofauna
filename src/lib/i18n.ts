import { IUCNStatus, Language } from "../types/species";

export const translations = {
  en: {
    siteTitle: "GeoFauna · The Species Distribution Game",
    tagline: "Deduce where Earth's species roam",
    daily: "Daily",
    unlimited: "Unlimited",
    archive: "Catalog",
    about: "About & Open Data",
    stats: "Stats",
    rules: "How to Play",
    settings: "Settings",
    share: "Share Result",
    copied: "Copied to clipboard!",
    
    // Tools
    brushSize: "Brush Size",
    fine: "Fine (150 km)",
    medium: "Medium (450 km)",
    broad: "Broad (1000 km)",
    eraser: "Eraser",
    brush: "Brush",
    landSnap: "Land Snap",
    oceanSnap: "Ocean Snap",
    undo: "Undo",
    clear: "Clear",
    submitGuess: "Submit Distribution",
    paintingHint: "Click & drag on the Robinson map to paint the species' native distribution",
    
    // Species Card
    cluesTitle: "Ecological Clues",
    scientificName: "Scientific Name",
    taxonomy: "Taxonomy",
    nativeRealm: "Habitat Realm",
    difficulty: "Difficulty",
    difficultyIconic: "Iconic",
    difficultyRegional: "Regional",
    difficultyEndemic: "Endemic",
    imageCredit: "Photo credit",
    license: "License",
    
    // Results & Scoring
    resultTitle: "Distribution Analysis",
    accuracyScore: "Spatial Accuracy",
    letterGrade: "Rank",
    iouLabel: "Intersection over Union (IoU)",
    diceLabel: "Dice / F1 Overlap",
    precisionLabel: "Precision",
    recallLabel: "Recall (Coverage)",
    proximityLabel: "Proximity Tolerance",
    overlapLegend: "Native Range Hit",
    overestimateLegend: "Overestimated Range",
    missedLegend: "Missed Native Range",
    nextDailyIn: "Next Daily Species in",
    playAgain: "Next Species",
    
    // Grades
    gradeS: "Apex Naturalist",
    gradeA: "Field Biologist",
    gradeB: "Park Ranger",
    gradeC: "Wild Explorer",
    gradeD: "Novice Scout",
    
    // Conservation Card
    conservationTitle: "Conservation Status & Ecology",
    iucnMeterTitle: "IUCN Red List Status",
    populationTrajectory: "Historical Population Trajectory",
    climateVulnerabilityTitle: "2050 Climate Vulnerability",
    keyThreatsTitle: "Primary Threats to Survival",
    ecologicalNicheTitle: "Ecological Niche & Diet",
    conservationActionTitle: "Active Conservation & Rewilding",
    historicalContractionTitle: "Historical Range Contraction",
    
    // IUCN Statuses
    iucnLC: "Least Concern",
    iucnNT: "Near Threatened",
    iucnVU: "Vulnerable",
    iucnEN: "Endangered",
    iucnCR: "Critically Endangered",
    iucnEW: "Extinct in the Wild",
    iucnEX: "Extinct",
    
    // Stats Modal
    statsTitle: "Your Naturalist Career",
    played: "Played",
    completed: "Completed",
    currStreak: "Current Streak",
    maxStreak: "Max Streak",
    avgScore: "Average Score",
    gradeDistribution: "Rank Distribution",
    
    // How to play modal
    howToPlayTitle: "How to Play GeoFauna",
    step1: "1. Inspect the species: Examine its scientific taxonomy, photo, biomes, and ecological clues.",
    step2: "2. Paint the range: Use the Robinson projection map to paint where you believe the species naturally lives.",
    step3: "3. Submit & compare: Contrast your prediction against the current learning extent using IoU and spatial accuracy.",
    step4: "4. Explore the context: Read ecological notes, conservation categories, and linked biodiversity registries.",
    step2Detail: "Zoom and pan for precision, then choose from five brush sizes down to 50 km.",
    openScienceTitle: "Open Science & Biodiversity Data",
    openScienceBody:
      "GeoFauna uses Natural Earth cartography and openly linked biodiversity registries. Playable ranges are occurrence-derived extents built from GBIF density data with documented filters — see the methodology page for the full pipeline.",
    gotIt: "Got it, let's play!",

    // Spatial feedback
    feedbackTooBroad: "Your outline was broad. Keep the core region, then trim the overreach.",
    feedbackTooNarrow: "Your outline was focused. Extend it to cover more of the range.",
    feedbackStrong: "Strong balance between coverage and restraint.",
    feedbackBalanced: "A balanced attempt. Use the reveal to compare the edge of each region.",

    // Filters
    filtersLabel: "Filters",
    filterAllDifficulties: "All difficulties",
    filterAllClasses: "All classes",
    filterAllIucn: "All IUCN statuses",
    randomizeSpecies: "Random species",
    taxonMammals: "Mammals",
    taxonBirds: "Birds",
    taxonReptiles: "Reptiles",
    taxonAmphibians: "Amphibians",
    taxonFish: "Fish",
    taxonInsects: "Insects",

    // Score panel
    gradeLabel: "Grade",
    scoreSubtitle: "Occurrence-derived range contrasted against your prediction",
    iouShort: "IoU Overlap",
    diceShort: "Dice / F1",
    precisionShort: "Precision",
    recallShort: "Recall",
    spatialReadLabel: "Spatial read:",
    meanMissLabel: "Mean miss:",
    guessSizeLabel: "Guess size:",
    hitLabel: "Hit:",
    overestimatedLabel: "Overestimated:",
    missedLabel: "Missed:",
    difficultyAdjusted:
      "Difficulty-adjusted score — calibrated so every species is judged against what a careful naturalist could attain.",
    expeditionReport: "Expedition Report",

    // Header / accessibility
    changeLanguage: "Change language",
    muteSounds: "Mute sounds",
    unmuteSounds: "Unmute sounds",
    close: "Close",
    skipToMap: "Skip to map toolbar",

    // Species hero
    viewAttribution: "View attribution",
    learningRangeTitle: "Playable range",
    learningRangeBody:
      "An occurrence-derived extent built from open GBIF data for play and learning — not an assessor-produced range map.",
    methodAndVersion: "Method and version",
    evidenceSnapshotTitle: "Open evidence snapshot",
    evidenceSnapshotEmpty: "No eligible records in this sample",
    retrievedLabel: "Retrieved",
    fieldNotes: "Field Notes",

    // Map canvas
    oceanLabel: "Ocean",
    landLabel: "Land",
    hoverHit: "Range hit",
    hoverOver: "Overestimated",
    hoverMissed: "Missed range",
    paintingHintShort: "Paint the range on the map",
    projectionStamp: "Robinson projection · 1:110m",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetView: "Reset view",
    zoomHint: "Zoom in for precision — pinch or scroll",
    panTool: "Pan",

    // Toolbar
    brushVeryFine: "Very fine (50 km)",
    brushFine100: "Fine (100 km)",

    // Conservation card
    editorialContext: "Conservation context",
    trendIncreasing: "Increasing",
    trendDecreasing: "Decreasing",
    trendStable: "Stable",
    trendUnknown: "Unknown",
    rangeContractionLabel: "Range contraction",
    climateContextTitle: "Climate context",
    climateDisclaimer:
      "A qualitative learning note, not a quantified projection. Consult the linked registries for primary records.",
    impactHigh: "High",
    impactMedium: "Medium",
    impactLow: "Low",
    registriesTitle: "Open Biodiversity Registries & Citizen Science",
    gbifRegistry: "GBIF Registry",
    taxonNumber: "Accession",
    gbifRecords: "indexed occurrence records",
    gbifExplore: "Explore indexed occurrence records and taxonomy",
    gbifCta: "Explore on GBIF",
    inatObservations: "recorded community observations",
    inatExplore: "Explore community observations and field photos",
    inatCta: "View on iNaturalist",
    iucnShortLC: "Least Concern",
    iucnShortNT: "Near Threat.",
    iucnShortVU: "Vulnerable",
    iucnShortEN: "Endangered",
    iucnShortCR: "Crit. End.",
    iucnShortEW: "Extinct Wild",
    iucnShortEX: "Extinct",

    // Language modal
    selectLanguage: "Select language",

    // Archive
    backToGame: "Back to game",
    catalogTitle: "Species Catalog",
    catalogEyebrow: "The Specimen Collection",
    catalogHeading: "Every Species in the Catalog",
    catalogIntro:
      "Explore all {count} curated species in GeoFauna's biodiversity catalog, each with occurrence-derived range data and open citizen-science cross-references.",
    searchPlaceholder: "Search species...",
    realmTerrestrial: "Terrestrial",
    realmMarine: "Marine",
    realmFreshwater: "Freshwater",
    realmCoastal: "Coastal",
    tierSuffix: "Tier",

    // Species page
    backToCatalog: "Back to catalog",
    playThisSpecies: "Play this species",
    realmLabel: "Realm",
    iucnContextLabel: "Conservation status",
    provenanceTitle: "Data provenance",
    provenanceBody:
      "This range is an occurrence-derived learning extent, not an official assessment range map. See the methodology page for the complete pipeline.",
    evidenceTitle: "Evidence snapshot",
    evidenceBody: "A sample of openly-licensed occurrence records retained after quality filtering.",
    inspectGbif: "Inspect on GBIF",
    retainedDatasets: "Retained datasets",

    // Footer
    footerTitle: "GeoFauna · A Naturalist's Atlas of Living Species",
    footerSources: "Cartography and linked biodiversity resources:",
    footerSource: "Source on GitHub",
    moreGames: "Games & Projects",

    // Daily / community
    nextExpedition: "Next expedition in",
    yesterdaysSpecies: "Yesterday's species",
    communityToday: "Today",
    communityPlayers: "players",
    communityAverage: "average",
    communityPercentile: "you scored higher than {pct}% of naturalists",
    dayLabel: "Expedition",
  },
  es: {
    siteTitle: "GeoFauna · El juego de distribución de especies",
    tagline: "Deduce dónde habitan las especies de la Tierra",
    daily: "Diario",
    unlimited: "Ilimitado",
    archive: "Catálogo",
    about: "Datos Abiertos y Ciencia",
    stats: "Estadísticas",
    rules: "Cómo Jugar",
    settings: "Ajustes",
    share: "Compartir Resultado",
    copied: "¡Copiado al portapapeles!",
    
    // Tools
    brushSize: "Tamaño de Pincel",
    fine: "Fino (150 km)",
    medium: "Medio (450 km)",
    broad: "Amplio (1000 km)",
    eraser: "Borrador",
    brush: "Pincel",
    landSnap: "Ajuste a Tierra",
    oceanSnap: "Ajuste a Océano",
    undo: "Deshacer",
    clear: "Borrar Todo",
    submitGuess: "Enviar Distribución",
    paintingHint: "Haz clic y arrastra sobre el mapa en proyección Robinson para pintar la distribución",
    
    // Species Card
    cluesTitle: "Pistas Ecológicas",
    scientificName: "Nombre Científico",
    taxonomy: "Taxonomía",
    nativeRealm: "Hábitat",
    difficulty: "Dificultad",
    difficultyIconic: "Icónico",
    difficultyRegional: "Regional",
    difficultyEndemic: "Endémico",
    imageCredit: "Fotografía",
    license: "Licencia",
    
    // Results & Scoring
    resultTitle: "Análisis de Distribución",
    accuracyScore: "Precisión Espacial",
    letterGrade: "Rango",
    iouLabel: "Intersección sobre Unión (IoU)",
    diceLabel: "Solapamiento Dice / F1",
    precisionLabel: "Precisión",
    recallLabel: "Cobertura (Recall)",
    proximityLabel: "Tolerancia de Proximidad",
    overlapLegend: "Acierto de Rango Nativo",
    overestimateLegend: "Rango Sobrestimado",
    missedLegend: "Rango No Detectado",
    nextDailyIn: "Siguiente Especie Diaria en",
    playAgain: "Siguiente Especie",
    
    // Grades
    gradeS: "Naturalista Supremo",
    gradeA: "Biólogo de Campo",
    gradeB: "Guarda Forestal",
    gradeC: "Explorador Salvaje",
    gradeD: "Rastreador Novato",
    
    // Conservation Card
    conservationTitle: "Estado de Conservación y Ecología",
    iucnMeterTitle: "Estado en la Lista Roja UICN",
    populationTrajectory: "Trayectoria Histórica de Población",
    climateVulnerabilityTitle: "Vulnerabilidad Climática a 2050",
    keyThreatsTitle: "Amenazas Principales para la Especie",
    ecologicalNicheTitle: "Nicho Ecológico y Dieta",
    conservationActionTitle: "Acciones de Conservación y Reintroducción",
    historicalContractionTitle: "Contracción Histórica del Rango",
    
    // IUCN Statuses
    iucnLC: "Preocupación Menor",
    iucnNT: "Casi Amenazada",
    iucnVU: "Vulnerable",
    iucnEN: "En Peligro",
    iucnCR: "En Peligro Crítico",
    iucnEW: "Extinta en Estado Silvestre",
    iucnEX: "Extinta",
    
    // Stats Modal
    statsTitle: "Tu Carrera Naturalista",
    played: "Jugadas",
    completed: "Completadas",
    currStreak: "Racha Actual",
    maxStreak: "Racha Máxima",
    avgScore: "Puntuación Media",
    gradeDistribution: "Distribución de Rangos",
    
    // How to play modal
    howToPlayTitle: "Cómo Jugar a GeoFauna",
    step1: "1. Examina la especie: Analiza su taxonomía científica, foto, biomas y pistas ecológicas.",
    step2: "2. Pinta la distribución: Usa el mapa en proyección Robinson para pintar dónde vive naturalmente la especie.",
    step3: "3. Envía y compara: Contrasta tu predicción con el área de aprendizaje actual mediante IoU y precisión espacial.",
    step4: "4. Explora el contexto: Lee notas ecológicas, categorías de conservación y registros de biodiversidad enlazados.",
    step2Detail: "Acerca el zoom y desplázate para mayor precisión, y elige entre cinco tamaños de pincel desde 50 km.",
    openScienceTitle: "Ciencia Abierta y Datos de Biodiversidad",
    openScienceBody:
      "GeoFauna utiliza cartografía de Natural Earth y registros de biodiversidad enlazados abiertamente. Las áreas jugables son extensiones derivadas de registros de ocurrencia, construidas a partir de datos de densidad de GBIF con filtros documentados — consulta la página de metodología para ver el proceso completo.",
    gotIt: "Entendido, ¡a jugar!",

    // Spatial feedback
    feedbackTooBroad: "Tu contorno fue demasiado amplio. Conserva el núcleo de la región y recorta el exceso.",
    feedbackTooNarrow: "Tu contorno fue muy ceñido. Amplíalo para cubrir más del área de distribución.",
    feedbackStrong: "Buen equilibrio entre cobertura y contención.",
    feedbackBalanced: "Un intento equilibrado. Usa la revelación para comparar el borde de cada región.",

    // Filters
    filtersLabel: "Filtros",
    filterAllDifficulties: "Todas las dificultades",
    filterAllClasses: "Todas las clases",
    filterAllIucn: "Todos los estados UICN",
    randomizeSpecies: "Especie aleatoria",
    taxonMammals: "Mamíferos",
    taxonBirds: "Aves",
    taxonReptiles: "Reptiles",
    taxonAmphibians: "Anfibios",
    taxonFish: "Peces",
    taxonInsects: "Insectos",

    // Score panel
    gradeLabel: "Grado",
    scoreSubtitle: "Área de distribución derivada de registros de ocurrencia, contrastada con tu predicción",
    iouShort: "Solapamiento IoU",
    diceShort: "Dice / F1",
    precisionShort: "Precisión",
    recallShort: "Cobertura",
    spatialReadLabel: "Lectura espacial:",
    meanMissLabel: "Desvío medio:",
    guessSizeLabel: "Tamaño del intento:",
    hitLabel: "Acierto:",
    overestimatedLabel: "Sobrestimado:",
    missedLabel: "No detectado:",
    difficultyAdjusted:
      "Puntuación ajustada por dificultad — calibrada para que cada especie se evalúe frente a lo que un naturalista cuidadoso podría lograr.",
    expeditionReport: "Informe de Expedición",

    // Header / accesibilidad
    changeLanguage: "Cambiar idioma",
    muteSounds: "Silenciar sonidos",
    unmuteSounds: "Activar sonidos",
    close: "Cerrar",
    skipToMap: "Saltar a la barra de herramientas del mapa",

    // Species hero
    viewAttribution: "Ver atribución",
    learningRangeTitle: "Área jugable",
    learningRangeBody:
      "Una extensión derivada de registros de ocurrencia, construida a partir de datos abiertos de GBIF para jugar y aprender — no es un mapa de distribución elaborado por un evaluador.",
    methodAndVersion: "Método y versión",
    evidenceSnapshotTitle: "Instantánea de evidencia abierta",
    evidenceSnapshotEmpty: "No hay registros elegibles en esta muestra",
    retrievedLabel: "Obtenido",
    fieldNotes: "Notas de Campo",

    // Map canvas
    oceanLabel: "Océano",
    landLabel: "Tierra",
    hoverHit: "Acierto de rango",
    hoverOver: "Sobrestimado",
    hoverMissed: "Rango no detectado",
    paintingHintShort: "Pinta el área en el mapa",
    projectionStamp: "Proyección Robinson · 1:110m",
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    resetView: "Restablecer vista",
    zoomHint: "Acerca el zoom para más precisión — pellizca o desplaza",
    panTool: "Desplazar",

    // Toolbar
    brushVeryFine: "Muy fino (50 km)",
    brushFine100: "Fino (100 km)",

    // Conservation card
    editorialContext: "Contexto de conservación",
    trendIncreasing: "En aumento",
    trendDecreasing: "En descenso",
    trendStable: "Estable",
    trendUnknown: "Desconocido",
    rangeContractionLabel: "Contracción del rango",
    climateContextTitle: "Contexto climático",
    climateDisclaimer:
      "Una nota didáctica cualitativa, no una proyección cuantificada. Consulta los registros enlazados para ver datos primarios.",
    impactHigh: "Alto",
    impactMedium: "Medio",
    impactLow: "Bajo",
    registriesTitle: "Registros Abiertos de Biodiversidad y Ciencia Ciudadana",
    gbifRegistry: "Registro GBIF",
    taxonNumber: "N.º de acceso",
    gbifRecords: "registros de ocurrencia indexados",
    gbifExplore: "Explora los registros de ocurrencia y la taxonomía indexados",
    gbifCta: "Explorar en GBIF",
    inatObservations: "observaciones comunitarias registradas",
    inatExplore: "Explora observaciones comunitarias y fotografías de campo",
    inatCta: "Ver en iNaturalist",
    iucnShortLC: "Preocupación Menor",
    iucnShortNT: "Casi Amenazada",
    iucnShortVU: "Vulnerable",
    iucnShortEN: "En Peligro",
    iucnShortCR: "Peligro Crít.",
    iucnShortEW: "Extinta Silv.",
    iucnShortEX: "Extinta",

    // Language modal
    selectLanguage: "Selecciona el idioma",

    // Archive
    backToGame: "Volver al juego",
    catalogTitle: "Catálogo de Especies",
    catalogEyebrow: "La Colección de Especímenes",
    catalogHeading: "Todas las Especies del Catálogo",
    catalogIntro:
      "Explora las {count} especies seleccionadas en el catálogo de biodiversidad de GeoFauna, cada una con datos de distribución derivados de registros de ocurrencia y referencias abiertas de ciencia ciudadana.",
    searchPlaceholder: "Buscar especie...",
    realmTerrestrial: "Terrestre",
    realmMarine: "Marino",
    realmFreshwater: "Agua dulce",
    realmCoastal: "Costero",
    tierSuffix: "Nivel",

    // Species page
    backToCatalog: "Volver al catálogo",
    playThisSpecies: "Jugar esta especie",
    realmLabel: "Hábitat",
    iucnContextLabel: "Estado de conservación",
    provenanceTitle: "Procedencia de los datos",
    provenanceBody:
      "Este rango es una extensión de aprendizaje derivada de registros de ocurrencia, no un mapa de distribución de evaluación oficial. Consulta la página de metodología para ver el proceso completo.",
    evidenceTitle: "Instantánea de evidencia",
    evidenceBody: "Una muestra de registros de ocurrencia con licencia abierta, retenidos tras el filtrado de calidad.",
    inspectGbif: "Inspeccionar en GBIF",
    retainedDatasets: "Conjuntos de datos retenidos",

    // Footer
    footerTitle: "GeoFauna · Un Atlas Naturalista de Especies Vivas",
    footerSources: "Cartografía y recursos de biodiversidad enlazados:",
    footerSource: "Código fuente en GitHub",
    moreGames: "Juegos y Proyectos",

    // Daily / community
    nextExpedition: "Próxima expedición en",
    yesterdaysSpecies: "Especie de ayer",
    communityToday: "Hoy",
    communityPlayers: "jugadores",
    communityAverage: "media",
    communityPercentile: "superaste al {pct}% de los naturalistas",
    dayLabel: "Expedición",
  },
  it: {
    siteTitle: "GeoFauna · Il gioco di distribuzione delle specie",
    tagline: "Deduci dove vivono le specie della Terra",
    daily: "Giornaliero",
    unlimited: "Illimitato",
    archive: "Catalogo",
    about: "Dati Aperti e Scienza",
    stats: "Statistiche",
    rules: "Come Giocare",
    settings: "Impostazioni",
    share: "Condividi Risultato",
    copied: "Copiato negli appunti!",
    
    // Tools
    brushSize: "Dimensione Pennello",
    fine: "Fine (150 km)",
    medium: "Medio (450 km)",
    broad: "Ampio (1000 km)",
    eraser: "Gomma",
    brush: "Pennello",
    landSnap: "Blocco su Terra",
    oceanSnap: "Blocco su Oceano",
    undo: "Annulla",
    clear: "Cancella Tutto",
    submitGuess: "Invia Distribuzione",
    paintingHint: "Fai clic e trascina sulla mappa di Robinson per dipingere la distribuzione della specie",
    
    // Species Card
    cluesTitle: "Indizi Ecologici",
    scientificName: "Nome Scientifico",
    taxonomy: "Tassonomia",
    nativeRealm: "Habitat",
    difficulty: "Difficoltà",
    difficultyIconic: "Iconico",
    difficultyRegional: "Regionale",
    difficultyEndemic: "Endemico",
    imageCredit: "Fotografia",
    license: "Licenza",
    
    // Results & Scoring
    resultTitle: "Analisi di Distribuzione",
    accuracyScore: "Precisione Spaziale",
    letterGrade: "Grado",
    iouLabel: "Intersezione su Unione (IoU)",
    diceLabel: "Sovrapposizione Dice / F1",
    precisionLabel: "Precisione",
    recallLabel: "Copertura (Recall)",
    proximityLabel: "Tolleranza di Prossimità",
    overlapLegend: "Intervallo Nativo Colpito",
    overestimateLegend: "Intervallo Sovrastimato",
    missedLegend: "Intervallo Non Rilevato",
    nextDailyIn: "Prossima Specie Giornaliera tra",
    playAgain: "Prossima Specie",
    
    // Grades
    gradeS: "Naturalista Supremo",
    gradeA: "Biologo da Campo",
    gradeB: "Guardaparco",
    gradeC: "Esploratore Selvaggio",
    gradeD: "Esploratore Principiante",
    
    // Conservation Card
    conservationTitle: "Stato di Conservazione ed Ecologia",
    iucnMeterTitle: "Stato nella Lista Rossa IUCN",
    populationTrajectory: "Traiettoria Storica della Popolazione",
    climateVulnerabilityTitle: "Vulnerabilità Climatica al 2050",
    keyThreatsTitle: "Minacce Principali alla Sopravvivenza",
    ecologicalNicheTitle: "Nicchia Ecologica e Dieta",
    conservationActionTitle: "Conservazione e Reintroduzione",
    historicalContractionTitle: "Contrazione Storica dell'Areale",
    
    // IUCN Statuses
    iucnLC: "Minor Preoccupazione",
    iucnNT: "Quasi Minacciata",
    iucnVU: "Vulnerabile",
    iucnEN: "In Pericolo",
    iucnCR: "In Pericolo Critico",
    iucnEW: "Estinta in Natura",
    iucnEX: "Estinta",
    
    // Stats Modal
    statsTitle: "La Tua Carriera da Naturalista",
    played: "Giocate",
    completed: "Completate",
    currStreak: "Serie Attuale",
    maxStreak: "Serie Massima",
    avgScore: "Punteggio Medio",
    gradeDistribution: "Distribuzione dei Gradi",
    
    // How to play modal
    howToPlayTitle: "Come Giocare a GeoFauna",
    step1: "1. Esamina la specie: Analizza la tassonomia scientifica, la foto, i biomi e gli indizi ecologici.",
    step2: "2. Dipingi l'areale: Usa la proiezione di Robinson per dipingere dove la specie vive naturalmente.",
    step3: "3. Invia e confronta: Confronta la previsione con l'attuale estensione didattica usando IoU e precisione spaziale.",
    step4: "4. Esplora il contesto: Leggi note ecologiche, categorie di conservazione e registri di biodiversità collegati.",
    step2Detail: "Ingrandisci e scorri per maggiore precisione, e scegli tra cinque dimensioni di pennello a partire da 50 km.",
    openScienceTitle: "Scienza Aperta e Dati sulla Biodiversità",
    openScienceBody:
      "GeoFauna utilizza la cartografia di Natural Earth e registri di biodiversità collegati apertamente. Gli areali di gioco sono estensioni derivate da dati di occorrenza, costruite a partire dai dati di densità GBIF con filtri documentati — consulta la pagina di metodologia per l'intero processo.",
    gotIt: "Capito, si gioca!",

    // Spatial feedback
    feedbackTooBroad: "Il tuo contorno era troppo ampio. Mantieni il nucleo della regione e riduci l'eccesso.",
    feedbackTooNarrow: "Il tuo contorno era troppo ristretto. Estendilo per coprire più area di distribuzione.",
    feedbackStrong: "Ottimo equilibrio tra copertura e contenimento.",
    feedbackBalanced: "Un tentativo equilibrato. Usa la rivelazione per confrontare il margine di ciascuna regione.",

    // Filters
    filtersLabel: "Filtri",
    filterAllDifficulties: "Tutte le difficoltà",
    filterAllClasses: "Tutte le classi",
    filterAllIucn: "Tutti gli stati IUCN",
    randomizeSpecies: "Specie casuale",
    taxonMammals: "Mammiferi",
    taxonBirds: "Uccelli",
    taxonReptiles: "Rettili",
    taxonAmphibians: "Anfibi",
    taxonFish: "Pesci",
    taxonInsects: "Insetti",

    // Score panel
    gradeLabel: "Grado",
    scoreSubtitle: "Areale derivato da dati di occorrenza confrontato con la tua previsione",
    iouShort: "Sovrapposizione IoU",
    diceShort: "Dice / F1",
    precisionShort: "Precisione",
    recallShort: "Richiamo",
    spatialReadLabel: "Lettura spaziale:",
    meanMissLabel: "Scarto medio:",
    guessSizeLabel: "Dimensione del tentativo:",
    hitLabel: "Colpito:",
    overestimatedLabel: "Sovrastimato:",
    missedLabel: "Non rilevato:",
    difficultyAdjusted:
      "Punteggio corretto per la difficoltà — calibrato affinché ogni specie sia valutata rispetto a ciò che un naturalista attento potrebbe ottenere.",
    expeditionReport: "Rapporto di Spedizione",

    // Header / accessibilità
    changeLanguage: "Cambia lingua",
    muteSounds: "Disattiva audio",
    unmuteSounds: "Attiva audio",
    close: "Chiudi",
    skipToMap: "Vai alla barra degli strumenti della mappa",

    // Species hero
    viewAttribution: "Visualizza attribuzione",
    learningRangeTitle: "Areale di gioco",
    learningRangeBody:
      "Un'estensione derivata da dati di occorrenza, costruita a partire da dati aperti GBIF per il gioco e l'apprendimento — non è una mappa di areale prodotta da un valutatore.",
    methodAndVersion: "Metodo e versione",
    evidenceSnapshotTitle: "Istantanea di evidenza aperta",
    evidenceSnapshotEmpty: "Nessun record idoneo in questo campione",
    retrievedLabel: "Recuperato",
    fieldNotes: "Note sul Campo",

    // Map canvas
    oceanLabel: "Oceano",
    landLabel: "Terra",
    hoverHit: "Areale colpito",
    hoverOver: "Sovrastimato",
    hoverMissed: "Areale non rilevato",
    paintingHintShort: "Dipingi l'areale sulla mappa",
    projectionStamp: "Proiezione di Robinson · 1:110m",
    zoomIn: "Ingrandisci",
    zoomOut: "Riduci",
    resetView: "Ripristina vista",
    zoomHint: "Ingrandisci per maggiore precisione — pizzica o scorri",
    panTool: "Sposta",

    // Toolbar
    brushVeryFine: "Molto fine (50 km)",
    brushFine100: "Fine (100 km)",

    // Conservation card
    editorialContext: "Contesto di conservazione",
    trendIncreasing: "In aumento",
    trendDecreasing: "In diminuzione",
    trendStable: "Stabile",
    trendUnknown: "Sconosciuto",
    rangeContractionLabel: "Contrazione dell'areale",
    climateContextTitle: "Contesto climatico",
    climateDisclaimer:
      "Una nota didattica qualitativa, non una proiezione quantificata. Consulta i registri collegati per i dati primari.",
    impactHigh: "Alto",
    impactMedium: "Medio",
    impactLow: "Basso",
    registriesTitle: "Registri Aperti di Biodiversità e Citizen Science",
    gbifRegistry: "Registro GBIF",
    taxonNumber: "N. di accesso",
    gbifRecords: "record di occorrenza indicizzati",
    gbifExplore: "Esplora i record di occorrenza e la tassonomia indicizzati",
    gbifCta: "Esplora su GBIF",
    inatObservations: "osservazioni della comunità registrate",
    inatExplore: "Esplora le osservazioni della comunità e le foto sul campo",
    inatCta: "Vedi su iNaturalist",
    iucnShortLC: "Minor Preoccupazione",
    iucnShortNT: "Quasi Minacciata",
    iucnShortVU: "Vulnerabile",
    iucnShortEN: "In Pericolo",
    iucnShortCR: "Pericolo Crit.",
    iucnShortEW: "Estinta in Nat.",
    iucnShortEX: "Estinta",

    // Language modal
    selectLanguage: "Seleziona la lingua",

    // Archive
    backToGame: "Torna al gioco",
    catalogTitle: "Catalogo delle Specie",
    catalogEyebrow: "La Collezione di Esemplari",
    catalogHeading: "Tutte le Specie del Catalogo",
    catalogIntro:
      "Esplora tutte le {count} specie selezionate nel catalogo di biodiversità di GeoFauna, ciascuna con dati di areale derivati da occorrenze e riferimenti aperti di citizen science.",
    searchPlaceholder: "Cerca una specie...",
    realmTerrestrial: "Terrestre",
    realmMarine: "Marino",
    realmFreshwater: "Acqua dolce",
    realmCoastal: "Costiero",
    tierSuffix: "Livello",

    // Species page
    backToCatalog: "Torna al catalogo",
    playThisSpecies: "Gioca con questa specie",
    realmLabel: "Habitat",
    iucnContextLabel: "Stato di conservazione",
    provenanceTitle: "Provenienza dei dati",
    provenanceBody:
      "Questo areale è un'estensione didattica derivata da dati di occorrenza, non una mappa di areale di valutazione ufficiale. Consulta la pagina di metodologia per l'intero processo.",
    evidenceTitle: "Istantanea di evidenza",
    evidenceBody: "Un campione di record di occorrenza con licenza aperta, conservati dopo il filtraggio di qualità.",
    inspectGbif: "Ispeziona su GBIF",
    retainedDatasets: "Dataset conservati",

    // Footer
    footerTitle: "GeoFauna · Un Atlante Naturalistico delle Specie Viventi",
    footerSources: "Cartografia e risorse di biodiversità collegate:",
    footerSource: "Codice sorgente su GitHub",
    moreGames: "Giochi e Progetti",

    // Daily / community
    nextExpedition: "Prossima spedizione tra",
    yesterdaysSpecies: "Specie di ieri",
    communityToday: "Oggi",
    communityPlayers: "giocatori",
    communityAverage: "media",
    communityPercentile: "hai superato il {pct}% dei naturalisti",
    dayLabel: "Spedizione",
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations["en"]): string {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || key;
}

export function getIUCNLabel(status: IUCNStatus, lang: Language): string {
  const dict = translations[lang] || translations.en;
  switch (status) {
    case "LC":
      return dict.iucnLC;
    case "NT":
      return dict.iucnNT;
    case "VU":
      return dict.iucnVU;
    case "EN":
      return dict.iucnEN;
    case "CR":
      return dict.iucnCR;
    case "EW":
      return dict.iucnEW;
    case "EX":
      return dict.iucnEX;
    default:
      return status;
  }
}
