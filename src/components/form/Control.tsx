import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type ControlModifierProps = Partial<{
  children: React.ReactNode;
  fullwidth: boolean;
  iconLeft: boolean;
  iconRight: boolean;
  loading: boolean;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
}>;

export type ControlProps = ModifierProps & ControlModifierProps;

export const Control = renderAsExoticComponent<ControlProps, "div">(
  (
    {
      children,
      className,
      fullwidth,
      iconLeft,
      iconRight,
      loading,
      size,
      ...props
    },
    ref,
  ) => (
    <Element
      {...props}
      ref={ref}
      className={cx("control", className, {
        "has-icons-left": iconLeft,
        "has-icons-right": iconRight,
        "is-expanded": fullwidth,
        "is-loading": loading,
        [`is-${size}`]: size,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);
Control.defaultProps = Object.assign(
  {
    children: null,
    fullwidth: false,
    iconLeft: false,
    iconRight: false,
    loading: false,
  },
  Control.defaultProps,
);
