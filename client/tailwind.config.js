/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        CalendarCardShadow: "14px 16px 0px -3px rgba(0, 0, 0, 0.75)",
      },
      keyframes: {
        popup: {
          "0%": {
            transform: "scale(.5)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        boxOpen: {
          "0%": {
            transform: "translateY(-3px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        popup: "popup .25s ease 1",
        boxOpen: "boxOpen .25s ease 1",
      },
    },
  },
  plugins: [],
};
