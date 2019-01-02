import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type NavbarDropdownModifierProps = Partial<{
  boxed: boolean;
  right: boolean;
}>;

export type NavbarDropdownProps = HelpersProps & NavbarDropdownModifierProps;

const propTypes = {
  boxed: PropTypes.bool,
  right: PropTypes.bool,
};

export const NavbarDropdown = Object.assign(
  forwardRefAs<NavbarDropdownProps, "span">(
    ({ boxed, className, right, ...rest }, ref) => (
      <Generic
        className={classNames(
          "navbar-dropdown",
          {
            "is-boxed": boxed,
            "is-right": right,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "span" },
  ),
  { propTypes },
);
