import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps, modify } from "@/modifiers";
import { NavbarContext } from "./navbar-context";

export type NavbarBurgerProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarBurger = React.forwardRef<HTMLDivElement, NavbarBurgerProps>(
  (props, ref) => {
    const { className, style, onClick, ...rest } = modify(props);
    return (
      <NavbarContext.Consumer>
        {({ active, setActive }) => (
          <Element
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
          </Element>
        )}
      </NavbarContext.Consumer>
    );
  },
);
