import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FileIconProps = HelpersProps;

export const FileIcon = forwardRefAs<FileIconProps>(
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
