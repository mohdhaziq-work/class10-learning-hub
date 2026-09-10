import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50:"#eef0ff",100:"#e0e4ff",500:"#4f46e5",600:"#4f46e5",700:"#4338ca" },
        ink: { DEFAULT:"#14213d", soft:"#3d4a63", mute:"#7b87a0" },
      },
      boxShadow: {
        card: "0 10px 30px rgba(20,33,61,.08)",
        lift: "0 24px 60px rgba(20,33,61,.14)",
      },
      borderRadius: { xl2: "20px" },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        grad: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
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
