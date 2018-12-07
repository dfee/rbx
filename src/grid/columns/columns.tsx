import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Breakpoints } from "@/modifiers/responsive";
import { tuple } from "@/utils";
import { Column } from "./column";

export const COLUMNS_GAP_SIZES = tuple(0, 1, 2, 3, 4, 5, 6, 7, 8);
export type ColumnsGapSizes = (typeof COLUMNS_GAP_SIZES)[number];

export type ColumnsGapSizeModifierProps = Partial<{
  /**
   * The column gap size for Tablet devices (Between 769px and 1023px)
   */
  gapSize: ColumnsGapSizes;
}>;

type ColumnsModifierProps = Partial<
  {
    /**
     * Breakpoint where columns become stacked.
     */
    breakpoint: Breakpoints;
    /**
     * `true` you want the columns inside to be horizontaly centered
     */
    centered: boolean;
    children: React.ReactNode;
    className: string;
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
     * The column gap size for Mobile devices (Up to 768px)
     */
    mobile: ColumnsGapSizeModifierProps;
    /**
     * The column gap size for Tablet devices (Between 769px and 1023px)
     */
    tablet: ColumnsGapSizeModifierProps;
    /**
     * The column gap size for Desktop devices (Between 1024 and 1215px)
     */
    desktop: ColumnsGapSizeModifierProps;
    /**
     * The column gap size for WideScreen devices (Between 1216px and 1407px)
     */
    widescreen: ColumnsGapSizeModifierProps;
    /**
     * The column gap size for FullHD devices (1408px and above)
     */
    fullhd: ColumnsGapSizeModifierProps;
  } & ColumnsGapSizeModifierProps
>;

export type ColumnsProps = ModifierProps & ColumnsModifierProps;

export const Columns = Object.assign(
  forwardRefAs<ColumnsProps, "div">((props, ref) => {
    const {
      as,
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
      ...rest
    } = transformModifiers(props);

    const gapSizeClassNames = cx(
      { [`is-${gapSize}`]: typeof gapSize === "number" },
      Object.entries({
        desktop,
        fullhd,
        mobile,
        tablet,
        widescreen,
      })
        .filter(([key, value]) => value && typeof value.gapSize === "number")
        .map(([key, value]) => ({ [`is-${value!.gapSize}-${key}`]: true }))
        .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
    );

    rest.className = cx(
      "columns",
      rest.className,
      {
        [`is-${breakpoint}`]: breakpoint,
        "is-centered": centered,
        "is-gapless": gapless,
        "is-multiline": multiline,
        "is-variable ": !!gapSizeClassNames,
        [`is-${gapSize}`]: typeof gapSize === "number",
      },
      gapSizeClassNames,
    );

    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  { Column },
);

Columns.defaultProps = Object.assign(
  {
    centered: false,
    gapless: false,
    multiline: true,
  },
  Columns.defaultProps,
);
