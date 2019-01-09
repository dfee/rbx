import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";
import { tuple } from "../../utils";

export const COLUMN_SIZES = tuple(
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
);
export type ColumnSizes = (typeof COLUMN_SIZES)[number];

export type ColumnSizeModifierProps = Partial<{
  /**
   * If you want a column to only take the space it needs, use the narrow
   * modifier. The other column(s) will fill up the remaining space.
   */
  narrow: boolean;
  /**
   * Create horizontal space around Column elements
   */
  offset: ColumnSizes;
  /**
   * The size of the column. the maximun size of a row is 12
   */
  size: ColumnSizes;
}>;

const ColumnSizeModifierPropTypes = {
  narrow: PropTypes.bool,
  offset: PropTypes.oneOf(COLUMN_SIZES),
  size: PropTypes.oneOf(COLUMN_SIZES),
};

export type ColumnModifierProps = Partial<
  { [B in Variables["Breakpoints"]]: ColumnSizeModifierProps } &
    ColumnSizeModifierProps
>;

export type ColumnProps = HelpersProps & ColumnModifierProps;

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
                  breakpoints[breakpoint as Variables["Breakpoints"]];

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
  { propTypes },
);
