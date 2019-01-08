import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Colors, COLORS } from "../../base/helpers/variables";

export type NotificationModifierProps = Partial<{
  color: Colors;
  other: boolean;
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
