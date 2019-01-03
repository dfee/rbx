import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type BlockProps = HelpersProps;

export const Block = forwardRefAs<BlockProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("block", className)} ref={ref} {...rest} />
  ),
  { as: "div" },
);
