import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type HeroHeadProps = HelpersProps;

export const HeroHead = forwardRefAs<HeroHeadProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("hero-head", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
