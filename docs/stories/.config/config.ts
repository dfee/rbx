import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import {
  configureViewport,
  INITIAL_VIEWPORTS,
} from "@storybook/addon-viewport";
import { addDecorator, configure } from "@storybook/react";

import "./storybook.sass";

addDecorator(withInfo());

setOptions({
  name: "👟 rbx - Bulma UI",
  showAddonPanel: true,
  url: "https://github.com/dfee/rbx",
});

addDecorator(withKnobs);

configureViewport({
  defaultViewport: "responsive",
  viewports: {
    // tslint:disable:object-literal-sort-keys
    responsive: INITIAL_VIEWPORTS.responsive,
    mobileSmall: {
      name: "Mobile @ 480px",
      styles: {
        width: "480px",
      },
    },
    mobileMax: {
      name: "Mobile @ 768px (max)",
      styles: {
        width: "768px",
      },
    },
    tabletMin: {
      name: "Tablet @ 769px (min)",
      styles: {
        width: "769px",
      },
    },
    tabletMax: {
      name: "Tablet @ 1023px (max)",
      styles: {
        width: "1023px",
      },
    },
    desktopMin: {
      name: "Desktop @ 1024px (min)",
      styles: {
        width: "1024px",
      },
    },
    desktopMax: {
      name: "Desktop @ 1215px (max)",
      styles: {
        width: "1215px",
      },
    },
    widescreenMin: {
      name: "Widescreen @ 1216px (min)",
      styles: {
        width: "1216px",
      },
    },
    widescreenMax: {
      name: "Widescreen @ 1407px (max)",
      styles: {
        width: "1407px",
      },
    },
    fullhdMin: {
      name: "FullHD @ 1408px (min)",
      styles: {
        width: "1408px",
      },
    },
    fullhdMax: {
      name: "FullHD @ 2880px",
      styles: {
        width: "2880px",
      },
    },
    ...Object.keys(INITIAL_VIEWPORTS)
      .filter(key => key !== "responsive")
      .map(key => ({ [key]: INITIAL_VIEWPORTS[key] }))
      .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
    // tslint:enable:object-literal-sort-keys
  },
});

function loadStories() {
  const req = require.context("..", true, /\.story\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
