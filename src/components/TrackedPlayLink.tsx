"use client";

import React from "react";
import Link from "next/link";
import { trackGameEvent } from "../lib/analytics";

interface TrackedPlayLinkProps {
  href: string;
  speciesId: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Thin client wrapper around next/link so the server-rendered species page
 * can fire a "species_page_play_clicked" analytics event on click without
 * itself becoming a client component.
 */
export const TrackedPlayLink: React.FC<TrackedPlayLinkProps> = ({
  href,
  speciesId,
  className,
  children,
}) => {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackGameEvent("species_page_play_clicked", { species_id: speciesId })}
    >
      {children}
    </Link>
  );
};
