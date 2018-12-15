import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { CardHeaderIcon } from "./card-header-icon";
import { CardHeaderTitle } from "./card-header-title";

export type CardHeaderModifierProps = Partial<{ className: string }>;
export type CardHeaderProps = ModifierProps & CardHeaderModifierProps;

export const CardHeader = Object.assign(
  forwardRefAs<CardHeaderProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
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
