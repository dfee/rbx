import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type FileIconProps = HelpersProps;

export const FileIcon = forwardRefAs<HTMLSpanElement, FileIconProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("file-icon", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);

FileIcon.displayName = "File.Icon";
