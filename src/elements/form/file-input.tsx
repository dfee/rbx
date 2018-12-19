import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type FileInputProps = HelpersProps;

export const FileInput = Object.assign(
  forwardRefAs<FileInputProps, "input">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("file-input", rest.className);
      return React.createElement(as!, { ref, type: "file", ...rest });
    },
    { as: "input" },
  ),
  { propTypes: genericPropTypes },
);
