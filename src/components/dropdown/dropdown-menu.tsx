import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type DropdownMenuModifierProps = Partial<{ className: string }>;
export type DropdownMenuProps = ModifierProps & DropdownMenuModifierProps;

export const DropdownMenu = forwardRefAs<DropdownMenuProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("dropdown-menu", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
