import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type TableCellProps = HelpersProps;

export const TableCell = forwardRefAs<TableCellProps, "td">(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "td" },
);

TableCell.displayName = "Table.Cell";
