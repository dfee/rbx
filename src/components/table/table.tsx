import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type TableModifierProps = Partial<{
  bordered: boolean;
  children: React.ReactNode;
  className: string;
  size: "fullwidth" | "narrow";
  striped: boolean;
  style: React.CSSProperties;
}>;

export type TableProps = Prefer<
  ModifierProps & TableModifierProps,
  React.HTMLAttributes<HTMLTableElement>
>;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const { bordered, size, striped, ...rest } = props;
    rest.className = cx("table", rest.className, {
      [`is-${size}`]: size,
      "is-bordered": bordered,
      "is-striped": striped,
    });
    return <Element<"table"> as="table" ref={ref} {...rest} />;
  },
);

Table.defaultProps = {
  bordered: false,
  size: "fullwidth",
  striped: true,
};
