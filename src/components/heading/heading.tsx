import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HeadingModifierProps = Partial<{
  heading: boolean;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  spaced: boolean;
  subtitle: boolean;
  weight: "light" | "normal" | "semibold" | "bold";
}>;

export type HeadingProps = ModifierProps & HeadingModifierProps;

export const Heading = asExoticComponent<HeadingProps, "h1">((props, ref) => {
  const {
    as,
    heading,
    size,
    spaced,
    subtitle,
    weight,
    ...rest
  } = transformModifiers(props);
  rest.className = cx(rest.className, {
    [`has-text-weight-${weight}`]: weight,
    heading,
    [`is-${size}`]: !!size,
    "is-spaced": spaced && !subtitle,
    subtitle,
    title: !subtitle && !heading,
  });
  return React.createElement(as!, { ref, ...rest });
}, "h1");

Heading.defaultProps = Object.assign(
  {
    heading: false,
    spaced: false,
    subtitle: false,
  },
  Heading.defaultProps,
);
