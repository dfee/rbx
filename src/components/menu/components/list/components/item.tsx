import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import List from "../list";

export type MenuListItemModifierProps = Partial<{
  active: boolean;
  children: React.ReactNode;
}>;

export type MenuListItemProps = ModifierProps & MenuListItemModifierProps;

const MenuListItem = renderAsExoticComponent<MenuListItemProps, "a">(
  ({ children, active, className, ...props }, ref) => {
    if (typeof children === "string") {
      return (
        <li ref={ref}>
          <Element
            className={cx(className, { "is-active": active })}
            {...props}
          >
            {children}
          </Element>
        </li>
      );
    }

    if (React.Children.only(children).type === List) {
      const child = React.Children.only(children);
      return (
        <li ref={ref}>
          <Element
            className={cx(className, { "is-active": active })}
            {...props}
          >
            {child.props.title}
          </Element>
          {React.cloneElement(child, { title: null })}
        </li>
      );
    }

    return <li ref={ref}>{children}</li>;
  },
  "a",
);
MenuListItem.defaultProps = Object.assign(
  {
    active: false,
    children: null,
  },
  MenuListItem.defaultProps,
);

export default MenuListItem;
