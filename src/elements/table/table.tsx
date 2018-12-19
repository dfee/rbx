import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type TableModifierProps = Partial<{
  bordered: boolean;
  fullwidth: boolean;
  hoverable: boolean;
  narrow: boolean;
  striped: boolean;
}>;

export type TableProps = HelpersProps & TableModifierProps;

const propTypes = {
  ...genericPropTypes,
  bordered: PropTypes.bool,
  fullwidth: PropTypes.bool,
  hoverable: PropTypes.bool,
  narrow: PropTypes.bool,
  striped: PropTypes.bool,
};

export const Table = Object.assign(
  forwardRefAs<TableProps, "table">(
    (props, ref) => {
      const {
        as,
        bordered,
        fullwidth,
        hoverable,
        narrow,
        striped,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("table", rest.className, {
        "is-bordered": bordered,
        "is-fullwidth": fullwidth,
        "is-hoverable": hoverable,
        "is-narrow": narrow,
        "is-striped": striped,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "table" },
  ),
  { propTypes },
);
