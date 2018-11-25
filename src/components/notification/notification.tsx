import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";

export type NotificationModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  style: {};
}>;

export type NotificationProps = ModifierProps & NotificationModifierProps;

const Notification = renderAsExoticComponent<NotificationProps, "div">(
  ({ children, className, color, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx(
        "notification",
        {
          [`is-${color}`]: color,
        },
        className,
      )}
    >
      {children}
    </Element>
  ),
  "div",
);
Notification.defaultProps = Object.assign(
  {
    children: null,
  },
  Notification.defaultProps,
);

export default Notification;
