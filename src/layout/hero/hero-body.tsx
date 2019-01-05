import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type HeroBodyProps = HelpersProps;

export const HeroBody = forwardRefAs<HeroBodyProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("hero-body", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
