import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { ModalContext } from "./modal-context";

export type ModalCloseModifierProps = Partial<{
  className: string;
  onClick: React.MouseEventHandler<any>;
}>;

export type ModalCloseProps = ModifierProps & ModalCloseModifierProps;

export const ModalClose = forwardRefAs<ModalCloseProps, "button">(
  (props, ref) => {
    const { as, onClick, ...rest } = transformModifiers(props);
    rest.className = classNames("modal-close", "is-large", rest.className);
    return (
      <ModalContext.Consumer>
        {({ onClose }) =>
          React.createElement(as!, {
            ["aria-label"]: "close",
            onClick: (event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              onClose();
            },
            ref,
            ...rest,
          })
        }
      </ModalContext.Consumer>
    );
  },
  { as: "button" },
);
