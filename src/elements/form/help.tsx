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

export type HelpModifierProps = Partial<{
  color: Colors;
}>;

export type HelpProps = HelpersProps & HelpModifierProps;

const propTypes = {
  ...genericPropTypes,
  color: PropTypes.oneOf(COLORS),
};

export const Help = Object.assign(
  forwardRefAs<HelpProps, "p">(
    (props, ref) => {
      const { as, color, ...rest } = transformHelpers(props);
      rest.className = classNames("help", rest.className, {
        [`is-${color}`]: color,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "p" },
  ),
  { propTypes },
);
