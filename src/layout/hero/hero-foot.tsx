import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type HeroFootProps = HelpersProps;

export const HeroFoot = forwardRefAs<HeroFootProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("hero-foot", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
