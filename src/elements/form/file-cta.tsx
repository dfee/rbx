import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type FileCTAProps = HelpersProps;

export const FileCTA = Object.assign(
  forwardRefAs<FileCTAProps, "span">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("file-cta", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  {
    propTypes: genericPropTypes,
  },
);
