import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type ModalCardTitleProps = HelpersProps;

export const ModalCardTitle = forwardRefAs<ModalCardTitleProps, "p">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("modal-card-title", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "p" },
);
