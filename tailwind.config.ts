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
        estate: {
          dark: "#0a0d14",
          panel: "#121824",
          card: "#161f30",
          border: "rgba(243, 239, 231, 0.12)",
          gold: "#d49e54",
          copper: "#e07a2c",
          accent: "#ff6a3d",
          chalk: "#f8fafc",
          dim: "#94a3b8",
          stone: "#64748b",
          rera: "#10b981",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-anton)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        'radial-hero': 'radial-gradient(ellipse 900px 500px at 80% -10%, rgba(224, 122, 44, 0.18), transparent 60%)',
        'subtle-grid': 'repeating-linear-gradient(115deg, rgba(243,239,231,0.03) 0 2px, transparent 2px 24px)',
      }
    },
  },
  plugins: [],
};
export default config;
