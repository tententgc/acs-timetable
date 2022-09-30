/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        CalendarCardShadow:
          "rgba(255, 255, 255, 0.7) 0px 1px 2px, rgba(255, 255, 255, 0.7) 0px 2px 4px, rgba(255, 255, 255, 0.7) 0px 4px 8px, rgba(255, 255, 255, 0.7) 0px 8px 16px, rgba(255, 255, 255, 0.7) 0px 16px 32px, rgba(255, 255, 255, 0.7) 0px 32px 64px",
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
            opacity: 0.5,
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
