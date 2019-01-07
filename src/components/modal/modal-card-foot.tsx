import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

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
