import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type TabModifierProps = Partial<{
  active: boolean;
  style: React.CSSProperties;
}>;

export type TabProps = HelpersProps & TabModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
  style: PropTypes.object,
};

export const Tab = Object.assign(
  forwardRefAs<TabModifierProps, "a">(
    (props, ref) => {
      const { as, active, className, style, ...rest } = transformHelpers(props);
      return (
        <li
          style={style}
          className={classNames(className, {
            "is-active": active,
          })}
        >
          {React.createElement(as!, { ref, ...rest })}
        </li>
      );
    },
    { as: "a" },
  ),
  { propTypes },
);
