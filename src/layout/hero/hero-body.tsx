import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HeroBodyProps = HelpersProps;

export const HeroBody = forwardRefAs<HeroBodyProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("hero-body", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

HeroBody.displayName = "Hero.Body";
