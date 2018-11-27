import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type LoaderModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type LoaderProps = ModifierProps & LoaderModifierProps;

export const Loader = renderAsExoticComponent<LoaderProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("loader", className)}>
      {children}
    </Element>
  ),
  "div",
);
Loader.defaultProps = Object.assign(
  {
    children: null,
  },
  Loader.defaultProps,
);
