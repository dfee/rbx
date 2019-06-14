import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const CONTROL_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
};

export interface ControlVariablesOverrides {}

export interface ControlVariablesDefaults {
  sizes: (typeof CONTROL_DEFAULTS["sizes"])[number];
}

export type ControlVariables = Prefer<
  ControlVariablesOverrides,
  ControlVariablesDefaults
>;

export type ControlModifierProps = Partial<{
  expanded: boolean;
  iconLeft: boolean;
  iconRight: boolean;
  loading: boolean;
  size: ControlVariables["sizes"];
}>;

export type ControlProps = HelpersProps & ControlModifierProps;

export const Control = forwardRefAs<ControlProps>(
  (
    { className, expanded, iconLeft, iconRight, loading, size, ...rest },
    ref,
  ) => (
    <Generic
      className={classNames(
        "control",
        {
          "has-icons-left": iconLeft,
          "has-icons-right": iconRight,
          "is-expanded": expanded,
          "is-loading": loading,
          [`is-${size}`]: size,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

Control.displayName = "Control";
Control.propTypes = {
  expanded: PropTypes.bool,
  iconLeft: PropTypes.bool,
  iconRight: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
