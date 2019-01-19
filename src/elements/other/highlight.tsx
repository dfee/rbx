import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HighlightProps = HelpersProps;

export const Highlight = forwardRefAs<HighlightProps>(
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
