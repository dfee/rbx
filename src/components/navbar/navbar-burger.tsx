import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { NavbarContext, NavbarContextValue } from "./navbar-context";

export type NavbarBurgerModifierProps = {
  onClick?: React.MouseEventHandler;
};

export type NavbarBurgerProps = HelpersProps & NavbarBurgerModifierProps;

const onClickHandler = (
  onClick: NavbarBurgerProps["onClick"] | undefined,
  ctx: NavbarContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  ctx.setActive(!ctx.active);
};

export const NavbarBurger = forwardRefAs<NavbarBurgerProps>(
  ({ className, onClick, ...rest }, ref) => (
    <NavbarContext.Consumer>
      {ctx => (
        <Generic
          className={classNames(
            "navbar-burger",
            { "is-active": ctx.active },
            className,
          )}
          onClick={onClickHandler(onClick, ctx)}
          ref={ref}
          role="button"
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
);

NavbarBurger.displayName = "Navbar.Burger";
NavbarBurger.propTypes = {
  onClick: PropTypes.func,
};
