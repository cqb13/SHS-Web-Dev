import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "380px"
      },
      colors: {
        dark: "#96B6C5",
        light: "#ADC4CE",
        highlight: "#EEE0C9",
        background: "#F1F0E8"
      }
    }
  },
  plugins: [
    function ({ addVariant }: { addVariant: Function }) {
      addVariant("child", "& > *");
      addVariant("last-child", "&>*:last-child");
    },
  ]
};
export default config;
