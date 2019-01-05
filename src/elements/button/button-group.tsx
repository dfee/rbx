import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { tuple } from "src/utils";

export const BUTTON_GROUP_POSITIONS = tuple("centered", "right");
export type ButtonGroupPositions = (typeof BUTTON_GROUP_POSITIONS)[number];

export type ButtonGroupModifierProps = Partial<{
  hasAddons: boolean;
  position: ButtonGroupPositions;
}>;

export type ButtonGroupProps = HelpersProps & ButtonGroupModifierProps;

const propTypes = {
  hasAddons: PropTypes.bool,
  position: PropTypes.oneOf(BUTTON_GROUP_POSITIONS),
};

export const ButtonGroup = Object.assign(
  forwardRefAs<ButtonGroupProps, "div">(
    ({ className, hasAddons, position, ...rest }, ref) => (
      <Generic
        className={classNames(
          "buttons",
          {
            "has-addons": hasAddons,
            [`is-${[position]}`]: position,
          },
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
