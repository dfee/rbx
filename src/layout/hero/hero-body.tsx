import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type HeroBodyModifierProps = Partial<{ className: string }>;

export type HeroBodyProps = HelpersProps & HeroBodyModifierProps;

export const HeroBody = forwardRefAs<HeroBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("hero-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
