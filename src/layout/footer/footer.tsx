import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type FooterProps = HelpersProps;

export const Footer = Object.assign(
  forwardRefAs<FooterProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("footer", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes: genericPropTypes },
);
