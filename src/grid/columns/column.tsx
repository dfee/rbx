import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

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
  narrow?: boolean;
  /**
   * Create horizontal space around Column elements
   */
  offset?: ColumnSizes;
  /**
   * The size of the column. the maximun size of a row is 12
   */
  size?: ColumnSizes;
}>;

export type ColumnModifierProps = Partial<
  {
    className: string;
    /**
     * Size, Offset and Narrow props for Mobile devices (Up to 768px)
     */
    mobile: ColumnSizeModifierProps;
    /**
     * Size, Offset and Narrow props for Tablet devices (Between 769px and 1023px)
     */
    tablet: ColumnSizeModifierProps;
    /**
     * Size, Offset and Narrow props for Desktop devices (Between 1024px and
     * 1215px)
     */
    desktop: ColumnSizeModifierProps;
    /**
     * Size, Offset and Narrow props for WideScreen devices (Between 1216px and
     * 1407px)
     */
    widescreen: ColumnSizeModifierProps;
    /**
     * Size, Offset and Narrow props for FullHD devices (1408px and above)
     */
    fullhd: ColumnSizeModifierProps;
    /**
     * Size, Offset and Narrow props for Touch devices (Up to 1087px)
     */
    touch: ColumnSizeModifierProps;
  } & ColumnSizeModifierProps
>;

export type ColumnProps = ModifierProps & ColumnModifierProps;

export const Column = forwardRefAs<ColumnProps, "div">(
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
    } = transformModifiers(props);

    rest.className = classNames(
      "column",
      rest.className,
      {
        [`is-${size}`]: !!size,
        [`is-offset-${offset}`]: !!offset,
        "is-narrow": narrow,
      },
      Object.entries({
        desktop,
        fullhd,
        mobile,
        tablet,
        touch,
        widescreen,
      })
        .filter(([breakpoint, value]) => value)
        .map(([breakpoint, value]) => ({
          [`is-${value!.size}-${breakpoint}`]: !!value!.size,
          [`is-narrow-${breakpoint}`]: value!.narrow,
          [`is-offset-${value!.offset}-${breakpoint}`]: !!value!.offset,
        }))
        .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
    );

    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
