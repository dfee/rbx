import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs } from "src/base";
import { COLORS } from "src/base/helpers";
import { Omit } from "src/types";
import { NavbarBrand } from "./navbar-brand";
import { NavbarBurger } from "./navbar-burger";
import {
  NAVBAR_FIXED_ALIGNMENTS,
  NavbarContainer,
  NavbarContainerProps,
} from "./navbar-container";
import { NavbarContext } from "./navbar-context";
import { NavbarDivider } from "./navbar-divider";
import { NavbarDropdown } from "./navbar-dropdown";
import { NavbarEnd } from "./navbar-end";
import { NavbarItem } from "./navbar-item";
import { NavbarLink } from "./navbar-link";
import { NavbarMenu } from "./navbar-menu";
import { NavbarStart } from "./navbar-start";

export type NavbarProps = Omit<NavbarContainerProps, "as" | "innerRef">;

const propTypes = {
  active: PropTypes.bool,
  color: PropTypes.oneOf(COLORS),
  fixed: PropTypes.oneOf(NAVBAR_FIXED_ALIGNMENTS),
  managed: PropTypes.bool,
  transparent: PropTypes.bool,
};

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
    End: NavbarEnd,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
    Start: NavbarStart,
    propTypes,
  },
);
