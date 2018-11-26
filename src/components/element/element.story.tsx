import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import Element from "components/element";

storiesOf("Element", module).add("Default", () => (
  <Element
    paddingless={boolean("paddingless", false)}
    responsive={{
      desktop: {
        display: "inline-flex",
        only: true,
      },
      mobile: {
        display: "block",
      },
      tablet: {
        display: "flex",
      },
      widescreen: {
        display: "inline-block",
      },
    }}
    hide={{
      tablet: {
        hide: true,
        only: true,
      },
      widescreen: {
        hide: true,
      },
    }}
  >
    Custom Element to use Bulma helper
  </Element>
));
