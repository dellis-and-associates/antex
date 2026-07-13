import type { Config } from "tailwindcss";

/**
 * Every value below is sourced from necessary-files/design-tokens.json
 * (Antex Brand Foundations v1.0 · "Hold the Perimeter").
 * The same tokens are exposed as CSS custom properties in app/globals.css —
 * keep both in sync.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0F1C17" }, // Night Pine — footer, dark surfaces, headings
        pine: {
          800: "#17402F", // Deep Juniper — hero surfaces, dark cards
          600: "#1F6A47", // Juniper — primary brand: logo, links, icons
          100: "#DCEDE2", // Mist — tints, tags, icon wells
        },
        sand: {
          50: "#FAF6EE", // Bone — page background
          200: "#EFE7D7", // Sandstone — cards, wells, dividers
        },
        clay: {
          600: "#C2551E", // Canyon Clay — CTAs and highlights ONLY
          700: "#A8460F", // Canyon Clay hover (from approved homepage)
        },
        basalt: { 700: "#33413A" }, // Basalt — body text on light
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        // typeScale tokens
        display: ["clamp(40px, 5vw, 66px)", { lineHeight: "1.04", fontWeight: "800" }],
        h2: ["clamp(30px, 3.4vw, 42px)", { lineHeight: "1.12", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        body: ["17px", { lineHeight: "28px" }],
        small: ["14px", { lineHeight: "22px" }],
        eyebrow: ["13px", { lineHeight: "20px", letterSpacing: "0.16em" }],
        button: ["15px", { lineHeight: "20px", fontWeight: "600" }],
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
      spacing: {
        // space tokens (4px base scale)
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
        "24": "96px",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(15, 28, 23, 0.15)",
        cta: "0 8px 20px -8px rgba(194, 85, 30, 0.55)",
      },
      maxWidth: {
        wrap: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
