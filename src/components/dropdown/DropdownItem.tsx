import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import { ModifierProps } from "modifiers";

export interface DropdownItemModifierProps {
  active?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<any>;
  value: string;
}

export type DropdownItemProps = ModifierProps &
  DropdownItemModifierProps &
  Partial<React.ComponentPropsWithoutRef<"div">>;

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ active, children, value, ...props }, ref) => (
    <Element
      ref={ref}
      title={value}
      {...props}
      role="presentation"
      className={cx("dropdown-item", {
        "is-active": active,
      })}
    >
      {children}
    </Element>
  ),
);
DropdownItem.defaultProps = {
  active: false,
  children: null,
};

export default DropdownItem;
