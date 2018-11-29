import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type ModalCardBodyModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type ModalCardBodyProps = ModifierProps & ModalCardBodyModifierProps;

export const ModalCardBody = extendedForwardRef<
  ModalCardBodyProps,
  "section"
>(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("modal-card-body", className)}>
      {children}
    </Element>
  ),
  "section",
);
ModalCardBody.defaultProps = Object.assign(
  {
    children: null,
  },
  ModalCardBody.defaultProps,
);
