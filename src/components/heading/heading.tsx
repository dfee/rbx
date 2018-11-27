import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type HeadingModifierProps = Partial<{
  children: React.ReactNode;
  heading: boolean;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  spaced: boolean;
  subtitle: boolean;
  weight: "light" | "normal" | "semibold" | "bold";
}>;

export type HeadingProps = ModifierProps & HeadingModifierProps;

export const Heading = renderAsExoticComponent<HeadingProps, "h1">(
  (
    { children, className, size, subtitle, weight, spaced, heading, ...props },
    ref,
  ) => (
    <Element
      {...props}
      ref={ref}
      className={cx(className, {
        [`has-text-weight-${weight}`]: weight,
        heading,
        [`is-${size}`]: !!size,
        "is-spaced": spaced && !subtitle,
        subtitle,
        title: !subtitle && !heading,
      })}
    >
      {children}
    </Element>
  ),
  "h1",
);
Heading.defaultProps = Object.assign(
  {
    children: null,
    heading: false,
    spaced: false,
    subtitle: false,
  },
  Heading.defaultProps,
);
