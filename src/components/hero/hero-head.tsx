import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type HeroHeadProps = ModifierProps;

export const HeroHead = asExoticComponent<HeroHeadProps, "div">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("hero-head", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
