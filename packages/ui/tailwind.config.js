// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.tsx"],
  mode: "jit",
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      }
    },
    fontSize: {
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      sm: ["14px", "20px"],
      xl: ["24px", "32px"],
      xs: ["12px", "14px"]
    },
    spacing: {
      // Convert all to pixels knowing that 1 = 4px
      0: "0",
      0.5: "2px",
      1: "4px",
      1.5: "6px",
      10: "40px",
      11: "44px",
      12: "48px",
      14: "56px",
      16: "64px",
      2: "8px",
      2.5: "10px",
      20: "80px",
      24: "96px",
      28: "112px",
      3: "12px",
      3.5: "14px",
      32: "128px",
      36: "144px",
      4: "16px",
      40: "160px",
      44: "176px",
      48: "192px",
      5: "20px",
      52: "208px",
      56: "224px",
      6: "24px",
      60: "240px",
      64: "256px",
      7: "28px",
      72: "288px",
      8: "32px",
      80: "320px",
      9: "36px",
      96: "384px",
      px: "1px"
    }
  }
}
