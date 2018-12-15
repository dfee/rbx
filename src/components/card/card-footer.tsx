import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { CardFooterItem } from "./card-footer-item";

export type CardFooterModifierProps = Partial<{ className: string }>;

export type CardFooterProps = ModifierProps & CardFooterModifierProps;

export const CardFooter = Object.assign(
  forwardRefAs<CardFooterProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = classNames("card-footer", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { Item: CardFooterItem },
);
