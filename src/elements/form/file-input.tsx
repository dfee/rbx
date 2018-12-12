import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileInputProps = Prefer<
  ModifierProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    const transformed = transformModifiers(props);
    transformed.className = cx("file-input", transformed.className);
    return <input ref={ref} type="file" {...transformed} />;
  },
);
