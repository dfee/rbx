import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type BoxModifierProps = Partial<{ className: string }>;

export type BoxProps = HelpersProps & BoxModifierProps;

export const Box = forwardRefAs<BoxProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("box", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
