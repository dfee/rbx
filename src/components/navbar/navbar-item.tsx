import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type NavbarItemModifierProps = Partial<{
  active: boolean;
  dropdown: boolean;
  dropdownUp: boolean;
  hoverable: boolean;
}>;

export type NavbarItemProps = HelpersProps & NavbarItemModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
  dropdown: PropTypes.bool,
  dropdownUp: PropTypes.bool,
  hoverable: PropTypes.bool,
};

export const NavbarItem = Object.assign(
  forwardRefAs<NavbarItemProps, "a">(
    (props, ref) => {
      const {
        as,
        active,
        dropdown,
        dropdownUp,
        hoverable,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("navbar-item", rest.className, {
        "has-dropdown": dropdown,
        "has-dropdown-up": dropdownUp,
        "is-active": active,
        "is-hoverable": hoverable,
      });

      const asOverride = dropdown && as === "a" ? "div" : as;
      return React.createElement(asOverride!, { ref, ...rest });
    },
    { as: "a" },
  ),
  { propTypes },
);
