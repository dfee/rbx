import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Colors } from "../../base/helpers";

export type NotificationModifierProps = Partial<{
  className: string;
  color: Colors;
}>;

export type NotificationProps = HelpersProps & NotificationModifierProps;

export const Notification = forwardRefAs<NotificationProps, "div">(
  (props, ref) => {
    const { as, color, ...rest } = transformHelpers(props);
    rest.className = classNames("notification", rest.className, {
      [`is-${color}`]: color,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
