import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type TableFootProps = HelpersProps;

export const TableFoot = forwardRefAs<TableFootProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "tfoot" },
);

TableFoot.displayName = "Table.Foot";
