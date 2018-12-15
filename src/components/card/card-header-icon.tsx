import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type CardHeaderIconModifierProps = Partial<{ className: string }>;

export type CardHeaderIconProps = HelpersProps & CardHeaderIconModifierProps;

export const CardHeaderIcon = forwardRefAs<CardHeaderIconProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("card-header-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
