import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D5A5A",
          light: "#4A8B8B",
          dark: "#1D3B3B",
        },
        secondary: {
          DEFAULT: "#F4A261",
          light: "#F8C29B",
          dark: "#E76F51",
        },
        accent: {
          DEFAULT: "#E9C46A",
          light: "#F2D99E",
          dark: "#D4A373",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;