import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const ICON_DEFAULTS = {
  alignments: tuple("left", "right"),
  sizes: tuple("small", "medium", "large"),
};

export interface IconVariablesOverrides {}

export interface IconVariablesDefaults {
  alignments: (typeof ICON_DEFAULTS["alignments"])[number];
  sizes: (typeof ICON_DEFAULTS["sizes"])[number];
}

export type IconVariables = Prefer<
  IconVariablesOverrides,
  IconVariablesDefaults
>;

export type IconModifierProps = Partial<{
  align: IconVariables["alignments"];
  color: Variables["colors"];
  size: IconVariables["sizes"];
}>;

export type IconProps = HelpersProps & IconModifierProps;

export const Icon = forwardRefAs<IconProps, "span">(
  ({ align, className, color, size, ...rest }, ref) => (
    <Generic
      className={classNames(
        "icon",
        {
          [`has-text-${color}`]: color,
          [`is-${align}`]: align,
          [`is-${size}`]: size,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);

Icon.displayName = "Icon";
Icon.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
