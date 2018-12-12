import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FieldBodyModifierProps = Partial<{ className: string }>;

export type FieldBodyProps = ModifierProps & FieldBodyModifierProps;

export const FieldBody = forwardRefAs<FieldBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("field-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
