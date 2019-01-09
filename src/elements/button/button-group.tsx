import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const BUTTON_GROUP_DEFAULTS = {
  positions: tuple("centered", "right"),
};

export interface ButtonGroupVariablesOverrides {}

export interface ButtonGroupVariablesDefaults {
  positions: (typeof BUTTON_GROUP_DEFAULTS["positions"])[number];
}

export type ButtonGroupVariables = Prefer<
  ButtonGroupVariablesOverrides,
  ButtonGroupVariablesDefaults
>;

export type ButtonGroupModifierProps = Partial<{
  hasAddons: boolean;
  position: ButtonGroupVariables["positions"];
}>;

export type ButtonGroupProps = HelpersProps & ButtonGroupModifierProps;

const propTypes = {
  hasAddons: PropTypes.bool,
  position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
