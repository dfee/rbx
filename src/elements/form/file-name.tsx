import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type FileNameModifierProps = Partial<{ className: string }>;

export type FileNameProps = HelpersProps & FileNameModifierProps;

export const FileName = forwardRefAs<FileNameProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("file-name", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
