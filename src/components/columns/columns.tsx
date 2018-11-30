import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Breakpoints } from "@/modifiers/responsive";
import { Column } from "./column";

type ColumnsModifierProps = Partial<{
  /*
   * Breakpoint where columns become stacked.
   */
  breakpoint: Breakpoints;
  /*
   * `true` you want the columns inside to be horizontaly centered
   */
  centered: boolean;
  children: React.ReactNode;
  className: string;
  /*
   * `true` to remove space between columns
   */
  gapless: boolean;
  /*
   * `true` if you want to use more than one line if you add more column
   * elements that would fit in a single row.
   */
  multiline: boolean;
}>;

export type ColumnsProps = ModifierProps & ColumnsModifierProps;

export const Columns = Object.assign(
  asExoticComponent<ColumnsProps, "div">((props, ref) => {
    const { as, breakpoint, centered, gapless, multiline, ...rest } = modify(
      props,
    );
    rest.className = cx("columns", rest.className, {
      [`is-${breakpoint}`]: breakpoint,
      "is-centered": centered,
      "is-gapless": gapless,
      "is-multiline": multiline,
    });
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
