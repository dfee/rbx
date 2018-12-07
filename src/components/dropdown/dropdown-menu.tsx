import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type DropdownMenuProps = ModifierProps;

export const DropdownMenu = forwardRefAs<DropdownMenuProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("dropdown-menu", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
