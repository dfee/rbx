import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type HeroHeadProps = HelpersProps;

export const HeroHead = Object.assign(
  forwardRefAs<HeroHeadProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("hero-head", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes: genericPropTypes },
);
