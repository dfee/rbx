import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type TableCellModifierProps = {
  selected?: boolean;
  narrow?: boolean;
};

export type TableCellProps = HelpersProps & TableCellModifierProps;

export const TableCell = forwardRefAs<TableCellProps>(
  ({ selected, narrow, className, ...rest }, ref) => (
    <Generic
      className={classNames(className, {
        "is-selected": selected,
        "is-narrow": narrow,
      })}
      ref={ref}
      {...rest}
    />
  ),
  { as: "td" },
);

TableCell.displayName = "Table.Cell";
TableCell.propTypes = {
  selected: PropTypes.bool,
  narrow: PropTypes.bool,
};
