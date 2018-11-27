import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { classNames, clean, ModifierProps } from "modifiers";
import { NavbarContext } from "./navbar-context";

export type NavbarBurgerModifierProps = Partial<{
  className: string;
  style: React.CSSProperties;
}>;

export type NavbarBurgerProps = ModifierProps &
  NavbarBurgerModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"div">, "unselectable">>;

export const NavbarBurger = React.forwardRef<HTMLDivElement, NavbarBurgerProps>(
  ({ style, className, onClick, ...allProps }, ref) => {
    const props = clean(allProps);
    return (
      <NavbarContext.Consumer>
        {({ active, setActive }) => (
          <Element
            ref={ref}
            role="button"
            tabIndex="0"
            style={{ outline: "none", ...style }}
            className={cx("navbar-burger", classNames(allProps), className, {
              "is-active": active,
            })}
            onClick={() => setActive(!active)}
            {...props}
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
