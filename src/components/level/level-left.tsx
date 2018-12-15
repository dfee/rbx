import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type LevelLeftModifierProps = Partial<{
  className: string;
}>;

export type LevelLeftProps = ModifierProps & LevelLeftModifierProps;

export const LevelLeft = forwardRefAs<LevelLeftProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("level-left", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
