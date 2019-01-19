import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type TableCellProps = HelpersProps;

export const TableCell = forwardRefAs<TableCellProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "td" },
);

TableCell.displayName = "Table.Cell";
