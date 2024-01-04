/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light': {
          'background': '#F9F7F7',
          'primary': '#0b1e36',
          'secondary': '#446894',
          'accent': '#DBE2EF',
        },
        'dark': {
          'background': '#0b1e36',
          'primary': '#F9F7F7',
          'secondary': '#DBE2EF',
          'accent': '#446894',
        },
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'highlight': ['Raleway', 'sans-serif'],
      },
    }
  },
  plugins: [],
  darkMode: "class",
}

