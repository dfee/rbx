import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";
import { HeroBody } from "./hero-body";
import { HeroFooter } from "./hero-footer";
import { HeroHead } from "./hero-head";

export const HERO_SIZES = tuple(
  "medium",
  "large",
  "fullheight",
  "fullheight-with-navbar",
);
export type HeroSizes = (typeof HERO_SIZES)[number];

export type HeroModifierProps = Partial<{
  color: Colors;
  gradient: boolean;
  size: HeroSizes;
}>;

export type HeroProps = ModifierProps & HeroModifierProps;

export const Hero = Object.assign(
  forwardRefAs<HeroProps, "section">((props, ref) => {
    const { as, color, gradient, size, ...rest } = transformModifiers(props);
    rest.className = cx("hero", rest.className, {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
      "is-bold": gradient,
    });
    return React.createElement(as!, { ref, ...rest });
  }, "section"),
  {
    Body: HeroBody,
    Footer: HeroFooter,
    Head: HeroHead,
  },
);

Hero.defaultProps = Object.assign({ gradient: false }, Hero.defaultProps);
