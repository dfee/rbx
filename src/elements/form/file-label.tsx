import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type FileLabelProps = HelpersProps;

export const FileLabel = Object.assign(
  forwardRefAs<FileLabelProps, "label">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("file-label", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "label" },
  ),
  { propTypes: genericPropTypes },
);
