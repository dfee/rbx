import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type LevelRightModifierProps = Partial<{
  className: string;
}>;

export type LevelRightProps = ModifierProps & LevelRightModifierProps;

export const LevelRight = forwardRefAs<LevelRightProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("level-right", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
