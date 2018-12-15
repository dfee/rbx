import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type HeroFootModifierProps = Partial<{ className: string }>;

export type HeroFootProps = HelpersProps & HeroFootModifierProps;

export const HeroFoot = forwardRefAs<HeroFootProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("hero-foot", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
