import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type CardHeaderTitleModifierProps = Partial<{ className: string }>;

export type CardHeaderTitleProps = HelpersProps & CardHeaderTitleModifierProps;

export const CardHeaderTitle = forwardRefAs<CardHeaderTitleProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("card-header-title", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
