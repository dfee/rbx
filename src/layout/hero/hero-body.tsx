import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HeroBodyModifierProps = Partial<{ className: string }>;

export type HeroBodyProps = ModifierProps & HeroBodyModifierProps;

export const HeroBody = forwardRefAs<HeroBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("hero-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
