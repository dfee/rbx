import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type CardHeaderIconProps = ModifierProps;

export const CardHeaderIcon = asExoticComponent<CardHeaderIconProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("card-header-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
