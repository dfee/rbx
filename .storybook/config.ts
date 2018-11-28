import { checkA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";

import "../src/index.module.sass";

setOptions({
  name: "RBX",
  showAddonPanel: true,
  url: "https://github.com/dfee/rbx",
});

addDecorator(
  withInfo({
    // propTables: false,
    source: false,
  }),
);
addDecorator(withKnobs);
addDecorator(checkA11y);

function loadStories() {
  const req = require.context("../src", true, /\.story\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
