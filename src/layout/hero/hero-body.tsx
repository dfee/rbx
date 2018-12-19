import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type HeroBodyProps = HelpersProps;

export const HeroBody = Object.assign(
  forwardRefAs<HeroBodyProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("hero-body", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes: genericPropTypes },
);
