import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FileNameProps = HelpersProps;

export const FileName = forwardRefAs<FileNameProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("file-name", className)}
      {...rest}
    />
  ),
  { as: "span" },
);

FileName.displayName = "File.Name";
