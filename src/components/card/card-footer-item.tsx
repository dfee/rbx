import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type CardFooterItemProps = ModifierProps;

export const CardFooterItem = asExoticComponent<CardFooterItemProps, "div">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("card-footer-item", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
