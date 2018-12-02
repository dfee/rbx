import { cx } from "emotion";
import React from "react";

import { Generic } from "@/extras/generic";
import { ModifierProps } from "@/modifiers";
import { ModalCardBody } from "./modal-card-body";
import { ModalCardFoot } from "./modal-card-foot";
import { ModalCardHead } from "./modal-card-head";
import { ModalCardTitle } from "./modal-card-title";

export type ModalCardModifierProps = Partial<{
  onClose: () => void;
}>;

export type ModalCardProps = Prefer<
  ModifierProps & ModalCardModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const ModalCard = Object.assign(
  React.forwardRef<HTMLDivElement, ModalCardProps>(
    ({ className, onClose, ...props }, ref) => (
      <Generic {...props} ref={ref} className={cx("modal-card", className)} />
    ),
  ),
  {
    Body: ModalCardBody,
    Foot: ModalCardFoot,
    Head: ModalCardHead,
    Title: ModalCardTitle,
  },
);
