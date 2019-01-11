const path = require("path");

// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

export default {
  modifyBundlerConfig: config => {
    // const tsconfigPathsPlugin = new TsconfigPathsPlugin({
    //   configFile: "./tsconfig.json"
    // });

    // if (config.resolve.plugins) {
    //   config.resolve.plugins.push(tsconfigPathsPlugin);
    // } else {
    //   config.resolve.plugins = [tsconfigPathsPlugin];
    // }

    config.resolve.alias["src"] = path.join(__dirname, "./src");
    // config.resolve.alias["@rbx"] = path.join(__dirname, "../src");

    // console.log(config);

    config.entry.app.push("src/index.sass");
    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    });

    return config;
  },
  // src: "./src",
  typescript: true
};
