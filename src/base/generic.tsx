import React from "react";

import { ModifierProps, transformModifiers } from "../modifiers";
import { forwardRefAs } from "./exotic";

export type GenericProps = ModifierProps;

export const Generic = forwardRefAs<GenericProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
