import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type FileInputProps = HelpersProps;

export const FileInput = forwardRefAs<FileInputProps, "input">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("file-input", className)}
      ref={ref}
      type="file"
      {...rest}
    />
  ),
  { as: "input" },
);
