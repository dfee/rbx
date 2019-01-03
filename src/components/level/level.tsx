import classNames from "classNames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Breakpoints, BREAKPOINTS } from "src/base/helpers";
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
