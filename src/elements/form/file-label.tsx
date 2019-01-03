import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type FileLabelProps = HelpersProps;

export const FileLabel = forwardRefAs<FileLabelProps, "label">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("file-label", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "label" },
);
