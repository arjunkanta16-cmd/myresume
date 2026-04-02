import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        surfaceStrong: "hsl(var(--surface-strong))",
        border: "hsl(var(--border))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        accentSoft: "hsl(var(--accent-soft))",
        accentAlt: "hsl(var(--accent-alt))"
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        glow: "0 18px 48px rgba(37, 99, 235, 0.16)",
        card: "0 16px 40px rgba(15, 23, 42, 0.06)",
        float: "0 24px 64px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
