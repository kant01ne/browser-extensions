const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px"
      }
    },
    extend: {
      colors: {
        ...colors,
        brand: {
          100: "#e7e7e7",
          200: "#c4c4c4",
          300: "#a0a0a0",
          400: "#585858",
          50: "#f3f3f3",
          500: "#111111",
          600: "#0f0f0f",
          700: "#0d0d0d",
          800: "#0a0a0a",
          900: "#080808",
          DEFAULT: "#111111"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans]
      }
    }
  }
}
