const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ],
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
          from: "var(--color-bg-from)",
          to: "var(--color-bg-to)",
          descHighlight01From: "var(--color-descHighlight01From)",
          descHighlight01To: "var(--color-descHighlight01To)",
          descHighlight02From: "var(--color-descHighlight02From)",
          descHighlight02To: "var(--color-descHighlight02To)",
          DEFAULT: "var(--color-default)"
        }
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans]
      }
    }
  }
}
