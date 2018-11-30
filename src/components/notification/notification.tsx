import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export type NotificationModifierProps = Partial<{
  color: Colors;
}>;

export type NotificationProps = ModifierProps & NotificationModifierProps;

export const Notification = asExoticComponent<NotificationProps, "div">(
  (props, ref) => {
    const { as, color, ...rest } = modify(props);
    rest.className = cx("notification", rest.className, {
      [`is-${color}`]: color,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
