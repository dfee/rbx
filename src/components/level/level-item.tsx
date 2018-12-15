import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type LevelItemModifierProps = Partial<{ className: string }>;

export type LevelItemProps = ModifierProps & LevelItemModifierProps;

export const LevelItem = forwardRefAs<LevelItemProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("level-item", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
