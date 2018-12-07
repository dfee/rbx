import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import { getDocument } from "@/utils";
import { ModalBackground } from "./modal-background";
import { ModalCard } from "./modal-card";
import { ModalClose } from "./modal-close";
import { ModalContent } from "./modal-content";
import { ModalPortal, ModalPortalProps } from "./modal-portal";

export type ModalModifierProps = Partial<{
  active: boolean;
}>;

export type ModalControllerProps = ModalPortalProps & ModalModifierProps;
export type ModalProps = Omit<ModalControllerProps, "innerRef">;

class ModalController extends PureComponent<ModalControllerProps> {
  private element: HTMLElement | null = null;

  public componentDidMount() {
    const document = getDocument();
    if (document) {
      this.element = document.createElement("div");
      this.element.setAttribute("class", "modal-container");
      document.body.appendChild(this.element);
    }
  }

  public componentWillUnmount() {
    if (document) {
      this.element!.remove();
    }
  }

  public render() {
    const { active, ...rest } = this.props;
    return getDocument() && this.element && active
      ? ReactDOM.createPortal(<ModalPortal {...rest} />, this.element)
      : null;
  }
}

export const Modal = Object.assign(
  React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => (
    <ModalController innerRef={ref} {...props} />
  )),
  {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Content: ModalContent,
  },
);
