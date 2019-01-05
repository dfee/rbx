import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { NavbarContext, NavbarContextValue } from "./navbar-context";

export type NavbarBurgerModifierProps = Partial<{
  onClick: React.MouseEventHandler;
  style: React.CSSProperties;
}>;

export type NavbarBurgerProps = HelpersProps & NavbarBurgerModifierProps;

const propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};

const onClickHandler = (
  onClick: NavbarBurgerProps["onClick"] | undefined,
  ctx: NavbarContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  ctx.setActive(!ctx.active);
};

export const NavbarBurger = Object.assign(
  forwardRefAs<NavbarBurgerProps, "div">(
    ({ className, style, onClick, ...rest }, ref) => (
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
