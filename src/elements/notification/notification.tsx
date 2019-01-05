import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Colors, COLORS } from "src/base/helpers";

export type NotificationModifierProps = Partial<{
  color: Colors;
}>;

export type NotificationProps = HelpersProps & NotificationModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
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
