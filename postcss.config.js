module.exports = ({ env }) => {
  let environment = {
    plugins: [
      require("postcss-import"),
      require("tailwindcss")("./tailwind.config.js"),
      require("postcss-preset-env"),
    ],
  };

  if (env === "production") {
    environment.plugins.push(
      require("cssnano")({
        preset: "default",
      })
    );
  }

  return environment;
};
