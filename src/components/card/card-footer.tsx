import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { CardFooterItem } from "./card-footer-item";

export type CardFooterModifierProps = Partial<{ className: string }>;

export type CardFooterProps = HelpersProps & CardFooterModifierProps;

export const CardFooter = Object.assign(
  forwardRefAs<CardFooterProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("card-footer", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { Item: CardFooterItem },
);
