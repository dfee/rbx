import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type NavbarItemModifierProps = Partial<{
  active: boolean;
  children: React.ReactNode;
  dropdown: boolean;
  dropdownUp: boolean;
  hoverable: boolean;
  style: React.CSSProperties;
}>;

export type NavbarItemProps = ModifierProps & NavbarItemModifierProps;

const NavbarItem = renderAsExoticComponent<NavbarItemProps, "a">(
  (
    {
      className,
      active,
      children,
      dropdown,
      dropdownUp,
      hoverable,
      renderAs,
      ...props
    },
    ref,
  ) => {
    let as = renderAs;
    if (dropdown && renderAs === "a") {
      as = "span";
    }
    return (
      <Element
        {...props}
        ref={ref}
        renderAs={as}
        className={cx("navbar-item", className, {
          "has-dropdown": dropdown,
          "has-dropdown-up": dropdownUp,
          "is-active": active,
          "is-hoverable": hoverable,
        })}
      >
        {children}
      </Element>
    );
  },
  "a",
);
NavbarItem.defaultProps = Object.assign(
  {
    active: false,
    children: null,
    dropdown: false,
    dropdownUp: false,
    hoverable: false,
  },
  NavbarItem.defaultProps,
);

export default NavbarItem;
