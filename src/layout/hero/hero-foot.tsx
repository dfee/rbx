import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type HeroFootModifierProps = Partial<{ className: string }>;

export type HeroFootProps = ModifierProps & HeroFootModifierProps;

export const HeroFoot = forwardRefAs<HeroFootProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("hero-foot", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
