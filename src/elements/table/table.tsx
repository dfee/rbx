import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type TableModifierProps = Partial<{
  bordered: boolean;
  fullwidth: boolean;
  hoverable: boolean;
  narrow: boolean;
  striped: boolean;
}>;

export type TableProps = Prefer<
  ModifierProps & TableModifierProps,
  React.HTMLAttributes<HTMLTableElement>
>;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const {
      bordered,
      fullwidth,
      hoverable,
      narrow,
      striped,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("table", rest.className, {
      "is-bordered": bordered,
      "is-fullwidth": fullwidth,
      "is-hoverable": hoverable,
      "is-narrow": narrow,
      "is-striped": striped,
    });
    return <table ref={ref} {...rest} />;
  },
);
