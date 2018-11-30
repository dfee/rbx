import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type CardHeaderIconProps = ModifierProps;

export const CardHeaderIcon = asExoticComponent<CardHeaderIconProps, "div">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("card-header-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
