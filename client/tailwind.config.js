/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        popup: {
          "0%": {
            transform: "scale(.5)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        popup: "popup .25s ease 1",
      },
    },
  },
  plugins: [],
};
