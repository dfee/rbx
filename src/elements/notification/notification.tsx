import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { Colors } from "../../modifiers/color";

export type NotificationModifierProps = Partial<{
  className: string;
  color: Colors;
}>;

export type NotificationProps = ModifierProps & NotificationModifierProps;

export const Notification = forwardRefAs<NotificationProps, "div">(
  (props, ref) => {
    const { as, color, ...rest } = transformModifiers(props);
    rest.className = classNames("notification", rest.className, {
      [`is-${color}`]: color,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
