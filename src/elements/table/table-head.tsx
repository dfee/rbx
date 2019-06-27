import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type TableHeadProps = HelpersProps;

export const TableHead = forwardRefAs<TableHeadProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "thead" },
);

TableHead.displayName = "Table.Head";
