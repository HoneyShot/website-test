import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // this ensures Tailwind scans all your app code
  ],
  theme: {
    extend: {}, // you can extend here later
  },
  darkMode: "class", // 👈 enables manual theme switching via .dark class
  plugins: [],
};

export default config;
