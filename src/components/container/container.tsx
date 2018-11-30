import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Breakpoints } from "@/modifiers/responsive";

export type ContainerModifierProps = Partial<{
  breakpoint: Breakpoints;
  children: React.ReactNode;
  fluid: boolean;
}>;

export type ContainerProps = ModifierProps & ContainerModifierProps;

export const Container = asExoticComponent<ContainerProps, "div">(
  (props, ref) => {
    const { as, fluid, breakpoint, ...rest } = transformModifiers(props);
    rest.className = cx("container", rest.className, {
      "is-fluid": fluid,
      [`is-${breakpoint}`]: breakpoint,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);

Container.defaultProps = Object.assign(
  { fluid: false },
  Container.defaultProps,
);
