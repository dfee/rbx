import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type TableModifierProps = Partial<{
  bordered: boolean;
  className: string;
  fullwidth: boolean;
  hoverable: boolean;
  narrow: boolean;
  striped: boolean;
}>;

export type TableProps = ModifierProps & TableModifierProps;

export const Table = forwardRefAs<TableProps, "table">(
  (props, ref) => {
    const {
      as,
      bordered,
      fullwidth,
      hoverable,
      narrow,
      striped,
      ...rest
    } = transformModifiers(props);
    rest.className = classNames("table", rest.className, {
      "is-bordered": bordered,
      "is-fullwidth": fullwidth,
      "is-hoverable": hoverable,
      "is-narrow": narrow,
      "is-striped": striped,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "table" },
);
