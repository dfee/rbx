import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { CardFooterItem } from "./card-footer-item";

export type CardFooterProps = HelpersProps;

export const CardFooter = Object.assign(
  forwardRefAs<CardFooterProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("card-footer", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  {
    Item: CardFooterItem,
    propTypes: genericPropTypes,
  },
);
