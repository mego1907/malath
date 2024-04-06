/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgba(82, 63, 148, 0.5)",
          500: "#523F94EB",
          920: "rgba(82, 63, 148, 0.92)"
        },
        light: {
          50: "rgba(255, 255, 255, 0.5)",
          500: "#fff",
          250: "rgba(255, 255, 255, 0.25)",
          750: "rgba(255, 255, 255, 0.75)"
        },
        dark: {
          8: "rgba(30, 30, 30, 0.08)",
          25: "rgba(30, 30, 30, 0.25)",
          50: "rgba(30, 30, 30, 0.5)",
          75: "rgba(30, 30, 30, 0.75)",
        },
        secondary: "rgba(255, 196, 127, 0.25)",
        "faqs-active": "rgba(242, 235, 253, 1)",
        "faqs-inactive": "rgba(82, 63, 148, 0.02)"
      },
      backgroundImage: {
        "header-image": "url('/src/assets/images/header-image.png')",
        "our-consultants-image": "url('/src/assets/images/our-consultants.png')"
      },
      animation: {
        'spin-slow': 'wiggle 8s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          "100%": { transform: "rotate(360deg)" }
        }
      }
    },
  },
  plugins: [],
}

