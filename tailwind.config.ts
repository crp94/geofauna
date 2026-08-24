import type { Config } from "tailwindcss";
import { paper, ink, rule, accent, terracotta, ochre, danger, iucn, paint } from "./src/lib/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Transitional aliases — kept so unrestyled components stay usable
        // until later waves adopt the new tokens directly. A final sweep
        // will remove these once every component consumes `paper`/`surface`
        // via the new naming.
        background: paper.base,
        surface: {
          DEFAULT: paper.raised,
          subtle: paper.sunken,
          elevated: paper.deep,
          border: rule.DEFAULT,
        },

        paper: {
          base: paper.base,
          raised: paper.raised,
          sunken: paper.sunken,
          deep: paper.deep,
        },
        ink: {
          900: ink[900],
          700: ink[700],
          500: ink[500],
          400: ink[400],
        },
        rule: {
          DEFAULT: rule.DEFAULT,
          strong: rule.strong,
        },
        accent: {
          DEFAULT: accent.DEFAULT,
          ink: accent.ink,
          soft: accent.soft,
          line: accent.line,
        },
        terracotta: {
          DEFAULT: terracotta.DEFAULT,
          ink: terracotta.ink,
          soft: terracotta.soft,
        },
        ochre: {
          DEFAULT: ochre.DEFAULT,
          soft: ochre.soft,
        },
        danger: {
          DEFAULT: danger.DEFAULT,
          soft: danger.soft,
        },
        iucn: {
          lc: { text: iucn.LC.text, fill: iucn.LC.fill, edge: iucn.LC.edge },
          nt: { text: iucn.NT.text, fill: iucn.NT.fill, edge: iucn.NT.edge },
          vu: { text: iucn.VU.text, fill: iucn.VU.fill, edge: iucn.VU.edge },
          en: { text: iucn.EN.text, fill: iucn.EN.fill, edge: iucn.EN.edge },
          cr: { text: iucn.CR.text, fill: iucn.CR.fill, edge: iucn.CR.edge },
          ew: { text: iucn.EW.text, fill: iucn.EW.fill, edge: iucn.EW.edge },
          ex: { text: iucn.EX.text, fill: iucn.EX.fill, edge: iucn.EX.edge },
        },
        paint: {
          brush: paint.brush,
          eraserPreview: paint.eraserPreview,
          overlap: paint.overlap,
          overestimate: paint.overestimate,
          missed: paint.missed,
          overlapInk: paint.overlapInk,
          overestimateInk: paint.overestimateInk,
          missedInk: paint.missedInk,
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        paper: "0 1px 2px rgba(43,37,25,0.07), 0 3px 10px rgba(43,37,25,0.05)",
        lift: "0 2px 6px rgba(43,37,25,0.10), 0 8px 24px rgba(43,37,25,0.07)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.25s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
        "scale-in": "scaleIn 0.2s ease-out forwards",
        "stamp-in": "stampIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        stampIn: {
          "0%": { transform: "scale(1.15) rotate(-6deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(-3deg)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
