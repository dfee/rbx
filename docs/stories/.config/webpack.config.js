const path = require("path");

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
  return config;
};
