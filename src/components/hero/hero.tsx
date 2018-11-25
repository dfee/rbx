import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";
import HeroBody from "./components/hero-body";
import HeroFooter from "./components/hero-footer";
import HeroHead from "./components/hero-head";

export type HeroModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  gradient: boolean;
  size: "medium" | "large" | "fullheight";
  style: {};
}>;

export type HeroProps = ModifierProps & HeroModifierProps;

type Hero = RenderAsExoticComponent<HeroProps, "section"> & {
  Body: typeof HeroBody;
  Footer: typeof HeroFooter;
  Head: typeof HeroHead;
};

const Hero: Partial<Hero> = renderAsExoticComponent<HeroProps, "section">(
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
);
Hero.defaultProps = Object.assign(
  {
    children: null,
    gradient: false,
  },
  Hero.defaultProps,
);

Hero.Body = HeroBody;
Hero.Footer = HeroFooter;
Hero.Head = HeroHead;

export default Hero as Hero;
