/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [require('preline/plugin'),require('@tailwindcss/forms'),  require('@tailwindcss/typography'),
  require('@tailwindcss/aspect-ratio'),],
}