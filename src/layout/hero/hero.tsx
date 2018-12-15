import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { Colors } from "../../modifiers/color";
import { tuple } from "../../utils";
import { HeroBody } from "./hero-body";
import { HeroFoot } from "./hero-foot";
import { HeroHead } from "./hero-head";

export const HERO_SIZES = tuple(
  "medium",
  "large",
  "fullheight",
  "fullheight-with-navbar",
);
export type HeroSizes = (typeof HERO_SIZES)[number];

export type HeroModifierProps = Partial<{
  className: string;
  color: Colors;
  gradient: boolean;
  size: HeroSizes;
}>;

export type HeroProps = ModifierProps & HeroModifierProps;

export const Hero = Object.assign(
  forwardRefAs<HeroProps, "section">(
    (props, ref) => {
      const { as, color, gradient, size, ...rest } = transformModifiers(props);
      rest.className = classNames("hero", rest.className, {
        "is-bold": gradient,
        [`is-${color}`]: color,
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "section" },
  ),
  {
    Body: HeroBody,
    Foot: HeroFoot,
    Head: HeroHead,
  },
);
