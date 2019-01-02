import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { NavbarItemContext } from "./navbar-item-context";

export type NavbarLinkModifierProps = Partial<{
  arrowless: boolean;
  onClick: React.MouseEventHandler<any>;
}>;

export type NavbarLinkProps = HelpersProps & NavbarLinkModifierProps;

const propTypes = {
  arrowless: PropTypes.bool,
  onClick: PropTypes.func,
};

export const NavbarLink = Object.assign(
  forwardRefAs<NavbarLinkProps, "span">(
    ({ arrowless, className, onClick, ...rest }, ref) => (
      <NavbarItemContext.Consumer>
        {({ active, setActive }) => (
          <Generic
            className={classNames(
              "navbar-link",
              { "is-arrowless": arrowless },
              className,
            )}
            onClick={(event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              setActive(!active);
            }}
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
