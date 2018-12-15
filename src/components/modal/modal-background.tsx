import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { ModalContext } from "./modal-context";

export type ModalBackgroundModifierProps = Partial<{
  className: string;
  onClick: React.MouseEventHandler<any>;
}>;

export type ModalBackgroundProps = HelpersProps & ModalBackgroundModifierProps;

export const ModalBackground = forwardRefAs<ModalBackgroundProps, "div">(
  (props, ref) => {
    const { as, onClick, ...rest } = transformHelpers(props);
    rest.className = classNames("modal-background", rest.className);
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
