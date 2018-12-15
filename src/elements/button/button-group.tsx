import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { tuple } from "../../utils";

export const BUTTON_GROUP_POSITIONS = tuple("centered", "right");
export type ButtonGroupPositions = (typeof BUTTON_GROUP_POSITIONS)[number];

export type ButtonGroupModifierProps = Partial<{
  className: string;
  hasAddons: boolean;
  position: ButtonGroupPositions;
}>;

export type ButtonGroupProps = HelpersProps & ButtonGroupModifierProps;

export const ButtonGroup = forwardRefAs<ButtonGroupProps, "div">(
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
);
