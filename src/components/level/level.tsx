import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Breakpoints, BREAKPOINTS } from "../../base/helpers";
import { LevelItem } from "./level-item";
import { LevelLeft } from "./level-left";
import { LevelRight } from "./level-right";

export type LevelModifierProps = Partial<{
  breakpoint: Breakpoints;
}>;

export type LevelProps = HelpersProps & LevelModifierProps;

const propTypes = {
  ...genericPropTypes,
  breakpoint: PropTypes.oneOf(BREAKPOINTS),
};

export const Level = Object.assign(
  forwardRefAs<LevelProps, "nav">(
    (props, ref) => {
      const { as, breakpoint, ...rest } = transformHelpers(props);
      rest.className = classNames("level", rest.className, {
        [`is-${breakpoint}`]: breakpoint,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "nav" },
  ),
  {
    Item: LevelItem,
    Left: LevelLeft,
    Right: LevelRight,
    propTypes,
  },
);
