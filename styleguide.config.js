const path = require("path");
const glob = require("glob");

module.exports = {
  // components: "src/components/**/*.tsx",
  components: ["src/components/box/*.tsx", "src/components/button/*.tsx"],
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
    {
      componentNameResolver: (exp, source) => {
        return require("react-docgen-typescript").getDefaultExportForFile(
          source
        );
      }
    }
  ).parse,
  resolver: require("react-docgen").resolver.findAllComponentDefinitions
};
