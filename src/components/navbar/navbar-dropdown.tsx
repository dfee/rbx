import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const NAVBAR_DROPDOWN_DEFAULTS = {
  alignments: ["right"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NavbarDropdownVariablesOverrides {}

export interface NavbarDropdownVariablesDefaults {
  alignments: (typeof NAVBAR_DROPDOWN_DEFAULTS["alignments"])[number];
}

export type NavbarDropdownVariables = Prefer<
  NavbarDropdownVariablesOverrides,
  NavbarDropdownVariablesDefaults
>;

export type NavbarDropdownModifierProps = {
  align?: NavbarDropdownVariables["alignments"];
  boxed?: boolean;
};

export type NavbarDropdownProps = HelpersProps & NavbarDropdownModifierProps;

export const NavbarDropdown = Object.assign(
  forwardRefAs<NavbarDropdownProps>(
    ({ align, boxed, className, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "navbar-dropdown",
          {
            [`is-${align}`]: align,
            "is-boxed": boxed,
          },
          className,
        )}
        {...rest}
      />
    ),
    { as: "span" },
  ),
  {
    DEFAULTS: NAVBAR_DROPDOWN_DEFAULTS,
  },
);

NavbarDropdown.displayName = "Navbar.Dropdown";
NavbarDropdown.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  boxed: PropTypes.bool,
};
