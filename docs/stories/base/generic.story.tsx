import { storiesOf } from "@storybook/react";
import React from "react";

import { Generic } from "src/base";
import { DEFAULTS } from "src/base/helpers/variables";
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
      iterableToSelectObject(DEFAULTS.floatPulledAlignments, { undefined: "" }),
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
      iterableToSelectObject([...DEFAULTS.colors, ...DEFAULTS.shades], {
        undefined: "",
      }),
    ),
    italic: booleanFactory("italic", false),
    textAlign: selectFactory(
      "textAlignemnt",
      iterableToSelectObject(DEFAULTS.textAlignments, { undefined: "" }),
    ),
    textColor: selectFactory(
      "textColor",
      iterableToSelectObject([...DEFAULTS.colors, ...DEFAULTS.shades], {
        undefined: "",
      }),
    ),
    textSize: selectFactory(
      "textSize",
      iterableToSelectObject(DEFAULTS.textSizes, { undefined: "" }),
    ),
    textTransform: selectFactory(
      "textTransform",
      iterableToSelectObject(DEFAULTS.textTransforms, { undefined: "" }),
    ),
    textWeight: selectFactory(
      "textWeight",
      iterableToSelectObject(DEFAULTS.textWeights, { undefined: "" }),
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
    ...DEFAULTS.breakpoints
      .map(breakpoint => {
        const isLimited =
          (DEFAULTS.breakpointsLimited as string[]).indexOf(breakpoint) !== -1;

        const display = {
          value: selectFactory(
            `${breakpoint}.display.value`,
            iterableToSelectObject(DEFAULTS.displays, { undefined: "" }),
          ),
          ...(isLimited
            ? {}
            : { only: booleanFactory(`${breakpoint}.display.only`, false) }),
        };

        const hide = {
          value: booleanFactory(`${breakpoint}.hide.value`, false),
          ...(isLimited
            ? {}
            : { only: booleanFactory(`${breakpoint}.hide.only`, false) }),
        };

        const textAlign = {
          value: selectFactory(
            `${breakpoint}.textAlignemnt.value`,
            iterableToSelectObject(DEFAULTS.textAlignments, { undefined: "" }),
          ),
          ...(isLimited
            ? {}
            : {
                only: booleanFactory(`${breakpoint}.textAlign.only`, false),
              }),
        };

        const textSize = {
          value: selectFactory(
            `${breakpoint}.textSize.value`,
            iterableToSelectObject(DEFAULTS.textSizes, { undefined: "" }),
          ),
          ...(isLimited
            ? {}
            : { only: booleanFactory(`${breakpoint}.textSize.only`, false) }),
        };

        return { [breakpoint]: { display, hide, textAlign, textSize } };
      })
      .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
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
        ...DEFAULTS.breakpoints
          .map(breakpoint => ({
            [breakpoint]: {
              display: mapFactories(
                knobs.responsive[breakpoint].display,
                "Responsive",
              ),
              hide: mapFactories(
                knobs.responsive[breakpoint].hide,
                "Responsive",
              ),
              textAlign: mapFactories(
                knobs.responsive[breakpoint].textAlign,
                "Responsive",
              ),
              textSize: mapFactories(
                knobs.responsive[breakpoint].textSize,
                "Responsive",
              ),
            },
          }))
          .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
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
