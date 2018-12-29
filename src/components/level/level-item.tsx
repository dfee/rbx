import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type LevelItemProps = HelpersProps;

export const LevelItem = forwardRefAs<LevelItemProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("level-item", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
