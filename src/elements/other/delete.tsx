import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { tuple } from "../../utils";

export const DELETE_SIZES = tuple("small", "medium", "large");
export type DeleteSizes = (typeof DELETE_SIZES)[number];

export type DeleteModifierProps = Partial<{
  size: DeleteSizes;
}>;

export type DeleteProps = HelpersProps & DeleteModifierProps;

const propTypes = {
  ...genericPropTypes,
  size: PropTypes.oneOf(DELETE_SIZES),
};

export const Delete = Object.assign(
  forwardRefAs<DeleteProps, "a">(
    (props, ref) => {
      const { as, size, ...rest } = transformHelpers(props);
      rest.className = classNames("delete", rest.className, {
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "a" },
  ),
  { propTypes },
);
