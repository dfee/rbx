import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type LevelRightProps = HelpersProps;

export const LevelRight = forwardRefAs<LevelRightProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("level-right", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
