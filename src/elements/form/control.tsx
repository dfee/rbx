import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { tuple } from "src/utils";

export const CONTROL_SIZES = tuple("small", "medium", "large");
export type ControlSizes = (typeof CONTROL_SIZES)[number];

export type ControlModifierProps = Partial<{
  expanded: boolean;
  iconLeft: boolean;
  iconRight: boolean;
  loading: boolean;
  size: ControlSizes;
}>;

export type ControlProps = HelpersProps & ControlModifierProps;

const propTypes = {
  expanded: PropTypes.bool,
  iconLeft: PropTypes.bool,
  iconRight: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(CONTROL_SIZES),
};

export const Control = Object.assign(
  forwardRefAs<ControlProps, "div">(
    (
      { className, expanded, iconLeft, iconRight, loading, size, ...rest },
      ref,
    ) => (
      <Generic
        className={classNames(
          "control",
          {
            "has-icons-left": iconLeft,
            "has-icons-right": iconRight,
            "is-expanded": expanded,
            "is-loading": loading,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  { propTypes },
);
