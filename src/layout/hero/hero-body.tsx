import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

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

HeroBody.displayName = "Hero.Body";
