import PropTypes from "prop-types";
import React from "react";

import { Omit } from "src/types";
import { forwardRefAs } from "../../base";
import {
  NavbarItemContainer,
  NavbarItemContainerProps,
} from "./navbar-item-container";

export type NavbarItemProps = Omit<NavbarItemContainerProps, "as" | "innerRef">;

const propTypes = {
  active: PropTypes.bool,
  dropdown: PropTypes.bool,
  dropdownUp: PropTypes.bool,
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  onClick: PropTypes.func,
};

export const NavbarItem = Object.assign(
  forwardRefAs<NavbarItemProps, "a">(
    ({ as, ...rest }, ref) => (
      <NavbarItemContainer as={as!} innerRef={ref} {...rest} />
    ),
    { as: "a" },
  ),
  {
    Container: NavbarItemContainer,
    propTypes,
  },
);
