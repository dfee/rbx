import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type BlockProps = HelpersProps;

export const Block = forwardRefAs<BlockProps>(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("block", className)} ref={ref} {...rest} />
  ),
  { as: "div" },
);

Block.displayName = "Block";
