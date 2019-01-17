import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type HighlightProps = HelpersProps;

export const Highlight = forwardRefAs<HighlightProps, "p">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("highlight", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "p" },
);

Highlight.displayName = "Highlight";
