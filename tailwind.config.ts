import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e8f0fe", 100: "#d2e3fc", 200: "#aecbfa", 300: "#8ab4f8",
          400: "#669df6", 500: "#1a73e8", 600: "#1a73e8", 700: "#1557b0", 800: "#0f3d91",
        },
        gold: "#c9a227",
        ink: { DEFAULT: "#141414", soft: "#3c4043", mute: "#6b7280" },
        gbg: "#fafafa",
        coal: "#0d1117",
        g: { red: "#b3261e", green: "#146c2e", amber: "#b06000", purple: "#9334e6", teal: "#00696b" },
      },
      fontFamily: {
        display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.08)",
        lift: "0 8px 24px rgba(16,24,40,.10), 0 2px 6px rgba(16,24,40,.06)",
        pop: "0 16px 48px rgba(16,24,40,.16)",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        fadeUp: "fadeUp .6s ease both",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
