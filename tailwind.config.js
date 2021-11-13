module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        indigoDye: "#1B4965",
        powderBlue: "#BEE9E8",
        maximunBlue: "#62B6CB",
        columbiaBlue: "#CAE9FF",
        carolinaBlue: "#5FA8D3",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
