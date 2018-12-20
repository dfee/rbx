import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { NavbarItemContext } from "./navbar-item-context";

export type NavbarLinkModifierProps = Partial<{
  arrowless: boolean;
  onClick: React.MouseEventHandler<any>;
}>;

export type NavbarLinkProps = HelpersProps & NavbarLinkModifierProps;

const propTypes = {
  ...genericPropTypes,
  arrowless: PropTypes.bool,
  onClick: PropTypes.func,
};

export const NavbarLink = Object.assign(
  forwardRefAs<NavbarLinkProps, "span">(
    (props, ref) => {
      const { as, arrowless, onClick, ...rest } = transformHelpers(props);
      rest.className = classNames("navbar-link", rest.className, {
        "is-arrowless": arrowless,
      });
      return (
        <NavbarItemContext.Consumer>
          {({ active, setActive }) => {
            return React.createElement(as!, {
              onClick: (event: React.MouseEvent<any>) => {
                if (onClick) {
                  onClick(event);
                }
                setActive(!active);
              },
              ref,
              ...rest,
            });
          }}
        </NavbarItemContext.Consumer>
      );
    },
    { as: "span" },
  ),
  { propTypes },
);
