import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { Column } from "./column";

export const COLUMNS_DEFAULTS = {
  gapSizes: tuple(0, 1, 2, 3, 4, 5, 6, 7, 8),
};

export interface ColumnsVariablesOverrides {}

export interface ColumnsVariablesDefaults {
  gapSizes: (typeof COLUMNS_DEFAULTS["gapSizes"])[number];
}

export type ColumnsVariables = Prefer<
  ColumnsVariablesOverrides,
  ColumnsVariablesDefaults
>;

export type ColumnsBreakpointProps = Partial<{
  /**
   * The column gap size for Tablet devices (Between 769px and 1023px)
   */
  gapSize: ColumnsVariables["gapSizes"];
}>;

const ColumnsBreakpointPropTypes = {
  gapSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

type ColumnsModifierProps = Partial<
  { [B in Variables["Breakpoints"]]: ColumnsBreakpointProps } & {
    /**
     * Breakpoint where columns become stacked.
     */
    breakpoint: Variables["Breakpoints"];
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

/**
 * Note: the default Breakpoints are typechecked (as it'll cover 99%+ of users)
 * We can't validate custom Breakpoints with PropTypes (though they are checked
 * by TypeScript).
 * ∴ Custom breakpoint's won't be checked against ColumnsBreakpointPropTypes
 */
const propTypes = {
  ...DEFAULTS.breakpoints
    .map(breakpoint => ({
      [breakpoint]: PropTypes.shape(ColumnsBreakpointPropTypes),
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ...ColumnsBreakpointPropTypes,
  breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
            const value = breakpoints[key as Variables["Breakpoints"]];

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
