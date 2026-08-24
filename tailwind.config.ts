import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060A11",
        surface: {
          DEFAULT: "#0A111E",
          subtle: "#0F192C",
          elevated: "#16233C",
          border: "#1E3050",
        },
        fauna: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
          muted: "rgba(16, 185, 129, 0.15)",
        },
        iucn: {
          lc: "#60A5FA", // Least Concern (Blue/Teal)
          nt: "#34D399", // Near Threatened (Green-Teal)
          vu: "#FBBF24", // Vulnerable (Yellow/Amber)
          en: "#FB923C", // Endangered (Orange)
          cr: "#EF4444", // Critically Endangered (Red)
          ew: "#8B5CF6", // Extinct in the Wild (Purple)
          ex: "#1F2937", // Extinct (Charcoal/Black)
        },
        paint: {
          brush: "#06B6D4",      // Cyan for user guess
          brushMuted: "rgba(6, 182, 212, 0.4)",
          overlap: "#10B981",    // Emerald for True Positive
          overestimate: "#F59E0B", // Amber/Orange for False Positive
          missed: "#38BDF8",     // Blue for False Negative (GT missed)
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.25s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
        "scale-in": "scaleIn 0.2s ease-out forwards",
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
      },
    },
  },
  plugins: [],
};

export default config;
