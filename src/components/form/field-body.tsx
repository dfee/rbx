import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type FieldBodyModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type FieldBodyProps = ModifierProps & FieldBodyModifierProps;

export const FieldBody = renderAsExoticComponent<FieldBodyProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("field-body", className, {})}>
      {children}
    </Element>
  ),
  "div",
);
FieldBody.defaultProps = Object.assign(
  {
    children: null,
  },
  FieldBody.defaultProps,
);
