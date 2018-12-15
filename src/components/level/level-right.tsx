import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type LevelRightModifierProps = Partial<{
  className: string;
}>;

export type LevelRightProps = HelpersProps & LevelRightModifierProps;

export const LevelRight = forwardRefAs<LevelRightProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("level-right", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
