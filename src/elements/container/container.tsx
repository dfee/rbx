import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";

export type ContainerModifierProps = Partial<{
  breakpoint: Variables["Breakpoints"];
  fluid: boolean;
}>;

export type ContainerProps = HelpersProps & ContainerModifierProps;

const propTypes = {
  breakpoint: PropTypes.oneOf(DEFAULTS.breakpoints),
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
