import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { ModalCardBody } from "./modal-card-body";
import { ModalCardFoot } from "./modal-card-foot";
import { ModalCardHead } from "./modal-card-head";
import { ModalCardTitle } from "./modal-card-title";

export type ModalCardProps = HelpersProps;

export const ModalCard = Object.assign(
  forwardRefAs<ModalCardProps>(
    ({ className, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames("modal-card", className)}
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
