import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

import { HeroBody } from "./hero-body";
import { HeroFoot } from "./hero-foot";
import { HeroHead } from "./hero-head";

export const HERO_DEFAULTS = {
  sizes: [
    "small",
    "medium",
    "large",
    "fullheight",
    "fullheight-with-navbar",
  ] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeroVariablesOverrides {}

export interface HeroVariablesDefaults {
  sizes: (typeof HERO_DEFAULTS["sizes"])[number];
}

export type HeroVariables = Prefer<
  HeroVariablesOverrides,
  HeroVariablesDefaults
>;

export type HeroModifierProps = {
  color?: Variables["colors"];
  gradient?: boolean;
  size?: HeroVariables["sizes"];
};

export type HeroProps = HelpersProps & HeroModifierProps;

export const Hero = Object.assign(
  forwardRefAs<HeroProps>(
    ({ className, color, gradient, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "hero",
          {
            "is-bold": gradient,
            [`is-${color}`]: color,
            [`is-${size}`]: size,
          },
          className,
        )}
        {...rest}
      />
    ),
    { as: "section" },
  ),
  {
    Body: HeroBody,
    DEFAULTS: HERO_DEFAULTS,
    Foot: HeroFoot,
    Head: HeroHead,
  },
);

Hero.displayName = "Hero";
Hero.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradient: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
