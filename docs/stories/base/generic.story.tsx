import { storiesOf } from "@storybook/react";
import React from "react";

import { Generic } from "src/base";
import { FLOAT_PULLED_ALIGNMENTS } from "src/base/helpers/float";
import { BREAKPOINTS } from "src/base/helpers/responsive";
import {
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TRANSFORMS,
  TEXT_WEIGHTS,
} from "src/base/helpers/typography";
import { COLORS, SHADES } from "src/base/helpers/variables";
import { DISPLAYS } from "src/base/helpers/visibility";
import { Card } from "src/components";
import { Notification } from "src/elements";
import { Section } from "src/layout";

import {
  booleanFactory,
  filterUndefined,
  iterableToSelectObject,
  mapFactories,
  selectFactory,
} from "docs/stories/utils";

const asMap = {
  undefined: undefined,
  div: "div",
  span: "span",
  card: Card,
  notification: Notification,
};

export const knobs = {
  as: selectFactory(
    "as",
    iterableToSelectObject(Object.keys(asMap), {
      undefined: "",
    }),
    "div",
  ),
  float: {
    clearfix: booleanFactory("clearfix", false),
    pull: selectFactory(
      "pull",
      iterableToSelectObject(FLOAT_PULLED_ALIGNMENTS, { undefined: "" }),
    ),
  },
  overflow: {
    clipped: booleanFactory("clipped", false),
  },
  overlay: {
    overlay: booleanFactory("overlay", false),
  },
  typograpahy: {
    backgroundColor: selectFactory(
      "backgroundColor",
      iterableToSelectObject([...COLORS, ...SHADES], { undefined: "" }),
    ),
    italic: booleanFactory("italic", false),
    textAlignment: selectFactory(
      "textAlignemnt",
      iterableToSelectObject(TEXT_ALIGNMENTS, { undefined: "" }),
    ),
    textColor: selectFactory(
      "textColor",
      iterableToSelectObject([...COLORS, ...SHADES], { undefined: "" }),
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
  visibility: {
    hidden: booleanFactory("hidden", false),
    invisible: booleanFactory("invisible", false),
    srOnly: booleanFactory("srOnly", false),
  },
  other: {
    marginless: booleanFactory("marginless", false),
    paddingless: booleanFactory("paddingless", false),
    radiusless: booleanFactory("radiusless", false),
    shadowless: booleanFactory("shadowless", false),
    unselectable: booleanFactory("unselectable", false),
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
};

storiesOf("Base", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Generic", () => {
    const props = filterUndefined({
      as: asMap[knobs.as({ group: "as" })],
      ...mapFactories(knobs.float, "Float"),
      ...mapFactories(knobs.overflow, "Overflow"),
      ...mapFactories(knobs.overlay, "Overlay"),
      ...mapFactories(knobs.typograpahy, "Typography"),
      ...mapFactories(knobs.visibility, "Visibility"),
      ...mapFactories(knobs.other, "Other"),
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
    });

    return (
      <Generic {...props}>
        <p>
          This is the <strong>Generic</strong> component.
          <br />
          All components render through this – meaning that these props are
          available to all components
          <br />
          It supports ref forwarding (using the <strong>`ref`</strong> prop).
          <br />
          In addition, you can render this component as any other component
          (like a <strong>Card</strong> or <strong>Notification</strong>) or JSX
          Element (like a <strong>div</strong> or <strong>span</strong>), using
          the <strong>`as`</strong>
          prop.
        </p>
        <hr />
        <p>Customize this element with the knobs below.</p>
      </Generic>
    );
  });
