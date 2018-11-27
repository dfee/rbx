const path = require("path");

const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("ts-loader")
  });
  config.module.rules.push({
    test: /\.s[ca]ss$/,
    loader: "style-loader!css-loader!resolve-url-loader!sass-loader"
  });
  config.plugins.push(new TSDocgenPlugin());
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.plugins = [
    new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
  ];
  return config;
};
