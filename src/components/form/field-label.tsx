import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type FieldLabelModifierProps = Partial<{
  children: React.ReactNode;
  size: "small" | "normal" | "medium" | "large";
  style: React.CSSProperties;
}>;

export type FieldLabelProps = ModifierProps & FieldLabelModifierProps;

export const FieldLabel = renderAsExoticComponent<FieldLabelProps, "div">(
  ({ children, className, size, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("field-label", className, {
        [`is-${size}`]: size,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);
FieldLabel.defaultProps = Object.assign(
  {
    children: null,
  },
  FieldLabel.defaultProps,
);
