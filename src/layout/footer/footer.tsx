import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type FooterProps = HelpersProps;

export const Footer = forwardRefAs<FooterProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("footer", className)} ref={ref} {...rest} />
  ),
  { as: "div" },
);
