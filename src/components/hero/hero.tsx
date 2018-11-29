import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/colors";
import { HeroBody } from "./hero-body";
import { HeroFooter } from "./hero-footer";
import { HeroHead } from "./hero-head";

export type HeroModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  gradient: boolean;
  size: "medium" | "large" | "fullheight";
  style: React.CSSProperties;
}>;

export type HeroProps = ModifierProps & HeroModifierProps;

export const Hero = Object.assign(
  extendedForwardRef<HeroProps, "section">(
    ({ children, className, color, gradient, size, ...props }, ref) => (
      <Element
        {...props}
        ref={ref}
        className={cx("hero", className, {
          [`is-${color}`]: color,
          [`is-${size}`]: size,
          "is-bold": gradient,
        })}
      >
        {children}
      </Element>
    ),
    "section",
  ),
  {
    Body: HeroBody,
    Footer: HeroFooter,
    Head: HeroHead,
  },
);
Hero.defaultProps = Object.assign(
  {
    children: null,
    gradient: false,
  },
  Hero.defaultProps,
);
