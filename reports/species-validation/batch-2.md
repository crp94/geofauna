# Species Validation Report — Batch 2

Validator: Agent V2. Scope: 16 species (okapi, ring-tailed-lemur, blue-whale, bornean-orangutan, sea-otter, saiga-antelope, ethiopian-wolf, fossa, sunda-pangolin, giant-anteater, quokka, chimpanzee, walrus, narwhal, european-bison, american-bison) in `src/data/curated-species.json`. Checked against IUCN Red List, GBIF/Wikipedia cross-checks, and Wikimedia Commons (image source pages). Today's date: 2026-08-24.

**Note on scope change mid-review:** partway through this pass the clue-location rule was tightened by the orchestrator from "no country/continent names" to "no toponym or place-derived adjective at all" (banning things like Arctic, Afroalpine, Eurasian, American/European-as-adjective, etc., while still allowing generic biome/physical language). All 16 species' clues were (re-)checked against the stricter rule; findings below reflect the stricter version.

**Headline finding:** image `sourceUrl` values are broken or wrong for the large majority of this batch — 9 of 16 URLs return HTTP 404 (dead Wikimedia Commons links), and 2 more resolve to a real page but credit the wrong photographer/license. Only 5 of 16 images were confirmed accurate (ring-tailed-lemur, sea-otter, blue-whale, chimpanzee, american-bison).

---

## okapi

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Okapia_johnstoni_-Zoo_de_Doue-8a.jpg` | 404 — page does not exist. The Okapia johnstoni Commons category was checked and shows no file matching this name or a "Trisha M Shears" credit. | Locate and link a real, currently-live Commons file for okapi and verify photographer/license match. | https://commons.wikimedia.org/wiki/Category:Okapia_johnstoni | critical |
| populationHistory[1995]=35,000 | 35,000 | The commonly-cited "~35,000" okapi figure traces to a **2013** dung-survey study, not an independent 1995 estimate. IUCN itself states there is no reliable population estimate at all (range cited: 10,000–50,000, called a "guesstimate"). | Re-date or drop this datapoint; if kept, cite it against ~2013, not 1995. | IUCN Red List 2015 assessment (via ResearchGate summary) | moderate |
| populationEstimate | "~10,000 – 15,000 individuals" | Within IUCN's acknowledged (very wide, low-confidence) 10,000–50,000 range, so not contradicted, but IUCN explicitly says no reliable current estimate exists. | Consider softening to "no reliable estimate; commonly cited range 10,000–50,000" or keep with an "estimate disputed" caveat. | IUCN Red List | minor |
| taxonomy / clues | — | Taxonomy (Artiodactyla, Giraffidae) and both clues (giraffe relative, zebra-striped haunches) check out; no toponyms in clues. | — | — | — |

---

## ring-tailed-lemur

**Verdict: CLEAN**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| populationEstimate / history | ~2,000–2,500; 2000:20,000 → 2024:2,200 | Precise historical figures are effectively unverifiable — IUCN/lemur researchers describe population counts as heavily contested and survey-limited — but the order of magnitude and the "≈2,200 documented across surveyed sites, likely under 2,500 mature individuals" figure match published low-end estimates. | None needed; optionally caveat as "highly uncertain." | Lemur Conservation Network / IUCN 2020 uplisting to EN | unverifiable (informational only) |
| image | Charles J. Sharp, CC BY-SA 4.0 | Confirmed: page live, photographer and license match exactly. | — | https://commons.wikimedia.org/wiki/File:Ring-tailed_lemur_(Lemur_catta).jpg | — |
| iucnStatus | EN | Confirmed — uplisted from VU to EN in the 2020 IUCN assessment. | — | IUCN / Lemur Conservation Network | — |
| clues | — | No toponyms; both physiologically/ecologically framed and accurate (matriarchal troops, banded tail signaling). | — | — | — |

---

## blue-whale

**Verdict: CLEAN**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| iucnStatus / populationTrend | EN / increasing | Confirmed — IUCN lists Endangered with an increasing global trend since the 1970s (Antarctic subspecies alone remains separately Critically Endangered). | — | IUCN Red List 2018 assessment | — |
| image | NOAA Photo Library, Public Domain/NOAA | Confirmed: page live, correct species, public-domain status confirmed (NOAA employee work). | — | https://commons.wikimedia.org/wiki/File:Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg | — |
| clues | — | No toponyms ("polar"/"equatorial" are generic climate-zone terms, not proper-noun-derived, so allowed under the tightened rule). Facts (30 m, 190 t, infrasonic calls) are accurate. | — | — | — |

---

## bornean-orangutan

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Bornean_orangutan_(Pongo_pygmaeus)_female.jpg` | 404 — page does not exist. | Replace with a verified live Commons file and re-confirm photographer/license. | direct fetch | critical |
| iucnStatus / populationEstimate | CR / ~104,700 | Confirmed — matches the widely cited 2016 IUCN uplisting figure exactly. | — | IUCN 2016 assessment | — |
| clues | — | No toponyms in the clues themselves ("Bornean" appears only in the display name, out of scope per rule). Facts (arboreal >90% of time, cheek flanges/long calls) are accurate. | — | — | — |

---

## sea-otter

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| populationTrend | "stable" | Mismatch — IUCN's official Red List population-trend tag for Enhydra lutris is **decreasing** (suspected >50% decline over the past 21 years, driven by North/Western Pacific declines), despite total numbers having grown off the historic 1911 low. | Change to "decreasing" to match the official IUCN trend field, or add a note distinguishing "long-term recovery since 1911" from "current IUCN-tagged trend." | IUCN Red List assessment (Endangered, criteria A2abe) | moderate |
| populationEstimate | ~125,000 | Roughly consistent with recent aggregate estimates (~107,000 per 2004–2007 survey; "over 130,000" cited more recently), though recent regional counts (Aleutians, California, Russia) show renewed declines that cut against "stable." | Keep figure but reconcile with the trend correction above. | Wikipedia (sea otter) / USGS survey summaries | minor |
| iucnStatus | EN | Confirmed correct. | — | IUCN Red List | — |
| image | Mike Baird, CC BY 2.0 | Confirmed: page live, photographer and license match exactly. | — | https://commons.wikimedia.org/wiki/File:Sea_otter_cropped.jpg | — |
| clues | — | No toponyms; facts (densest fur, stone-tool use) accurate. | — | — | — |

---

## saiga-antelope

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Saiga_tatarica_male.jpg` | 404 — filename does not exist on Commons. However, the credited photographer (Andrey Giljov) and license (CC BY-SA 4.0) match a real, live file of a male saiga. | Update sourceUrl to `https://commons.wikimedia.org/wiki/File:Saiga_antelope_at_the_Stepnoi_Sanctuary.jpg` (or the cropped variant), same photographer/license, confirmed live. | https://commons.wikimedia.org/wiki/File:Saiga_antelope_at_the_Stepnoi_Sanctuary.jpg | critical (broken link, easily fixed) |
| iucnStatus / populationTrend | NT / increasing | Confirmed exactly — downlisted from CR to NT in December 2023 following recovery in Kazakhstan. | — | IUCN Red List Dec 2023 / WCS newsroom | — |
| populationEstimate | "~1,900,000 individuals (2023 Kazakhstan census recovery)" | Confirmed — matches the widely reported "over 1.9 million" Kazakhstan figure; correctly scoped as Kazakhstan-specific rather than claimed as a world total. | — | WCS / Frankfurt Zoological Society / Astana Times | — |
| populationHistory[2003]=21,000 | 21,000 | Commonly-cited low-point figure is "39,000 in 2005," a different year/value. Not necessarily wrong (multiple census years exist) but unverifiable as stated. | Verify against a primary saiga census source or soften to an approximate range. | WCS press materials | minor |
| clues[0] | "Nomadic ungulate of semi-desert **Eurasian** grasslands with an extraordinarily bulbous..." | Toponym: "Eurasian" is a continent-derived adjective (per tightened clue rule), narrowing the guessable region. | "Nomadic ungulate of semi-desert temperate grasslands with an extraordinarily bulbous, flexible downward-pointing snout (proboscis)." | clue-location rule (tightened) | moderate |

---

## ethiopian-wolf

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Ethiopian_Wolf_(Canis_simensis).jpg` | 404 — page does not exist; no "Will Jones" credit found among live Ethiopian wolf Commons files in search (live alternatives exist, e.g. `File:Ethiopian_wolf_(Canis_simensis_citernii).jpg`). | Replace with a verified live file and re-confirm photographer/license. | direct fetch + Commons search | critical |
| iucnStatus / populationEstimate | EN / ~400–500 | Confirmed — closely matches the current (2024) estimate of ~450 wolves in 99 packs across 6 populations. | — | Ethiopian Wolf Conservation Programme / WildCRU | — |
| clues[0] | "**Africa's** most endangered carnivore, adapted strictly to open **Afroalpine** ericaceous moorlands above 3,000 meters altitude." | Toponym, critical: "Africa's" names the continent outright (already a violation of the original brief, not just the tightened rule); "Afroalpine" is also place-derived. | "One of the world's most endangered carnivores, adapted strictly to open high-altitude ericaceous moorlands above 3,000 meters altitude." | clue-location rule | critical |
| clues[1] | "...specialized for excavating giant root-rats from deep subterranean **alpine** burrows." | Borderline: "alpine" used generically for "high-mountain," consistent with the rule's own allowed example ("high-altitude slopes above the treeline"). Not flagged, but noted for awareness. | (no change required) | clue-location rule | — |

---

## fossa

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Fossa_(Cryptoprocta_ferox).jpg` | 404 — page does not exist; no Charles J. Sharp fossa file found matching this name among live Commons fossa files in search. | Replace with a verified live file and re-confirm photographer/license. | direct fetch + Commons search | critical |
| populationEstimate | "~2,500 mature individuals" | IUCN's own published range for the 2016 assessment is 2,635–8,626 adults; ~2,500 sits just below the stated floor. | Adjust to "~2,600–8,600 mature individuals (IUCN range)" or cite the specific point estimate used. | IUCN Red List 2016 assessment (via search synthesis) | moderate |
| populationHistory[2016]=2,500 | 2,500 | Same issue — below the IUCN-published lower bound (2,635) for that assessment year. | Align with 2,635 as the floor, or clarify this is a different (non-IUCN) source. | IUCN Red List | moderate |
| iucnStatus | VU | Confirmed correct (VU since 2008). | — | IUCN Red List | — |
| clues | — | No toponyms ("isolated oceanic island" doesn't name Madagascar); facts (ankle rotation, cougar-like build, mongoose relation) accurate. | — | — | — |

---

## sunda-pangolin

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl / photographer | `File:Sunda_pangolin_(Manis_javanica)_walking.jpg`, credited to "Pangolin Specialist Group / IUCN" | 404 — page does not exist. Additionally, the credited photographer format ("Pangolin Specialist Group / IUCN") does not match how real Sunda pangolin Commons files are attributed — all live examples found are individual-photographer "own work" uploads (e.g., Frendi Apen Irawan). This looks like a fabricated attribution. | Replace with a verified live file, e.g. `File:Trenggiling_Sunda_Sunda_Pangolin_Manis_javanica.jpg` (Frendi Apen Irawan, CC BY-SA 4.0, confirmed live) or similar, with correct photographer credit. | https://commons.wikimedia.org/wiki/File:Trenggiling_Sunda_Sunda_Pangolin_Manis_javanica.jpg | critical |
| iucnStatus | CR | Confirmed correct. | — | IUCN Red List | — |
| populationEstimate | "Critically low (declined >80% over 2 decades)" | The chart itself (500,000 → 50,000) implies a ~90% decline, so ">80%" understates the data's own numbers slightly. Minor internal inconsistency, not a factual error. | Align wording to ">85–90%" or leave as a conservative floor. | internal consistency check | minor |
| clues | — | No toponyms; facts (toothless, keratin scales, 40cm tongue) accurate. | — | — | — |

---

## giant-anteater

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.photographer / license | "Fernando Flores", CC BY-SA 2.0 | Page is live but misattributed: the real photographer on this Commons file is **Ron Knight** ("sussexbirder" on Flickr), and the real license is **CC BY 2.0** (no ShareAlike), not CC BY-SA 2.0. | Correct photographer to "Ron Knight" and license to "CC BY 2.0." | https://commons.wikimedia.org/wiki/File:Giant_Anteater_(Myrmecophaga_tridactyla).jpg | critical |
| iucnStatus | VU | Confirmed correct. | — | IUCN Red List | — |
| clues | — | No toponyms; facts (60cm tongue at 150 flicks/min, knuckle-walking) accurate and match published figures. | — | — | — |

---

## quokka

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.photographer | "Shannon Verhagen" | Page is live and license (CC BY-SA 4.0) matches, but the real credited photographer is **Cecilia Broderick** (iPhone photo, Rottnest Island, Feb 2018), not Shannon Verhagen. | Correct photographer to "Cecilia Broderick." | https://commons.wikimedia.org/wiki/File:Quokka_Rottnest_Island.jpg | critical |
| diet.en | "...sedges, succulent succulents, and grasses." | Text bug: duplicated word "succulent succulents" (an evident authoring/generation artifact). ES ("arbustos suculentos") and IT ("piante succulente") translations are unaffected — only the EN source has the glitch. | "...sedges, succulents, and grasses." | internal text QA | minor |
| iucnStatus | VU | Confirmed correct. | — | IUCN Red List | — |
| clues | — | No toponyms (doesn't name Rottnest/Australia); "smiling" facial structure and predator-free island refuge facts are accurate. | — | — | — |

---

## chimpanzee

**Verdict: CLEAN**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| iucnStatus | EN | Confirmed correct. | — | IUCN Red List | — |
| populationEstimate | ~150,000–250,000 | Consistent with commonly cited ranges (IUCN-era figures span roughly 170,000–300,000); reasonable, not contradicted. | — | general literature | — |
| image | Thomas Lersch, CC BY-SA 3.0 | Confirmed: page live, correct species (Leipzig Zoo), photographer matches, license matches (dual-licensed GFDL + CC BY-SA 3.0). | — | https://commons.wikimedia.org/wiki/File:Chimpanzee-Head.jpg | — |
| clues | — | No toponyms; nest-building and nut-cracking-with-anvils facts are accurate documented behaviors. | — | — | — |

---

## walrus

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Walrus_on_ice.jpg` | 404 — page does not exist. Joel Garlich-Miller is a real USFWS walrus photographer, but this specific filename wasn't found among his/USFWS Commons uploads (similarly-named but different files exist, e.g. `File:Walrus_Cows_and_Yearlings_on_Ice.jpg`). | Replace with a verified live file bearing this photographer's actual credit. | Commons search | critical |
| iucnStatus / populationEstimate | VU / ~225,000 | Both plausible/consistent with commonly cited figures. | — | IUCN Red List 2016 | — |
| clues[0] | "Enormous pinniped of circumpolar **Arctic** shelf seas, weighing up to 1.5 metric tons..." | Toponym, critical: names "Arctic" outright. | "Enormous pinniped of icy, ice-covered coastal shelf seas, weighing up to 1.5 metric tons with thick, heavily wrinkled cinnamon-brown hide." | clue-location rule (tightened) | critical |

---

## narwhal

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Narwhals_breaching.jpg` | 404 — page does not exist. Dr. Kristin Laidre is a real narwhal researcher/photographer, but this specific filename was not found on Commons. | Replace with a verified live file and re-confirm photographer/license. | Commons search | critical |
| iucnStatus / populationTrend | LC / stable | Confirmed — Least Concern, and IUCN language ("no evidence for a decreasing trend") supports "stable" as a fair simplification. | — | IUCN Red List | — |
| populationEstimate | ~170,000 | Consistent with published totals (~161,000–170,000 depending on assessment year; mature-individual subset cited separately as 93,500–123,000). | — | IUCN Red List | — |
| clues[0] | "Medium-sized toothed whale endemic year-round to **Arctic** waters, lacking a dorsal fin to maneuver easily beneath dense pack ice." | Toponym, critical — this is the exact clue the orchestrator called out as the motivating example for the rule tightening. | "Medium-sized toothed whale that lives year-round beneath sea ice, lacking a dorsal fin so it can maneuver easily beneath dense pack ice." | clue-location rule (tightened; explicit owner example) | critical |

---

## european-bison

**Verdict: ERRORS FOUND**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Wisent_Białowieża_2.jpg` | 404 — page does not exist. Michael Gäbler is confirmed as a real Commons contributor of wisent photos, but under different filenames (`Wisent.jpg`, `Wisent_1.JPG`, `Wisent_2.jpg`, `Bison_bonasus_bonasus.jpg`), not this one. | Replace with one of Michael Gäbler's verified live wisent files and update photographer/license accordingly (his files are typically CC BY-SA 3.0). | https://commons.wikimedia.org/wiki/User:Michael_G%C3%A4bler | critical |
| iucnStatus / populationTrend | NT / increasing | Confirmed exactly — downlisted from VU to NT in December 2020. | — | IUCN Red List / IUCN news Dec 2020 | — |
| keyThreats description | "...descended from just 12 founding individuals..." | Confirmed accurate — the global population's genetic base traces to exactly 12 founders (with two breeding lines of 7 and 12). | — | PMC/Nature Scientific Reports genetics papers | — |
| populationHistory[1927] | 0, "survived in 54 zoo founders" | Confirmed accurate. | — | IUCN Dec 2020 press materials | — |
| populationEstimate | "~9,500 individuals (2023 status)" | Slightly stale/low — most recent published figure (Dec 31, 2024) is 9,762 wild bison (12,209 total incl. captive/semi-wild). | Update to "~9,700–9,800 wild individuals (2024 status)." | European Bison Conservation Center / Pucek census summaries | minor |
| populationHistory[2000]=2,800 | 2,800 | A commonly-cited figure for a nearby year is "1,800 in 2003" — different year/value, not clearly reconcilable from available sources. | Verify against a primary EBCC census table. | IUCN.nl Dec 2020 news | minor |
| clues[0] | "The heaviest surviving wild land mammal in **Europe**, roaming primeval mixed deciduous broadleaf and conifer woodlands." | Toponym, critical: names the continent outright. | "The heaviest surviving wild land mammal in its temperate forest range, roaming primeval mixed deciduous broadleaf and conifer woodlands." | clue-location rule (tightened) | critical |
| clues[1] | "Compared to its **American** relative, it possesses longer legs, a less sloping hindquarter profile..." | Toponym, moderate: "American" is a place-derived adjective (banned), even though it describes the comparison species rather than this one's own range; it still leaks continental information. | "Compared to its closely related bovine cousin, it possesses longer legs, a less sloping hindquarter profile, and feeds more extensively by browsing woody vegetation." | clue-location rule (tightened) | moderate |

---

## american-bison

**Verdict: CLEAN**

| Field | Current value | Problem | Suggested correction | Source | Severity |
|---|---|---|---|---|---|
| iucnStatus | NT | Confirmed correct. | — | IUCN Red List | — |
| populationHistory[1889]=541 | 541, "Near extinction from commercial slaughter" | Confirmed — matches the historically cited 1889 census figure (Hornaday) of 541 wild bison remaining. | — | general historical literature | — |
| populationEstimate | "~31,000 wild conservation herds (~400,000 commercial)" | Consistent with commonly cited modern figures (conservation herds in the 20,000–30,000s; commercial/ranched herds several hundred thousand). | — | general literature | — |
| image | Jack Dykinga / USDA, Public Domain/USDA | Confirmed: page live, photographer and public-domain status match exactly (Featured Picture, USDA ARS K5680-1). | — | https://commons.wikimedia.org/wiki/File:American_bison_k5680-1.jpg | — |
| clues | — | No toponyms in the clues themselves ("American" only in the display name, out of scope); "prairie" is a generic biome term, allowed. Hump/wallow facts accurate. | — | — | — |

---

## Summary

| Species | Verdict | Critical | Moderate | Minor |
|---|---|---|---|---|
| okapi | ERRORS FOUND | 1 | 1 | 1 |
| ring-tailed-lemur | CLEAN | 0 | 0 | 0 |
| blue-whale | CLEAN | 0 | 0 | 0 |
| bornean-orangutan | ERRORS FOUND | 1 | 0 | 0 |
| sea-otter | ERRORS FOUND | 0 | 1 | 1 |
| saiga-antelope | ERRORS FOUND | 1 | 1 | 1 |
| ethiopian-wolf | ERRORS FOUND | 2 | 0 | 0 |
| fossa | ERRORS FOUND | 1 | 2 | 0 |
| sunda-pangolin | ERRORS FOUND | 1 | 0 | 1 |
| giant-anteater | ERRORS FOUND | 1 | 0 | 0 |
| quokka | ERRORS FOUND | 1 | 0 | 1 |
| chimpanzee | CLEAN | 0 | 0 | 0 |
| walrus | ERRORS FOUND | 2 | 0 | 0 |
| narwhal | ERRORS FOUND | 2 | 0 | 0 |
| european-bison | ERRORS FOUND | 2 | 1 | 2 |
| american-bison | CLEAN | 0 | 0 | 0 |
| **Total** | **4 CLEAN / 12 ERRORS FOUND** | **15** | **6** | **7** |

**Severity totals: 15 critical, 6 moderate, 7 minor (28 findings).**

Critical findings break down as: 9 dead image `sourceUrl`s (okapi, bornean-orangutan, ethiopian-wolf, fossa, sunda-pangolin, walrus, narwhal, european-bison, saiga-antelope), 2 live-page-but-wrong-attribution images (giant-anteater, quokka), and 6 toponym-in-clue violations under the tightened rule (ethiopian-wolf, walrus, narwhal, european-bison ×2, — saiga-antelope's toponym issue was scored moderate rather than critical since it's continent-adjacent rather than a fully explicit region name).
