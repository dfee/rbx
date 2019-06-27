import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";

export type ContainerModifierProps = {
  breakpoint?: Variables["breakpoints"];
  fluid?: boolean;
};

export type ContainerProps = HelpersProps & ContainerModifierProps;

export const Container = forwardRefAs<ContainerProps>(
  ({ className, fluid, breakpoint, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames(
        "container",
        {
          [`is-${breakpoint}`]: breakpoint,
          "is-fluid": fluid,
        },
        className,
      )}
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
