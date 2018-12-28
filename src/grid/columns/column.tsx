import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Breakpoints, BREAKPOINTS } from "../../base/helpers";
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
  { [B in Breakpoints]: ColumnSizeModifierProps } & ColumnSizeModifierProps
>;

export type ColumnProps = HelpersProps & ColumnModifierProps;

const propTypes = {
  ...BREAKPOINTS.map(breakpoint => ({
    [breakpoint]: PropTypes.shape(ColumnSizeModifierPropTypes),
  })).reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ...ColumnSizeModifierPropTypes,
};

export const Column = Object.assign(
  forwardRefAs<ColumnProps, "div">(
    (props, ref) => {
      const {
        as,
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
      } = props;

      const breakpoints = {
        desktop,
        fullhd,
        mobile,
        tablet,
        touch,
        widescreen,
      };

      rest.className = classNames(
        "column",
        {
          [`is-${size}`]: !!size,
          [`is-offset-${offset}`]: !!offset,
          "is-narrow": narrow,
        },
        Object.keys(breakpoints)
          .filter(breakpoint => breakpoints[breakpoint])
          .map(breakpoint => {
            const value = breakpoints[breakpoint];
            return {
              [`is-${value.size}-${breakpoint}`]: !!value.size,
              [`is-narrow-${breakpoint}`]: value!.narrow,
              [`is-offset-${value.offset}-${breakpoint}`]: !!value.offset,
            };
          })
          .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
        rest.className,
      );

      return <Generic as={as!} ref={ref} {...rest} />;
    },
    { as: "div" },
  ),
  { propTypes },
);
