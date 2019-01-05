import { select } from "@storybook/addon-knobs";

import { BREAKPOINTS, COLORS } from "src/base/helpers";

import { iterableToSelectObject } from "./utils";

export const colorKnob = (title: string = "Color") =>
  select(title, iterableToSelectObject(COLORS, { undefined: "" }), "");

export const breakpointKnob = (title: string = "Breakpoint") =>
  select(title, iterableToSelectObject(BREAKPOINTS, { undefined: "" }), "");
