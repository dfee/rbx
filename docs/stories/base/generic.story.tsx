import { storiesOf } from "@storybook/react";
import React from "react";

import { Generic } from "src/base";
import {
  BREAKPOINTS,
  COLORS,
  DISPLAYS,
  FLOAT_PULLED_ALIGNMENTS,
  GREY_COLORS,
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TRANSFORMS,
  TEXT_WEIGHTS,
} from "src/base/helpers";
import { Section } from "src/layout";

import {
  booleanFactory,
  filterUndefined,
  iterableToSelectObject,
  mapFactories,
  selectFactory,
} from "docs/stories/utils";

export const knobs = {
  as: selectFactory(
    "as",
    iterableToSelectObject(["a", "div", "h1", "p", "span"], {
      undefined: "",
    }),
    "div",
  ),
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

      const display = {
        value: selectFactory(
          `${breakpoint}.display.value`,
          iterableToSelectObject(DISPLAYS, { undefined: "" }),
        ),
        ...(hasOnly
          ? { only: booleanFactory(`${breakpoint}.display.only`, false) }
          : {}),
      };

      const hide = {
        value: booleanFactory(`${breakpoint}.hide.value`, false),
        ...(hasOnly
          ? { only: booleanFactory(`${breakpoint}.hide.only`, false) }
          : {}),
      };

      const textAlignment = {
        value: selectFactory(
          `${breakpoint}.textAlignemnt.value`,
          iterableToSelectObject(TEXT_ALIGNMENTS, { undefined: "" }),
        ),
        ...(hasOnly
          ? { only: booleanFactory(`${breakpoint}.textAlignment.only`, false) }
          : {}),
      };

      const textSize = {
        value: selectFactory(
          `${breakpoint}.textSize.value`,
          iterableToSelectObject(TEXT_SIZES, { undefined: "" }),
        ),
        ...(hasOnly
          ? { only: booleanFactory(`${breakpoint}.textSize.only`, false) }
          : {}),
      };

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

storiesOf("Base", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Generic", () => {
    const props = filterUndefined({
      // generic
      as: knobs.as({ group: "as" }),
      // colors
      ...mapFactories(knobs.color, "Color"),
      // helpers
      ...mapFactories(knobs.helpers.float, "Helpers"),
      ...mapFactories(knobs.helpers.spacing, "Helpers"),
      ...mapFactories(knobs.helpers.other, "Helpers"),
      // responsive
      responsive: {
        ...BREAKPOINTS.map(breakpoint => ({
          [breakpoint]: {
            display: mapFactories(
              knobs.responsive[breakpoint].display,
              "Responsive",
            ),
            hide: mapFactories(knobs.responsive[breakpoint].hide, "Responsive"),
            textAlignment: mapFactories(
              knobs.responsive[breakpoint].textAlignment,
              "Responsive",
            ),
            textSize: mapFactories(
              knobs.responsive[breakpoint].textSize,
              "Responsive",
            ),
          },
        })).reduce((acc, cv) => ({ ...acc, ...cv }), {}),
      },
      ...mapFactories(knobs.typography, "Typography"),
    });

    return (
      <Generic {...props}>
        This is the Generic component.
        <br />
        It takes advantage of all the modifiers available with Bulma.
        <br />
        It supports ref forwarding (using the `ref` prop).
        <br />
        In addition, you can render this component as any other component (with
        the `as` prop).
        <br />
        All components support these features.
      </Generic>
    );
  });
