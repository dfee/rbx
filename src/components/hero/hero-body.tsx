import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HeroBodyProps = ModifierProps;

export const HeroBody = asExoticComponent<HeroBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("hero-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
