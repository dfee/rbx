import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FileInputProps = HelpersProps;

export const FileInput = forwardRefAs<FileInputProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("file-input", className)}
      type="file"
      {...rest}
    />
  ),
  { as: "input" },
);

FileInput.displayName = "File.Input";
