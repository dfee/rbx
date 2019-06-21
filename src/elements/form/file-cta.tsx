import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FileCTAProps = HelpersProps;

export const FileCTA = forwardRefAs<FileCTAProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("file-cta", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

FileCTA.displayName = "File.CTA";
