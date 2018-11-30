import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ButtonGroupModifierProps = Partial<{
  hasAddons: boolean;
  position: "centered" | "right";
}>;

export type ButtonGroupProps = ModifierProps & ButtonGroupModifierProps;

export const ButtonGroup = forwardRefAs<ButtonGroupProps, "div">(
  (props, ref) => {
    const { as, children, hasAddons, position, ...rest } = transformModifiers(
      props,
    );
    rest.className = cx("buttons", rest.className, {
      "has-addons": hasAddons,
      [`is-${[position]}`]: position,
    });
    return React.createElement(as!, { children, ref, ...rest });
  },
  "div",
);
