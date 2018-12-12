import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Breakpoints } from "@/modifiers/responsive";

export type ContainerModifierProps = Partial<{
  breakpoint: Breakpoints;
  className: string;
  fluid: boolean;
}>;

export type ContainerProps = ModifierProps & ContainerModifierProps;

export const Container = forwardRefAs<ContainerProps, "div">(
  (props, ref) => {
    const { as, fluid, breakpoint, ...rest } = transformModifiers(props);
    rest.className = classNames("container", rest.className, {
      "is-fluid": fluid,
      [`is-${breakpoint}`]: breakpoint,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
