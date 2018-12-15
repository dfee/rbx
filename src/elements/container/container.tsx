import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Breakpoints } from "../../base/helpers";

export type ContainerModifierProps = Partial<{
  breakpoint: Breakpoints;
  className: string;
  fluid: boolean;
}>;

export type ContainerProps = HelpersProps & ContainerModifierProps;

export const Container = forwardRefAs<ContainerProps, "div">(
  (props, ref) => {
    const { as, fluid, breakpoint, ...rest } = transformHelpers(props);
    rest.className = classNames("container", rest.className, {
      "is-fluid": fluid,
      [`is-${breakpoint}`]: breakpoint,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
