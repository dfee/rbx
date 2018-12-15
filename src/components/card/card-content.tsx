import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type CardContentModifierProps = Partial<{ className: string }>;

export type CardContentProps = HelpersProps & CardContentModifierProps;

export const CardContent = forwardRefAs<CardContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("card-content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
