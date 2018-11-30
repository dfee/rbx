import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type ButtonGroupModifierProps = Partial<{
  className: string;
  hasAddons: boolean;
  position: "centered" | "right";
}>;

export type ButtonGroupProps = ModifierProps & ButtonGroupModifierProps;

export const ButtonGroup = asExoticComponent<ButtonGroupProps, "div">(
  (props, ref) => {
    const { as, children, hasAddons, position, ...rest } = modify(props);
    rest.className = cx("buttons", rest.className, {
      "has-addons": hasAddons,
      [`is-${[position]}`]: position,
    });
    return React.createElement(as!, { children, ref, ...rest });
  },
  "div",
);
