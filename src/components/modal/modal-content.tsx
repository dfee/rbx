import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type ModalContentProps = HelpersProps;

export const ModalContent = forwardRefAs<ModalContentProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("modal-content", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
