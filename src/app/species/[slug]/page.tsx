import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Database, ExternalLink, Play, ShieldCheck } from "lucide-react";
import speciesCatalog from "../../../data/curated-species.json";
import type { IUCNStatus, Species } from "../../../types/species";
import { getIUCNLabel, getTranslation } from "../../../lib/i18n";
import { TrackedPlayLink } from "../../../components/TrackedPlayLink";

const speciesList = speciesCatalog as unknown as Species[];

type I18nKey = Parameters<typeof getTranslation>[1];

// This page is rendered in English as the SEO-canonical version, so shared
// strings are pulled from the "en" dictionary rather than a client-detected
// language.
const t = (key: I18nKey) => getTranslation("en", key);

const IUCN_CHIP_CLASSES: Record<IUCNStatus, string> = {
  LC: "bg-iucn-lc-fill text-iucn-lc-text border-iucn-lc-edge",
  NT: "bg-iucn-nt-fill text-iucn-nt-text border-iucn-nt-edge",
  VU: "bg-iucn-vu-fill text-iucn-vu-text border-iucn-vu-edge",
  EN: "bg-iucn-en-fill text-iucn-en-text border-iucn-en-edge",
  CR: "bg-iucn-cr-fill text-iucn-cr-text border-iucn-cr-edge",
  EW: "bg-iucn-ew-fill text-iucn-ew-text border-iucn-ew-edge",
  EX: "bg-iucn-ex-fill text-iucn-ex-text border-iucn-ex-edge",
};

function getSpecies(slug: string) {
  return speciesList.find((species) => species.id === slug);
}

export function generateStaticParams() {
  return speciesList.map((species) => ({ slug: species.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const species = getSpecies(params.slug);
  if (!species) return {};
  const title = `${species.commonName.en} (${species.scientificName})`;
  const description = `Explore ${species.commonName.en}, its taxonomy, broad biogeographic learning extent, and transparent data provenance in GeoFauna.`;
  const url = `https://geofauna.carlosrodriguezpardo.es/species/${species.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} · GeoFauna`, description, url, type: "article", images: [{ url: species.image.url, alt: species.image.alt }] },
    twitter: { card: "summary_large_image", title: `${title} · GeoFauna`, description },
  };
}

export default function SpeciesPage({ params }: { params: { slug: string } }) {
  const species = getSpecies(params.slug);
  if (!species) notFound();
  const canonicalUrl = `https://geofauna.carlosrodriguezpardo.es/species/${species.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Taxon",
    name: species.commonName.en,
    alternateName: species.scientificName,
    taxonRank: "Species",
    url: canonicalUrl,
    image: species.image.url,
    isPartOf: { "@type": "VideoGame", name: "GeoFauna", url: "https://geofauna.carlosrodriguezpardo.es" },
  };

  return (
    <main className="min-h-screen bg-paper-base px-4 py-6 text-ink-900 sm:px-6 sm:py-10">
      <article className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link href="/archive" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900">
            <ArrowLeft className="h-4 w-4 text-accent" /> {t("backToCatalog")}
          </Link>
          <TrackedPlayLink href={`/?species=${species.id}`} speciesId={species.id} className="inline-flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-paper-raised transition-colors hover:bg-accent-ink">
            <Play className="h-3.5 w-3.5" /> {t("playThisSpecies")}
          </TrackedPlayLink>
        </div>

        <div className="plate overflow-hidden rounded-lg bg-paper-raised">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] bg-paper-sunken">
              <div className="absolute inset-1.5 overflow-hidden border border-rule-strong">
                <Image src={species.image.url} alt={species.image.alt || species.commonName.en} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
              </div>
            </div>
            <div className="space-y-5 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">{species.taxonClass} · {species.order}</p>
                <h1 className="mt-2 font-display text-3xl sm:text-4xl tracking-tight text-ink-900">{species.commonName.en}</h1>
                <p className="mt-1 font-display italic text-accent-ink">{species.scientificName}</p>
              </div>
              <p className="text-sm leading-relaxed text-ink-700">{species.clues[0]?.en}</p>
              <dl className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-md border border-rule bg-paper-sunken p-3">
                  <dt className="text-ink-500">{t("realmLabel")}</dt>
                  <dd className="mt-1 font-semibold text-ink-900">{species.realm}</dd>
                </div>
                <div className="rounded-md border border-rule bg-paper-sunken p-3">
                  <dt className="text-ink-500">{t("iucnContextLabel")}</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-ink-900">{species.iucnStatus}</span>
                    <span className={`specimen-label ${IUCN_CHIP_CLASSES[species.iucnStatus]}`}>
                      {getIUCNLabel(species.iucnStatus, "en")}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="grid gap-4 border-t border-rule p-6 sm:grid-cols-2 sm:p-8">
            <section className="rounded-r-md border-l-2 border-ochre bg-ochre-soft/40 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-ochre"><ShieldCheck className="h-4 w-4" /> {t("provenanceTitle")}</div>
              <p className="mt-2 text-xs leading-relaxed text-ink-700">
                {t("provenanceBody")} {species.range.provenance.sourceName} · {species.range.provenance.resolution}.
              </p>
              <a href={species.range.provenance.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-ink hover:underline">{t("methodAndVersion")} <ExternalLink className="h-3 w-3" /></a>
            </section>
            {species.range.evidence && (
              <section className="rounded-r-md border-l-2 border-iucn-lc-edge bg-iucn-lc-fill/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-iucn-lc-text"><Database className="h-4 w-4" /> {t("evidenceTitle")}</div>
                <p className="mt-2 text-xs leading-relaxed text-ink-700">
                  {t("evidenceBody")}{" "}
                  {species.range.evidence.recordCount > 0
                    ? `${species.range.evidence.recordCount} licence-filtered records across ${species.range.evidence.occupiedCellCount} 1° cells, retrieved ${species.range.evidence.retrievedAt.slice(0, 10)}.`
                    : `${t("evidenceSnapshotEmpty")}.`}
                </p>
                <a href={species.range.evidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-iucn-lc-text hover:underline">{t("inspectGbif")} <ExternalLink className="h-3 w-3" /></a>
                {species.range.evidence.datasets.length > 0 && (
                  <details className="mt-3 text-[12px] text-ink-500">
                    <summary className="cursor-pointer font-semibold text-iucn-lc-text">{t("retainedDatasets")} ({species.range.evidence.datasets.length})</summary>
                    <ul className="mt-2 space-y-1">
                      {species.range.evidence.datasets.map((dataset) => (
                        <li key={dataset.key}><a className="hover:text-iucn-lc-text hover:underline" href={`https://www.gbif.org/dataset/${dataset.key}`} target="_blank" rel="noopener noreferrer">{dataset.title} ({dataset.license})</a></li>
                      ))}
                    </ul>
                  </details>
                )}
              </section>
            )}
          </div>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
