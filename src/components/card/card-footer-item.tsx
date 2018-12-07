import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type CardFooterItemProps = ModifierProps;

export const CardFooterItem = forwardRefAs<CardFooterItemProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("card-footer-item", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
