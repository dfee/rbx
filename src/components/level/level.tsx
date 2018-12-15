import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Breakpoints } from "../../base/helpers";
import { LevelItem } from "./level-item";
import { LevelLeft } from "./level-left";
import { LevelRight } from "./level-right";

export type LevelModifierProps = Partial<{
  breakpoint: Breakpoints;
  className: string;
}>;

export type LevelProps = HelpersProps & LevelModifierProps;

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
  },
);
