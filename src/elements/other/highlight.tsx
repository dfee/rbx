import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type HighlightProps = HelpersProps;

export const Highlight = Object.assign(
  forwardRefAs<HighlightProps, "p">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("highlight", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "p" },
  ),
  { propTypes: genericPropTypes },
);
