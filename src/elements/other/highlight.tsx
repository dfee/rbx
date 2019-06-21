import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HighlightProps = HelpersProps;

export const Highlight = forwardRefAs<HighlightProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("highlight", className)}
      {...rest}
    />
  ),
  { as: "p" },
);

Highlight.displayName = "Highlight";
