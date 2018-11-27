import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Breakpoints } from "modifiers/responsives";
import { Column } from "./column";

type ColumnsModifierProps = Partial<{
  // Breakpoint where columns become stacked.
  breakpoint: Breakpoints;
  children: React.ReactNode;
  className: string;
  // `true` to remove space between columns
  gapless: boolean;
  // `true` if you want to use more than one line if you add more column elements that would fit in a single row.
  multiline: boolean;
  // `true` you want the columns inside to be horizontaly centered
  centered: boolean;
}>;

export type ColumnsProps = ModifierProps & ColumnsModifierProps;

export const Columns = Object.assign(
  renderAsExoticComponent<ColumnsProps, "div">(
    (
      { className, breakpoint, gapless, multiline, centered, ...props },
      ref,
    ) => (
      <Element
        {...props}
        ref={ref}
        className={cx(className, "columns", {
          [`is-${breakpoint}`]: breakpoint,
          "is-centered": centered,
          "is-gapless": gapless,
          "is-multiline": multiline,
        })}
      />
    ),
    "div",
  ),
  { Column },
);
Columns.defaultProps = {
  centered: false,
  children: null,
  gapless: false,
  multiline: true,
};
