import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type FieldBodyModifierProps = Partial<{ className: string }>;

export type FieldBodyProps = HelpersProps & FieldBodyModifierProps;

export const FieldBody = forwardRefAs<FieldBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("field-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
