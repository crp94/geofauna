import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F1E6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://geofauna.carlosrodriguezpardo.es"),
  title: {
    default: "GeoFauna — The Species Range Game",
    template: "%s · GeoFauna",
  },
  description:
    "Paint a species' range on a zoomable Robinson projection map. GeoFauna scores you against occurrence-derived open data from GBIF, with IUCN conservation context alongside every reveal. Play the daily expedition or the unlimited catalogue in English, Español, or Italiano.",
  keywords: [
    "GeoFauna",
    "GBIF",
    "species range",
    "daily game",
    "naturalist",
    "Species distribution",
    "Biodiversity game",
    "Animal guessing game",
    "Biogeography",
    "IUCN Red List",
    "Robinson projection",
    "Conservation biology",
    "Wildlife geography",
    "Cityle sibling game",
    "Open biodiversity data",
  ],
  authors: [{ name: "Carlos Rodríguez-Pardo", url: "https://carlosrodriguezpardo.es" }],
  creator: "Carlos Rodríguez-Pardo",
  publisher: "Carlos Rodríguez-Pardo",
  applicationName: "GeoFauna",
  alternates: {
    canonical: "https://geofauna.carlosrodriguezpardo.es",
    languages: {
      "en-US": "https://geofauna.carlosrodriguezpardo.es",
      "es-ES": "https://geofauna.carlosrodriguezpardo.es?lang=es",
      "it-IT": "https://geofauna.carlosrodriguezpardo.es?lang=it",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://geofauna.carlosrodriguezpardo.es",
    siteName: "GeoFauna",
    title: "GeoFauna — The Species Range Game",
    description:
      "A naturalist's atlas of a game: paint species ranges on a zoomable Robinson map, scored against occurrence-derived GBIF data with honest, transparent provenance.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GeoFauna on a Robinson projection" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoFauna — The Species Range Game",
    description:
      "A naturalist's atlas of a game: paint species ranges on a zoomable Robinson map, scored against occurrence-derived GBIF data with honest, transparent provenance.",
    creator: "@carlosrodriguezp",
    images: ["/twitter-image"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/geofauna-favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/geofauna-favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/geofauna-favicon-192.png",
    shortcut: "/brand/geofauna-favicon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "GeoFauna",
    url: "https://geofauna.carlosrodriguezpardo.es",
    description:
      "An open-biodiversity species distribution deduction game where players paint animal ranges on an interactive Robinson projection map.",
    genre: ["Educational", "Trivia", "Science", "Geography"],
    operatingSystem: "Web Browser",
    applicationCategory: "Game",
    inLanguage: ["en", "es", "it"],
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: "Carlos Rodríguez-Pardo",
      url: "https://carlosrodriguezpardo.es",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GeoFauna",
    url: "https://geofauna.carlosrodriguezpardo.es",
    inLanguage: ["en", "es", "it"],
    description: "An open-source biogeography learning game with transparent range provenance.",
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-paper-base min-h-screen text-ink-900">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
