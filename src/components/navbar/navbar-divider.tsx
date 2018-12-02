import { cx } from "emotion";
import React from "react";

import { Generic } from "@/extras/generic";
import { ModifierProps } from "@/modifiers";

export type NavbarDividerProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarDivider = React.forwardRef<
  HTMLDivElement,
  NavbarDividerProps
>(({ className, ...props }, ref) => (
  <Generic {...props} ref={ref} className={cx("navbar-divider", className)} />
));
