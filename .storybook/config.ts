import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";

import "../src/index.sass";

setOptions({
  name: "React Bulma Components",
  showAddonPanel: true,
  url: "https://github.com/couds/react-bulma-components",
});

addDecorator(withKnobs);

addDecorator(
  withInfo({
    // propTables: false,
    source: false,
  }),
);

function loadStories() {
  const req = require.context("../src", true, /\.story\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
