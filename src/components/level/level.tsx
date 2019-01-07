import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Breakpoints, BREAKPOINTS } from "../../base/helpers";
import { LevelItem } from "./level-item";
import { LevelLeft } from "./level-left";
import { LevelRight } from "./level-right";

export type LevelModifierProps = Partial<{
  breakpoint: Breakpoints;
}>;

export type LevelProps = HelpersProps & LevelModifierProps;

const propTypes = {
  breakpoint: PropTypes.oneOf(BREAKPOINTS),
};

export const Level = Object.assign(
  forwardRefAs<LevelProps, "nav">(
    ({ breakpoint, className, ...rest }, ref) => (
      <Generic
        className={classNames(
          "level",
          { [`is-${breakpoint}`]: breakpoint },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "nav" },
  ),
  {
    Item: LevelItem,
    Left: LevelLeft,
    Right: LevelRight,
    propTypes,
  },
);
