import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type CardContentProps = ModifierProps;

export const CardContent = asExoticComponent<CardContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("card-content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
