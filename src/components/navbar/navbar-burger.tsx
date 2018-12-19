import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { NavbarContext } from "./navbar-context";

export type NavbarBurgerModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
  style: React.CSSProperties;
}>;

export type NavbarBurgerProps = HelpersProps & NavbarBurgerModifierProps;

const propTypes = {
  ...genericPropTypes,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export const NavbarBurger = Object.assign(
  forwardRefAs<NavbarBurgerProps, "div">(
    (props, ref) => {
      return (
        <NavbarContext.Consumer>
          {({ active, setActive }) => {
            const { as, style, onClick, ...rest } = transformHelpers(props);
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
  ),
  { propTypes },
);
