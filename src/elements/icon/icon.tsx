import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

export const ICON_DEFAULTS = {
  alignments: ["left", "right"] as const,
  sizes: ["small", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IconVariablesOverrides {}

export interface IconVariablesDefaults {
  alignments: (typeof ICON_DEFAULTS["alignments"])[number];
  sizes: (typeof ICON_DEFAULTS["sizes"])[number];
}

export type IconVariables = Prefer<
  IconVariablesOverrides,
  IconVariablesDefaults
>;

export type IconModifierProps = {
  align?: IconVariables["alignments"];
  color?: Variables["colors"];
  size?: IconVariables["sizes"];
};

export type IconProps = HelpersProps & IconModifierProps;

export const Icon = Object.assign(
  forwardRefAs<IconProps>(
    ({ align, className, color, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "icon",
          {
            [`has-text-${color}`]: color,
            [`is-${align}`]: align,
            [`is-${size}`]: size,
          },
          className,
        )}
        {...rest}
      />
    ),
    { as: "span" },
  ),
  {
    DEFAULTS: ICON_DEFAULTS,
  },
);

Icon.displayName = "Icon";
Icon.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
