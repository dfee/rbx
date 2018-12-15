import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type LevelItemModifierProps = Partial<{ className: string }>;

export type LevelItemProps = HelpersProps & LevelItemModifierProps;

export const LevelItem = forwardRefAs<LevelItemProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("level-item", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
