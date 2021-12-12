const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.js", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald
      }
    },
  },
  plugins: [],
}
