import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { ModalCardBody } from "./modal-card-body";
import { ModalCardFoot } from "./modal-card-foot";
import { ModalCardHead } from "./modal-card-head";
import { ModalCardTitle } from "./modal-card-title";

export type ModalCardProps = HelpersProps;

export const ModalCard = Object.assign(
  forwardRefAs<ModalCardProps>(
    ({ className, ...rest }, ref) => (
      <Generic
        className={classNames("modal-card", className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    Body: ModalCardBody,
    Foot: ModalCardFoot,
    Head: ModalCardHead,
    Title: ModalCardTitle,
  },
);

ModalCard.displayName = "Modal.Card";
