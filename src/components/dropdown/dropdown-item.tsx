import { cx } from "emotion";
import React from "react";

import { Generic } from "@/generic";
import { ModifierProps } from "@/modifiers";

export interface DropdownItemModifierProps {
  active?: boolean;
  value: string;
}

export type DropdownItemProps = Prefer<
  ModifierProps & DropdownItemModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  (props, ref) => {
    const { active, value, ...rest } = props;
    rest.className = cx("dropdown-item", rest.className, {
      "is-active": active,
    });
    return <Generic ref={ref} title={value} role="presentation" {...rest} />;
  },
);

DropdownItem.defaultProps = {
  active: false,
};
