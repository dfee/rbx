import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { CardHeaderIcon } from "./card-header-icon";
import { CardHeaderTitle } from "./card-header-title";

export type CardHeaderModifierProps = Partial<{ className: string }>;
export type CardHeaderProps = HelpersProps & CardHeaderModifierProps;

export const CardHeader = Object.assign(
  forwardRefAs<CardHeaderProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("card-header", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  {
    Icon: CardHeaderIcon,
    Title: CardHeaderTitle,
  },
);
