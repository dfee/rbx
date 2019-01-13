import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { ColumnGroup } from "./column-group";

export const COLUMN_DEFAULTS = {
  sizes: tuple(
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
  ),
};

export interface ColumnVariablesOverrides {}

export interface ColumnVariablesDefaults {
  sizes: (typeof COLUMN_DEFAULTS["sizes"])[number];
}

export type ColumnVariables = Prefer<
  ColumnVariablesOverrides,
  ColumnVariablesDefaults
>;

export type ColumnSizeModifierProps = Partial<{
  /**
   * If you want a column to only take the space it needs, use the narrow
   * modifier. The other column(s) will fill up the remaining space.
   */
  narrow: boolean;
  /**
   * Create horizontal space around Column elements
   */
  offset: ColumnVariables["sizes"];
  /**
   * The size of the column. the maximun size of a row is 12
   */
  size: ColumnVariables["sizes"];
}>;

const ColumnSizeModifierPropTypes = {
  narrow: PropTypes.bool,
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export type ColumnModifierProps = Partial<
  { [B in Variables["breakpoints"]]: ColumnSizeModifierProps } &
    ColumnSizeModifierProps
>;

export type ColumnProps = HelpersProps & ColumnModifierProps;

/**
 * Note: the default Breakpoints are typechecked (as it'll cover 99%+ of users)
 * We can't validate custom Breakpoints with PropTypes (though they are checked
 * by TypeScript).
 * ∴ Custom breakpoint's won't be checked against ColumnSizeModifierPropTypes
 */
const propTypes = {
  ...DEFAULTS.breakpoints
    .map(breakpoint => ({
      [breakpoint]: PropTypes.shape(ColumnSizeModifierPropTypes),
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ...ColumnSizeModifierPropTypes,
};

export const Column = Object.assign(
  forwardRefAs<ColumnProps, "div">(
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
          ref={ref}
          {...rest}
        />
      );
    },
    { as: "div" },
  ),
  {
    Group: ColumnGroup,
    propTypes,
  },
);
