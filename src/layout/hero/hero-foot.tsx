import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type HeroFootProps = HelpersProps;

export const HeroFoot = forwardRefAs<HeroFootProps, "div">(
  (props, ref) => {
    const { as, ...rest } = props;
    rest.className = classNames("hero-foot", rest.className);
    return <Generic as={as!} ref={ref} {...rest} />;
  },
  { as: "div" },
);
