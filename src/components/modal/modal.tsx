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

export class ModalController extends PureComponent<ModalControllerProps> {
  private el: HTMLDivElement;

  constructor(props: ModalControllerProps) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal-controller";
  }

  public componentDidMount() {
    const document = getDocument();
    if (document) {
      document.body.appendChild(this.el);
    }
  }

  public componentWillUnmount() {
    if (document) {
      document.body.removeChild(this.el);
    }
  }

  public render() {
    const { active, ...rest } = this.props;
    return getDocument() && this.el && active
      ? ReactDOM.createPortal(<ModalPortal {...rest} />, this.el)
      : null;
  }
}

export const Modal = Object.assign(
  React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
    return <ModalController innerRef={ref} {...props} />;
  }),
  {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Content: ModalContent,
  },
);
