import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type FileLabelProps = HelpersProps;

export const FileLabel = forwardRefAs<FileLabelProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("file-label", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "label" },
);

FileLabel.displayName = "File.Label";
