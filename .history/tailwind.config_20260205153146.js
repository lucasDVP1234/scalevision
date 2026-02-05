/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      fontFamily: { sans: ['Montserrat', 'sans-serif'] },
      colors: {
        scaleBlue: '#251EAF', 
        scalePink: '#CE0089', 
        scaleDark: '#050520',
      }
    },
  },
  plugins: [],
}