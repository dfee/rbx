import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FileNameProps = HelpersProps;

export const FileName = forwardRefAs<FileNameProps>(
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
