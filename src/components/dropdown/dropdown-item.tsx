import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type DropdownItemModifierProps = {
  active?: boolean;
  value: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "unselectable">;

export type DropdownItemProps = ModifierProps & DropdownItemModifierProps;

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  (props, ref) => {
    const { active, value, ...rest } = props;
    rest.className = cx("dropdown-item", rest.className, {
      "is-active": active,
    });
    return <Element ref={ref} title={value} role="presentation" {...rest} />;
  },
);

DropdownItem.defaultProps = {
  active: false,
};
