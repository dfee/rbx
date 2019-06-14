import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import {
  NavbarItemContext,
  NavbarItemContextValue,
} from "./navbar-item-context";

export type NavbarLinkModifierProps = {
  arrowless?: boolean;
  onClick?: React.MouseEventHandler;
};

export type NavbarLinkProps = HelpersProps & NavbarLinkModifierProps;

const handleOnClick = (
  onClick: NavbarLinkProps["onClick"] | undefined,
  ctx: NavbarItemContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  ctx.setActive(!ctx.active);
};

export const NavbarLink = forwardRefAs<NavbarLinkProps>(
  ({ arrowless, className, onClick, ...rest }, ref) => (
    <NavbarItemContext.Consumer>
      {ctx => (
        <Generic
          className={classNames(
            "navbar-link",
            { "is-arrowless": arrowless },
            className,
          )}
          onClick={handleOnClick(onClick, ctx)}
          ref={ref}
          {...rest}
        />
      )}
    </NavbarItemContext.Consumer>
  ),
  { as: "span" },
);

NavbarLink.displayName = "Navbar.Link";
NavbarLink.propTypes = {
  arrowless: PropTypes.bool,
  onClick: PropTypes.func,
};
