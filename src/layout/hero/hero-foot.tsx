import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type HeroFootProps = HelpersProps;

export const HeroFoot = Object.assign(
  forwardRefAs<HeroFootProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("hero-foot", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes: genericPropTypes },
);
