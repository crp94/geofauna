// This file is now a thin re-export shim. The curated species catalog used to
// live here as one ~3,800-line array; it has been split by taxonomic class
// into src/scripts/speciesData/*.ts so parallel authoring agents (and human
// editors) can own disjoint files without merge conflicts. Species content
// itself was moved verbatim — nothing about any entry changed in the split.
export type { RawSpeciesEntry } from "./speciesData/types";

import { mammals } from "./speciesData/mammals";
import { birds } from "./speciesData/birds";
import { reptiles } from "./speciesData/reptiles";
import { amphibians } from "./speciesData/amphibians";
import { fish } from "./speciesData/fish";
import { insects } from "./speciesData/insects";
import type { RawSpeciesEntry } from "./speciesData/types";

export const allCuratedSpecies: RawSpeciesEntry[] = [
  ...mammals,
  ...birds,
  ...reptiles,
  ...amphibians,
  ...fish,
  ...insects,
];
