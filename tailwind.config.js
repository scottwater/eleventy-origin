const defaultTheme = require("tailwindcss/defaultTheme");
const fonts = defaultTheme.fontFamily.sans;
module.exports = {
  plugins: [require("@tailwindcss/custom-forms")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fonts]
      },
      screens: {
        dm: { raw: "(prefers-color-scheme: dark)" }
      }
    }
  }
};
