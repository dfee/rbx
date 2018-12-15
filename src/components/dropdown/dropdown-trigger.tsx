import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { DropdownContext } from "./dropdown-context";

export type DropdownTriggerModifierProps = Partial<{
  className: string;
  onClick: React.MouseEventHandler<any>;
}>;

export type DropdownTriggerProps = HelpersProps & DropdownTriggerModifierProps;

export const DropdownTrigger = forwardRefAs<DropdownTriggerProps, "div">(
  (props, ref) => {
    const { as, onClick, ...rest } = transformHelpers(props);
    rest.className = classNames("dropdown-trigger", rest.className);
    return (
      <DropdownContext.Consumer>
        {({ active, setActive }) => {
          return React.createElement(as!, {
            onClick: (event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              setActive(!active);
            },
            ref,
            ...rest,
          });
        }}
      </DropdownContext.Consumer>
    );
  },
  { as: "div" },
);
