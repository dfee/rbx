import { storiesOf } from "@storybook/react";
import React from "react";

import { Generic } from "../../../src/base";
import { BREAKPOINTS } from "../../../src/base/helpers";
import { Section } from "../../../src/layout";

import { iterableToSelectObject, selectFactory } from "../utils";
import { helpersKnobs } from "./helpers";

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
  Object.keys(props)
    .filter(key => props[key] !== "")
    .map(key => ({ [key]: props[key] }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {});

const filterResponsive = (props: {
  [k: string]: { [k2: string]: { only?: boolean; value: string } };
}) =>
  Object.keys(props)
    .map(key => {
      const value = props[key];
      return {
        [key]: Object.keys(value)
          .filter(key2 => value[key2].value !== "")
          .map(key2 => ({ [key2]: value[key2] }))
          .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
      };
    })
    .reduce((acc, cv) => ({ ...acc, ...cv }), {});

export const mapFactories = <T extends object>(obj: T, group?: string) =>
  Object.keys(obj)
    .map(key => {
      const factory = obj[key];
      return { [key]: factory({ group }) };
    })
    .reduce((acc, cv) => ({ ...acc, ...cv }), {});

storiesOf("Base", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Generic", () => {
    const as = genericKnobs.as({ group: "as" });
    const props = filterUndefined({
      // colors
      ...mapFactories(helpersKnobs.color, "Color"),
      // helpers
      ...mapFactories(helpersKnobs.helpers.float, "Helpers"),
      ...mapFactories(helpersKnobs.helpers.spacing, "Helpers"),
      ...mapFactories(helpersKnobs.helpers.other, "Helpers"),
      // responsive
      responsive: filterResponsive(({
        ...BREAKPOINTS.map(breakpoint => ({
          [breakpoint]: {
            display: mapFactories(
              helpersKnobs.responsive[breakpoint].display,
              "Responsive",
            ),
            hide: mapFactories(
              helpersKnobs.responsive[breakpoint].hide,
              "Responsive",
            ),
            textAlignment: mapFactories(
              helpersKnobs.responsive[breakpoint].textAlignment,
              "Responsive",
            ),
            textSize: mapFactories(
              helpersKnobs.responsive[breakpoint].textSize,
              "Responsive",
            ),
          },
        })).reduce((acc, cv) => ({ ...acc, ...cv }), {}),
      } as unknown) as any),
      ...mapFactories(helpersKnobs.helpers.other, "Helpers"),
      // typography
      ...mapFactories(helpersKnobs.typography, "Typography"),
    });
    return (
      <Generic as={as as React.ReactType} {...props}>
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
