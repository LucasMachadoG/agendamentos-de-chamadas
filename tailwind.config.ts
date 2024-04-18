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
        gray: {
          100: '#E1E1E6',
          200: '#A9A9B2',
          400: '#7C7C8A',
          500: '#505059',
          600: '#323238',
          700: '#29292E',
          800: '#202024',
          900: '#121214'
        },
        ignite: {
          300: '#00B37E',
          500: '#00875F',
          700: '#015F43',
          900: '#00291D'
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans"],
      }
    },
  },
  plugins: [],
};
export default config;
