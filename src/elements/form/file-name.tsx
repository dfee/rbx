import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type FileNameProps = HelpersProps;

export const FileName = forwardRefAs<HTMLSpanElement, FileNameProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("file-name", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);

FileName.displayName = "File.Name";
