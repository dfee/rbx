import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { Delete } from "@/elements";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { ModalCardTitle } from "./modal-card-title";
import { ModalContext } from "./modal-context";

export type ModalCardHeadProps = ModifierProps;

export const ModalCardHead = Object.assign(
  forwardRefAs<ModalCardHeadProps, "header">((props, ref) => {
    const { as, children, ...rest } = transformModifiers(props);
    rest.className = cx("modal-card-head", rest.className);
    return (
      <ModalContext.Consumer>
        {({ onClose }) => {
          const mapped = React.Children.map(children, (child, i) => {
            if (
              typeof child === "object" &&
              React.Children.only(child).type === Delete
            ) {
              return React.cloneElement(child, { onClick: onClose });
            }
            return child;
          });
          return React.createElement(as!, { children: mapped, ref, ...rest });
        }}
      </ModalContext.Consumer>
    );
  }, "header"),
  { Title: ModalCardTitle },
);
