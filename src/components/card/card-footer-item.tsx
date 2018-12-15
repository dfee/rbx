import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type CardFooterItemModifierProps = Partial<{ className: string }>;
export type CardFooterItemProps = HelpersProps & CardFooterItemModifierProps;

export const CardFooterItem = forwardRefAs<CardFooterItemProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("card-footer-item", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
