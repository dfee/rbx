import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type FieldBodyProps = ModifierProps;

export const FieldBody = asExoticComponent<FieldBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("field-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
