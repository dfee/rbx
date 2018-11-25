import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type ModalCardTitleModifierProps = Partial<{
  children: React.ReactNode;
  style: {};
}>;

export type ModalCardTitleProps = ModifierProps & ModalCardTitleModifierProps;

const ModalCardTitle = renderAsExoticComponent<ModalCardTitleProps, "p">(
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

export default ModalCardTitle;
