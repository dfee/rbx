import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type HeroHeadModifierProps = Partial<{ className: string }>;

export type HeroHeadProps = HelpersProps & HeroHeadModifierProps;

export const HeroHead = forwardRefAs<HeroHeadProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("hero-head", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
