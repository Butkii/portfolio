/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light': {
          'background': '#F9F7F7',
          'primary': '#112D4E',
          'secondary': '#3F72AF',
          'accent': '#DBE2EF',
        },
        'dark': {
          'background': '#112D4E',
          'primary': '#F9F7F7',
          'secondary': '#DBE2EF',
          'accent': '#3F72AF',
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

