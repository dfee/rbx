import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { NavbarContext } from "./navbar-context";

export type NavbarBurgerModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
  style: React.CSSProperties;
}>;

export type NavbarBurgerProps = HelpersProps & NavbarBurgerModifierProps;

const propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export const NavbarBurger = Object.assign(
  forwardRefAs<NavbarBurgerProps, "div">(
    ({ className, style, onClick, ...rest }, ref) => (
      <NavbarContext.Consumer>
        {({ active, setActive }) => (
          <Generic
            className={classNames(
              "navbar-burger",
              { "is-active": active },
              className,
            )}
            onClick={(event: React.MouseEvent) => {
              if (onClick) {
                onClick(event);
              }
              setActive(!active);
            }}
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
    ),
    { as: "div" },
  ),
  { propTypes },
);
