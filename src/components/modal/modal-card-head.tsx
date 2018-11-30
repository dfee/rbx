import { cx } from "emotion";
import React from "react";

import { Button } from "@/components/button";
import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type ModalCardHeadModifierProps = Partial<{
  children: React.ReactNode;
  onClose: () => void;
  showClose: boolean;
  style: React.CSSProperties;
}>;

export type ModalCardHeadProps = ModifierProps & ModalCardHeadModifierProps;

export const ModalCardHead = asExoticComponent<ModalCardHeadProps, "header">(
  (props, ref) => {
    const { as, children, onClose, showClose, ...rest } = modify(props);
    rest.className = cx("modal-card-head", rest.className);
    return React.createElement(as!, {
      children: (
        <React.Fragment>
          {children}
          {showClose && <Button remove onClick={onClose} />}
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
