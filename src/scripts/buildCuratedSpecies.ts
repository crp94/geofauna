import fs from "fs";
import path from "path";
import * as topojson from "topojson-client";
import { geoContains } from "d3-geo";
import { Species } from "../types/species";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  encodeRle,
  gridToLonLat,
  getCellAreaKm2,
  lonLatToGrid,
} from "../lib/maskCompression";

// Load world-atlas TopoJSON
const countriesTopoPath = path.resolve(__dirname, "../../node_modules/world-atlas/countries-110m.json");
const countriesTopo = JSON.parse(fs.readFileSync(countriesTopoPath, "utf-8"));
const landFeature = topojson.feature(countriesTopo, countriesTopo.objects.land as any) as any;
const countriesFeature = topojson.feature(countriesTopo, countriesTopo.objects.countries as any) as any;

console.log("Generating 360x180 Land/Ocean mask from Natural Earth with BBox acceleration...");
const landMask = new Uint8Array(TOTAL_CELLS);

// Accelerate point-in-polygon with feature-by-feature bounding box rasterization
const features = countriesFeature.features || [landFeature];
for (const feat of features) {
  let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
  
  const scanCoords = (coords: any) => {
    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      minLon = Math.min(minLon, coords[0]);
      maxLon = Math.max(maxLon, coords[0]);
      minLat = Math.min(minLat, coords[1]);
      maxLat = Math.max(maxLat, coords[1]);
    } else if (Array.isArray(coords)) {
      coords.forEach(scanCoords);
    }
  };
  scanCoords(feat.geometry.coordinates);

  const [minX, maxY] = lonLatToGrid(minLon, minLat);
  const [maxX, minY] = lonLatToGrid(maxLon, maxLat);

  const xStart = Math.min(minX, maxX);
  const xEnd = Math.max(minX, maxX);
  const yStart = Math.min(minY, maxY);
  const yEnd = Math.max(minY, maxY);

  for (let y = yStart; y <= yEnd; y++) {
    for (let x = xStart; x <= xEnd; x++) {
      const idx = y * GRID_WIDTH + x;
      if (landMask[idx] === 1) continue;

      const [lon, lat] = gridToLonLat(x, y);
      if (geoContains(feat, [lon, lat])) {
        landMask[idx] = 1;
      }
    }
  }
}

const landMaskRle = encodeRle(landMask);
console.log(`Land mask generated: ${landMask.reduce((a, b) => a + b, 0)} land cells out of ${TOTAL_CELLS} total cells.`);

function createRangeMask(
  regions: Array<{
    minLon: number;
    maxLon: number;
    minLat: number;
    maxLat: number;
    includeOcean?: boolean;
    filterPolygon?: (lon: number, lat: number) => boolean;
  }>
): { rle: string; areaKm2: number; bounds: [number, number, number, number] } {
  const mask = new Uint8Array(TOTAL_CELLS);
  let totalArea = 0;
  let minLon = 180,
    maxLon = -180,
    minLat = 90,
    maxLat = -90;

  for (const reg of regions) {
    const [minX, maxY] = lonLatToGrid(reg.minLon, reg.minLat);
    const [maxX, minY] = lonLatToGrid(reg.maxLon, reg.maxLat);

    const xStart = Math.min(minX, maxX);
    const xEnd = Math.max(minX, maxX);
    const yStart = Math.min(minY, maxY);
    const yEnd = Math.max(minY, maxY);

    for (let y = yStart; y <= yEnd; y++) {
      const cellArea = getCellAreaKm2(y);
      for (let x = xStart; x <= xEnd; x++) {
        const idx = y * GRID_WIDTH + x;
        const [lon, lat] = gridToLonLat(x, y);

        if (!reg.includeOcean && landMask[idx] === 0) {
          continue;
        }

        if (reg.filterPolygon && !reg.filterPolygon(lon, lat)) {
          continue;
        }

        if (mask[idx] === 0) {
          mask[idx] = 1;
          totalArea += cellArea;
          minLon = Math.min(minLon, lon);
          maxLon = Math.max(maxLon, lon);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        }
      }
    }
  }

  return {
    rle: encodeRle(mask),
    areaKm2: Math.round(totalArea),
    bounds: [
      minLon === 180 ? -180 : minLon,
      minLat === 90 ? -90 : minLat,
      maxLon === -180 ? 180 : maxLon,
      maxLat === -90 ? 90 : maxLat,
    ],
  };
}

const rawSpeciesData: Array<Omit<Species, "range"> & { rangeConfig: Parameters<typeof createRangeMask>[0] }> = [
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
      en: "Severe drought and heatwaves in southern Iberia threaten European rabbit populations, which comprise 80-90% of its specialized diet.",
      es: "Las sequías severas y olas de calor en el sur de Iberia amenazan las poblaciones de conejo de monte, su presa básica.",
      it: "Siccità e ondate di calore nella penisola iberica meridionale minacciano le popolazioni di coniglio selvatico.",
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
    keystoneRole: {
      en: "Apex predator of the Mediterranean scrubland; regulates meso-carnivores.",
      es: "Superdepredador del monte mediterráneo; controla mesocarnívoros.",
      it: "Superpredatore della macchia mediterranea.",
    },
    conservationActions: {
      en: "LIFE Lynx-Connect captive breeding, reintroduction across Andalusia, Extremadura, and Portugal.",
      es: "Cría en cautividad LIFE Lynx-Connect y reintroducciones en Andalucía, Extremadura y Portugal.",
      it: "Programma LIFE Lynx-Connect di riproduzione e reintroduzioni.",
    },
    historicalContraction: {
      percentageLoss: 85,
      description: {
        en: "Once widespread across the entirety of Spain and Portugal; collapsed to two isolated nuclei by 2000.",
        es: "Históricamente distribuido por toda la península ibérica; colapsó en dos núcleos hacia el año 2000.",
        it: "Un tempo diffuso in tutta la penisola iberica, ridotto a due nuclei verso il 2000.",
      },
    },
    clues: [
      {
        en: "Endemic to the Iberian Peninsula, thriving in Mediterranean scrubland and dehesas.",
        es: "Endémico de la Península Ibérica, habita en el monte mediterráneo y dehesas.",
        it: "Endemico della Penisola Iberica, vive nella macchia mediterranea e nelle dehesas.",
      },
      {
        en: "Famous for its black ear tufts and pronounced facial ruff/beard.",
        es: "Famoso por sus pinceles en las orejas y sus pronunciadas patillas/barbas.",
        it: "Famoso per i ciuffi neri sulle orecchie e la folta barba facciale.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Lince_ib%C3%A9rico_%28Lynx_pardinus%29%2C_Parque_Nacional_de_Do%C3%B1ana%2C_Espa%C3%B1a.jpg/1280px-Lince_ib%C3%A9rico_%28Lynx_pardinus%29%2C_Parque_Nacional_de_Do%C3%B1ana%2C_Espa%C3%B1a.jpg",
      photographer: "Arturo de Frias Marques",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Lince_ib%C3%A9rico_(Lynx_pardinus),_Parque_Nacional_de_Do%C3%B1ana,_Espa%C3%B1a.jpg",
      alt: "Iberian Lynx in Doñana National Park",
    },
    rangeConfig: [{ minLon: -8.5, maxLon: -2.5, minLat: 36.5, maxLat: 40.0 }],
  },
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
      en: "Climate warming is pushing the alpine tree line upward, fragmenting high-altitude montane habitats across the Himalayas.",
      es: "El calentamiento global empuja el límite arbóreo alpino hacia arriba en el Himalaya.",
      it: "Il riscaldamento globale sposta il limite degli alberi verso l'alto nell'Himalaya.",
    },
    keyThreats: [
      {
        threat: "Retaliatory killing",
        impact: "high",
        description: {
          en: "Pastoralists kill leopards in response to livestock predation.",
          es: "Pastores matan leopardos en represalia por ataques a ganado.",
          it: "Uccisioni per ritorsione da parte dei pastori.",
        },
      },
    ],
    diet: {
      en: "High-altitude ungulates: Blue sheep (Bharal), Siberian ibex, argali, and markhor.",
      es: "Ungulados de alta montaña: carnero azul (bharal), íbice siberiano y argalí.",
      it: "Ungulati d'alta quota: bharal e stambecco siberiano.",
    },
    keystoneRole: {
      en: "Apex predator and indicator of Central Asian mountain water towers.",
      es: "Superdepredador e indicador de las cuencas de alta montaña de Asia Central.",
      it: "Superpredatore degli ecosistemi montani dell'Asia centrale.",
    },
    conservationActions: {
      en: "Community-based livestock insurance and predator-proof corrals.",
      es: "Seguros comunitarios de ganado y corrales protegidos.",
      it: "Assicurazioni comunitarie e recinti protetti.",
    },
    clues: [
      {
        en: "Known as the 'Ghost of the Mountains', inhabiting altitudes from 3,000 to 5,500 m in Central Asia.",
        es: "Conocido como el 'Fantasma de las Montañas', habita entre 3.000 y 5.500 m en Asia Central.",
        it: "Chiamato il 'Fantasma delle Montagne', abita tra i 3.000 e i 5.500 metri in Asia centrale.",
      },
      {
        en: "Has an exceptionally long, thick tail used for balance on cliffs and wrapped around the face for warmth.",
        es: "Posee una cola muy larga y gruesa que usa para el equilibrio en riscos y para abrigarse.",
        it: "Ha una coda lunghissima e folta usata per bilanciarsi sui dirupi.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Snow_leopard_portrait.jpg/1280px-Snow_leopard_portrait.jpg",
      photographer: "Bernard Landgraf",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Snow_leopard_portrait.jpg",
      alt: "Snow leopard close portrait",
    },
    rangeConfig: [{ minLon: 68.0, maxLon: 105.0, minLat: 27.0, maxLat: 53.0 }],
  },
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
      en: "Warming models project up to 35% bamboo range loss in Sichuan by 2070.",
      es: "Se proyectan pérdidas de hasta el 35% del hábitat de bambú en Sichuan para 2070.",
      it: "I modelli prevedono una perdita del 35% dell'habitat di bambù nel Sichuan.",
    },
    keyThreats: [
      {
        threat: "Habitat fragmentation",
        impact: "high",
        description: {
          en: "Roads and infrastructure isolate 33 sub-populations across Sichuan, Shaanxi, and Gansu.",
          es: "Carreteras e infraestructuras aíslan 33 subpoblaciones en Sichuan, Shaanxi y Gansu.",
          it: "Infrastrutture che dividono la popolazione in oltre 30 nuclei isolati.",
        },
      },
    ],
    diet: {
      en: "99% bamboo, consuming 12-38 kg daily.",
      es: "99% bambú, consumiendo 12-38 kg diarios.",
      it: "99% bambù, consumando 12-38 kg al giorno.",
    },
    conservationActions: {
      en: "Giant Panda National Park established across 27,000 km² in China.",
      es: "Parque Nacional del Panda Gigante establecido en 27.000 km².",
      it: "Parco Nazionale del Panda Gigante su 27.000 km².",
    },
    clues: [
      {
        en: "Endemic to temperate bamboo forests in mountain ranges of central-southwestern China.",
        es: "Endémico de bosques de bambú en montañas del centro-suroeste de China.",
        it: "Endemico delle foreste di bambù nelle montagne della Cina centro-occidentale.",
      },
      {
        en: "Has an enlarged radial sesamoid bone acting as a 'pseudo-thumb' to grasp bamboo stalks.",
        es: "Posee un hueso sesamoideo radial hipertrofiado como 'falso pulgar' para sujetar bambú.",
        it: "Ha un 'falso pollice' osseo specializzato per afferrare i fusti di bambù.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1280px-Grosser_Panda.JPG",
      photographer: "J. Patrick Fischer",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Grosser_Panda.JPG",
      alt: "Giant Panda eating bamboo",
    },
    rangeConfig: [{ minLon: 101.5, maxLon: 108.5, minLat: 28.0, maxLat: 34.5 }],
  },
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
      en: "Megafires in the Amazon and Pantanal destroy core riparian forest habitat.",
      es: "Megaincendios en la Amazonía y Pantanal destruyen hábitats ribereños.",
      it: "Incendi in Amazzonia e Pantanal distruggono gli habitat fluviali.",
    },
    keyThreats: [
      {
        threat: "Deforestation",
        impact: "high",
        description: {
          en: "Conversion of tropical forests and savannas to cattle pasture and soy crops.",
          es: "Conversión de selvas y sabanas a pastos ganaderos y soja.",
          it: "Deforestazione per pascoli e soia.",
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
        en: "The largest big cat in the Americas, with a rosette-patterned coat and great swimming ability.",
        es: "El mayor felino de América, con manchas de rosetas y gran habilidad nadadora.",
        it: "Il più grande felino delle Americhe, con manto a rosette e abile nuotatore.",
      },
      {
        en: "Possesses a bite powerful enough to pierce caiman armor and turtle shells.",
        es: "Posee una mordedura tan potente que perfora caparazones de tortugas y cráneos de caimanes.",
        it: "Ha un morso potente in grado di perforare la corazza dei caimani.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Standing_jaguar.jpg/1280px-Standing_jaguar.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Standing_jaguar.jpg",
      alt: "Jaguar in Pantanal",
    },
    rangeConfig: [{ minLon: -95.0, maxLon: -35.0, minLat: -28.0, maxLat: 22.0 }],
  },
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
      en: "Rapid Arctic sea-ice loss reduces hunting platforms for ringed seals.",
      es: "La pérdida de hielo marino reduce plataformas de caza de focas.",
      it: "La perdita di ghiaccio marino riduce la caccia alle foche.",
    },
    keyThreats: [
      {
        threat: "Sea ice loss",
        impact: "high",
        description: {
          en: "Summer sea ice decline lengthens nutritional fasting periods.",
          es: "El retroceso del hielo estival alarga periodos de ayuno forzado.",
          it: "Lo scioglimento estivo prolunga i digiuni forzati.",
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
        en: "Inhabits circumpolar Arctic sea ice, spending most of its life on frozen ocean waters.",
        es: "Habita el hielo marino circumpolar del Ártico cazando focas en el océano helado.",
        it: "Abita la banchisa polare artica cacciando sull'oceano ghiacciato.",
      },
      {
        en: "Has black skin beneath translucent hollow fur that traps solar heat.",
        es: "Su piel es negra bajo un pelaje translúcido y hueco que atrapa el calor solar.",
        it: "Ha la pelle nera sotto una pelliccia traslucida.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/1280px-Polar_Bear_-_Alaska_%28cropped%29.jpg",
      photographer: "Alan D. Wilson",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Polar_Bear_-_Alaska_(cropped).jpg",
      alt: "Polar bear walking on ice",
    },
    rangeConfig: [{ minLon: -180.0, maxLon: 180.0, minLat: 60.0, maxLat: 89.0, includeOcean: true }],
  },
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
      en: "Catastrophic bushfires and heatwaves kill tens of thousands across eastern Australia.",
      es: "Megaincendios y olas de calor diezman poblaciones en el este australiano.",
      it: "Incendi e ondate di calore distruggono le popolazioni in Australia orientale.",
    },
    keyThreats: [
      {
        threat: "Bushfires & habitat loss",
        impact: "high",
        description: {
          en: "Clearing of eucalyptus woodlands in Queensland and New South Wales.",
          es: "Tala de bosques de eucalipto en Queensland y Nueva Gales del Sur.",
          it: "Deforestazione dei boschi di eucalipto.",
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
        en: "Endemic to the eucalyptus forests of eastern and southeastern Australia.",
        es: "Endémico de los bosques de eucalipto del este y sureste de Australia.",
        it: "Endemico delle foreste di eucalipto dell'Australia orientale.",
      },
      {
        en: "An arboreal marsupial that sleeps up to 18-20 hours a day.",
        es: "Marsupial arborícola que duerme hasta 18-20 horas al día.",
        it: "Marsupiale arboricolo che dorme fino a 20 ore al giorno.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/1280px-Koala_climbing_tree.jpg",
      photographer: "Diliff",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Koala_climbing_tree.jpg",
      alt: "Koala climbing tree",
    },
    rangeConfig: [{ minLon: 137.0, maxLon: 154.0, minLat: -39.0, maxLat: -16.0 }],
  },
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
      en: "Confined to volcanic cloud forest mountain summits in the Albertine Rift.",
      es: "Confinado a cumbres volcánicas de bosque nublado en la falla Albertina.",
      it: "Limitato alle cime vulcaniche della faglia Albertina.",
    },
    keyThreats: [
      {
        threat: "Human encroachment",
        impact: "high",
        description: {
          en: "Dense human agricultural boundaries surrounding Virunga and Bwindi.",
          es: "Fronteras agrícolas densas rodeando Virunga y Bwindi.",
          it: "Pressione agricola ai margini delle riserve.",
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
        en: "Lives exclusively in two small high-altitude montane cloud forest areas in Rwanda, Uganda, and DR Congo.",
        es: "Vive exclusivamente en dos pequeñas áreas montañosas en Ruanda, Uganda y RD Congo.",
        it: "Vive in due piccole aree montuose in Ruanda, Uganda e RD Congo.",
      },
      {
        en: "Has thicker fur than other gorillas to endure freezing night temperatures at high altitude.",
        es: "Tiene pelaje más largo y denso para soportar el frío nocturno de montaña.",
        it: "Ha pelliccia più folta per sopportare il freddo d'alta quota.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mountain_Gorilla_%28Gorilla_beringei_beringei%29_male.jpg/1280px-Mountain_Gorilla_%28Gorilla_beringei_beringei%29_male.jpg",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mountain_Gorilla_(Gorilla_beringei_beringei)_male.jpg",
      alt: "Mountain Gorilla male",
    },
    rangeConfig: [{ minLon: 29.0, maxLon: 30.2, minLat: -1.7, maxLat: -0.8 }],
  },
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
      en: "Rising midday temperatures in African savannas restrict hunting windows and increase energy expenditure.",
      es: "El aumento de temperaturas diurnas en la sabana reduce las horas hábiles de caza.",
      it: "L'aumento delle temperature riduce i tempi utili di caccia nella savana.",
    },
    keyThreats: [
      {
        threat: "Habitat fragmentation & cub poaching",
        impact: "high",
        description: {
          en: "77% of cheetah range falls outside protected areas, leading to conflict with pastoralists and illegal pet trafficking in the Horn of Africa.",
          es: "El 77% de su rango está fuera de parques protegidos, generando conflicto ganadero y tráfico de cachorros.",
          it: "Frammentazione dell'habitat e bracconaggio di cuccioli per il commercio illegale.",
        },
      },
    ],
    diet: {
      en: "Small to medium ungulates: Thomson's gazelles, springbok, impala, and hares.",
      es: "Ungulados medianos: gacelas de Thomson, gacelas saltarinas (springbok), impalas y liebres.",
      it: "Gazzelle di Thomson, springbok e impala.",
    },
    keystoneRole: {
      en: "High-speed diurnal predator of open savanna and dry woodland ecosystems.",
      es: "Superdepredador diurno de alta velocidad en sabanas abiertas.",
      it: "Predatore diurno ad alta velocità della savana africana.",
    },
    clues: [
      {
        en: "The fastest terrestrial animal on Earth, accelerating from 0 to 100 km/h in under 3 seconds.",
        es: "El animal terrestre más rápido del planeta, capaz de acelerar de 0 a 100 km/h en menos de 3 segundos.",
        it: "Il più veloce mammifero terrestre, capace di superare i 100 km/h.",
      },
      {
        en: "Recognizable by distinctive black 'tear tracks' running from the inside corners of its eyes to its mouth.",
        es: "Inconfundible por las características 'líneas de lágrimas' negras desde el lagrimal hasta la boca.",
        it: "Caratterizzato dalle tipiche 'strisce di lacrime' nere sul muso.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cheetah_running.jpg/1280px-Cheetah_running.jpg",
      photographer: "Frederic Salein",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cheetah_running.jpg",
      alt: "Cheetah running in Maasai Mara",
    },
    rangeConfig: [
      // Southern and Eastern Africa savannas + Sahel remnant pockets
      { minLon: 12.0, maxLon: 42.0, minLat: -34.0, maxLat: 5.0 },
      { minLon: 34.0, maxLon: 44.0, minLat: -4.0, maxLat: 12.0 },
    ],
  },
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
          en: "Regulated sustainable ranching harvest in the Venezuelan Llanos.",
          es: "Caza comercial regulada y aprovechamiento en los Llanos venezolanos.",
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
        en: "The world's largest living rodent, native to wetlands and savannas of South America east of the Andes.",
        es: "El roedor viviente más grande del mundo, autóctono de los humedales y ríos de Sudamérica al este de los Andes.",
        it: "Il più grande roditore vivente al mondo, originario del Sudamerica.",
      },
      {
        en: "Semi-aquatic social giant with webbed toes, able to stay submerged underwater for up to 5 minutes.",
        es: "Gigante semiacuático con dedos palmeados capaz de sumergirse bajo el agua hasta 5 minutos.",
        it: "Animale semi-acquatico e gregario con zampe palmate.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Capybara_%28Hydrochoerus_hydrochaeris%29.JPG/1280px-Capybara_%28Hydrochoerus_hydrochaeris%29.JPG",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Capybara_(Hydrochoerus_hydrochaeris).JPG",
      alt: "Capybara in marshland",
    },
    rangeConfig: [
      // South America east of the Andes: Llanos, Amazon, Pantanal, Chaco, Pampas
      { minLon: -75.0, maxLon: -35.0, minLat: -35.0, maxLat: 11.0 },
    ],
  },
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
      en: "Warmer dry summers in eastern Tasmania accelerate roadkill rotting and alter wallaby carrion dynamics.",
      es: "Veranos más cálidos y secos en Tasmania alteran la disponibilidad de carroñas de ualabíes.",
      it: "Estati più calde e secche alterano la disponibilità di carcasse.",
    },
    keyThreats: [
      {
        threat: "Devil Facial Tumour Disease (DFTD)",
        impact: "high",
        description: {
          en: "A 100% fatal transmissible cancer passed via biting during mating and communal feeding, causing up to 80% population decline.",
          es: "Cáncer facial transmisible por mordeduras que ha provocado desplomes de más del 80% de la población.",
          it: "Tumore facciale trasmissibile tramite morsi che causa altissima mortalità.",
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
        en: "The world's largest surviving carnivorous marsupial, endemic strictly to the island of Tasmania.",
        es: "El marsupial carnívoro vivo más grande del mundo, estrictamente endémico de la isla de Tasmania.",
        it: "Il più grande marsupiale carnivoro vivente, endemico della Tasmania.",
      },
      {
        en: "Known for its ferocious screech, pungent odor, and a bite force quotient among the highest of any mammal.",
        es: "Famoso por sus chillidos espeluznantes, olor fétido y una fuerza de mordida demoledora capaz de triturar huesos.",
        it: "Celebre per le grida stridenti e un morso straordinariamente potente in grado di spezzare ossa.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tasmanian_Devil_%28Sarcophilus_harrisii%29.jpg/1280px-Tasmanian_Devil_%28Sarcophilus_harrisii%29.jpg",
      photographer: "JJ Harrison",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tasmanian_Devil_(Sarcophilus_harrisii).jpg",
      alt: "Tasmanian Devil standing on grass",
    },
    rangeConfig: [
      // Island of Tasmania
      { minLon: 144.5, maxLon: 148.5, minLat: -43.8, maxLat: -40.5 },
    ],
  },
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
    populationEstimate: "~Millions (eastern & western migratory populations)",
    populationHistory: [
      { year: 1995, estimate: 300000000 },
      { year: 2010, estimate: 100000000 },
      { year: 2022, estimate: 50000000, label: "Assessed on IUCN Red List" },
      { year: 2024, estimate: 45000000 },
    ],
    climateVulnerability: {
      en: "Severe winter storms in the high-altitude Oyamel fir forests of Michoacán (Mexico) freeze millions of overwintering butterflies; summer droughts desiccate milkweed.",
      es: "Tormentas invernales anómalas en los bosques de oyamel de Michoacán congelan millones de mariposas.",
      it: "Tempeste invernali nelle foreste di oyamel in Messico provocano gelate letali.",
    },
    keyThreats: [
      {
        threat: "Herbicide eradication of milkweed",
        impact: "high",
        description: {
          en: "Agricultural glyphosate use across the US Midwest Corn Belt wipes out larval host milkweed (Asclepias).",
          es: "Uso masivo de herbicidas en el cinturón agrícola de EE.UU. que erradica el algodoncillo (Asclepias), planta nutricia de sus orugas.",
          it: "Uso di erbicidi che distrugge le piante di asclepiade lungo le rotte migratorie.",
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
        en: "Famous for its extraordinary multi-generational annual migration of up to 4,500 km across North America.",
        es: "Famosa por su extraordinaria migración multigeneracional de hasta 4.500 km a lo largo de Norteamérica.",
        it: "Celebre per la migrazione annuale di oltre 4.000 km attraverso il Nord America.",
      },
      {
        en: "Millions overwinter densely clustered in the highland Oyamel fir forests of central Mexico.",
        es: "Millones de ejemplares hibernan apiñados en los bosques templados de oyamel del centro de México.",
        it: "Milioni di individui svernano nelle foreste montane di oyamel del Messico centrale.",
      },
    ],
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Monarch_In_May.jpg/1280px-Monarch_In_May.jpg",
      photographer: "Kenneth Dwain Harrelson",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Monarch_In_May.jpg",
      alt: "Monarch butterfly on a flower",
    },
    rangeConfig: [
      // North America migratory range: Southern Canada, USA, and Central Mexican wintering reserves
      { minLon: -125.0, maxLon: -65.0, minLat: 18.0, maxLat: 52.0 },
    ],
  },
];

// Compile and save
console.log(`Compiling ${rawSpeciesData.length} curated species entries...`);
const finalSpeciesList: Species[] = rawSpeciesData.map((s) => {
  const { rangeConfig, ...rest } = s;
  const { rle, areaKm2, bounds } = createRangeMask(rangeConfig);

  return {
    ...rest,
    range: {
      bounds,
      gridDimensions: [GRID_WIDTH, GRID_HEIGHT],
      rleMask: rle,
      areaApproxKm2: areaKm2,
      nativeContinents: [],
      nativeBiomes: [],
    },
  };
});

const outputDir = path.resolve(__dirname, "../data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write curated-species.json
const speciesOutputPath = path.join(outputDir, "curated-species.json");
fs.writeFileSync(speciesOutputPath, JSON.stringify(finalSpeciesList, null, 2), "utf-8");
console.log(`Successfully wrote ${finalSpeciesList.length} species to ${speciesOutputPath}`);

// Write land-mask.json
const landMaskOutputPath = path.join(outputDir, "land-mask.json");
fs.writeFileSync(landMaskOutputPath, JSON.stringify({ rle: landMaskRle }), "utf-8");
console.log(`Successfully wrote land mask to ${landMaskOutputPath}`);

// Write world-110m.json
const worldOutputPath = path.join(outputDir, "world-110m.json");
fs.writeFileSync(worldOutputPath, JSON.stringify(countriesTopo), "utf-8");
console.log(`Successfully copied TopoJSON world to ${worldOutputPath}`);
