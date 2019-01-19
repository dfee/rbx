import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const COLUMN_GROUP_DEFAULTS = {
  gapSizes: tuple(0, 1, 2, 3, 4, 5, 6, 7, 8),
};

export interface ColumnGroupVariablesOverrides {}

export interface ColumnGroupVariablesDefaults {
  gapSizes: (typeof COLUMN_GROUP_DEFAULTS["gapSizes"])[number];
}

export type ColumnGroupVariables = Prefer<
  ColumnGroupVariablesOverrides,
  ColumnGroupVariablesDefaults
>;

export type ColumnGroupBreakpointOptions = Partial<{
  /**
   * The column gap size for a breakapoint
   */
  gapSize: ColumnGroupVariables["gapSizes"];
}>;

type ColumnGroupModifierProps = Partial<
  { [B in Variables["breakpoints"]]: ColumnGroupBreakpointOptions } & {
    /**
     * Breakpoint where columns become stacked.
     */
    breakpoint: Variables["breakpoints"];
    /**
     * `true` you want the columns inside to be horizontaly centered
     */
    centered: boolean;
    /**
     * `true` to remove space between columns
     */
    gapless: boolean;
    /**
     * `true` if you want to use more than one line if you add more column
     * elements that would fit in a single row.
     */
    multiline: boolean;
    /**
     * `true` if you want the columns to be vertically centered.
     */
    vcentered: boolean;
  } & ColumnGroupBreakpointOptions
>;

export type ColumnGroupProps = HelpersProps & ColumnGroupModifierProps;

export const ColumnGroup = forwardRefAs<ColumnGroupProps>(
  (
    {
      className,
      breakpoint,
      centered,
      desktop,
      fullhd,
      gapless,
      gapSize,
      mobile,
      multiline,
      tablet,
      widescreen,
      touch,
      vcentered,
      ...rest
    },
    ref,
  ) => {
    const breakpoints = {
      desktop,
      fullhd,
      mobile,
      tablet,
      touch,
      widescreen,
    };

    const gapSizeClassNames = classNames(
      { [`is-${gapSize}`]: typeof gapSize === "number" },
      Object.keys(breakpoints)
        .map(key => {
          const value = breakpoints[key as Variables["breakpoints"]];

          return value === undefined
            ? {}
            : { [`is-${value.gapSize}-${key}`]: value.gapSize !== undefined };
        })
        .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
    );

    return (
      <Generic
        className={classNames(
          "columns",
          {
            [`is-${breakpoint}`]: breakpoint,
            "is-centered": centered,
            "is-gapless": gapless,
            "is-multiline": multiline,
            "is-variable ": gapSizeClassNames !== "",
            "is-vcentered": vcentered,
          },
          gapSizeClassNames,
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
  { as: "div" },
);

ColumnGroup.displayName = "Column.Group";

const ColumnGroupBreakpointPropTypes = {
  gapSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/**
 * Note: the default Breakpoints are typechecked (as it'll cover 99%+ of users)
 * We can't validate custom Breakpoints with PropTypes (though they are checked
 * by TypeScript).
 * ∴ Custom breakpoint's won't be checked against ColumnGroupBreakpointPropTypes
 */
ColumnGroup.propTypes = {
  ...DEFAULTS.breakpoints
    .map(breakpoint => ({
      [breakpoint]: PropTypes.shape(ColumnGroupBreakpointPropTypes),
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ...ColumnGroupBreakpointPropTypes,
  breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  centered: PropTypes.bool,
  gapless: PropTypes.bool,
  multiline: PropTypes.bool,
  vcentered: PropTypes.bool,
};
