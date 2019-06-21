import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type ModalCardBodyProps = HelpersProps;

export const ModalCardBody = forwardRefAs<ModalCardBodyProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("modal-card-body", className)}
      {...rest}
    />
  ),
  { as: "section" },
);

ModalCardBody.displayName = "Modal.Card.Body";
