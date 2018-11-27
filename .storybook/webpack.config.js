const path = require("path");
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
// const { DefinePlugin } = require("webpack");

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

  //   resolve: {
  //     ...defaultConfig.resolve,
  //     modules: ["node_modules", "src", ...defaultConfig.resolve.modules],
  //     alias: {
  //       ...defaultConfig.resolve.alias,
  //       "~_variables.sass": path.resolve(
  //         __dirname,
  //         "../src/components/_variables.sass"
  //       ),
  //       "react-bulma-components/lib": path.resolve(__dirname, "../src")
  //     }
  //     // https://github.com/graphql/graphql-js#using-in-a-browser
  //   },
  //   plugins: [
  //     ...defaultConfig.plugins,
  //     // graphql sources check process variable
  //     new DefinePlugin({
  //       process: JSON.stringify(true)
  //     })
  //   ]
  // };
  return config;
};

// const path = require("path");
// const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");
// const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// module.exports = (baseConfig, env, config) => {
//   config.module.rules.push({
//     test: /\.(ts|tsx)$/,
//     loader: require.resolve("babel-loader"),
//     options: {
//       presets: [["react-app", { flow: false, typescript: true }]]
//     }
//   });
//   config.plugins.push(
//     new ForkTSCheckerWebpackPlugin({
//       async: false,
//       checkSyntacticErrors: true
//     })
//   );
//   config.plugins.push(new TSDocgenPlugin()); // optional
//   config.resolve.extensions.push(".ts", ".tsx");

//   return config;
// };
