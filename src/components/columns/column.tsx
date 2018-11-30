import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { ColumnSizes } from "./constants";

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

export type ColumnModifierProps = Partial<{
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
}>;

export type ColumnProps = ModifierProps &
  ColumnModifierProps &
  ColumnSizeModifierProps;

export const Column = forwardRefAs<ColumnProps, "div">((props, ref) => {
  const {
    as,
    desktop,
    fullhd,
    mobile,
    narrow,
    offset,
    size,
    tablet,
    widescreen,
    ...rest
  } = transformModifiers(props);

  const dimmensions = { mobile, tablet, desktop, widescreen, fullhd };
  const sizeClassNames = {
    [`is-${size}`]: !!size,
    [`is-offset-${offset}`]: !!offset,
    "is-narrow": !!narrow,
  };
  Object.keys(dimmensions).forEach(key => {
    const dimmension = dimmensions[key];
    Object.assign(sizeClassNames, {
      [`is-${dimmension.size}-${key}`]: !!dimmension.size,
      [`is-offset-${dimmension.offset}-${key}`]: !!dimmension.offset,
      "is-narrow-${key}": !!dimmension.narrow,
    });
  });
  rest.className = cx("column", rest.className, sizeClassNames);

  return React.createElement(as!, { ref, ...rest });
}, "div");

Column.defaultProps = Object.assign(
  {
    desktop: { narrow: false },
    fullhd: { narrow: false },
    mobile: { narrow: false },
    narrow: false,
    tablet: { narrow: false },
    widescreen: { narrow: false },
  },
  Column.defaultProps,
);

const MyColumn: React.FC<{}> = () => <div>asdf</div>;
export const MCI = <Column<typeof MyColumn> as={MyColumn} />;
