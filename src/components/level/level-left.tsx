import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type LevelLeftModifierProps = Partial<{
  className: string;
}>;

export type LevelLeftProps = HelpersProps & LevelLeftModifierProps;

export const LevelLeft = forwardRefAs<LevelLeftProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("level-left", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
