import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

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
