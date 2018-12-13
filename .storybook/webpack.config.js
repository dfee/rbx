const path = require("path");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [
        require.resolve("ts-loader"),
        require.resolve("react-docgen-typescript-loader")
      ]
    },
    {
      test: /\.s[ca]ss$/,
      loader: "style-loader!css-loader!resolve-url-loader!sass-loader"
    }
  );
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.plugins = [
    new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
  ];
  return config;
};
