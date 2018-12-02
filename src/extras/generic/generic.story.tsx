import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Generic } from "@/extras";

storiesOf("Extras/Generic", module).add("Default", () => (
  <Generic
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
    Custom element to use Bulma helper
  </Generic>
));
