const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: "./src/index",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.json/, // Only .json files
        loader: "json-loader" // Run both loaders
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.s?[ca]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // If you are having trouble with urls not resolving add this setting.
              // See https://github.com/webpack-contrib/css-loader#url
              minimize: false,
              sourceMap: true
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "react-bulma-components.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx"],
    modules: ["node_modules", "./src"],
    alias: {
      "_variables.sass": path.resolve(
        __dirname,
        "src/components/_variables.sass"
      )
    }
  },
  plugins: [
    new ProgressBarPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "reports/report.html",
      openAnalyzer: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new MiniCssExtractPlugin({
      filename: "dist/react-bulma-components.min.css"
    })
  ],
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom"
  }
};
