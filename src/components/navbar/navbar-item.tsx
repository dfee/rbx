import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs } from "src/base";
import { Omit } from "src/types";
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
    (props, ref) => <NavbarItemContainer innerRef={ref} {...props} />,
    { as: "a" },
  ),
  {
    Container: NavbarItemContainer,
    propTypes,
  },
);
