import React from "react";
import ReactDOM from "react-dom";

import { forwardRefAs } from "@/base";
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

export class ModalController extends React.PureComponent<ModalControllerProps> {
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

export type ModalProps = Omit<ModalControllerProps, "as" | "innerRef">;

export const Modal = Object.assign(
  forwardRefAs<ModalProps, "div">(
    (props, ref) => {
      const { as, ...rest } = props;
      return <ModalController as={as!} innerRef={ref} {...rest} />;
    },
    { as: "div" },
  ),
  {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Content: ModalContent,
  },
);
