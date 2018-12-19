import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type FileIconProps = HelpersProps;

export const FileIcon = Object.assign(
  forwardRefAs<FileIconProps, "span">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("file-icon", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  {
    propTypes: genericPropTypes,
  },
);
