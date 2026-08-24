# Species Validation Report — Batch 4 (Reptiles/Amphibians-heavy)

**Agent:** V4 · **Date:** 2026-08-24 · **Scope:** 14 species (`src/data/curated-species.json`)
snowy-owl, kea, komodo-dragon, marine-iguana, galapagos-giant-tortoise, leatherback-sea-turtle, nile-crocodile, saltwater-crocodile, tuatara, gila-monster, axolotl, golden-poison-frog, chinese-giant-salamander, wild-yak

**Method:** IUCN Red List (via search/Wikipedia cross-check, direct IUCN pages returned HTTP 403 to automated fetch), GBIF, Wikipedia, Wikimedia Commons API (`action=query&prop=imageinfo&iiprop=extmetadata`). Direct `iucnredlist.org` fetches were blocked (403) for every attempt, so IUCN figures below are corroborated via BirdLife DataZone, Wikipedia infoboxes reproducing the IUCN assessment text, and secondary conservation sources that quote the Red List verbatim — flagged "unverifiable" where no independent source could confirm an exact figure.

**IMPORTANT SYSTEMIC FINDING:** 12 of the 14 `image.sourceUrl` values point to Wikimedia Commons `File:` pages that **do not exist** (confirmed via the Commons API, which returned `"missing":""` for each). Only `komodo-dragon` and `axolotl` resolve to real files, and `axolotl`'s resolves to a file with a **different photographer and license** than claimed. Two entries (`gila-monster`, `saltwater-crocodile`) cite the identical fabricated Flickr ID suffix `(30251147571)`, suggesting a copy/generation bug rather than independent sourcing errors. Locally bundled `/public/images/species/*.jpg` files do exist for all 14, so the game UI itself won't break — but the citation/attribution metadata is unverifiable or wrong for nearly the whole batch, which is a licensing-compliance risk.

**Also applied (per orchestrator rule update mid-task):** clues re-checked against a stricter toponym rule — flag ANY clue containing a place name or place-derived adjective (not just country/continent), e.g. "Arctic," "Indo-Pacific," "Sonoran," "Mojave." Generic biome/elevation terms like "alpine," "tundra," "savanna," "desert" are still allowed. Species' own common names are out of scope.

---

## 1. Snowy Owl (*Bubo scandiacus*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Snowy_Owl_-_Alaska_(cropped).jpg` | Commons API returns `missing` — page does not exist | Re-source a real Commons file for the bundled local image and update photographer/license/sourceUrl to match | Commons API query, 2026-08-24 | critical |
| clues.en[0], .es[0], .it[0] | "...circumpolar **Arctic** tundra..." / "tundra **ártica**" / "tundra **artica**" | Names the polar region outright, per updated stricter clue-geography rule | EN: "Large, diurnal nomadic raptor of the treeless, windswept polar tundra, with dense white feathering extending down over its toes and talons." ES: "...tundra polar desprovista de árboles..." IT: "...tundra polare..." | Orchestrator clue-geography rule, 2026-08-24 | critical |
| keyThreats[0].description | "...Cyclical collapses of northern **lemmings**..." (label says "Lemmy population crashes") | `threat` label field says "Lemmy population crashes" — likely a typo for "Lemming" | Change `threat` label to "Lemming population crashes & collision" | src/data/curated-species.json | minor |
| populationHistory[1].label | "Uplisted to Vulnerable following telemetry data" | 2017 IUCN uplisting was driven by a comprehensive population-trend review/expert assessment, not specifically telemetry tracking data | "Uplisted to Vulnerable following a comprehensive population review" | BirdLife/Hawk Mountain 2024 circumpolar assessment | minor |
| populationHistory[2] (2024: 20,000) | Specific figure | No independent 2024 count found; order of magnitude plausible given confirmed >30% 3-generation decline | Mark unverifiable | — | minor (unverifiable) |
| iucnStatus / populationEstimate | VU / "~14,000–28,000 mature individuals" | Confirmed correct — IUCN uplisted to VU in 2017; population estimate matches published 14,000–28,000 breeding adults figure | — | [Hawk Mountain Sanctuary](https://www.hawkmountain.org/news/science/hawk-mountain-scientists-and-collaborators-publish-groundbreaking-assessment-on-snowy-owl-population-trends), [BirdLife DataZone](https://datazone.birdlife.org/species/factsheet/snowy-owl-bubo-scandiacus) | — |

---

## 2. Kea (*Nestor notabilis*)

**Verdict: MINOR ISSUES**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Kea_(Nestor_notabilis).jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| populationEstimate | "~3,000 – 7,000 individuals" | IUCN Red List figure is ~6,000 total individuals / 4,000 mature individuals (2017 assessment); entry's range is broader/lower than the official figure though within the range of published models (1,000–15,000 across sources) | Consider "~4,000 mature individuals (~6,000 total, IUCN 2017)" for precision | [IUCN-derived population figure via multiple sources](https://datazone.birdlife.org/species/factsheet/kea-nestor-notabilis) | minor |
| iucnStatus | EN | Confirmed correct | — | BirdLife 2017 assessment (EN A2be+4be) | — |
| clues.en[0]/[1] | "alpine parrot" | Judgment call: "alpine" is a standard biome/elevation term (not tied to a specific named place — kea live in NZ's Southern Alps, not "the Alps"), left un-flagged under the biome-wording carve-out. Flagging for orchestrator visibility only. | No change recommended | Orchestrator clue-geography rule | minor (judgment call, not actioned) |

---

## 3. Komodo Dragon (*Varanus komodoensis*)

**Verdict: CLEAN**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| populationEstimate | "~3,458 individuals" | Exact figure not independently confirmed; real annual survey counts run 3,303 (2021)/3,156 (2022)/3,396 (2023), and the IUCN assessment's *mature-individual* figure is ~1,383 (criteria use mature individuals, not all-ages total) | Mark unverifiable; consider citing a specific year's total-population count instead of an unsourced "3,458" | [Komodo Guide / NHM](https://www.nhm.ac.uk/discover/news/2021/september/komodo-dragon-is-now-listed-as-endangered-from-rising-sea-levels.html) | minor (unverifiable) |
| iucnStatus, populationHistory[1] label | EN, "Uplisted to Endangered on climate criteria" (2021) | Confirmed correct — 2021 uplisting from VU to EN was driven by climate-modelled habitat loss projections | — | [NHM](https://www.nhm.ac.uk/discover/news/2021/september/komodo-dragon-is-now-listed-as-endangered-from-rising-sea-levels.html) | — |
| image.sourceUrl / photographer / license | `File:Komodo_dragon_(Varanus_komodoensis).jpg`, Charles J. Sharp, CC BY-SA 4.0 | Confirmed correct — Commons API returns exact match (Artist: "Charles J. Sharp", License: CC BY-SA 4.0, description: "Komodo dragon (Varanus komodoensis), Komodo National Park, Indonesia") | — | Commons API query, 2026-08-24 | — |
| clues | — | No toponyms in clue text (avoids naming "Komodo" itself) | — | — | — |

---

## 4. Marine Iguana (*Amblyrhynchus cristatus*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Marine_iguana_(Amblyrhynchus_cristatus_albemarlensis)_2.jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| realm | "Marine" | Marine iguanas spend the large majority of their time basking/nesting on land and only forage in brief nearshore intertidal/subtidal dives; the app schema (`src/types/species.ts`) already defines a "Coastal" realm value that better fits this ecology than "Marine" (which better suits fully pelagic species like the leatherback) | Consider realm: "Coastal" | src/types/species.ts (`HabitatRealm`); ecology per [Galápagos Conservation Trust](https://galapagosconservation.org.uk/species/marine-iguana/) | moderate |
| populationEstimate | "~200,000 – 300,000 individuals" | Matches the commonly-cited Wikipedia/Iguana Specialist Group figure exactly, but the IUCN Red List assessment text itself cites a lower/wider range (~19,800–210,000) and describes the trend as declining rather than "on the rise" as one secondary source claims — two competing published figures exist | Note both figures if precision matters; current value is defensible but not the official IUCN number | [Wikipedia](https://en.wikipedia.org/wiki/Marine_iguana); IUCN Red List (secondary citation) | minor |
| iucnStatus, populationTrend | VU, decreasing | Confirmed correct | — | IUCN Red List (via multiple secondary sources) | — |
| clues | — | Clean — no toponyms (doesn't name Galápagos) | — | — | — |

---

## 5. Galápagos Giant Tortoise (*Chelonoidis niger*)

**Verdict: ERRORS FOUND**

**Special taxonomy note (per brief):** The *Chelonoidis niger* complex was historically split into ~15 subspecies, some now argued as full species by some authorities. Critically, **IUCN does not publish a single species-level Red List assessment for "Chelonoidis niger."** Assessments exist per-subspecies/population and range from **Extinct in the Wild** (*C. n. niger*, the Floreana tortoise) through **Vulnerable** (e.g., *C. n. duncanensis*) to **Critically Endangered** (several island populations, e.g., *C. n. phantasticus* — "possibly extinct"). Labeling the whole complex "CR" is a simplification not attributable to a single official assessment and glosses over an EW population within the same nominal species.

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| iucnStatus | "CR" (applied to whole `Chelonoidis niger` complex) | No unified IUCN assessment exists at this taxon level; true statuses range EW→VU→CR across subspecies | Either pick a specific taxon (e.g., a named subspecies with an actual CR assessment) or caveat that "CR" reflects the most-threatened subpopulations, not a species-wide assessment | [Wikipedia "Galápagos tortoise"](https://en.wikipedia.org/wiki/Gal%C3%A1pagos_tortoise) (infobox: "all surviving subspecies are classified as Threatened" — not uniformly CR); IUCN subspecies pages | critical |
| image.sourceUrl | `File:Galapagos_Tortoise_(3530663363).jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| populationHistory[1] (1970: 3,000, label "Historic whaling exploitation collapse") | 1970 tied to "whaling" causation | Tortoise-harvesting by whaling/sealing ships was concentrated in the late 18th–19th centuries (peaking ~1790s–1860s); the low point recorded around 1970 (Wikipedia cites a 3,060-individual 1974 census, close to entry's figure) reflects the cumulative lagged effect of that historic overharvesting plus 20th-century invasive species, not active whaling in 1970 itself | Reword label to "Cumulative effect of historic whaling-era overharvesting and invasive predators" to avoid implying whaling was ongoing in 1970 | [Wikipedia](https://en.wikipedia.org/wiki/Gal%C3%A1pagos_tortoise) (cites "3,060 individuals in a 1974 census") | minor |
| populationTrend | "increasing" | Confirmed correct — substantial recovery documented via captive breeding/reintroduction | — | Wikipedia | — |
| clues | — | Clean — no toponyms (doesn't name Galápagos in clue text) | — | — | — |

---

## 6. Leatherback Sea Turtle (*Dermochelys coriacea*)

**Verdict: MINOR ISSUES**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Leatherback_Sea_Turtle.jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| iucnStatus, criteria | VU | Confirmed correct — downlisted from CR to VU in the 2013 assessment, under criterion A2bd | — | [IUCN Red List assessment, 2013](https://doi.org/10.2305/IUCN.UK.2013-2.RLTS.T6494A43526147.en) | — |
| populationEstimate / history | "~20,000–30,000 nesting females" with 1982:115,000 → 2000:34,000 → 2024:25,000 | Directionally consistent with the well-documented Pacific-subpopulation collapse narrative and commonly cited ~115,000 (1980) figure; exact interim data points not independently re-verified | Mark unverifiable but plausible | [IUCN 2013 assessment](https://doi.org/10.2305/IUCN.UK.2013-2.RLTS.T6494A43526147.en) | minor (unverifiable) |
| clues, realm | Marine, no toponyms | Confirmed correct/clean | — | — | — |

---

## 7. Nile Crocodile (*Crocodylus niloticus*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| clues.en[0], .es[0], .it[0] | "**Africa's** largest freshwater predator..." / "...de agua dulce de **África**..." / "...d'acqua dolce d'**Africa**..." | Names the continent outright — violates both the original brief (flag country/continent outright) and the updated stricter rule | EN: "A dominant freshwater apex predator, reaching lengths up to 5 to 6 meters and exerting one of the most powerful crushing bite forces ever measured in nature." ES/IT: drop "de África"/"d'Africa" analogously | Orchestrator clue-geography rule | critical |
| image.sourceUrl | `File:Nile_Crocodile_(Crocodylus_niloticus)_(29828551694).jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| iucnStatus, populationEstimate | LC, "~250,000–500,000 individuals" | Confirmed correct — matches published IUCN range exactly | — | [Wikipedia/IUCN](https://en.wikipedia.org/wiki/Nile_crocodile) | — |
| realm | Freshwater | Confirmed correct | — | — | — |

---

## 8. Saltwater Crocodile (*Crocodylus porosus*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| clues.en[1] | "...open-ocean transits between distant **Indo-Pacific** islands." | Names a broad but specific biogeographic/proper-noun region; the ES ("archipiélagos") and IT ("le isole") translations already correctly generalized this away, so only the EN clue leaks it | "...enabling long-distance open-ocean transits between distant island chains." | Orchestrator clue-geography rule | moderate |
| image.sourceUrl | `File:Saltwater_Crocodile_(Crocodylus_porosus)_(30251147571).jpg` | Commons API returns `missing`. Notably shares its Flickr-ID suffix `(30251147571)` verbatim with `gila-monster`'s sourceUrl — strong signal of a copy/generation bug, not independent sourcing | Re-source and correct; audit the generation script for duplicated Flickr IDs across other entries | Commons API query, 2026-08-24 | critical |
| realm | "Marine" | Saltwater crocodiles are primarily estuarine/riverine/mangrove-coastal animals that only occasionally traverse open ocean; "Coastal" (available in the schema) may fit better than "Marine," though the species' documented long-distance ocean dispersal is a legitimate argument for keeping "Marine" | Consider "Coastal", or keep "Marine" if oceanic dispersal behavior is the intended emphasis | src/types/species.ts; general species ecology | minor |
| iucnStatus, populationEstimate | LC, "~200,000–300,000" | Confirmed correct — LC status and the post-1971-ban Australian recovery narrative are well documented | — | [Wikipedia/IUCN](https://en.wikipedia.org/wiki/Saltwater_crocodile) | — |

---

## 9. Tuatara (*Sphenodon punctatus*)

**Verdict: MINOR ISSUES**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Tuatara_Brothers_Island.jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| iucnStatus, populationEstimate | LC, "~50,000–100,000 individuals" | Confirmed correct/consistent with published figures | — | Wikipedia/IUCN (LC as of most recent assessment) | — |
| clues | — | Clean — no toponyms | — | — | — |

---

## 10. Gila Monster (*Heloderma suspectum*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| clues.en[0] | "...arid **Sonoran and Mojave desert** scrublands..." | Names two specific, proper-noun deserts, strongly localizing the species to the US Southwest; ES ("desiertos áridos") and IT ("zone aride desertiche") already correctly generalized this — only the EN clue leaks it | "Heavy, sluggish venomous lizard of arid desert scrublands, spending over 90% of its life hidden in underground burrows." | Orchestrator clue-geography rule | critical |
| image.sourceUrl | `File:Gila_Monster_(Heloderma_suspectum)_(30251147571).jpg` | Commons API returns `missing`. Shares its Flickr-ID suffix verbatim with `saltwater-crocodile`'s sourceUrl (see #8) | Re-source and correct; audit generation script | Commons API query, 2026-08-24 | critical |
| iucnStatus | NT | Confirmed correct | — | Wikipedia/multiple sources | — |
| populationEstimate/history | "~10,000–20,000 mature individuals" | Plausible order of magnitude given documented declining trend, but exact figures/years not independently verified | Mark unverifiable | — | minor (unverifiable) |

---

## 11. Axolotl (*Ambystoma mexicanum*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.photographer / image.license | "Stephen Dalton" / "CC BY-SA 4.0" | **Wrong.** The cited sourceUrl (`File:Axolotl_in_aquarium.jpg`) resolves to a real Commons file, but its actual metadata is Artist: **"Bildflut"**, License: **CC0 1.0 Universal** (public domain dedication), uploaded 2016-12-30, described as "Ein Axolotl in einem Aquarium." Entry's claimed photographer and license do not match the cited source at all. | Correct photographer to "Bildflut" and license to "CC0 1.0" (or re-source to an actual Stephen Dalton photo with a matching sourceUrl if that image is the intended one) | Commons API query, 2026-08-24 (`Artist: Bildflut`, `LicenseShortName: CC0`) | critical |
| populationEstimate | "< 100 wild individuals remaining" | IUCN-cited current wild estimates range 50–1,000 individuals; "< 100" is at the low/pessimistic end of the plausible range but not clearly wrong | Consider widening to "50 – 1,000 wild individuals (IUCN)" for defensibility | [Karmactive/IUCN-sourced](https://www.karmactive.com/critically-endangered-mexican-axolotls-down-to-50-1000-in-wild-scientists-achieve-reintroduction-success/) | minor |
| populationHistory[0] (1998: 6,000, label "6,000 axolotls per km² recorded") | Density unit disambiguated by label | Correct and appropriately labeled — matches published "6,000 ind/km² in 1998" figure | — | Published axolotl density surveys (Zambrano et al.) | — |
| populationHistory[1] (2008: 100) | No unit label | The historical series (1998, density) and current series (2024, absolute count) mix units; the unlabeled 2008 point ("100") is actually a **density** figure (100 ind/km²) per the same published survey series, not an absolute population count, and could mislead a reader into thinking 100 total axolotls existed in 2008 | Add a "(per km²)" qualifier to the 2008 point, matching the 1998 point's explicit labeling | Published density-decline series (6,000→1,000→100→35 ind/km², 1998–2017) | moderate |
| iucnStatus, populationTrend | CR, decreasing | Confirmed correct | — | IUCN Red List (via multiple sources) | — |

---

## 12. Golden Poison Frog (*Phyllobates terribilis*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Phyllobates_terribilis_yellow.jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| populationEstimate | "< 5,000 individuals (restricted to ~250 km²)" | The IUCN 2016 assessment's stated extent of occurrence is **1,473 km²**, not ~250 km² — nearly a 6x discrepancy | Correct to "~1,473 km² extent of occurrence" or clarify if "250 km²" refers to a different (e.g., core occupied) area | [IUCN Red List assessment](https://www.iucnredlist.org/species/pdf/85887889), justification text: "extent of occurrence is 1,473 km²" | moderate |
| iucnStatus, criteria | EN, B1ab(iii) | Confirmed correct — assessed 2016, published 2017 | — | IUCN Red List assessment | — |
| clues | — | Clean — no toponyms | — | — | — |

---

## 13. Chinese Giant Salamander (*Andrias davidianus*)

**Verdict: MINOR ISSUES**

**Special taxonomy note (per brief):** *Andrias davidianus* was shown (Yan et al. 2018; subsequent work) to be a species complex; the South China giant salamander was split out as *Andrias sligoi*, with further undescribed/newly described lineages (e.g., *A. jiangxiensis*). The entry correctly retains **"Andrias davidianus"** as the scientific name (the taxon covering north-central China lineages) rather than conflating it with the whole historical complex, and its **CR** status is consistent with the current IUCN treatment — both *A. davidianus* and *A. sligoi* are independently assessed and both are Critically Endangered. This is handled correctly.

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Andrias_davidianus_Prague_Zoo.jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| populationHistory[2] (2024: 500) | Specific figure | Wild population has been reported to have "declined by more than 80% since the 1950s" and is now "extremely rare" in the wild; no independent source confirms the specific figure "500" | Mark unverifiable but directionally plausible | General literature on >80% wild decline | minor (unverifiable) |
| scientificName, iucnStatus | *Andrias davidianus*, CR | Confirmed correct given current taxon split (see note above) | — | [Nature Scientific Reports 2024](https://www.nature.com/articles/s41598-024-52907-6); [Oxford Academic species-delimitation paper](https://academic.oup.com/evolinnean/article/3/1/kzae007/7690816) | — |
| order | "Urodela" | Not wrong — "Urodela" is a valid, widely used synonym for the salamander order; the more common current standard term is "Caudata." Both are used interchangeably in the literature (this entry and `axolotl` both use "Urodela" consistently) | No change required; noted for consistency awareness only | — | minor (style, not an error) |

---

## 14. Wild Yak (*Bos mutus*)

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| populationTrend | "increasing" | **Likely wrong.** Multiple independent sources describing the current IUCN Red List assessment state the population trend is **"decreasing,"** not increasing. One secondary Wikipedia summary describes the historical downlisting rationale (EN→VU in 1996, further stabilization noted circa 2008) as "stabilized or even increased in several areas," which may be the source of the confusion, but does not represent the current official Red List trend field. | Change to "decreasing" (or verify directly against the current IUCN Red List page, which could not be fetched due to 403 blocking) | [World Animal Rescue Network](https://worldanimalrescuenetwork.org/wildlife-guides/yak/); [Mammals of India](https://www.mammalsofindia.org/bos-mutus) (both citing IUCN: "roughly 7,000–10,000 mature individuals and a decreasing trend") | critical |
| populationEstimate | "~10,000 – 15,000 mature individuals" | Above the published IUCN range of ~7,000–10,000 mature individuals (2008/2020 assessments) | Correct to "~7,000 – 10,000 mature individuals" | Same sources as above; also [Wikipedia](https://en.wikipedia.org/wiki/Wild_yak) ("no more than 10,000 mature individuals," 2008 assessment) | moderate |
| image.sourceUrl | `File:Wild_Yak_Tibet.jpg` | Commons API returns `missing` | Re-source and correct | Commons API query, 2026-08-24 | critical |
| iucnStatus | VU | Confirmed correct | — | Wikipedia/IUCN | — |
| clues | "alpine plateaus" | Judgment call: generic elevation/biome term, doesn't name Tibet/Himalaya specifically (alpine plateaus exist on multiple continents) — left un-flagged | No change recommended | Orchestrator clue-geography rule | minor (judgment call, not actioned) |

---

## Summary Table

| # | Species | Verdict | Critical | Moderate | Minor |
|---|---|---|---|---|---|
| 1 | Snowy Owl | ERRORS FOUND | 2 | 0 | 3 |
| 2 | Kea | MINOR ISSUES | 1 | 0 | 2 |
| 3 | Komodo Dragon | CLEAN | 0 | 0 | 1 |
| 4 | Marine Iguana | ERRORS FOUND | 1 | 1 | 1 |
| 5 | Galápagos Giant Tortoise | ERRORS FOUND | 2 | 0 | 1 |
| 6 | Leatherback Sea Turtle | MINOR ISSUES | 1 | 0 | 1 |
| 7 | Nile Crocodile | ERRORS FOUND | 2 | 0 | 0 |
| 8 | Saltwater Crocodile | ERRORS FOUND | 1 | 1 | 1 |
| 9 | Tuatara | MINOR ISSUES | 1 | 0 | 0 |
| 10 | Gila Monster | ERRORS FOUND | 2 | 0 | 1 |
| 11 | Axolotl | ERRORS FOUND | 1 | 1 | 1 |
| 12 | Golden Poison Frog | ERRORS FOUND | 1 | 1 | 0 |
| 13 | Chinese Giant Salamander | MINOR ISSUES | 1 | 0 | 2 |
| 14 | Wild Yak | ERRORS FOUND | 2 | 1 | 1 |
| | **Total** | | **18** | **4** | **15** |

**Severity counts across batch: 18 critical · 4 moderate · 15 minor (37 findings total)**

Verdict distribution: 9 ERRORS FOUND · 4 MINOR ISSUES · 1 CLEAN (Komodo Dragon).

### Dominant pattern
The single biggest contributor to the critical count is the broken-image-citation issue: **12 of 14 `image.sourceUrl` values are dead links** (confirmed via Wikimedia Commons API, not guesswork), counted once per species above. This is very likely a batch-wide data-generation defect (see the duplicated Flickr ID shared by `gila-monster` and `saltwater-crocodile`) rather than 12 independent research errors, and is worth a single systemic fix (re-run image sourcing/verification for the whole catalog) rather than 12 one-off corrections.
