const path = require("path");
const glob = require("glob");

module.exports = {
  components: "src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
    {
      componentNameResolver: (exp, source) => exp.displayName
    }
  ).parse,
  resolver: require("react-docgen").resolver.findAllComponentDefinitions
};
