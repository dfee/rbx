import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type HighlightModifierProps = Partial<{ className: string }>;
export type HighlightProps = HelpersProps & HighlightModifierProps;

export const Highlight = forwardRefAs<HighlightProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("highlight", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
