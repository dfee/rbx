import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Breakpoints, BREAKPOINTS } from "../../base/helpers";

export type ContainerModifierProps = Partial<{
  breakpoint: Breakpoints;
  fluid: boolean;
}>;

export type ContainerProps = HelpersProps & ContainerModifierProps;

const propTypes = {
  breakpoint: PropTypes.oneOf(BREAKPOINTS),
  fluid: PropTypes.bool,
};

export const Container = Object.assign(
  forwardRefAs<ContainerProps, "div">(
    ({ className, fluid, breakpoint, ...rest }, ref) => (
      <Generic
        className={classNames(
          "container",
          {
            [`is-${breakpoint}`]: breakpoint,
            "is-fluid": fluid,
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
