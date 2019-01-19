import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type BlockProps = HelpersProps;

export const Block = forwardRefAs<BlockProps>(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("block", className)} ref={ref} {...rest} />
  ),
  { as: "div" },
);

Block.displayName = "Block";
