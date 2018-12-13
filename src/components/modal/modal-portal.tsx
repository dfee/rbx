import classNames from "classnames";
import React from "react";

import { getDocument } from "@/utils";
import { initialState, ModalContext } from "./modal-context";

export interface ModalPortalModifierProps {
  as: React.ReactType<any>;
  className?: string;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  innerRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
}

export type ModalPortalProps = ModalPortalModifierProps;

export class ModalPortal extends React.PureComponent<ModalPortalProps> {
  public static defaultProps = initialState;

  public componentDidMount() {
    const document = getDocument();
    if (document) {
      document.addEventListener("keydown", this.handleKeydown);
    }
  }

  public componentWillUnmount() {
    const document = getDocument();
    if (document) {
      document.removeEventListener("keydown", this.handleKeydown);
    }
  }

  public handleKeydown = (event: KeyboardEvent) => {
    if (this.props.closeOnEsc && event.code === "Escape") {
      this.props.onClose();
    }
  }

  public render() {
    const {
      as,
      closeOnBlur,
      closeOnEsc,
      innerRef,
      onClose,
      ...rest
    } = this.props;
    rest.className = classNames("modal", "is-active", rest.className);

    return (
      <ModalContext.Provider
        value={{
          closeOnBlur: closeOnBlur!,
          closeOnEsc: closeOnEsc!,
          onClose: onClose!,
        }}
      >
        {React.createElement(as!, { ref: innerRef, ...rest })}
      </ModalContext.Provider>
    );
  }
}
