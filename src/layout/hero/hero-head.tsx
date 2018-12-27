import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type HeroHeadProps = HelpersProps;

export const HeroHead = forwardRefAs<HeroHeadProps, "div">(
  (props, ref) => {
    const { as, ...rest } = props;
    rest.className = classNames("hero-head", rest.className);
    return <Generic as={as!} ref={ref} {...rest} />;
  },
  { as: "div" },
);
