import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const NAVBAR_DROPDOWN_DEFAULTS = {
  alignments: ["right"] as const,
};

export interface NavbarDropdownVariablesOverrides {}

export interface NavbarDropdownVariablesDefaults {
  alignments: (typeof NAVBAR_DROPDOWN_DEFAULTS["alignments"])[number];
}

export type NavbarDropdownVariables = Prefer<
  NavbarDropdownVariablesOverrides,
  NavbarDropdownVariablesDefaults
>;

export type NavbarDropdownModifierProps = Partial<{
  align: NavbarDropdownVariables["alignments"];
  boxed: boolean;
}>;

export type NavbarDropdownProps = HelpersProps & NavbarDropdownModifierProps;

export const NavbarDropdown = forwardRefAs<NavbarDropdownProps>(
  ({ align, boxed, className, ...rest }, ref) => (
    <Generic
      className={classNames(
        "navbar-dropdown",
        {
          [`is-${align}`]: align,
          "is-boxed": boxed,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);

NavbarDropdown.displayName = "Navbar.Dropdown";
NavbarDropdown.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  boxed: PropTypes.bool,
};
