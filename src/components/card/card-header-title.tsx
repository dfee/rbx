import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type CardHeaderTitleProps = ModifierProps;

export const CardHeaderTitle = asExoticComponent<CardHeaderTitleProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("card-header-title", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
