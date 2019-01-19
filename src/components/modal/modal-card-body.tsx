import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type ModalCardBodyProps = HelpersProps;

export const ModalCardBody = forwardRefAs<HTMLElement, ModalCardBodyProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("modal-card-body", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "section" },
);

ModalCardBody.displayName = "Modal.Card.Body";
