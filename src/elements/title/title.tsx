import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type TitleModifierProps = Partial<{
  heading: boolean;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  spaced: boolean;
  subtitle: boolean;
  weight: "light" | "normal" | "semibold" | "bold";
}>;

export type TitleProps = ModifierProps & TitleModifierProps;

export const Title = forwardRefAs<TitleProps, "h1">((props, ref) => {
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

Title.defaultProps = Object.assign(
  {
    heading: false,
    spaced: false,
    subtitle: false,
  },
  Title.defaultProps,
);
