import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Breakpoints, BREAKPOINTS } from "src/base/helpers";
import { tuple } from "src/utils";
import { Column } from "./column";

export const COLUMNS_GAP_SIZES = tuple(0, 1, 2, 3, 4, 5, 6, 7, 8);
export type ColumnsGapSizes = (typeof COLUMNS_GAP_SIZES)[number];

export type ColumnsBreakpointProps = Partial<{
  /**
   * The column gap size for Tablet devices (Between 769px and 1023px)
   */
  gapSize: ColumnsGapSizes;
}>;

const ColumnsBreakpointPropTypes = {
  gapSize: PropTypes.oneOf(COLUMNS_GAP_SIZES),
};

type ColumnsModifierProps = Partial<
  { [B in Breakpoints]: ColumnsBreakpointProps } & {
    /**
     * Breakpoint where columns become stacked.
     */
    breakpoint: Breakpoints;
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
  } & ColumnsBreakpointProps
>;

export type ColumnsProps = HelpersProps & ColumnsModifierProps;

const propTypes = {
  ...BREAKPOINTS.map(breakpoint => ({
    [breakpoint]: PropTypes.shape(ColumnsBreakpointPropTypes),
  })).reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ...ColumnsBreakpointPropTypes,
  breakpoint: PropTypes.oneOf(BREAKPOINTS),
  centered: PropTypes.bool,
  gapless: PropTypes.bool,
  multiline: PropTypes.bool,
};

export const Columns = Object.assign(
  forwardRefAs<ColumnsProps, "div">(
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
            const value = breakpoints[key as Breakpoints];

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
            },
            gapSizeClassNames,
            className,
          )}
          ref={ref}
          {...rest}
        />
      );
    },
    {
      as: "div",
      multiline: true,
    },
  ),
  {
    Column,
    propTypes,
  },
);
