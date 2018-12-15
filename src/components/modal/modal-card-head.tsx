import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Delete } from "../../elements";
import { ModalContext } from "./modal-context";

export type ModalCardHeadModifierProps = Partial<{ className: string }>;

export type ModalCardHeadProps = HelpersProps & ModalCardHeadModifierProps;

export const ModalCardHead = forwardRefAs<ModalCardHeadProps, "header">(
  (props, ref) => {
    const { as, children, ...rest } = transformHelpers(props);
    rest.className = classNames("modal-card-head", rest.className);
    return (
      <ModalContext.Consumer>
        {({ onClose }) => {
          const mapped = React.Children.map(children, (child, i) => {
            if (typeof child === "object" && child.type === Delete) {
              return React.cloneElement(child, {
                onClick: (event: React.MouseEvent<any>) => {
                  if (child.props.onClick) {
                    child.props.onClick(event);
                  }
                  onClose();
                },
              });
            }
            return child;
          });
          return React.createElement(as!, { children: mapped, ref, ...rest });
        }}
      </ModalContext.Consumer>
    );
  },
  { as: "header" },
);
