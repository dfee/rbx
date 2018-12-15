import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type HeroHeadModifierProps = Partial<{ className: string }>;

export type HeroHeadProps = ModifierProps & HeroHeadModifierProps;

export const HeroHead = forwardRefAs<HeroHeadProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("hero-head", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
