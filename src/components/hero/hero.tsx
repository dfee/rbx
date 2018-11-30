import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";
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
  asExoticComponent<HeroProps, "section">((props, ref) => {
    const { as, color, gradient, size, ...rest } = modify(props);
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
