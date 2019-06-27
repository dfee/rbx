import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FooterProps = HelpersProps;

export const Footer = forwardRefAs<FooterProps>(
  ({ className, ...rest }, ref) => (
    <Generic ref={ref} className={classNames("footer", className)} {...rest} />
  ),
  { as: "div" },
);

Footer.displayName = "Footer";
