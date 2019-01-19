import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HeroBodyProps = HelpersProps;

export const HeroBody = forwardRefAs<HeroBodyProps>(
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
