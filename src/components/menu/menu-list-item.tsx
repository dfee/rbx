import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { MenuList } from "./menu-list";

export type MenuListItemModifierProps = Partial<{
  active: boolean;
}>;

export type MenuListItemProps = Prefer<
  ModifierProps & MenuListItemModifierProps,
  React.HTMLAttributes<HTMLAnchorElement>
>;

export const MenuListItem = React.forwardRef<HTMLLIElement, MenuListItemProps>(
  (props, ref) => {
    const { active, children, className, ...rest } = props;

    if (typeof children === "string") {
      return (
        <li ref={ref}>
          <Element<"a">
            as="a"
            className={cx(className, { "is-active": active })}
            children={children}
            {...rest}
          />
        </li>
      );
    }

    if (React.Children.only(children).type === MenuList) {
      const child = React.Children.only(children);
      return (
        <li ref={ref}>
          <Element<"a">
            as="a"
            className={cx(className, { "is-active": active })}
            children={child.props.title}
            {...rest}
          />
          {React.cloneElement(child, { title: null })}
        </li>
      );
    }

    return <li ref={ref}>{children}</li>;
  },
);

MenuListItem.defaultProps = Object.assign(
  {
    active: false,
    children: null,
  },
  MenuListItem.defaultProps,
);
