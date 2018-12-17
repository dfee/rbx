import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  asHelpersPropTypes,
  forwardRefAs,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { tuple } from "../../utils";

export const BUTTON_GROUP_POSITIONS = tuple("centered", "right");
export type ButtonGroupPositions = (typeof BUTTON_GROUP_POSITIONS)[number];

export type ButtonGroupModifierProps = Partial<{
  hasAddons: boolean;
  position: ButtonGroupPositions;
}>;

export type ButtonGroupProps = HelpersProps & ButtonGroupModifierProps;

const propTypes = {
  ...asHelpersPropTypes,
  hasAddons: PropTypes.bool,
  position: PropTypes.oneOf(BUTTON_GROUP_POSITIONS),
};

export const ButtonGroup = Object.assign(
  forwardRefAs<ButtonGroupProps, "div">(
    (props, ref) => {
      const { as, children, hasAddons, position, ...rest } = transformHelpers(
        props,
      );
      rest.className = classNames("buttons", rest.className, {
        "has-addons": hasAddons,
        [`is-${[position]}`]: position,
      });
      return React.createElement(as!, { children, ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes },
);
