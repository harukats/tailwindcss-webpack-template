const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";

module.exports = {
  mode: "development",
  entry: "./src/js/main",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${outputFile}.js`,
    clean: !process.env.WEBPACK_SERVE,
  },
  resolve: { extensions: [".ts", ".js"] },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: ESLintWebpackPlugin.loader,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|gif|png|web(p|m)|svg|woff2?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: `assets/${assetFile}[ext]`,
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
      watch: {
        ignored: /node_modules/,
      },
    },
    client: { progress: true },
    compress: true,
    port: 9000,
    open: true,
  },
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin(), "..."],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new ESLintWebpackPlugin({ fix: true }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "src/logo.png"),
      favicons: {
        display: "browser",
        icons: {
          appleStartup: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],
};
