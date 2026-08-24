import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#060A11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://geofauna.carlosrodriguezpardo.es"),
  title: {
    default: "GeoFauna · The Species Distribution Game",
    template: "%s · GeoFauna",
  },
  description:
    "An open-biodiversity species distribution deduction game. Paint and deduce where Earth's animal species roam on an interactive Robinson projection map, exploring IUCN Red List conservation status and 2050 climate vulnerability.",
  keywords: [
    "GeoFauna",
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
    title: "GeoFauna · The Species Distribution Game",
    description:
      "Deduce where Earth's species naturally roam on an interactive Robinson projection map, with IUCN conservation trajectories and 2050 climate insights.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoFauna · The Species Distribution Game",
    description:
      "Deduce where Earth's species naturally roam on an interactive Robinson projection map, with IUCN conservation trajectories and 2050 climate insights.",
    creator: "@carlosrodriguezp",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
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

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background min-h-screen text-slate-100">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
