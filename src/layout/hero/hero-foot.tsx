import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type HeroFootProps = HelpersProps;

export const HeroFoot = forwardRefAs<HTMLDivElement, HeroFootProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("hero-foot", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

HeroFoot.displayName = "Hero.Foot";
