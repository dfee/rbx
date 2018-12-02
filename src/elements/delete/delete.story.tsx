import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Delete } from "@/elements";

const makeSizeSelector = () =>
  select(
    "Size",
    {
      auto: "auto",
      small: "small",
      medium: "medium", // tslint:disable-line:object-literal-sort-keys
      large: "large",
    },
    "auto",
  );

storiesOf("Elements/Delete", module).add("Default", () => (
  <div>
    <Delete size={makeSizeSelector()} />
  </div>
));
