const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [
        require.resolve("awesome-typescript-loader"),
        require.resolve("react-docgen-typescript-loader")
      ]
    },
    {
      test: /\.s[ca]ss$/,
      loader: "style-loader!css-loader!resolve-url-loader!sass-loader"
    }
  );
  config.resolve.extensions.push(".js", ".jsx", ".ts", ".tsx");
  config.resolve.plugins = [
    new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })
  ];
  return config;
};
