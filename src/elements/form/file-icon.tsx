import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type FileIconProps = HelpersProps;

export const FileIcon = forwardRefAs<FileIconProps, "span">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("file-icon", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);
