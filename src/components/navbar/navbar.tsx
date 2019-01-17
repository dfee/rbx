import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs } from "../../base";
import { Omit } from "../../types";
import { NavbarBrand } from "./navbar-brand";
import { NavbarBurger } from "./navbar-burger";
import { NavbarContainer, NavbarContainerProps } from "./navbar-container";
import { NavbarContext } from "./navbar-context";
import { NavbarDivider } from "./navbar-divider";
import { NavbarDropdown } from "./navbar-dropdown";
import { NavbarItem } from "./navbar-item";
import { NavbarLink } from "./navbar-link";
import { NavbarMenu } from "./navbar-menu";
import { NavbarSegment } from "./navbar-segment";

export type NavbarProps = Omit<NavbarContainerProps, "as" | "innerRef">;

export const Navbar = Object.assign(
  forwardRefAs<NavbarProps, "nav">(
    (props, ref) => <NavbarContainer innerRef={ref} {...props} />,
    { as: "nav" },
  ),
  {
    Brand: NavbarBrand,
    Burger: NavbarBurger,
    Container: NavbarContainer,
    Context: NavbarContext,
    Divider: NavbarDivider,
    Dropdown: NavbarDropdown,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
    Segment: NavbarSegment,
  },
);

Navbar.displayName = "Navbar";
Navbar.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  document: PropTypes.object,
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  managed: PropTypes.bool,
  transparent: PropTypes.bool,
};
