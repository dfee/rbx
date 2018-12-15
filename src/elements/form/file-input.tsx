import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type FileInputModifierProps = Partial<{ className: string }>;

export type FileInputProps = HelpersProps & FileInputModifierProps;

export const FileInput = forwardRefAs<FileInputProps, "input">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("file-input", rest.className);
    return React.createElement(as!, { ref, type: "file", ...rest });
  },
  { as: "input" },
);
