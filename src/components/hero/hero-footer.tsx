import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type HeroFooterProps = ModifierProps;

export const HeroFooter = asExoticComponent<HeroFooterProps, "div">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("hero-foot", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
