import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type FileNameProps = HelpersProps;

export const FileName = Object.assign(
  forwardRefAs<FileNameProps, "span">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("file-name", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  { propTypes: genericPropTypes },
);
