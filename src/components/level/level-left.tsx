import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type LevelLeftProps = HelpersProps;

export const LevelLeft = forwardRefAs<LevelLeftProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("level-left", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
