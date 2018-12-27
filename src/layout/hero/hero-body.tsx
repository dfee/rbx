import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type HeroBodyProps = HelpersProps;

export const HeroBody = forwardRefAs<HeroBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = props;
    rest.className = classNames("hero-body", rest.className);
    return <Generic as={as!} ref={ref} {...rest} />;
  },
  { as: "div" },
);
