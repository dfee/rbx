import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { DropdownContext } from "./dropdown-context";

export type DropdownTriggerProps = ModifierProps;

export const DropdownTrigger = forwardRefAs<DropdownTriggerProps, "div">(
  (props, ref) => {
    const { as, onClick, ...rest } = transformModifiers(props);
    rest.className = cx("dropdown-trigger", rest.className);
    return (
      <DropdownContext.Consumer>
        {({ active, setActive }) => {
          return React.createElement(as!, {
            onClick: event => {
              // if (onClick) {
              //   onClick(event);
              // }
              setActive(!active);
            },
            ref,
            ...rest,
          });
        }}
      </DropdownContext.Consumer>
    );
  },
  "div",
);
