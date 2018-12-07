import { cx } from "emotion";
import React from "react";

import { Generic } from "@/generic";
import { ModifierProps } from "@/modifiers";
import { ModalCardBody } from "./modal-card-body";
import { ModalCardFoot } from "./modal-card-foot";
import { ModalCardHead } from "./modal-card-head";

export type ModalCardProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const ModalCard = Object.assign(
  React.forwardRef<HTMLDivElement, ModalCardProps>(
    ({ className, ...props }, ref) => (
      <Generic {...props} ref={ref} className={cx("modal-card", className)} />
    ),
  ),
  {
    Body: ModalCardBody,
    Foot: ModalCardFoot,
    Head: ModalCardHead,
  },
);
