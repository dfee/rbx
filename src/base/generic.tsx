import React from "react";

import { forwardRefAs } from "./exotic";
import { HelpersProps, transformHelpers } from "./helpers";

export type GenericProps = HelpersProps;

export const Generic = forwardRefAs<GenericProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
