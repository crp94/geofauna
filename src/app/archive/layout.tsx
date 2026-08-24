import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Species catalogue",
  description: "Browse GeoFauna's curated animal catalogue by taxonomic group and conservation context, with transparent range provenance.",
  alternates: { canonical: "https://geofauna.carlosrodriguezpardo.es/archive" },
};

export default function ArchiveLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
