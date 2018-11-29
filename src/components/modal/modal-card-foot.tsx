import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type ModalCardFootModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type ModalCardFootProps = ModifierProps & ModalCardFootModifierProps;

export const ModalCardFoot = extendedForwardRef<
  ModalCardFootProps,
  "footer"
>(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("modal-card-foot", className)}>
      {children}
    </Element>
  ),
  "footer",
);
ModalCardFoot.defaultProps = Object.assign(
  {
    children: null,
  },
  ModalCardFoot.defaultProps,
);
