import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type ModalContentModifierProps = Partial<{
  children: React.ReactNode;
  style: {};
}>;

export type ModalContentProps = ModifierProps & ModalContentModifierProps;

const ModalContent = renderAsExoticComponent<ModalContentProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("modal-content", className)}>
      {children}
    </Element>
  ),
  "div",
);
ModalContent.defaultProps = Object.assign(
  {
    children: null,
  },
  ModalContent.defaultProps,
);

export default ModalContent;
