import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type FooterModifierProps = Partial<{ className: string }>;

export type FooterProps = HelpersProps & FooterModifierProps;

export const Footer = forwardRefAs<FooterProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("footer", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
