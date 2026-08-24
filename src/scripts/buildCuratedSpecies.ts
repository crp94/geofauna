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
    keystoneRole: {
      en: "Apex predator of Mediterranean scrubland and dehesas; regulates meso-carnivores.",
      es: "Superdepredador del monte mediterráneo y dehesas; controla mesocarnívoros.",
      it: "Superpredatore della macchia mediterranea.",
    },
    conservationActions: {
      en: "Captive breeding and landscape corridor reintroduction across Mediterranean oak woodlands.",
      es: "Cría en cautividad y reintroducciones en encinares y alcornocales.",
      it: "Programma di riproduzione e reintroduzioni nei boschi di querce.",
    },
    historicalContraction: {
      percentageLoss: 85,
      description: {
        en: "Once widespread across the southwestern Mediterranean basin; collapsed to two isolated nuclei by 2000.",
        es: "Históricamente distribuido por toda la península; colapsó en dos núcleos hacia el año 2000.",
        it: "Un tempo diffuso nel bacino mediterraneo sudoccidentale, ridotto a due nuclei verso il 2000.",
      },
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
    keystoneRole: {
      en: "Apex predator and indicator of high-altitude montane watershed health.",
      es: "Superdepredador e indicador del estado de las cuencas glaciares de alta montaña.",
      it: "Superpredatore degli ecosistemi montani d'alta quota.",
    },
    conservationActions: {
      en: "Community-based livestock insurance and predator-proof corrals.",
      es: "Seguros comunitarios de ganado y corrales protegidos.",
      it: "Assicurazioni comunitarie e recinti protetti.",
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
    conservationActions: {
      en: "Protected ecological corridors linking fragmented montane forest reserves.",
      es: "Corredores ecológicos protegidos conectando reservas forestales de montaña.",
      it: "Corridoi ecologici che collegano le riserve forestali montane.",
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
    keystoneRole: {
      en: "High-speed diurnal predator of open savanna and dry woodland ecosystems.",
      es: "Superdepredador diurno de alta velocidad en sabanas abiertas.",
      it: "Predatore diurno ad alta velocità della savana.",
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
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cheetah_running.jpg/1280px-Cheetah_running.jpg",
      photographer: "Frederic Salein",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cheetah_running.jpg",
      alt: "Cheetah running in Maasai Mara",
    },
    rangeConfig: [
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
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Capybara_%28Hydrochoerus_hydrochaeris%29.JPG/1280px-Capybara_%28Hydrochoerus_hydrochaeris%29.JPG",
      photographer: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Capybara_(Hydrochoerus_hydrochaeris).JPG",
      alt: "Capybara in marshland",
    },
    rangeConfig: [
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
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tasmanian_Devil_%28Sarcophilus_harrisii%29.jpg/1280px-Tasmanian_Devil_%28Sarcophilus_harrisii%29.jpg",
      photographer: "JJ Harrison",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tasmanian_Devil_(Sarcophilus_harrisii).jpg",
      alt: "Tasmanian Devil standing on grass",
    },
    rangeConfig: [
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
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Monarch_In_May.jpg/1280px-Monarch_In_May.jpg",
      photographer: "Kenneth Dwain Harrelson",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Monarch_In_May.jpg",
      alt: "Monarch butterfly on a flower",
    },
    rangeConfig: [
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
