import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type TableHeadingProps = HelpersProps;

export const TableHeading = forwardRefAs<TableHeadingProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "th" },
);

TableHeading.displayName = "Table.Heading";
