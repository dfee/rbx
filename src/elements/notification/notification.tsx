import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";

export type NotificationModifierProps = Partial<{
  color: Variables["Colors"];
  other: boolean;
}>;

export type NotificationProps = HelpersProps & NotificationModifierProps;

const propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const Notification = Object.assign(
  forwardRefAs<NotificationProps, "div">(
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
  ),
  { propTypes },
);
