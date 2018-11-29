import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/colors";

export type NotificationModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  style: React.CSSProperties;
}>;

export type NotificationProps = ModifierProps & NotificationModifierProps;

export const Notification = extendedForwardRef<NotificationProps, "div">(
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
