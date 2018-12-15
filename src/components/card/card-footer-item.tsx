import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type CardFooterItemModifierProps = Partial<{ className: string }>;
export type CardFooterItemProps = ModifierProps & CardFooterItemModifierProps;

export const CardFooterItem = forwardRefAs<CardFooterItemProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("card-footer-item", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
