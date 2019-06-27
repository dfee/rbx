import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const CONTROL_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ControlVariablesOverrides {}

export interface ControlVariablesDefaults {
  sizes: (typeof CONTROL_DEFAULTS["sizes"])[number];
}

export type ControlVariables = Prefer<
  ControlVariablesOverrides,
  ControlVariablesDefaults
>;

export type ControlModifierProps = {
  expanded?: boolean;
  iconLeft?: boolean;
  iconRight?: boolean;
  loading?: boolean;
  size?: ControlVariables["sizes"];
};

export type ControlProps = HelpersProps & ControlModifierProps;

export const Control = Object.assign(
  forwardRefAs<ControlProps>(
    (
      { className, expanded, iconLeft, iconRight, loading, size, ...rest },
      ref,
    ) => (
      <Generic
        ref={ref}
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
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    DEFAULTS: CONTROL_DEFAULTS,
  },
);

Control.displayName = "Control";
Control.propTypes = {
  expanded: PropTypes.bool,
  iconLeft: PropTypes.bool,
  iconRight: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
