import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HeroFootProps = HelpersProps;

export const HeroFoot = forwardRefAs<HeroFootProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("hero-foot", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

HeroFoot.displayName = "Hero.Foot";
