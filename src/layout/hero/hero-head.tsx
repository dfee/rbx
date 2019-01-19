import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HeroHeadProps = HelpersProps;

export const HeroHead = forwardRefAs<HeroHeadProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("hero-head", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

HeroHead.displayName = "Hero.Head";
