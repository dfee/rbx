import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileLabelModifierProps = Partial<{ className: string }>;

export type FileLabelProps = ModifierProps & FileLabelModifierProps;

export const FileLabel = forwardRefAs<FileLabelProps, "label">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("file-label", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "label" },
);
