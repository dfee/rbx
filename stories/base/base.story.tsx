import { storiesOf } from "@storybook/react";
import React from "react";

import { Generic } from "@/base";
import { BREAKPOINTS } from "@/base/helpers";
import { Section } from "@/layout";

import { iterableToSelectObject, selectFactory } from "../helpers";
import { modifiersKnobs as mk } from "../modifiers";

const genericKnobs = {
  as: selectFactory(
    "as",
    iterableToSelectObject(["a", "div", "h1", "p", "span"], {
      undefined: "",
    }),
    "div",
  ),
};

const filterUndefined = (props: { [k: string]: any }) =>
  Object.entries(props)
    .filter(([key, value]) => value !== "")
    .reduce((acc, [key, value]) => ({ ...acc, ...{ [key]: value } }), {});

const filterResponsive = (props: {
  [k: string]: { [k2: string]: { only?: boolean; value: string } };
}) =>
  Object.entries(props)
    .map(([key, value]) => ({
      [key]: Object.entries(value)
        .filter(([key2, value2]) => value2.value !== "")
        .reduce(
          (acc, [key2, value2]) => ({ ...acc, ...{ [key2]: value2 } }),
          {},
        ),
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {});

export const mapFactories = <T extends object>(obj: T, group?: string) =>
  Object.entries(obj)
    .map(([key, factory]) => ({ [key]: factory({ group }) }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {});

storiesOf("Base", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Generic", () => {
    const props = filterUndefined({
      as: genericKnobs.as({ group: "as" }),
      // colors
      ...mapFactories(mk.color, "Color"),
      // helpers
      ...mapFactories(mk.helpers.float, "Helpers"),
      ...mapFactories(mk.helpers.spacing, "Helpers"),
      ...mapFactories(mk.helpers.other, "Helpers"),
      // responsive
      responsive: filterResponsive(({
        ...BREAKPOINTS.map(breakpoint => ({
          [breakpoint]: {
            display: mapFactories(
              mk.responsive[breakpoint].display,
              "Responsive",
            ),
            hide: mapFactories(mk.responsive[breakpoint].hide, "Responsive"),
            textAlignment: mapFactories(
              mk.responsive[breakpoint].textAlignment,
              "Responsive",
            ),
            textSize: mapFactories(
              mk.responsive[breakpoint].textSize,
              "Responsive",
            ),
          },
        })).reduce((acc, cv) => ({ ...acc, ...cv }), {}),
      } as unknown) as any),
      ...mapFactories(mk.helpers.other, "Helpers"),
      // typography
      ...mapFactories(mk.typography, "Typography"),
    });
    return (
      <Generic as="p" {...props}>
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
