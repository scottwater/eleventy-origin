const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  process.env.NODE_ENV = (env && env.NODE_ENV) || "development";
  const devMode = process.env.NODE_ENV !== "production";
  return {
    entry: path.resolve(__dirname, "src/index.js"),
    devtool: "source-map",
    output: {
      filename: devMode ? "[name].js" : "[name]-[hash].js",
      path: path.resolve(__dirname, "dist/assets"),
      publicPath: "/assets/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: ["transform-class-properties"],
              },
            },
          ],
        },
        {
          test: /\.((s[ac]ss)|(css))$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
            { loader: "postcss-loader" },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name]-[hash].css",
        chunkFilename: "[id].css",
      }),
      new HtmlWebpackPlugin({
        template: "src/templates/packs.html",
        filename: path.resolve(__dirname, "site/includes/packs.njk"),
        inject: false,
        hash: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve("src/images"),
            to: path.resolve("./dist/assets/images"),
          },
          {
            from: path.resolve("src/images/favicons/favicon.ico"),
            to: path.resolve("./dist"),
          },
          {
            from: path.resolve("src/_redirects"),
            to: path.resolve("./dist"),
          },
        ],
      }),
    ],
  };
};
