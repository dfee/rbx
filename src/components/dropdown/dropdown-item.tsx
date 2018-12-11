import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { DropdownContext } from "./dropdown-context";

export type DropdownItemModifierProps = Partial<{
  active: boolean;
  className: string;
  onClick: React.MouseEventHandler<any>;
}>;

export type DropdownItemProps = ModifierProps & DropdownItemModifierProps;

export const DropdownItem = forwardRefAs<DropdownItemProps, "a">(
  (props, ref) => {
    const { as, active, onClick, ...rest } = transformModifiers(props);
    rest.className = cx("dropdown-item", rest.className, {
      "is-active": active,
    });
    return (
      <DropdownContext.Consumer>
        {ctx =>
          React.createElement(as!, {
            onClick: (event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              ctx.setActive(false);
            },
            ref,
            ...rest,
          })
        }
      </DropdownContext.Consumer>
    );
  },
  { as: "a" },
);
