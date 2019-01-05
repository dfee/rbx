import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { tuple } from "src/utils";

export const DELETE_SIZES = tuple("small", "medium", "large");
export type DeleteSizes = (typeof DELETE_SIZES)[number];

export type DeleteModifierProps = Partial<{
  size: DeleteSizes;
}>;

export type DeleteProps = HelpersProps & DeleteModifierProps;

const propTypes = {
  size: PropTypes.oneOf(DELETE_SIZES),
};

export const Delete = Object.assign(
  forwardRefAs<DeleteProps, "a">(
    ({ className, size, ...rest }, ref) => (
      <Generic
        className={classNames("delete", { [`is-${size}`]: size }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "a" },
  ),
  { propTypes },
);
