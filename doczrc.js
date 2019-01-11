// https://www.docz.site/documentation/project-configuration

const path = require("path");

export default {
  base: "rbx",
  // unfortnately, "too-many-modules"
  // https://github.com/codesandbox/codesandboxer/blob/af013874f5a2f7bb6325c9608597883a8f5061ef/packages/codesandboxer-fs/src/assembleFiles.js#L120
  codeSandbox: false,
  description:
    "The Comprehensive Bulma UI Framework for React. This is a lightweight, yet robust, React framework that enables rapid, beautiful web development.",
  files: "**/*(.docs)?*.mdx",
  htmlContext: {
    favicon: "public/favicon.ico"
  },
  modifyBundlerConfig: config => {
    config.resolve.alias["src"] = path.join(__dirname, "./src");

    config.entry.app.push("src/index.sass");
    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    });

    return config;
  },
  // we manually create them rather than relying on React-Docgen
  propsParser: false,
  public: "docs/public",
  title: "👟 rbx",
  typescript: true
};
