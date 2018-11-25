import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import { ModifierProps } from "modifiers";
import ModalCardBody from "./body";
import ModalCardFoot from "./foot";
import ModalCardHead from "./head";
import ModalCardTitle from "./title";

export type ModalCardModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  onClose: () => void;
  style: {};
}>;

export type ModalCardProps = ModifierProps & ModalCardModifierProps;

interface ModalCard extends React.ForwardRefExoticComponent<ModalCardProps> {
  Body: typeof ModalCardBody;
  Foot: typeof ModalCardFoot;
  Head: typeof ModalCardHead;
  Title: typeof ModalCardTitle;
}

const ModalCard: Partial<ModalCard> = React.forwardRef<
  HTMLDivElement,
  ModalCardProps
>(({ className, onClose, children, ...props }, ref) => (
  <Element {...props} ref={ref} className={cx("modal-card", className)}>
    {children}
  </Element>
));
ModalCard.defaultProps = Object.assign(
  {
    children: null,
  },
  ModalCard.defaultProps,
);

ModalCard.Body = ModalCardBody;
ModalCard.Foot = ModalCardFoot;
ModalCard.Head = ModalCardHead;
ModalCard.Title = ModalCardTitle;

export default ModalCard as ModalCard;
