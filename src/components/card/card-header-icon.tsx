import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type CardHeaderIconModifierProps = Partial<{ className: string }>;

export type CardHeaderIconProps = ModifierProps & CardHeaderIconModifierProps;

export const CardHeaderIcon = forwardRefAs<CardHeaderIconProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("card-header-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
