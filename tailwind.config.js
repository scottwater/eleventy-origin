module.exports = {
  plugins: [require("@tailwindcss/custom-forms")],
  theme: {
    extend: {
      screens: {
        dm: { raw: "(prefers-color-scheme: dark)" }
      }
    }
  }
};
