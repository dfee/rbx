import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type ModalCardBodyModifierProps = Partial<{
  children: React.ReactNode;
  style: {};
}>;

export type ModalCardBodyProps = ModifierProps & ModalCardBodyModifierProps;

const ModalCardBody = renderAsExoticComponent<ModalCardBodyProps, "section">(
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

export default ModalCardBody;
