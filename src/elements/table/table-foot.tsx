import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type TableFootProps = HelpersProps;

export const TableFoot = forwardRefAs<HTMLElement, TableFootProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "tfoot" },
);

TableFoot.displayName = "Table.Foot";
