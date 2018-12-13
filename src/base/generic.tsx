import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type GenericProps = ModifierProps;

export const Generic = forwardRefAs<GenericProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
