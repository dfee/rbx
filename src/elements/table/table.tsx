import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type TableModifierProps = Partial<{
  bordered: boolean;
  fullwidth: boolean;
  hoverable: boolean;
  narrow: boolean;
  striped: boolean;
}>;

export type TableProps = HelpersProps & TableModifierProps;

const propTypes = {
  bordered: PropTypes.bool,
  fullwidth: PropTypes.bool,
  hoverable: PropTypes.bool,
  narrow: PropTypes.bool,
  striped: PropTypes.bool,
};

export const Table = Object.assign(
  forwardRefAs<TableProps, "table">(
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
  { propTypes },
);
