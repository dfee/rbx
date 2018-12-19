import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type HeadingProps = HelpersProps;

export const Heading = Object.assign(
  forwardRefAs<HeadingProps, "p">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("heading", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "p" },
  ),
  { propTypes: genericPropTypes },
);
