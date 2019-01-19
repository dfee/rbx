import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";

export type ContainerModifierProps = Partial<{
  breakpoint: Variables["breakpoints"];
  fluid: boolean;
}>;

export type ContainerProps = HelpersProps & ContainerModifierProps;

export const Container = forwardRefAs<ContainerProps>(
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
);

Container.displayName = "Container";
Container.propTypes = {
  breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fluid: PropTypes.bool,
};
