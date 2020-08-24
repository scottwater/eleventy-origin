const defaultTheme = require("tailwindcss/defaultTheme");
const fonts = defaultTheme.fontFamily.sans;
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fonts],
      },
      screens: {
        dm: { raw: "(prefers-color-scheme: dark)" },
      },
    },
  },
};
