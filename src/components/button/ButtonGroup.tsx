import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type ButtonGroupModifierProps = Partial<{
  hasAddons: boolean;
  position: "centered" | "right";
}>;

export type ButtonGroupProps = ModifierProps & ButtonGroupModifierProps;

const ButtonGroup = renderAsExoticComponent<ButtonGroupProps, "div">(
  ({ children, className, hasAddons, position, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("buttons", className, {
        "has-addons": hasAddons,
        [`is-${[position]}`]: position,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);

export default ButtonGroup;
