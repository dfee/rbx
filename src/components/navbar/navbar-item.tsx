import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs } from "../../base";
import { Omit } from "../../types";
import {
  NavbarItemContainer,
  NavbarItemContainerProps,
} from "./navbar-item-container";

export type NavbarItemProps = Omit<NavbarItemContainerProps, "as" | "innerRef">;

const propTypes = {
  active: PropTypes.bool,
  dropdown: PropTypes.bool,
  expanded: PropTypes.bool,
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  onClick: PropTypes.func,
  tab: PropTypes.bool,
  up: PropTypes.bool,
};

export const NavbarItem = Object.assign(
  forwardRefAs<NavbarItemProps, "a">(
    (props, ref) => <NavbarItemContainer innerRef={ref} {...props} />,
    { as: "a" },
  ),
  {
    Container: NavbarItemContainer,
    propTypes,
  },
);
