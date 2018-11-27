import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { ModifierProps } from "modifiers";

export type TableModifierProps = Partial<{
  bordered: boolean;
  children: React.ReactNode;
  className: string;
  size: "fullwidth" | "narrow";
  striped: boolean;
  style: React.CSSProperties;
}>;

export type TableProps = ModifierProps &
  TableModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"table">, "unselectable">>;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, size, striped, bordered, ...props }, ref) => (
    <Element
      renderAs="table"
      {...props}
      ref={ref}
      className={cx("table", className, {
        [`is-${size}`]: size,
        "is-bordered": bordered,
        "is-striped": striped,
      })}
    >
      {children}
    </Element>
  ),
);
Table.defaultProps = {
  bordered: false,
  children: null,
  size: "fullwidth",
  striped: true,
};
