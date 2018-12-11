import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { ModalContext } from "./modal-context";

export type ModalBackgroundModifierProps = Partial<{
  className: string;
  onClick: React.MouseEventHandler<any>;
}>;

export type ModalBackgroundProps = ModifierProps & ModalBackgroundModifierProps;

export const ModalBackground = forwardRefAs<ModalBackgroundProps, "div">(
  (props, ref) => {
    const { as, onClick, ...rest } = transformModifiers(props);
    rest.className = cx("modal-background", rest.className);
    return (
      <ModalContext.Consumer>
        {({ closeOnBlur, onClose }) =>
          React.createElement(as!, {
            onClick: (event: React.MouseEvent) => {
              if (onClick) {
                onClick(event);
              }
              if (closeOnBlur) {
                onClose();
              }
            },
            ref,
            role: "presentation",
            ...rest,
          })
        }
      </ModalContext.Consumer>
    );
  },
  { as: "div" },
);
