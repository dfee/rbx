import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type TableModifierProps = Partial<{
  bordered: boolean;
  className: string;
  fullwidth: boolean;
  hoverable: boolean;
  narrow: boolean;
  striped: boolean;
}>;

export type TableProps = HelpersProps & TableModifierProps;

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
    } = transformHelpers(props);
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
