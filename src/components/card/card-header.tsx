import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { CardHeaderIcon } from "./card-header-icon";
import { CardHeaderTitle } from "./card-header-title";

export type CardHeaderProps = ModifierProps;

export const CardHeader = Object.assign(
  asExoticComponent<CardHeaderProps, "div">((props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("card-header", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  {
    Icon: CardHeaderIcon,
    Title: CardHeaderTitle,
  },
);
