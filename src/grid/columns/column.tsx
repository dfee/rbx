import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { DEFAULTS, Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

import { ColumnGroup } from "./column-group";

export const COLUMN_DEFAULTS = {
  sizes: [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    "one-third",
    "two-thirds",
    "one-quarter",
    "half",
    "three-quarters",
    "one-fifth",
    "two-fifths",
    "three-fifths",
    "four-fifths",
    "full",
  ] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ColumnVariablesOverrides {}

export interface ColumnVariablesDefaults {
  sizes: (typeof COLUMN_DEFAULTS["sizes"])[number];
}

export type ColumnVariables = Prefer<
  ColumnVariablesOverrides,
  ColumnVariablesDefaults
>;

export type ColumnBreakpointOptions = {
  /**
   * If you want a column to only take the space it needs, use the narrow
   * modifier. The other column(s) will fill up the remaining space.
   */
  narrow?: boolean;
  /**
   * Create horizontal space around Column elements
   */
  offset?: ColumnVariables["sizes"];
  /**
   * The size of the column. the maximun size of a row is 12
   */
  size?: ColumnVariables["sizes"];
};

export type ColumnModifierProps = {
  [B in Variables["breakpoints"]]?: ColumnBreakpointOptions;
} &
  ColumnBreakpointOptions;

export type ColumnProps = HelpersProps & ColumnModifierProps;

export const Column = Object.assign(
  forwardRefAs<ColumnProps>(
    (
      {
        className,
        mobile,
        tablet,
        desktop,
        widescreen,
        fullhd,
        touch,
        narrow,
        offset,
        size,
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

      return (
        <Generic
          ref={ref}
          className={classNames(
            "column",
            {
              [`is-${size}`]: size !== undefined,
              [`is-offset-${offset}`]: offset !== undefined,
              "is-narrow": narrow,
            },
            Object.keys(breakpoints)
              .map(breakpoint => {
                const value =
                  breakpoints[breakpoint as Variables["breakpoints"]];

                return value === undefined
                  ? {}
                  : {
                      [`is-${value.size}-${breakpoint}`]:
                        value.size !== undefined,
                      [`is-narrow-${breakpoint}`]: value.narrow,
                      [`is-offset-${value.offset}-${breakpoint}`]:
                        value.offset !== undefined,
                    };
              })
              .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
            className,
          )}
          {...rest}
        />
      );
    },
    { as: "div" },
  ),
  {
    DEFAULTS: COLUMN_DEFAULTS,
    Group: ColumnGroup,
  },
);

Column.displayName = "Column";

const ColumnSizeModifierPropTypes = {
  narrow: PropTypes.bool,
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/**
 * Note: the default Breakpoints are typechecked (as it'll cover 99%+ of users)
 * We can't validate custom Breakpoints with PropTypes (though they are checked
 * by TypeScript).
 * ∴ Custom breakpoint's won't be checked against ColumnSizeModifierPropTypes
 */
Column.propTypes = {
  ...DEFAULTS.breakpoints
    .map(breakpoint => ({
      [breakpoint]: PropTypes.shape(ColumnSizeModifierPropTypes),
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ...ColumnSizeModifierPropTypes,
};
