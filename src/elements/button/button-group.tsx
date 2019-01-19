import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const BUTTON_GROUP_DEFAULTS = {
  alignments: tuple("centered", "right"),
};

export interface ButtonGroupVariablesOverrides {}

export interface ButtonGroupVariablesDefaults {
  alignments: (typeof BUTTON_GROUP_DEFAULTS["alignments"])[number];
}

export type ButtonGroupVariables = Prefer<
  ButtonGroupVariablesOverrides,
  ButtonGroupVariablesDefaults
>;

export type ButtonGroupModifierProps = Partial<{
  align: ButtonGroupVariables["alignments"];
  hasAddons: boolean;
}>;

export type ButtonGroupProps = HelpersProps & ButtonGroupModifierProps;

export const ButtonGroup = forwardRefAs<HTMLDivElement, ButtonGroupProps>(
  ({ align, className, hasAddons, ...rest }, ref) => (
    <Generic
      className={classNames(
        "buttons",
        {
          "has-addons": hasAddons,
          [`is-${[align]}`]: align,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

ButtonGroup.displayName = "Button.Group";
ButtonGroup.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasAddons: PropTypes.bool,
};
