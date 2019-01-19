import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HeroFootProps = HelpersProps;

export const HeroFoot = forwardRefAs<HeroFootProps>(
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
