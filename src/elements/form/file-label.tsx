import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type FileLabelModifierProps = Partial<{ className: string }>;

export type FileLabelProps = HelpersProps & FileLabelModifierProps;

export const FileLabel = forwardRefAs<FileLabelProps, "label">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("file-label", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "label" },
);
