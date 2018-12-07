import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type FileInputModifierProps = Partial<{
  name: string;
}>;

export type FileInputProps = Prefer<
  ModifierProps & FileInputModifierProps,
  React.HTMLAttributes<HTMLInputElement>
>;

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    const transformed = transformModifiers(props);
    transformed.className = cx("file-input", transformed.className);
    return <input ref={ref} type="file" {...transformed} />;
  },
);
