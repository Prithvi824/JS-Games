/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titillium: ["Titillium Web", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        notoSans: ["Noto Sans", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
      },
      boxShadow: {
        "s-custom":
          "rgba(255, 255, 255, 0.4) 4px 2px 8px -2px, rgba(255, 255, 255, 0.3) 0px 0px 0px 1px",
      },
      colors: {
        "c-blue": "#5B99C2",
      },
      screens: {
        fiveHundredPx: {
          max: "500px",
        },
        thousandPx: {
          max: "900px",
        },
      },
    },
  },
  plugins: [],
};
