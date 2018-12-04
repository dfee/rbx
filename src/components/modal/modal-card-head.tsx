import { cx } from "emotion";
import React from "react";

import { Delete } from "@/elements";
import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalCardHeadModifierProps = Partial<{
  children: React.ReactNode;
  onClose: () => void;
  showClose: boolean;
  style: React.CSSProperties;
}>;

export type ModalCardHeadProps = ModifierProps & ModalCardHeadModifierProps;

export const ModalCardHead = forwardRefAs<ModalCardHeadProps, "header">(
  (props, ref) => {
    const { as, children, onClose, showClose, ...rest } = transformModifiers(
      props,
    );
    rest.className = cx("modal-card-head", rest.className);
    return React.createElement(as!, {
      children: (
        <React.Fragment>
          {children}
          {showClose && <Delete<"button"> as="button" onClick={onClose} />}
        </React.Fragment>
      ),
      ref,
      ...rest,
    });
  },
  "header",
);

ModalCardHead.defaultProps = Object.assign(
  {
    children: null,
    showClose: true,
  },
  ModalCardHead.defaultProps,
);
