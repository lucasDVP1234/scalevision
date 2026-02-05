/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"], // Regarde tous les fichiers HTML et JS à la racine
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