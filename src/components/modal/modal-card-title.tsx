import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type ModalCardTitleModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type ModalCardTitleProps = ModifierProps & ModalCardTitleModifierProps;

export const ModalCardTitle = extendedForwardRef<ModalCardTitleProps, "p">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("modal-card-title", className)}>
      {children}
    </Element>
  ),
  "p",
);
ModalCardTitle.defaultProps = Object.assign(
  {
    children: null,
  },
  ModalCardTitle.defaultProps,
);
