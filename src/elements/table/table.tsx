import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { TableBody } from "./table-body";
import { TableCell } from "./table-cell";
import { TableFoot } from "./table-foot";
import { TableHead } from "./table-head";
import { TableHeading } from "./table-heading";
import { TableRow } from "./table-row";

export type TableModifierProps = Partial<{
  bordered: boolean;
  fullwidth: boolean;
  hoverable: boolean;
  narrow: boolean;
  striped: boolean;
}>;

export type TableProps = HelpersProps & TableModifierProps;

export const Table = Object.assign(
  forwardRefAs<HTMLTableElement, TableProps>(
    (
      { bordered, className, fullwidth, hoverable, narrow, striped, ...rest },
      ref,
    ) => (
      <Generic
        className={classNames(
          "table",
          {
            "is-bordered": bordered,
            "is-fullwidth": fullwidth,
            "is-hoverable": hoverable,
            "is-narrow": narrow,
            "is-striped": striped,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "table" },
  ),
  {
    Body: TableBody,
    Cell: TableCell,
    Foot: TableFoot,
    Head: TableHead,
    Heading: TableHeading,
    Row: TableRow,
  },
);

Table.displayName = "Table";
Table.propTypes = {
  bordered: PropTypes.bool,
  fullwidth: PropTypes.bool,
  hoverable: PropTypes.bool,
  narrow: PropTypes.bool,
  striped: PropTypes.bool,
};
