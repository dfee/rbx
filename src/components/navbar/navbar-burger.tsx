import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useCallback } from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { useNavbar } from "./navbar-context";

export type NavbarBurgerModifierProps = {
  onClick?: React.MouseEventHandler;
};

export type NavbarBurgerProps = HelpersProps & NavbarBurgerModifierProps;

export const NavbarBurger = forwardRefAs<NavbarBurgerProps>(
  ({ className, onClick, ...rest }, ref) => {
    const { active, setActive } = useNavbar();

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (onClick !== undefined) {
          onClick(event);
        }
        setActive(!active);
      },
      [active, onClick, setActive],
    );

    return (
      <Generic
        ref={ref}
        className={classNames(
          "navbar-burger",
          { "is-active": active },
          className,
        )}
        role="button"
        onClick={handleClick}
        {...rest}
      >
        <span />
        <span />
        <span />
      </Generic>
    );
  },
  { as: "div" },
);

NavbarBurger.displayName = "Navbar.Burger";
NavbarBurger.propTypes = {
  onClick: PropTypes.func,
};
