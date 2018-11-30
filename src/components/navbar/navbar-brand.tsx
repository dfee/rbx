import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type NavbarBrandProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <Element {...rest} ref={ref} className={cx("navbar-brand", className)} />
    );
  },
);
