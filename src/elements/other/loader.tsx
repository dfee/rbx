import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type LoaderProps = HelpersProps;

export const Loader = Object.assign(
  forwardRefAs<LoaderProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("loader", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    {
      as: "div",
      children: null,
    },
  ),
  { propTypes: genericPropTypes },
);
