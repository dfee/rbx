import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type FooterProps = HelpersProps;

export const Footer = forwardRefAs<FooterProps, "div">(
  (props, ref) => {
    const { as, ...rest } = props;
    rest.className = classNames("footer", rest.className);
    return <Generic as={as!} ref={ref} {...rest} />;
  },
  { as: "div" },
);
