import { cx } from "emotion";
import React from "react";

import { Button } from "@/components/button";
import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type ModalCardHeadModifierProps = Partial<{
  children: React.ReactNode;
  onClose: () => void;
  showClose: boolean;
  style: React.CSSProperties;
}>;

export type ModalCardHeadProps = ModifierProps & ModalCardHeadModifierProps;

export const ModalCardHead = extendedForwardRef<
  ModalCardHeadProps,
  "header"
>(
  ({ children, className, showClose, onClose, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("modal-card-head", className)}>
      {children}
      {showClose && <Button remove onClick={onClose} />}
    </Element>
  ),
  "header",
);
ModalCardHead.defaultProps = Object.assign(
  {
    children: null,
    showClose: true,
  },
  ModalCardHead.defaultProps,
);
