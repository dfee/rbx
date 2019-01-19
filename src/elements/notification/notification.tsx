import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";

export type NotificationModifierProps = Partial<{
  color: Variables["colors"];
}>;

export type NotificationProps = HelpersProps & NotificationModifierProps;

export const Notification = forwardRefAs<NotificationProps>(
  ({ className, color, ...rest }, ref) => (
    <Generic
      className={classNames(
        "notification",
        { [`is-${color}`]: color },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

Notification.displayName = "Notification";
Notification.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
