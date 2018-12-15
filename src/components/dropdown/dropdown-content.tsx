import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type DropdownContentModifierProps = Partial<{ className: string }>;

export type DropdownContentProps = ModifierProps & DropdownContentModifierProps;

export const DropdownContent = forwardRefAs<DropdownContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("dropdown-content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
