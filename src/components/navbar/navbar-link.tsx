import classNames from "classNames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import {
  NavbarItemContext,
  NavbarItemContextValue,
} from "./navbar-item-context";

export type NavbarLinkModifierProps = Partial<{
  arrowless: boolean;
  onClick: React.MouseEventHandler;
}>;

export type NavbarLinkProps = HelpersProps & NavbarLinkModifierProps;

const propTypes = {
  arrowless: PropTypes.bool,
  onClick: PropTypes.func,
};

const handleOnClick = (
  onClick: NavbarLinkProps["onClick"] | undefined,
  ctx: NavbarItemContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  ctx.setActive(!ctx.active);
};

export const NavbarLink = Object.assign(
  forwardRefAs<NavbarLinkProps, "span">(
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
  ),
  { propTypes },
);
