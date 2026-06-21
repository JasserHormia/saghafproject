import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        blackSoft: "#141414",
        charcoal: "#1F1F1F",
        grayDark: "#2A2A2A",
        grayMid: "#6B6B6B",
        grayLight: "#9A9A9A",
        grayPale: "#D4D4D4",
        white: "#F5F5F5",
        burgundy: "#6B1626",
        burgundyLight: "#8B2236",
        burgundyDeep: "#4A0F1A",
      },
      fontFamily: {
        display: ['"Inter"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
