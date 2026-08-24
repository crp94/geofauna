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
    step3: "3. Submit & compare: Contrast your prediction against ground-truth scientific range data (IoU & spatial accuracy).",
    step4: "4. Discover conservation data: Learn about its population trajectory, IUCN status, and 2050 climate vulnerabilities.",
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
    step3: "3. Envía y compara: Contrasta tu predicción con los datos científicos de distribución real (IoU y precisión espacial).",
    step4: "4. Descubre datos de conservación: Conoce su trayectoria poblacional, estatus UICN y vulnerabilidad climática a 2050.",
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
    step3: "3. Invia e confronta: Confronta la tua previsione con i dati scientifici reali (IoU e precisione spaziale).",
    step4: "4. Scopri la conservazione: Esplora l'andamento della popolazione, lo stato IUCN e le vulnerabilità climatiche al 2050.",
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
