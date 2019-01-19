import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FooterProps = HelpersProps;

export const Footer = forwardRefAs<FooterProps>(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("footer", className)} ref={ref} {...rest} />
  ),
  { as: "div" },
);

Footer.displayName = "Footer";
