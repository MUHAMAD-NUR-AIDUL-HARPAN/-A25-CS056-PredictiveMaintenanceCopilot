/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray_primary: "#7A7A73",
        dark_primary: "#24252D",
        dark_secondary: "#1E1E1E",
        gray: "#D1D5DB",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          lg: "1920px",
        },
      },
    },
  },
  plugins: [],
};
