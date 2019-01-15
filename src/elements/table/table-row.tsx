import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type TableRowHelperProps = Partial<{
  selected: boolean;
}>;

export type TableRowProps = HelpersProps & TableRowHelperProps;

const propTypes = {
  selected: PropTypes.bool,
};

export const TableRow = Object.assign(
  forwardRefAs<TableRowProps, "tr">(
    ({ className, selected, ...rest }, ref) => (
      <Generic
        className={classNames({ "is-selected": selected }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "tr" },
  ),
  { propTypes },
);
