import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { NavbarContext } from "./navbar-context";

export type NavbarBurgerModifierProps = Partial<{
  className: string;
  onClick: React.MouseEventHandler<any>;
  style: React.CSSProperties;
}>;

export type NavbarBurgerProps = ModifierProps & NavbarBurgerModifierProps;

export const NavbarBurger = forwardRefAs<NavbarBurgerProps, "div">(
  (props, ref) => {
    return (
      <NavbarContext.Consumer>
        {({ active, setActive }) => {
          const { as, style, onClick, ...rest } = transformModifiers(props);
          rest.className = classNames("navbar-burger", rest.className, {
            "is-active": active,
          });
          return React.createElement(as!, {
            children: (
              <React.Fragment>
                <span />
                <span />
                <span />
              </React.Fragment>
            ),
            onClick: (event: React.MouseEvent) => {
              if (onClick) {
                onClick(event);
              }
              setActive(!active);
            },
            ref,
            role: "button",
            style: { outline: "none", ...style },
            tabIndex: 0,
            ...rest,
          });
        }}
      </NavbarContext.Consumer>
    );
  },
  { as: "div" },
);
