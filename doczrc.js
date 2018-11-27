const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

export default {
  modifyBundlerConfig: config => {
    /*
     * use tsconfig paths, e.g.: `import Button from components/Button`
     */
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json"
      })
    ];

    /*
     * allow proptype generation with tsconfig.
     * https://github.com/pedronauck/docz/issues/240#issuecomment-415689181
     */
    const jsxPluginIndex = config.plugins.findIndex(
      plugin => plugin.config.id === "jsx"
    );
    const { loaders } = config.plugins[jsxPluginIndex].config;
    const docGenLoaderIndex = loaders.findIndex(loader =>
      /react-docgen-typescript-loader/.test(loader.loader)
    );
    const docGenLoader = loaders[docGenLoaderIndex];
    docGenLoader.options = { tsconfigPath: "./tsconfig.json" };

    /*
     * allow sass parsing
     */
    config.module.rules.push({
      test: /\.s[ca]ss$/,
      loader: "style-loader!css-loader!resolve-url-loader!sass-loader"
    });

    return config;
  },
  title: "React Bulma Components",
  typescript: true
};
