import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Element } from ".";

storiesOf("Element", module).add("Default", () => (
  <Element
    paddingless={boolean("paddingless", false)}
    responsive={{
      desktop: {
        display: {
          only: true,
          value: "inline-flex",
        },
      },
      mobile: {
        display: { value: "block" },
      },
      tablet: {
        display: { value: "flex" },
        hide: { only: true, value: true },
      },
      widescreen: {
        display: { value: "inline-block" },
        hide: { value: true },
      },
    }}
  >
    Custom Element to use Bulma helper
  </Element>
));
