import { cx } from "emotion";
import React from "react";

import { Generic } from "@/extras/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { NavbarContext } from "./navbar-context";

export type NavbarBurgerProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarBurger = React.forwardRef<HTMLDivElement, NavbarBurgerProps>(
  (props, ref) => {
    const { className, style, onClick, ...rest } = transformModifiers(props);
    return (
      <NavbarContext.Consumer>
        {({ active, setActive }) => (
          <Generic
            className={cx("navbar-burger", className, {
              "is-active": active,
            })}
            onClick={() => setActive(!active)}
            ref={ref}
            role="button"
            style={{ outline: "none", ...style }}
            tabIndex={0}
            {...rest}
          >
            <span />
            <span />
            <span />
          </Generic>
        )}
      </NavbarContext.Consumer>
    );
  },
);
