/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        dark: "#292F36",
        light: "#F7FFF7",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Sets Poppins as default font
      },
    },
  },
  plugins: [],
}