import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type TableRowHelperProps = {
  selected?: boolean;
};

export type TableRowProps = HelpersProps & TableRowHelperProps;

export const TableRow = forwardRefAs<TableRowProps>(
  ({ className, selected, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames({ "is-selected": selected }, className)}
      {...rest}
    />
  ),
  { as: "tr" },
);

TableRow.displayName = "Table.Row";
TableRow.propTypes = {
  selected: PropTypes.bool,
};
