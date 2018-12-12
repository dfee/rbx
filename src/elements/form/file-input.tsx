import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileInputModifierProps = Partial<{ className: string }>;

export type FileInputProps = ModifierProps & FileInputModifierProps;

export const FileInput = forwardRefAs<FileInputProps, "input">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("file-input", rest.className);
    return React.createElement(as!, { ref, type: "file", ...rest });
  },
  { as: "input" },
);
