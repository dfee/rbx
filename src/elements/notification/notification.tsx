import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Colors, COLORS } from "../../base/helpers";

export type NotificationModifierProps = Partial<{
  color: Colors;
}>;

export type NotificationProps = HelpersProps & NotificationModifierProps;

const propTypes = {
  ...genericPropTypes,
  color: PropTypes.oneOf(COLORS),
};

export const Notification = Object.assign(
  forwardRefAs<NotificationProps, "div">(
    (props, ref) => {
      const { as, color, ...rest } = transformHelpers(props);
      rest.className = classNames("notification", rest.className, {
        [`is-${color}`]: color,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes },
);
