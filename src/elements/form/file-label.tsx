import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FileLabelProps = HelpersProps;

export const FileLabel = forwardRefAs<FileLabelProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("file-label", className)}
      {...rest}
    />
  ),
  { as: "label" },
);

FileLabel.displayName = "File.Label";
