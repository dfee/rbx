import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type BlockProps = HelpersProps;

export const Block = forwardRefAs<BlockProps>(
  ({ className, ...rest }, ref) => (
    <Generic ref={ref} className={classNames("block", className)} {...rest} />
  ),
  { as: "div" },
);

Block.displayName = "Block";
