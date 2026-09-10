import type { Config } from "tailwindcss";

/* Google-inspired design tokens — Material blues, clean surfaces, Jakarta display type */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e8f0fe", 100: "#d2e3fc", 200: "#aecbfa", 300: "#8ab4f8",
          400: "#669df6", 500: "#4285f4", 600: "#0b57d0", 700: "#0842a0", 800: "#0a2f6b",
        },
        ink: { DEFAULT: "#1f1f1f", soft: "#444746", mute: "#5f6368" },
        gbg: "#f6f8fc",
        g: { red: "#b3261e", green: "#146c2e", amber: "#e37400", purple: "#9334e6", teal: "#00696b" },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(60,64,67,.12), 0 2px 8px rgba(60,64,67,.08)",
        lift: "0 4px 16px rgba(60,64,67,.16), 0 8px 32px rgba(11,87,208,.10)",
        pop: "0 8px 28px rgba(60,64,67,.22)",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        blob: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(24px,-18px) scale(1.06)" } },
      },
      animation: {
        fadeUp: "fadeUp .6s ease both",
        floaty: "floaty 5s ease-in-out infinite",
        blob: "blob 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
