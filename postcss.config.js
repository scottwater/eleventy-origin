module.exports = ({ env }) => {
  let environment = {
    plugins: [
      require("postcss-import"),
      require("tailwindcss")("./tailwind.config.js"),
      require("postcss-preset-env")
    ]
  };

  if (env === "production") {
    environment.plugins.push(
      require("cssnano")({
        preset: "default"
      })
    );
  }

  // Disabled since purge needs to run after
  // the site has been built, but webpack needs
  // to run before the site has been built
  // if (env === "production") {
  //   environment.plugins.push(
  //     require("@fullhuman/postcss-purgecss")("./purgecss.config.js")
  //   );
  // }

  return environment;
};
