import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Colors, COLORS } from "../../base/helpers";
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
  color: Colors;
  gradient: boolean;
  size: HeroSizes;
}>;

export type HeroProps = HelpersProps & HeroModifierProps;

const propTypes = {
  ...genericPropTypes,
  color: PropTypes.oneOf(COLORS),
  gradient: PropTypes.bool,
  size: PropTypes.oneOf(HERO_SIZES),
};

export const Hero = Object.assign(
  forwardRefAs<HeroProps, "section">(
    (props, ref) => {
      const { as, color, gradient, size, ...rest } = transformHelpers(props);
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
    propTypes,
  },
);
