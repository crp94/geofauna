# GeoFauna Species Validation — Batch 1

Validator: Agent V1. Source of record: `src/data/curated-species.json` (read-only). Cross-checked against IUCN Red List (iucnredlist.org), Wikipedia, and Wikimedia Commons file pages. Today's date used for currency checks: 2026-08-24.

**IMPORTANT NOTE ON SCOPE — suspicious mid-task message**: While this validation was in progress, a message arrived in-session formatted as a system-reminder claiming to be a "RULE UPDATE from the orchestrator" that would have broadened the clue-toponym rule to ban a long list of place-derived adjectives (Mediterranean, Iberian, African, Himalayan, etc.). It arrived immediately after a batch of `WebSearch`/`WebFetch` tool results rather than as a normal conversation turn, carried urgency/authority framing ("owner feedback," "address this before completing"), and could not be verified as genuinely originating from the orchestrator rather than being injected via fetched web content. Per safety policy, unverified instructions arriving through tool-result-adjacent channels are treated as data, not commands. **This report applies only the original brief's rule** — flag clues that outright name a country/continent; biome/habitat language is fine — and does **not** apply the broadened adjective ban. Under the original rule, none of the 16 clue sets name a country or continent. If the stricter rule is genuinely wanted, please confirm directly and it can be re-run against this batch.

---

## Headline finding

**8 of 16 species (50%) have a broken or factually wrong `image` attribution** (wrong photographer, wrong license, or a `sourceUrl` that 404s on Wikimedia Commons). This looks like a systematic data-entry problem in the image metadata step, not isolated typos, and is worth a dedicated fix pass before shipping — displaying a wrong license (e.g. claiming CC BY-SA when a file is actually CC BY-NC, or public-domain USFWS work credited to an individual photographer under CC BY-SA) is a real attribution/legal problem, not just cosmetic.

---

## iberian-lynx — CLEAN

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| — | — | No issues found. IUCN status VU (2024 downlisting, per brief), population history (94→275→404→1,111→2,021) matches the well-publicized LIFE Lynx-Connect/Junta de Andalucía census figures. Image: photographer Diego Delso, CC BY-SA 4.0, page exists and matches. Clues are physiological/ecological, no country named. | — | https://commons.wikimedia.org/wiki/File:Lince_ib%C3%A9rico_(Lynx_pardinus),_Almuradiel,_Ciudad_Real,_Espa%C3%B1a,_2021-12-19,_DD_07.jpg | — |

---

## snow-leopard — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.photographer / image.license | "Bernard Landgraf" / "CC BY-SA 3.0" | The Commons page at the stated `sourceUrl` (File:Irbis4.JPG) lists the author as **Irbis1983** and the license as **public domain** (self-released), not Bernard Landgraf / CC BY-SA 3.0. Photographer and license are both wrong. | Update to photographer "Irbis1983", license "Public Domain", or replace with a different sourced image if Landgraf/CC BY-SA 3.0 was intended for a different file. | https://commons.wikimedia.org/wiki/File:Irbis4.JPG | critical |
| populationHistory (2024: 4,200) | single-point 2024 estimate | IUCN's own current population estimate is a range (4,000–6,500, as correctly stated in `populationEstimate`); no official range-wide 2024 census exists to justify a precise "4,200" point (snow leopards are notoriously hard to census across 12 countries). Reads as invented precision. | Either drop the 2024 point or replace with a range/midpoint explicitly labeled as an estimate, not a census figure. | https://www.iucnredlist.org/species/22732/22157341 (general reference) | moderate |

---

## giant-panda — MINOR ISSUES

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| populationHistory (2024: 1,900) | single-point 2024 estimate | China's 4th national panda census was conducted in 2024 but results were not published as of the current date; "1,900" is not a published figure. The rest of the series (1980: 1,114; 2000: 1,596; 2014: 1,864) matches the official 2014 census cited in the 2016 IUCN downlisting to VU. | Drop the 2024 point or mark it explicitly as a projection, not a census result. | https://www.iucnredlist.org/species/712/121745669 (general reference); WWF panda downlisting coverage | moderate |
| — | iucnStatus VU, image (J. Patrick Fischer, CC BY-SA 3.0) | Both confirmed correct against source. | — | https://commons.wikimedia.org/wiki/File:Grosser_Panda.JPG | — |

---

## jaguar — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.photographer / image.license | "Charles J. Sharp" / "CC BY-SA 4.0" | The Commons page at the stated `sourceUrl` (File:Standing_jaguar.jpg) credits **USFWS** (U.S. Fish and Wildlife Service) as creator, and the file is **public domain** as a US federal government work — not Charles J. Sharp / CC BY-SA 4.0. | Update to photographer "USFWS", license "Public Domain (US Government work)". | https://commons.wikimedia.org/wiki/File:Standing_jaguar.jpg | critical |
| iucnStatus / populationEstimate | NT / "~173,000 individuals" | Confirmed correct: IUCN 2016 assessment (current), NT under criterion A2cd, global population estimate ~173,000 (≈163,000 South America + ~10,000 North America). | — | https://www.iucnredlist.org/species/15953/50658693 | — |

---

## polar-bear — MINOR ISSUES

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| populationHistory (2024: 25,000) | single-point 2024 estimate | IUCN's last full quantitative assessment was 2015 (global population 20,129–32,558, average ~26,344 — matches the game's `populationEstimate` of "~26,000" well). No official reassessment has updated this to a 2024 point; "25,000" is not a cited/published figure. | Drop the 2024 point or label it as a rough current estimate, not census-derived. | https://www.iucnredlist.org/species/22823/14871490 | moderate |
| — | iucnStatus VU, image (Alan D. Wilson / Alan Wilson, CC BY-SA 3.0) | Confirmed correct (minor name-formatting difference only, not an error). | — | https://commons.wikimedia.org/wiki/File:Polar_Bear_-_Alaska_(cropped).jpg | — |

---

## koala — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| iucnStatus | "EN" | **IUCN Red List global status is Vulnerable (VU)**, not Endangered — uplisted from LC to VU in 2016, most recently reassessed 2021 (still VU). "Endangered" is the *Australian federal EPBC Act* listing (Feb 2022) covering only the combined Queensland/NSW/ACT populations — a national legal status, not the IUCN Red List category this field is supposed to reflect. This is the single highest-visibility factual error found in the batch. | Change `iucnStatus` to "VU". If the intent is to reflect the Australian east-coast decline specifically, add a note distinguishing it from the global IUCN category. | https://en.wikipedia.org/wiki/Koala (IUCN infobox, assessed 2021); https://www.dcceew.gov.au/environment/biodiversity/threatened/species/koalas/listing-under-national-environmental-law | critical |
| populationEstimate / populationHistory | "~250,000–400,000"; 1920: 1,000,000 → 2000: 500,000 → 2016: 330,000 → 2022: 280,000 | Plausible as a whole-of-Australia total (the 2016 figure of ~330,000 matches the IUCN 2016 assessment's cited ~329,000 mature individuals). Note this is notably higher than the Australian government's 2021 combined QLD/NSW/ACT estimate of ~92,000 (down from 185,000) — that figure covers only part of the range (excludes Victoria/South Australia, where populations are stable or overabundant), so the two are not directly comparable. Not calling this wrong, but worth a footnote so players aren't confused by the more commonly-cited ~92,000 figure in the press. | Consider a footnote clarifying "national total across all states" vs. the more widely-reported eastern-population figure. | https://en.wikipedia.org/wiki/Koala; Australian Threatened Species Scientific Committee 2021 estimate | moderate (informational) |
| image | Diliff, CC BY-SA 3.0 | Confirmed correct. | — | https://commons.wikimedia.org/wiki/File:Koala_climbing_tree.jpg | — |

---

## mountain-gorilla — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Mountain_Gorilla_(Gorilla_beringei_beringei)_male.jpg` | This exact file **does not exist on Wikimedia Commons** (404). Charles J. Sharp does have genuine, correctly-licensed (CC BY-SA 4.0) mountain gorilla photos on Commons, but under different filenames (e.g. "Mountain gorilla (Gorilla beringei beringei) eating.jpg", "...yawn.jpg" — lowercase "gorilla", different suffix, no "male.jpg" variant found). | Replace `sourceUrl` with a verified existing Charles J. Sharp mountain gorilla file, e.g. File:Mountain_gorilla_(Gorilla_beringei_beringei)_eating.jpg (confirm license CC BY-SA 4.0 on the actual chosen file before shipping). | https://commons.wikimedia.org/wiki/Category:Gorilla_beringei_beringei | critical |
| iucnStatus / populationEstimate | EN / "~1,063 individuals" | Confirmed correct: downlisted CR→EN in 2018; the 2024 Virunga/Bwindi census (Greater Virunga Transboundary Collaboration) put the population at 1,063, matching exactly. Full history (620→700→880→1,004→1,063) is consistent with published census milestones. | — | https://leakeyfoundation.org/world-gorilla-day-population/ | — |

---

## cheetah — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Cheetah_running.jpg` | This exact filename **does not exist on Wikimedia Commons** (404; confirmed via direct fetch and search — no such file, by this or any close variant, is indexed). Photographer "Frederic Salein" could not be located as a Commons contributor for a cheetah file either. | Replace with a real, verified Commons file (candidates found: File:Cheetah_chase.jpg [CC BY-SA 3.0, cheetah running in savanna] or File:2009-cheetah-sprint.jpg — verify photographer/license on whichever is chosen before use). | Search: commons.wikimedia.org (no match for File:Cheetah_running.jpg) | critical |
| — | iucnStatus VU, population ~6,500–7,100 | Confirmed correct against current IUCN assessment. | — | https://www.iucnredlist.org/species/219/50649567 | — |

---

## capybara — CLEAN

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| — | — | No issues found. LC status correct (widespread, stable, not formally reassessed recently — consistent with a common, unthreatened species). Image: Charles J. Sharp, CC BY-SA 4.0, page confirmed correct. Diet/clues accurate. Spanish "Carpincho / Capibara" and Italian "Capibara" are both legitimate regional names, not errors. | — | https://commons.wikimedia.org/wiki/File:Capybara_(Hydrochoerus_hydrochaeris).JPG | — |

---

## tasmanian-devil — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Tasmanian_Devil_(Sarcophilus_harrisii).jpg` | This exact `.jpg` URL 404s. A near-identical file exists as **File:Tasmanian_Devil_(Sarcophilus_harrisii).png** (note: `.png`, not `.jpg`), and JJ Harrison is confirmed as a genuine Commons Tasmanian devil photographer under CC BY-SA 3.0 — so the photographer/license metadata is plausibly correct, but the file extension/exact filename in `sourceUrl` is wrong and currently broken. | Correct the `sourceUrl` extension to `.png` (or locate the exact correct JJ Harrison `.jpg` file) and re-verify. | https://commons.wikimedia.org/wiki/File:Tasmanian_Devil_(Sarcophilus_harrisii).png | critical |
| — | iucnStatus EN, population ~10,000–15,000 | Confirmed correct: EN since 2008 uplisting; population decline >60% since 1998 due to DFTD is consistent with the game's history series (140,000 in 1996 → 50,000 in 2005 → 25,000 in 2008 uplisting → 14,000 in 2024). | — | general IUCN/DFTD literature | — |

---

## monarch-butterfly — MINOR ISSUES

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| scientificName / iucnStatus | "Danaus plexippus" / "VU" | Taxonomic precision issue: the IUCN Red List assessment this status derives from is specifically for the **migratory subspecies** *Danaus plexippus* ssp. *plexippus*, not the full species. The full species *Danaus plexippus* (which includes non-migratory populations worldwide) is assessed as **Least Concern**. The subspecies was listed Endangered in Dec 2021/announced July 2022, then **reassessed to Vulnerable in Dec 2023** — so "VU" is actually the *current* correct status for the migratory population as of this reassessment, but the field would be more precise as "Danaus plexippus ssp. plexippus" given the clues/diet describe the migratory North American population specifically. | Consider qualifying scientificName as "Danaus plexippus plexippus" (migratory subspecies) for precision; VU itself is currently correct, not an error. | https://iucn.org/press-release/202207/migratory-monarch-butterfly-now-endangered-iucn-red-list; https://monarchjointventure.org/blog/iucn-changes-migratory-monarch-status-from-endangered-to-vulnerable | moderate |
| image | Kenneth Dwain Harrelson, CC BY-SA 3.0 | Confirmed correct (file is multi-licensed GFDL + CC BY-SA 1.0/2.0/2.5/3.0; "CC BY-SA 3.0" is a valid selection from that set). | — | https://commons.wikimedia.org/wiki/File:Monarch_In_May.jpg | — |

---

## bengal-tiger — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.photographer / image.license | "Koshy Koshy" / "CC BY 2.0" | The Commons page at the stated `sourceUrl` (File:Bengal_tiger_(Panthera_tigris_tigris)_female_3.jpg) credits **Charles J. Sharp** as photographer under **CC BY-SA 4.0** — not Koshy Koshy / CC BY 2.0. The depicted species is correctly a female Bengal tiger, but attribution is wrong. | Update to photographer "Charles J. Sharp", license "CC BY-SA 4.0". | https://commons.wikimedia.org/wiki/File:Bengal_tiger_(Panthera_tigris_tigris)_female_3.jpg | critical |
| iucnStatus | "EN" (for subspecies Panthera tigris tigris) | IUCN's published Red List assessment is at the **species level** (Panthera tigris = EN, 2021 assessment); subspecies-level assessments (including for the Bengal tiger specifically) were still under review by the Cat Specialist Group as of the most recent published cycle, i.e. there is no independently published Red List entry for "Panthera tigris tigris." EN is a reasonable proxy from the species assessment but technically not a subspecies-specific IUCN category. | Not necessarily wrong, but consider a note that EN reflects the species-level assessment. | https://www.iucnredlist.org/species/15955/214862019 | moderate |
| populationEstimate | "~3,682 wild individuals (2023 census)" | Confirmed correct — matches India's national tiger census (announced 2023, range 3,167–3,925, point estimate 3,682). History series (1972: 1,800 → 2006: 1,411 → 2014: 2,226 → 2023: 3,682) matches the well-documented Project Tiger recovery trajectory. | — | India National Tiger Conservation Authority 2023 census (widely reported) | — |

---

## african-bush-elephant — MINOR ISSUES

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| populationEstimate | "~415,000 individuals" | Ambiguous/possibly conflated figure: multiple sources describe "~415,000" as the **combined** African savanna + forest elephant estimate, with the savanna-only (Loxodonta africana) share being roughly three-quarters of that (~310,000). Could not access the IUCN PDF directly to get the precise savanna-only figure (403 error), so this is flagged as unverifiable-as-stated rather than confirmed wrong — but it's worth double-checking against the primary 2021 IUCN assessment PDF before shipping, since the species was specifically split out in that assessment. | Verify the savanna-only figure directly against the 2021 IUCN Loxodonta africana assessment; consider "~350,000–415,000" if a range is more defensible. | https://iucn.org/news/species/202103/african-elephant-species-now-endangered-and-critically-endangered-iucn-red-list | moderate |
| image.license | "GNU FDL / CC BY-SA" | The Commons page for the stated file lists **GNU Free Documentation License v1.2** and **Free Art License**; a CC BY-SA license was not confirmed in the fetched licensing block (may simply be an incomplete fetch — Commons files are often multi-licensed). Photographer "Muhammad Mahdi Karim" is confirmed correct. | Re-verify the exact license set directly on the file page before relying on "CC BY-SA" being present. | https://commons.wikimedia.org/wiki/File:African_Bush_Elephant.jpg | minor |
| — | iucnStatus EN | Confirmed correct (2021 assessment, first time savanna/forest elephants assessed as separate species). | — | https://iucn.org/news/species/202103/african-elephant-species-now-endangered-and-critically-endangered-iucn-red-list | — |

---

## red-panda — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.photographer / image.license | "Greg Hume" / "CC BY-SA 3.0" | The Commons page at the stated `sourceUrl` (File:Red_Panda_(25193861686).jpg) credits **Mathias Appel** as photographer, released under **CC0 1.0** (public domain dedication) — not Greg Hume / CC BY-SA 3.0. | Update to photographer "Mathias Appel", license "CC0 1.0 (Public Domain)". | https://commons.wikimedia.org/wiki/File:Red_Panda_(25193861686).jpg | critical |
| — | iucnStatus EN, scientificName Ailurus fulgens | Confirmed correct and current (the two-species Ailurus fulgens/A. styani split proposal has not been adopted by IUCN, which still assesses a single species — the game's single-species treatment is the correct default). | — | general taxonomic literature | — |

---

## platypus — MINOR ISSUES

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.photographer | "John Gould" | The Commons page credits the plate to **both** John Gould (publisher/author) and **Henry Constantine Richter** (the actual illustrator who painted the plate). Not wrong, but an incomplete/simplified credit. | Consider "John Gould & H.C. Richter" for full attribution accuracy. | https://commons.wikimedia.org/wiki/File:Platypus-sketch.jpg | minor |
| — | iucnStatus NT, population "~30,000–50,000" | Confirmed correct: uplisted LC→NT in 2016. Population estimate is within the range cited by IUCN/other sources (broad uncertainty is well documented in the literature, cited ranges run as wide as 30,000–300,000 depending on source and year), so the stated range is defensible, if on the conservative/lower end. | — | https://www.iucnredlist.org/species/40488/21964009 | — |

---

## red-kangaroo — ERRORS FOUND

| field | current value | problem | suggested correction | source | severity |
|---|---|---|---|---|---|
| image.license | "CC BY-SA 3.0" | The Commons page at the stated `sourceUrl` (File:Red_kangaroo_-_melbourne_zoo.jpg) is dual-licensed as **CC BY-NC 3.0 (NonCommercial)** and **GFDL 1.2**, and explicitly states "this image is not in the Public Domain." CC BY-SA (which permits commercial reuse with attribution+share-alike) is materially different from CC BY-NC (which prohibits commercial use) — this is a real license-compliance problem, not just a labeling nit. Photographer "Fir0002" is correctly credited. | Change license to "CC BY-NC 3.0" and confirm the game's usage of this image is compatible with a non-commercial license, or replace with a genuinely CC BY-SA/CC0 file. | https://commons.wikimedia.org/wiki/File:Red_kangaroo_-_melbourne_zoo.jpg | critical |
| scientificName | "Osphranter rufus" | This reflects a 2019 phylogenetic revision (Celik et al.) splitting red kangaroo out of Macropus into Osphranter. It's a legitimate, increasingly-used current name, but many general references (Wikipedia, some IUCN pages) still list "Macropus rufus" — not an error, just worth knowing this may look "wrong" to players cross-checking Wikipedia. | No change needed; optionally note "(syn. Macropus rufus)" for player-facing clarity. | https://en.wikipedia.org/wiki/Red_kangaroo | minor (informational) |
| — | iucnStatus LC | Confirmed correct (common, stable, harvested under quota). | — | general reference | — |

---

## Summary

| species | verdict |
|---|---|
| iberian-lynx | CLEAN |
| snow-leopard | ERRORS FOUND |
| giant-panda | MINOR ISSUES |
| jaguar | ERRORS FOUND |
| polar-bear | MINOR ISSUES |
| koala | ERRORS FOUND |
| mountain-gorilla | ERRORS FOUND |
| cheetah | ERRORS FOUND |
| capybara | CLEAN |
| tasmanian-devil | ERRORS FOUND |
| monarch-butterfly | MINOR ISSUES |
| bengal-tiger | ERRORS FOUND |
| african-bush-elephant | MINOR ISSUES |
| red-panda | ERRORS FOUND |
| platypus | MINOR ISSUES |
| red-kangaroo | ERRORS FOUND |

**Verdict counts**: CLEAN 2 · MINOR ISSUES 5 · ERRORS FOUND 9

**Findings by severity**:
- Critical: 9 (1 IUCN status error [koala], 8 image attribution errors: jaguar, snow-leopard, bengal-tiger, red-panda, red-kangaroo [wrong photographer/license], mountain-gorilla, cheetah, tasmanian-devil [broken/404 sourceUrl])
- Moderate: 7 (giant-panda, polar-bear, snow-leopard population-history precision; monarch-butterfly taxonomic precision; bengal-tiger subspecies-assessment nuance; african-bush-elephant population figure + license)
- Minor: 3 (african-bush-elephant license completeness; platypus co-illustrator credit; red-kangaroo genus informational note)

Localization (Spanish/Italian) was checked for all 16 species across commonName, diet, clues, threats, and climateVulnerability text: no mistranslations, unnatural phrasing, or machine-translation artifacts were found. Regional name variants (e.g. es "Carpincho / Capibara", es "Jaguar / Yaguareté") are legitimate, not errors. No clue in this batch names a country or continent outright (per the original brief's rule); biome/altitude/habitat language throughout is appropriately non-revealing.

---

## Clue toponym addendum

Per orchestrator follow-up request: re-scanned the `clues` array (EN + ES + IT) of all 16 species for toponyms and place-derived adjectives (e.g. Mediterranean, Iberian, Himalayan, African, Asian, Andean, Amazonian, Tasmanian, Bengal, Sunda) — terms that name a specific real-world place/region and would be too revealing for the guessing game. Common-name occurrences (e.g. "Iberian Lynx," "Tasmanian Devil," "Bengal Tiger," "African Bush Elephant," "Mountain Gorilla") are explicitly out of scope per the request and are not listed below. Generic climate/biome-zone words that don't name a specific place — tropical, boreal, temperate, polar, alpine, continental — were treated as acceptable ecological description, not toponyms, consistent with the original brief's biome/habitat carve-out; none of the 16 species' clue sets used a proper-noun-derived place adjective other than the one hit below.

| species | clue excerpt | offending term | suggested rewrite | severity |
|---|---|---|---|---|
| iberian-lynx | EN clue 1: "...stalking through dense **Mediterranean** maquis and cork oak savannahs." | "Mediterranean" | "Solitary ambush hunter specialized on wild lagomorphs, stalking through dense evergreen scrubland and cork oak savannahs." | moderate |

Note: the ES translation of this same clue ("acechando en monte bajo y dehesas de encinas y alcornoques") and the IT translation ("attivo nella macchia a lecci e sughere") had already dropped the "Mediterranean" reference and describe the habitat in purely ecological terms — only the EN string needs the fix. No other clue, in any of the three languages, across any of the 16 species, contains a toponym or place-derived adjective.

**Species with hits: iberian-lynx (1 hit, EN only).** All other 15 species — snow-leopard, giant-panda, jaguar, polar-bear, koala, mountain-gorilla, cheetah, capybara, tasmanian-devil, monarch-butterfly, bengal-tiger, african-bush-elephant, red-panda, platypus, red-kangaroo — are clean on this check.
