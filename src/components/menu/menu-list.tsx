import { cx } from "emotion";
import React from "react";

import { Generic } from "@/extras/generic";
import { ModifierProps } from "@/modifiers";
import { MenuListItem } from "./menu-list-item";

export type MenuListModifierProps = Partial<{
  title: string;
}>;

export type MenuListProps = Prefer<
  ModifierProps & MenuListModifierProps,
  React.HTMLAttributes<HTMLUListElement>
>;

export const MenuList = Object.assign(
  React.forwardRef<HTMLUListElement, MenuListProps>((props, ref) => {
    const { className, title, ...rest } = props;
    return (
      <React.Fragment>
        {title && <p className="menu-label">{title}</p>}
        <Generic<"ul">
          as="ul"
          className={cx("menu-list", className)}
          ref={ref}
          {...rest}
        />
      </React.Fragment>
    );
  }),
  { Item: MenuListItem },
);
