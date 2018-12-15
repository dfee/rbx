import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type FileIconModifierProps = Partial<{ className: string }>;

export type FileIconProps = HelpersProps & FileIconModifierProps;

export const FileIcon = forwardRefAs<FileIconProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("file-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
