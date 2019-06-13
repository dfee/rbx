import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { DEFAULTS, Variables } from "../../base/helpers/variables";

export const TOOLTIP_DEFAULTS = {
  positions: ["top", "right", "bottom", "left"],
} as const;

export type TooltipModifierProps = Partial<{
  tooltipActive: boolean;
  tooltipColor: Variables["colors"];
  tooltipContent: number | string;
  tooltipMultiline: boolean;
  tooltipPosition: (typeof TOOLTIP_DEFAULTS["positions"])[number];
  tooltipResponsive: {
    [K in Variables["breakpoints"]]?: (typeof TOOLTIP_DEFAULTS["positions"])[number];
  };
}>;

export type TooltipProps = HelpersProps & TooltipModifierProps;

export const Tooltip = forwardRefAs<TooltipProps>(
  (
    {
      className,
      tooltipActive,
      tooltipColor,
      tooltipContent,
      tooltipMultiline,
      tooltipPosition,
      tooltipResponsive = {},
      ...rest
    },
    ref,
  ) => (
    <Generic
      className={classNames(
        "tooltip",
        {
          "is-tooltip-active": tooltipActive,
          [`is-tooltip-${tooltipColor}`]: tooltipColor,
          "is-tooltip-multiline": tooltipMultiline,
          [`is-tooltip-${tooltipPosition}`]: tooltipPosition,
        },
        ...Object.keys(tooltipResponsive).map(
          breakpoint =>
            `is-tooltip-${tooltipResponsive[breakpoint]}-${breakpoint}`,
        ),
        className,
      )}
      data-tooltip={tooltipContent}
      ref={ref}
      {...rest}
    />
  ),
  {
    as: "span",
    tooltipContent: "",
  },
);

Tooltip.displayName = "Tooltip";
Tooltip.propTypes = {
  tooltipActive: PropTypes.bool,
  tooltipColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltipContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltipMultiline: PropTypes.bool,
  tooltipPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltipResponsive: PropTypes.shape(
    DEFAULTS.breakpoints
      .map(breakpoint => ({
        [breakpoint]: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }))
      .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ),
};
