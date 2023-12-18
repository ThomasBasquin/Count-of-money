/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
      purple: colors.purple,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      jumbo: {
        '50': '#f5f6f6',
        '100': '#e6e7e7',
        '200': '#cfd2d1',
        '300': '#aeb2b1',
        '400': '#858b8b',
        '500': '#6a7070',
        '600': '#606666',
        '700': '#4d5151',
        '800': '#434747',
        '900': '#3b3e3e',
        '950': '#252627',
      }
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

