import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardImage } from "./card-image";

export type CardModifierProps = Partial<{ className: string }>;

export type CardProps = ModifierProps & CardModifierProps;

export const Card = Object.assign(
  forwardRefAs<CardProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = classNames("card", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  {
    Content: CardContent,
    Footer: CardFooter,
    Header: CardHeader,
    Image: CardImage,
  },
);
