import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FileIconProps = HelpersProps;

export const FileIcon = forwardRefAs<FileIconProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("file-icon", className)}
      {...rest}
    />
  ),
  { as: "span" },
);

FileIcon.displayName = "File.Icon";
