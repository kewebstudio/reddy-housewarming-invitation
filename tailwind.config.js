
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFF9EF",
        champagne: "#E8D5B5",
        gold: "#C69A45",
        sage: "#A4AC8C",
        forest: "#59684D",
        brown: "#60452F",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        elegant: ["Cormorant Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
