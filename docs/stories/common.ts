import { select } from "@storybook/addon-knobs";

import { DEFAULTS } from "src/base/helpers/variables";

import { iterableToSelectObject } from "./utils";

export const colorKnob = (title: string = "Color") =>
  select(title, iterableToSelectObject(DEFAULTS.colors, { undefined: "" }), "");

export const breakpointKnob = (title: string = "Breakpoint") =>
  select(
    title,
    iterableToSelectObject(DEFAULTS.breakpoints, { undefined: "" }),
    "",
  );
