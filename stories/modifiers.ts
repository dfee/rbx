import { select } from "@storybook/addon-knobs";

import { COLORS } from "@/modifiers/color";
import { BREAKPOINTS } from "@/modifiers/responsive";

import { iterableToSelectObject } from "./helpers";

export const knobs = {
  breakpoint: (title: string = "Breakpoint") =>
    select(title, iterableToSelectObject(BREAKPOINTS, { undefined: "" }), ""),
  color: (title: string = "Color") =>
    select(title, iterableToSelectObject(COLORS, { undefined: "" }), ""),
};
