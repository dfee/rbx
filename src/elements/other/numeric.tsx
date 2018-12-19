import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type NumericProps = HelpersProps;

export const Numeric = Object.assign(
  forwardRefAs<NumericProps, "p">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("number", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "p" },
  ),
  { propTypes: genericPropTypes },
);
