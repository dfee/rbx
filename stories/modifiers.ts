import { boolean, select } from "@storybook/addon-knobs";

import { COLORS, GREY_COLORS } from "@/modifiers/color";
import { FLOAT_PULLED_ALIGNMENTS } from "@/modifiers/helpers";
import { BREAKPOINTS, DISPLAYS } from "@/modifiers/responsive";
import {
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TRANSFORMS,
  TEXT_WEIGHTS,
} from "@/modifiers/typography";

import { iterableToSelectObject } from "./helpers";

interface BaseFactoryOptions {
  title?: string;
  group?: string;
}

interface BooleanFactoryOptions extends BaseFactoryOptions {
  initial?: boolean;
}

interface SelectFactoryOptions extends BaseFactoryOptions {
  initial?: string;
}

const booleanFactory = (title: string, initial: boolean, group?: string) => (
  options?: BooleanFactoryOptions,
) => {
  const compiled = Object.assign({}, { title, initial, group }, options);
  return boolean(compiled.title, compiled.initial, compiled.group);
};

const selectFactory = (
  title: string,
  choices: any,
  initial: string = "",
  group?: string,
) => (options?: SelectFactoryOptions) => {
  const compiled = Object.assign({ title, initial, group }, options);
  return select(compiled.title, choices, compiled.initial, compiled.group);
};

export const knobs = {
  breakpoint: (title: string = "Breakpoint") =>
    select(title, iterableToSelectObject(BREAKPOINTS, { undefined: "" }), ""),
  color: (title: string = "Color") =>
    select(title, iterableToSelectObject(COLORS, { undefined: "" }), ""),
};

export const knobs2 = {
  color: {
    backgroundColor: selectFactory(
      "backgroundColor",
      iterableToSelectObject([...COLORS, ...GREY_COLORS], { undefined: "" }),
    ),
    textColor: selectFactory(
      "textColor",
      iterableToSelectObject([...COLORS, ...GREY_COLORS], { undefined: "" }),
    ),
  },
  helpers: {
    float: {
      clearfix: booleanFactory("clearfix", false),
      pull: selectFactory(
        "pull",
        iterableToSelectObject(FLOAT_PULLED_ALIGNMENTS, { undefined: "" }),
      ),
    },
    spacing: {
      marginless: booleanFactory("marginless", false),
      paddingless: booleanFactory("paddingless", false),
    },
    // tslint:disable-next-line:object-literal-sort-keys
    other: {
      clipped: booleanFactory("clipped", false),
      hidden: booleanFactory("hidden", false),
      invisible: booleanFactory("invisible", false),
      overlay: booleanFactory("overlay", false),
      radiusless: booleanFactory("radiusless", false),
      shadowless: booleanFactory("shadowless", false),
      srOnly: booleanFactory("srOnly", false),
      unselectable: booleanFactory("unselectable", false),
    },
  },
  responsive: {
    ...BREAKPOINTS.map(breakpoint => {
      const hasOnly = ["mobile", "fullhd", "touch"].indexOf(breakpoint) !== -1;
      const display = Object.assign(
        {
          value: selectFactory(
            `${breakpoint}.display.value`,
            iterableToSelectObject(DISPLAYS, { undefined: "" }),
          ),
        },
        hasOnly
          ? { only: booleanFactory(`${breakpoint}.display.only`, false) }
          : {},
      );

      const hide = Object.assign(
        {
          value: booleanFactory(`${breakpoint}.hide.value`, false),
        },
        hasOnly
          ? { only: booleanFactory(`${breakpoint}.hide.only`, false) }
          : {},
      );
      const textAlignment = Object.assign(
        {
          value: selectFactory(
            `${breakpoint}.textAlignemnt.value`,
            iterableToSelectObject(TEXT_ALIGNMENTS, { undefined: "" }),
          ),
        },
        hasOnly
          ? { only: booleanFactory(`${breakpoint}.textAlignment.only`, false) }
          : {},
      );
      const textSize = Object.assign(
        {
          value: selectFactory(
            `${breakpoint}.textSize.value`,
            iterableToSelectObject(TEXT_SIZES, { undefined: "" }),
          ),
        },
        hasOnly
          ? { only: booleanFactory(`${breakpoint}.textSize.only`, false) }
          : {},
      );
      return { [breakpoint]: { display, hide, textAlignment, textSize } };
    }).reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  },
  typography: {
    italic: booleanFactory("italic", false),
    textAlignment: selectFactory(
      "textAlignemnt",
      iterableToSelectObject(TEXT_ALIGNMENTS, { undefined: "" }),
    ),
    textSize: selectFactory(
      "textSize",
      iterableToSelectObject(TEXT_SIZES, { undefined: "" }),
    ),
    textTransform: selectFactory(
      "textTransform",
      iterableToSelectObject(TEXT_TRANSFORMS, { undefined: "" }),
    ),
    textWeight: selectFactory(
      "textWeight",
      iterableToSelectObject(TEXT_WEIGHTS, { undefined: "" }),
    ),
  },
};
