import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type NavbarDropdownModifierProps = Partial<{
  boxed: boolean;
  right: boolean;
}>;

export type NavbarDropdownProps = HelpersProps & NavbarDropdownModifierProps;

const propTypes = {
  ...genericPropTypes,
  boxed: PropTypes.bool,
  right: PropTypes.bool,
};

export const NavbarDropdown = Object.assign(
  forwardRefAs<NavbarDropdownProps, "span">(
    (props, ref) => {
      const { as, boxed, right, ...rest } = transformHelpers(props);
      rest.className = classNames("navbar-dropdown", rest.className, {
        "is-boxed": boxed,
        "is-right": right,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  { propTypes },
);
