import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type DropdownDividerModifierProps = Partial<{ className: string }>;

export type DropdownDividerProps = ModifierProps & DropdownDividerModifierProps;

export const DropdownDivider = forwardRefAs<DropdownDividerProps, "hr">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("dropdown-divider", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "hr" },
);
