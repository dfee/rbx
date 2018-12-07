import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileIconModifierProps = Partial<{ className: string }>;

export type FileIconProps = ModifierProps & FileIconModifierProps;

export const FileIcon = forwardRefAs<FileIconProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("file-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
