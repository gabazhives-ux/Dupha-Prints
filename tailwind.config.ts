import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1E3D",
          900: "#122A4D",
          800: "#1B3A63", // reduced-shade navy (umbrella)
          700: "#26507F",
        },
        paper: {
          DEFAULT: "#F7F5F1",
          dim: "#EFEBE3",
        },
        cyan: {
          DEFAULT: "#17A6C2", // print-cyan accent
          light: "#BFE1EA", // baby-blue (umbrella)
          dark: "#0E7C93",
        },
        press: {
          red: "#E63946",
        },
        graphite: "#23262B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(60% 60% at 20% 20%, rgba(23,166,194,0.20) 0%, rgba(23,166,194,0) 60%), radial-gradient(50% 50% at 85% 10%, rgba(230,57,70,0.14) 0%, rgba(230,57,70,0) 60%), radial-gradient(80% 80% at 50% 100%, rgba(11,30,61,0.9) 0%, rgba(11,30,61,1) 100%)",
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(11,30,61,0.35)",
        glass: "0 8px 32px 0 rgba(11,30,61,0.15)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
