import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type ModalCardFootProps = HelpersProps;

export const ModalCardFoot = forwardRefAs<ModalCardFootProps, "footer">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("modal-card-foot", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "footer" },
);
