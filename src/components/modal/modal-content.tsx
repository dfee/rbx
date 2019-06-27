import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type ModalContentProps = HelpersProps;

export const ModalContent = forwardRefAs<ModalContentProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("modal-content", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

ModalContent.displayName = "Modal.Content";
