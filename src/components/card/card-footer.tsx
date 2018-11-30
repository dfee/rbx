import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { CardFooterItem } from "./card-footer-item";

export type CardFooterProps = ModifierProps;

export const CardFooter = Object.assign(
  asExoticComponent<CardFooterProps, "div">((props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("card-footer", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  { Item: CardFooterItem },
);
