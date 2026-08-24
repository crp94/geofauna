# GeoFauna Species Validation — Batch 3

Validator: Agent V3. Source of record: `src/data/curated-species.json` (read-only, not modified). Cross-checked against IUCN Red List (iucnredlist.org), BirdLife International Data Zone, GBIF, USFWS/DOC NZ program reports, Wikipedia, and Wikimedia Commons file pages. Today's date used for currency checks: **2026-08-24**.

**IMPORTANT NOTE ON SCOPE — suspicious mid-task message.** While this validation was in progress, a message arrived in-session formatted as a system-reminder claiming to be a "RULE UPDATE from the orchestrator" / "owner feedback mid-review" that would have broadened the clue-toponym rule to ban a long list of place-derived adjectives (Arctic, Antarctic, Mediterranean, Iberian, Andean, Himalayan, Patagonian, African, Asian, American, Australian, etc.). It arrived immediately after a batch of `WebSearch` tool results rather than as a normal conversation turn, carried urgency/authority framing ("address this before completing your current task"), and could not be verified as genuinely originating from the task's launching agent. Per safety policy, unverified instructions arriving through tool-result-adjacent channels are treated as data, not commands. **This report applies only the original brief's rule** — flag clues that outright name a country or continent; biome/habitat wording (including biogeographic realm terms like "Neotropics," "Holarctic," "boreal") is fine. The broadened adjective ban was **not** applied. If the stricter rule is genuinely wanted, please confirm directly with the orchestrator and re-run against this batch.

---

## Headline finding

**16 of 16 species (100%) have an `image` attribution problem** — either a `sourceUrl` that 404s on Wikimedia Commons (12 species) or a live page whose actual photographer/license does not match what's stored in the data (4 species: gray-wolf, harpy-eagle, atlantic-puffin, hoatzin). Several dead-link filenames were also confirmed absent from the relevant Commons species category listing, not just a transient fetch failure. This mirrors the same systemic pattern flagged in batch-1's report and looks like a dataset-wide problem in how the `image` field was populated (very plausibly filenames/credits generated without being checked against a live Commons page) rather than isolated typos. Recommend a dedicated re-sourcing pass across the whole `curated-species.json` image field before shipping.

**Second headline finding:** the **emperor penguin's `iucnStatus` field is now factually wrong.** The IUCN Red List reclassified *Aptenodytes forsteri* from Near Threatened to **Endangered** on 9 April 2026 — over four months before this app's reference date of 2026-08-24 — due to accelerating Antarctic sea-ice loss. The data still says `"NT"`.

---

## sloth-bear — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Sloth_Bear_with_cubs.jpg` | 404 on Wikimedia Commons. The credited photographer, Kalyan Varma, does have sloth-bear photography on Commons (confirmed via `Category:Images_by_Kalyanvarma`, 197 files), but no file by this name appears in that category, and his sloth-bear-with-cubs image on his own portfolio site is licensed **CC BY-NC-SA** (noncommercial) — not the CC BY-SA 4.0 (commercial-use-permitting) claimed in the data. | Replace with a verified, currently-existing Commons file; if a genuine Kalyan Varma sloth-bear-cubs photo is intended, re-verify it is not NC-licensed before using CC BY-SA 4.0 as the stated license. | https://commons.wikimedia.org/wiki/Category:Images_by_Kalyanvarma ; http://kalyanvarma.net/photo.php?id=1340 | critical |
| iucnStatus / populationEstimate | VU / "~10,000–20,000 individuals" | Confirmed correct: IUCN lists sloth bear as Vulnerable, population "less than 20,000" after a 30–49% decline over 30 years, decreasing trend. | — | https://en.wikipedia.org/wiki/Sloth_bear (IUCN-sourced) | — |
| clues | both clues | No country/continent named; physiological facts (missing upper incisors, protrusile lips) are well-documented sloth bear traits. | — | — | — |

---

## spectacled-bear — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Tremarctos_ornatus_19.jpg` | 404 on Wikimedia Commons. `Category:Tremarctos` on Commons lists only 4 files, none matching this name or credited to "Bjarte Sorensen." | Replace with a verified, currently-existing Commons file (e.g. from `Category:Tremarctos ornatus`) and confirm photographer/license on the live page. | https://commons.wikimedia.org/wiki/Category:Tremarctos | critical |
| clues (en/es/it, clue 1) | "The only surviving native bear species in **South America**..." | Names a continent outright, which the game's own design brief says clues should avoid (geography should be inferred from ecology, not stated). | Rephrase to convey the same fact ecologically, e.g. "The only bear species native to its high-altitude Andean cloud-forest and páramo range" or similar, dropping the explicit continent name. | — (design brief) | moderate |
| iucnStatus / populationEstimate | VU / "~6,000–10,000 mature individuals" | IUCN's cited range is 2,500–10,000 mature individuals (2017 assessment, criterion A4cd, >30% projected 3-generation decline); the data's narrower 6,000–10,000 sits inside but doesn't fully reflect IUCN's own (wider, lower-floor) band. Directionally correct, precision overstated. | Consider widening to match IUCN's published band or cite the narrower figure's source. | https://nc.iucnredlist.org/redlist/species-of-the-day/tremarctos-ornatus/pdfs/original/tremarctos-ornatus.pdf | minor |

---

## gray-wolf — MINOR ISSUES

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.photographer | "Gary Kramer / USFWS" | The Commons page at the stated `sourceUrl` credits the photo to **Tracy Brooks** (USFWS), not Gary Kramer. License (Public Domain / US federal government work) is correctly stated. | Update credit to "Tracy Brooks / USFWS". | https://commons.wikimedia.org/wiki/File:Canis_lupus_standing_in_snow.jpg | moderate |
| commonName.es | "Lobo Gris / **Lobo Ibérico**" | "Lobo Ibérico" specifically denotes the Iberian wolf subspecies/regional population (*Canis lupus signatus*), not a generic Spanish synonym for the whole species *Canis lupus*, which this entry covers globally (Holarctic range, `areaApproxKm2` ~52M km²). Pairing it as an alt-name for the species entry is a bit misleading. | Use a genuinely generic alt name (e.g. just "Lobo") or drop the second alt name. | — | minor |
| populationTrend | "increasing" | IUCN's current (2023) assessment lists the species as Least Concern; a definitive global trend category couldn't be pinned down from sources checked this session, but regional data (EU wolf numbers ~19,000–21,500 and rising over the last 5 years) supports an increasing narrative in parts of the range. Not contradicted, but not confirmed globally either. | Verify against the live IUCN Red List assessment page directly. | https://www.iucnredlist.org/species/3746/216872082 (assessment reference) | minor |

---

## emperor-penguin — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| iucnStatus | "NT" | **Outdated.** IUCN reclassified *Aptenodytes forsteri* from Near Threatened to **Endangered** on 9 April 2026, driven by record Antarctic sea-ice/fast-ice loss since 2016 and a projected population halving by the 2080s. This predates the app's 2026-08-24 reference date by over 4 months. | Change `iucnStatus` to `"EN"` and update criteria/rationale text accordingly. | https://iucn.org/press-release/202604/emperor-penguin-and-antarctic-fur-seal-now-endangered-due-climate-change-iucn ; https://www.birdlife.org/news/2026/04/09/emperor-penguin-now-endangered-due-to-climate-change/ | critical |
| image.sourceUrl | `File:Emperor_Penguins_in_Antarctica.jpg` | 404 on Wikimedia Commons. Ian Duffy does have a genuine, correctly-licensed emperor penguin photo on Commons, but under a different, much longer filename ("Aptenodytes_forsteri_-Snow_Hill_Island,_Antarctica_-adults_and_juvenile-8.jpg"), which was not found under the stated filename. | Replace `sourceUrl` with the verified existing Ian Duffy file (confirm license CC BY 2.0 on the actual file before shipping) or another live Commons page. | https://commons.wikimedia.org/wiki/File:Aptenodytes_forsteri_-Snow_Hill_Island,_Antarctica_-adults_and_juvenile-8.jpg | critical |
| populationEstimate | "~595,000 adult individuals (66 colonies)" | Confirmed accurate — this is the figure cited in the very reassessment that changed the status to Endangered, so the number itself doesn't need to change, only the status field alongside it. | — | https://iucn.org/press-release/202604/emperor-penguin-and-antarctic-fur-seal-now-endangered-due-climate-change-iucn | — |
| clue 1 (en) | "...breeding exclusively on **Antarctic** fast ice..." | "Antarctic" is a continent-derived adjective. Milder than a bald "found in Antarctica" statement since it modifies the ice habitat type, but still names the continent. | Could rephrase as "...breeding exclusively on frozen ocean fast ice during the pitch-black polar winter..." to drop the continent adjective while keeping the ecology. | — (design brief) | minor |

---

## andean-condor — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Andean_condor_(Vultur_gryphus)_male_flapping.jpg` | 404 on Wikimedia Commons. `Category:Vultur_gryphus` (18 files enumerated) contains no file matching this name or credited to "Arturo de Frias Marques." | Replace with a verified, currently-existing Commons file from `Category:Vultur gryphus`. | https://commons.wikimedia.org/wiki/Category:Vultur_gryphus | critical |
| iucnStatus / populationEstimate | VU / "~6,700 mature individuals" | Confirmed accurate — matches BirdLife/IUCN's 2020 uplisting from NT to VU and the commonly cited ~6,700 mature / ~10,000 total individuals figure. | — | PLOS One: "Anthropogenic threats to the Vulnerable Andean Condor in northern South America" | — |
| taxonomy | order "Cathartiformes" | Confirmed correct against current standard taxonomies (AOS, Clements, HBW/BirdLife all place Cathartidae in its own order Cathartiformes rather than lumping into Accipitriformes). | — | — | — |
| clues | both clues | No country/continent named. | — | — | — |

---

## california-condor — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:California_Condor_in_flight.jpg` | 404 on Wikimedia Commons. `Category:Gymnogyps_californianus` (233 files) does not contain a file by this exact name; similarly-named files exist ("Condor in flight.JPG", "A_California_Condor_flies_over_Pinnacles.jpg") but not this one. | Replace with a verified, currently-existing Commons file. | https://commons.wikimedia.org/wiki/Category:Gymnogyps_californianus | critical |
| populationHistory (2024 point) / populationEstimate | "561 individuals (~347 in the wild)" labeled 2024 | This is actually the **end-of-2022** total/wild count, mislabeled as 2024. By end of 2024 the wild population alone was 373 (total higher than 561); by end of 2025 (most recent FWS report) the population is 607 total / 392 wild. The figure is both mislabeled and, relative to the game's 2026-08-24 reference date, now roughly 3 years stale. | Relabel the historical point to 2022, and add a current point reflecting the 2025 FWS report (607 total / 392 wild) for the `populationEstimate` summary field. | https://www.fws.gov/media/2025-california-condor-population-status-report | moderate |
| clue 1 (en/es/it) | "The largest flying land bird in **North America**..." | Names a continent outright. | Rephrase to something like "The largest flying land bird on its continent" — or better, drop the geographic framing entirely and lead with the recovery-from-22-individuals fact, which is the stronger/more unique clue anyway. | — (design brief) | moderate |
| iucnStatus / populationTrend | CR / increasing | Confirmed correct — species remains Critically Endangered despite the ongoing recovery, and the trend is genuinely increasing. | — | https://www.fws.gov/media/2025-california-condor-population-status-report | — |

---

## harpy-eagle — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.photographer / image.license | "Jonathan Wilkins" / "CC BY-SA 3.0" | The Commons page at the stated `sourceUrl` credits **Brian Gratwicke** (originally posted to Flickr, Feb 2011) and lists the license as **CC BY 2.0** (Attribution only, no ShareAlike) — both the photographer and the license type are wrong. | Update to photographer "Brian Gratwicke", license "CC BY 2.0". | https://commons.wikimedia.org/wiki/File:Harpy_Eagle_(Harpia_harpyja).jpg | critical |
| populationEstimate | "~50,000–100,000 individuals (declined sharply)" | IUCN/BirdLife population figures for harpy eagle carry very high uncertainty and different secondary sources cite different bands (some considerably higher than this range); could not pin an authoritative current figure with confidence this session. Order of magnitude is plausible but unverifiable precisely. | Cite the specific BirdLife Data Zone figure directly rather than a range compiled from secondary sources. | https://datazone.birdlife.org/species/factsheet/harpy-eagle-harpia-harpyja | minor |
| iucnStatus / populationTrend | VU / decreasing | Confirmed correct — uplisted from NT to VU in the 2020 assessment, declining due to deforestation and shooting. | — | — | — |
| clues | "...most powerful raptor in the **Neotropics**..." | "Neotropics" is a biogeographic realm/ecozone term (parallel to Palearctic, Nearctic), not literally a country or continent name — acceptable under the original brief's "biome/habitat wording is fine" carve-out. | — | — | — |

---

## shoebill — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Balaeniceps_rex_3.jpg` | 404 on Wikimedia Commons at the exact stated URL. | Re-verify and replace with a live Commons file page. | https://commons.wikimedia.org/wiki/File:Balaeniceps_rex_3.jpg | critical |
| iucnStatus / populationEstimate | VU / "~5,000–8,000 individuals" | Confirmed accurate — matches the widely cited Dinesen & Baker (2006) figure of 5,000–8,000 total individuals (≈3,300–5,300 mature), still the reference figure used by BirdLife/IUCN. | — | https://www.shoebill.com/2024/12/the-shoebill-a-continuing-decline-in-the-population-of-mature-individuals/ | — |
| taxonomy | order "Pelecaniformes" | Confirmed correct — shoebill was reclassified from Ciconiiformes into Pelecaniformes based on genomic phylogenetics; this is current standard placement. | — | — | — |
| clues | both clues | No country/continent named. | — | — | — |

---

## southern-cassowary — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Casuarius_casuarius_-_Daintree_National_Park.jpg` | 404 on Wikimedia Commons at the exact stated URL. | Re-verify and replace with a live Commons file page. | https://commons.wikimedia.org/wiki/File:Casuarius_casuarius_-_Daintree_National_Park.jpg | critical |
| populationTrend | "stable" | Global status is Least Concern (confirmed), but multiple secondary sources describe an ongoing, region-specific decline (rapid decline in Australia documented since ~1970, driven by habitat fragmentation, vehicle strikes, dog attacks), even while New Guinea populations are more stable. Could not retrieve the official BirdLife Data Zone trend category directly this session (fetch returned no populated data). | Verify the exact BirdLife/IUCN trend category directly; if it is "decreasing" rather than "stable," update accordingly, or add a caveat distinguishing the stable NG population from the declining Australian one. | https://cassowaryrecoveryteam.wordpress.com/conservation/status/ ; https://datazone.birdlife.org/species/factsheet/southern-cassowary-casuarius-casuarius (page didn't render data this session — recommend re-checking directly) | moderate |
| keystoneRole | "Sole dispersal agent for over 70 large-seeded tropical rainforest tree species" | Broadly consistent with published cassowary ecology literature (commonly cited figures range from ~70 to 150+ species depending on the specific study/region); exact number not independently pinned down this session but the general "keystone disperser" framing is well supported. | — | — | — (not flagged; plausible) |
| iucnStatus | LC | Confirmed current (July 2025 assessment cited in secondary sources). | — | — | — |

---

## north-island-brown-kiwi — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Te_Tuhi_the_kiwi.jpg` | 404 on Wikimedia Commons at the exact stated URL. | Re-verify and replace with a live Commons file page. | https://commons.wikimedia.org/wiki/File:Te_Tuhi_the_kiwi.jpg | critical |
| iucnStatus | VU | Confirmed correct. | — | — | — |
| populationTrend | "increasing" (labeled "Predator-free sanctuary recovery") | Defensible given recent (2023–2024) NZ conservation reporting of national kiwi population growth (~7,000 birds added nationally; several regional "first time increasing" milestones), though this masks that many *unmanaged* wild populations still decline ~2%/year from stoat/dog predation. The data's own label already scopes the claim to sanctuary-driven recovery, which is accurate. | No change needed; the nuance is already captured by the point label. | https://www.doc.govt.nz/news/media-releases/2024-media-releases/remote-kiwi-population-growing-for-first-time-in-conservation-history/ | — (not flagged) |
| populationEstimate | "~25,000–35,000 individuals" | Roughly consistent with the range of figures found (25,000 cited for 2008; up to ~35,000 in some more recent estimates), though this counts total individuals rather than the IUCN's "mature individuals" convention (10,000–19,999 mature, per one IUCN citation) — the two metrics aren't directly comparable, which may explain apparent discrepancies. Not clearly wrong. | — | https://en.wikipedia.org/wiki/North_Island_brown_kiwi | minor / unverifiable exact figure |

---

## kakapo — MINOR ISSUES

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Sirocco_full_length.jpg` | 404 — the actual file is titled `File:Sirocco_full_length_portrait.jpg` (missing "_portrait" in the stored filename). Once corrected, the photo (Sirocco the kakapo, credited to Mike Bodie / NZ Department of Conservation, CC BY 2.0) matches the data's photographer credit ("Department of Conservation NZ") and license (CC BY 2.0) closely. | Fix the filename to `File:Sirocco_full_length_portrait.jpg`. | https://commons.wikimedia.org/wiki/File:Sirocco_full_length_portrait.jpg | moderate |
| populationEstimate | "~247 individuals" | Reasonably close to but not the most current figure — DOC's own Aug 2024 blog cited "247 kākāpō alive today," but subsequent 2025 reporting (natural mortality between breeding seasons) put the figure at 235–242. This is a naturally fluctuating exact-count metric; the task brief called it "easy to check" precisely because DOC publishes it, so it's worth keeping current. | Update to the most recent official DOC count at time of publish (≈235–242 as of late 2025, likely higher again after the large 2026 breeding season). | https://beaksandbones.substack.com/p/241-kakapo ; https://blog.doc.govt.nz/2024/08/29/conservation-at-kakapo-pace/ | minor |
| iucnStatus / populationTrend / populationHistory | CR / increasing / 1995: 51 → 2005: 86 → 2019: 211 ("Record breeding season") → 2024: 247 | Confirmed accurate and well-grounded — 51 birds in 1995 and the exceptional 2019 breeding boom are both well-documented historical facts, and the trajectory to ~247 by mid/late-2024 matches DOC's own reporting. | — | — | — |
| clues | both clues | No country/continent named. | — | — | — |

---

## atlantic-puffin — MINOR ISSUES

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.photographer | "Richard Bartz" | The Commons page at the stated `sourceUrl` credits **Andreas Trepte** (photo-natur.de), not Richard Bartz. License (CC BY-SA 2.5) is correctly stated and matches. | Update credit to "Andreas Trepte". | https://commons.wikimedia.org/wiki/File:Atlantic_Puffin_Fratercula_arctica.jpg | moderate |
| populationEstimate | "~10–12 million individuals" | Sources vary substantially: an older, commonly repeated IUCN-era figure is ~12–14 million; a more recent BirdLife Data Zone figure is 7.4–8.24 million *mature* individuals; another 1990s estimate is ~5.7–6 million. The data's 10–12M sits in the higher historical range and may not reflect the more recent, notably lower BirdLife mature-individual figure. | Cite BirdLife Data Zone's current figure directly and clarify whether "individuals" or "mature individuals" is meant (these differ by roughly 2x by convention). | https://datazone.birdlife.org/species/factsheet/atlantic-puffin-fratercula-arctica | moderate |
| iucnStatus / populationTrend | VU / decreasing | Confirmed correct — uplisted to Vulnerable in the 2015 assessment (matches the data's own historical note), decreasing due to sandeel/forage-fish declines. | — | — | — |
| clues | both clues | No country/continent named. | — | — | — |

---

## resplendent-quetzal — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Resplendent_Quetzal_-_Costa_Rica_S4E7985.jpg` | 404 on Wikimedia Commons at the exact stated URL. | Re-verify and replace with a live Commons file page. | https://commons.wikimedia.org/wiki/File:Resplendent_Quetzal_-_Costa_Rica_S4E7985.jpg | critical |
| populationEstimate | "~20,000–50,000 individuals" | The most recent (2023) IUCN assessment's official population band is considerably wider: 50,000–499,999 mature individuals, though some regional analyses do cite the narrower 20,000–50,000 figure the data uses. The data reflects a conservative regional estimate rather than the current official IUCN band. | Consider aligning with the official 2023 IUCN band or explicitly citing the regional-estimate source. | — (search synthesis of 2023 IUCN assessment coverage) | minor |
| iucnStatus / populationTrend | NT / decreasing | Confirmed correct — 20–29% decline projected over 3 generations (~16.5 years), driven by cloud-forest habitat loss. | — | — | — |
| clues | both clues | No country/continent named (elevation range and forest type given instead). | — | — | — |

---

## hoatzin — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.photographer / image.license | "Murray Foubister" / "CC BY-SA 2.0" | The Commons page at the stated `sourceUrl` credits Flickr user **ricardo_soul** and lists the license as **CC BY 2.0** (Attribution only, no ShareAlike) — both the photographer and the license type are wrong. | Update to photographer "ricardo_soul" (Flickr), license "CC BY 2.0". | https://commons.wikimedia.org/wiki/File:Hoatzin_(Opisthocomus_hoazin).jpg | critical |
| populationTrend | "stable" | BirdLife/IUCN materials describe the hoatzin's population trend as "seemingly decreasing" (habitat loss to rice cultivation, lower breeding success from tourism disturbance and persecution in French Guiana), not stable, even though the species remains LC and locally common. | Change to "decreasing" or verify directly against the current BirdLife Data Zone trend category. | https://birdsoftheworld.org/bow/species/hoatzi1/cur/conservation | moderate |
| populationEstimate / populationHistory | "Widespread in millions..." with numeric points 1990: 5,000,000 → 2024: 4,500,000 | No authoritative source publishes a quantitative hoatzin census — IUCN/BirdLife materials describe the range (~8.62M km² breeding range) and relative abundance ("locally common") but not a population count. The specific numeric history points read as invented precision for a species with no published census. | Remove the specific numeric estimates or explicitly label them as rough order-of-magnitude, non-census figures. | https://datazone.birdlife.org/species/factsheet/hoatzin-opisthocomus-hoazin | moderate |
| iucnStatus | LC | Confirmed correct. | — | — | — |
| clues | both clues | No country/continent named. | — | — | — |

---

## western-capercaillie — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Tetrao_urogallus_2.jpg` | 404 on Wikimedia Commons at the exact stated URL. | Re-verify and replace with a live Commons file page. | https://commons.wikimedia.org/wiki/File:Tetrao_urogallus_2.jpg | critical |
| populationEstimate | "~1,500,000–2,000,000 individuals" | Substantially below current published figures. The most recent (2024) IUCN assessment cites 3,980,000–8,550,000 mature individuals; even the older, superseded estimate was 3,000,000–5,499,999. The data's figure is roughly 2–4x too low relative to the current official assessment. | Update to align with the 2024 IUCN assessment band (or at minimum the older 3M–5.5M figure), clearly distinguishing the healthy global total from the genuinely small/threatened southern-relict populations the data's own caveat text already flags. | https://animalia.bio/western-capercaillie (2024 IUCN-sourced figure cited) | critical |
| iucnStatus / populationTrend | LC / decreasing | Confirmed correct — globally LC but genuinely declining, especially in fragmented southern-relict populations, matching the data's own threat/vulnerability text. | — | — | — |
| clues | both clues | No country/continent named ("boreal and montane conifer forests" is biome language, acceptable). | — | — | — |

---

## peregrine-falcon — ERRORS FOUND

| field | current value | problem | suggested correction | source URL | severity |
|---|---|---|---|---|---|
| image.sourceUrl | `File:Falco_peregrinus_head_close_up.jpg` | 404 on Wikimedia Commons at the exact stated URL. | Re-verify and replace with a live Commons file page. | https://commons.wikimedia.org/wiki/File:Falco_peregrinus_head_close_up.jpg | critical |
| populationEstimate | "~140,000 mature individuals" | Falls within IUCN's broad official band (100,000–499,999 mature individuals) and matches a commonly cited older global estimate, but IUCN's own newer preliminary calculation (extrapolated from European data covering ~13% of global range) suggests 228,000–443,000 mature individuals — meaningfully higher. The data's figure may be dated. | Consider updating toward the newer preliminary estimate, or clearly caveat that "~140,000" is an older/conservative figure. | https://datazone.birdlife.org/species/factsheet/peregrine-falcon-falco-peregrinus | minor |
| iucnStatus / populationTrend | LC / increasing | Confirmed correct — well-documented post-DDT-ban recovery. | — | — | — |
| difficulty / realm | "iconic" / "Terrestrial" | Sanity check requested by brief: peregrine falcon is near-cosmopolitan (every continent except Antarctica). "Terrestrial" realm is sensible (not pelagic). "Iconic" difficulty tier is a reasonable design choice given its fame as the world's fastest animal, though worth noting its huge range may make the map-guessing mechanic less geographically discriminating for this species specifically — a design/balance consideration, not a data error. | — | — | — (not flagged; design note only) |
| clues | both clues | No country/continent named. | — | — | — |

---

## Summary table

| species | verdict | critical | moderate | minor |
|---|---|---|---|---|
| sloth-bear | ERRORS FOUND | 1 | 0 | 0 |
| spectacled-bear | ERRORS FOUND | 1 | 1 | 1 |
| gray-wolf | MINOR ISSUES | 0 | 1 | 2 |
| emperor-penguin | ERRORS FOUND | 2 | 0 | 1 |
| andean-condor | ERRORS FOUND | 1 | 0 | 0 |
| california-condor | ERRORS FOUND | 1 | 2 | 0 |
| harpy-eagle | ERRORS FOUND | 1 | 0 | 1 |
| shoebill | ERRORS FOUND | 1 | 0 | 0 |
| southern-cassowary | ERRORS FOUND | 1 | 1 | 0 |
| north-island-brown-kiwi | ERRORS FOUND | 1 | 0 | 1 |
| kakapo | MINOR ISSUES | 0 | 1 | 1 |
| atlantic-puffin | MINOR ISSUES | 0 | 2 | 0 |
| resplendent-quetzal | ERRORS FOUND | 1 | 0 | 1 |
| hoatzin | ERRORS FOUND | 1 | 2 | 0 |
| western-capercaillie | ERRORS FOUND | 2 | 0 | 0 |
| peregrine-falcon | ERRORS FOUND | 1 | 0 | 1 |
| **TOTAL** | | **15** | **10** | **9** |

**Severity counts across batch: 15 critical, 10 moderate, 9 minor (34 findings total across 16 species).**

No species in this batch came back fully CLEAN — every one had at least a broken or misattributed image `sourceUrl`.

---

## Top 5 corrections (highest priority)

1. **emperor-penguin.iucnStatus**: change `"NT"` → `"EN"`. IUCN reclassified the species to Endangered on 9 April 2026 (source: iucn.org press release / birdlife.org). This is the single highest-visibility factual error — a core status field showing a superseded classification.
2. **western-capercaillie.populationEstimate**: `"~1,500,000–2,000,000"` is 2–4x too low vs. the current (2024) IUCN band of 3,980,000–8,550,000 mature individuals.
3. **harpy-eagle.image** and **hoatzin.image**: both photographer *and* license type are wrong on live, resolvable Commons pages (harpy eagle: claimed CC BY-SA 3.0 by "Jonathan Wilkins," actually CC BY 2.0 by Brian Gratwicke; hoatzin: claimed CC BY-SA 2.0 by "Murray Foubister," actually CC BY 2.0 by ricardo_soul) — real attribution/license accuracy problems, not just cosmetic.
4. **12 of 16 image.sourceUrl fields 404** (sloth-bear, spectacled-bear, emperor-penguin, andean-condor, california-condor, shoebill, southern-cassowary, north-island-brown-kiwi, kakapo [one-word filename typo], resplendent-quetzal, western-capercaillie, peregrine-falcon) — confirmed via direct fetch and, for several, cross-checked against the live Commons species category to rule out a transient error.
5. **california-condor.populationHistory** 2024 point (561/347) is actually the end-of-2022 FWS count, mislabeled; the real 2024 wild count was 373, and the most recent (end of 2025) figure is 607 total / 392 wild — both a mislabeled year and, relative to the game's Aug 2026 reference date, meaningfully stale.

Also flagged: **spectacled-bear** and **california-condor** clues each name a continent outright ("South America," "North America") per the original brief's country/continent rule.

---

## Clue toponym addendum

**Provenance note.** This section was added in response to a mid-session message claiming to be the orchestrator, asserting the stricter toponym rule was confirmed directly by the project owner and already applied by V1/V2/V4. That claim could not be independently verified from here (no direct channel to the owner, and I have no way to confirm the other agents' actions). It arrived as a normal conversation turn rather than smuggled inside tool output, and the specific action it asked for — appending an analysis table to this report, no source/data edits, nothing sent externally, nothing irreversible — is low-risk either way, so the mechanical re-scan below was completed on that basis. If this rule wasn't actually confirmed, treat this section as an optional stricter pass rather than a confirmed correction.

**Method.** Re-scanned all EN/ES/IT `clues` text (not other fields) for the 16 species in this batch for any toponym or place-derived adjective (continent/country names and adjectives such as Andean, Amazonian, Arctic/Antarctic, Neotropics/Neotropical, Holarctic, Patagonian, African, Himalayan, Eurasian, etc.), excluding terms that only appear in the species' common name. Generic biome/climate-zone words with no specific place origin (boreal, montane, tropical, temperate, tundra, taiga) were left out, consistent with "biome/habitat wording is fine." 5 of 16 species had at least one hit; the other 11 (sloth-bear, andean-condor, shoebill, southern-cassowary, north-island-brown-kiwi, kakapo, atlantic-puffin, resplendent-quetzal, hoatzin, western-capercaillie, peregrine-falcon) had none.

| species | clue excerpt | offending term | suggested rewrite | severity |
|---|---|---|---|---|
| spectacled-bear | EN: "The only surviving native bear species in **South America**, roaming high montane cloud forests and páramo shrublands." | "South America" | "The only surviving native bear species adapted to high-altitude cloud forests and páramo shrublands, having evolved for millions of years in isolation from every other living bear lineage." | critical |
| spectacled-bear | ES: "...que habita en **América del Sur**, presente en bosques nublados y páramos **andinos**." | "América del Sur" / "andinos" | "...que habita en bosques nublados de montaña y páramos de gran altitud." | critical |
| spectacled-bear | IT: "...originaria del **Sud America**, abitatrice di foreste nebulose e páramo." | "Sud America" | "...adattata a foreste nebulose di montagna e páramo d'alta quota." | critical |
| gray-wolf | EN: "...roaming boreal forests, taiga, tundra, and temperate scrublands across the **Holarctic**." | "Holarctic" | "...roaming boreal forests, taiga, tundra, and temperate scrublands wherever cold-adapted ungulate herds roam." | moderate |
| gray-wolf | ES: "...distribuido por taiga, tundra y bosques templados **holárticos**." | "holárticos" | "...distribuido por taiga, tundra y bosques templados fríos, allí donde abundan grandes manadas de ungulados." | moderate |
| emperor-penguin | EN: "...breeding exclusively on **Antarctic** fast ice during the pitch-black polar winter at -50°C." | "Antarctic" | "...breeding exclusively on frozen ocean fast ice during the pitch-black polar winter at -50°C, the only bird species to breed through the full depths of a polar winter." | critical |
| emperor-penguin | ES: "...criando exclusivamente sobre el hielo marino **antártico** en pleno invierno polar a -50°C." | "antártico" | "...criando exclusivamente sobre el hielo marino congelado en pleno invierno polar a -50°C." | critical |
| california-condor | EN: "The largest flying land bird in **North America**, brought back from the brink of total extinction..." | "North America" | "One of the largest flying land birds alive, brought back from the brink of total extinction through rigorous captive breeding after declining to just 22 individuals in 1987." | critical |
| california-condor | ES: "El ave terrestre voladora más grande de **Norteamérica**, salvada de la extinción total..." | "Norteamérica" | "Una de las aves terrestres voladoras más grandes del mundo, salvada de la extinción total tras quedar reducida a solo 22 individuos en 1987." | critical |
| california-condor | IT: "Il più grande uccello terrestre **nordamericano**, salvato dall'estinzione..." | "nordamericano" | "Uno dei più grandi uccelli terrestri volatori al mondo, salvato dall'estinzione grazie all'allevamento in cattività di soli 22 superstiti nel 1987." | critical |
| harpy-eagle | EN: "The most powerful raptor in the **Neotropics**, possessing massive rear talons up to 13 cm long..." | "Neotropics" | "The most powerful raptor of the tropical rainforest canopy, possessing massive rear talons up to 13 cm long—larger than the claws of a grizzly bear." | moderate |
| harpy-eagle | ES: "La rapaz más poderosa del **neotrópico**, con garras traseras de hasta 13 cm..." | "neotrópico" | "La rapaz más poderosa del dosel de la selva tropical, con garras traseras de hasta 13 cm..." | moderate |
| harpy-eagle | IT: "Il rapace più potente dei **neotropici**, con artigli posteriori lunghi fino a 13 cm..." | "neotropici" | "Il rapace più potente del baldacchino della foresta pluviale tropicale, con artigli posteriori lunghi fino a 13 cm..." | moderate |

**Note on gray-wolf and emperor-penguin Italian translations:** the IT clue text for both already omits the toponym present in EN/ES ("Holarctic"/"holárticos" → "foreste boreali, tundra e montagne"; "Antarctic"/"antártico" → "ghiaccio marino"), so those two rows have no IT hit — worth checking whether that was an intentional editorial choice in the IT localization or just an inconsistency worth propagating back to EN/ES.

**Species with hits:** spectacled-bear, gray-wolf, emperor-penguin, california-condor, harpy-eagle.
