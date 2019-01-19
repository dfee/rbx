import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type TableBodyProps = HelpersProps;

export const TableBody = forwardRefAs<TableBodyProps, "tbody">(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "tbody" },
);

TableBody.displayName = "Table.Body";
