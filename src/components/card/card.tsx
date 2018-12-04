import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardImage } from "./card-image";

export type CardModifierProps = Partial<{
  children?: React.ReactNode;
}>;

export type CardProps = ModifierProps & CardModifierProps;

export const Card = Object.assign(
  forwardRefAs<CardProps, "div">((props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("card", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  {
    Content: CardContent,
    Footer: CardFooter,
    Header: CardHeader,
    Image: CardImage,
  },
);
