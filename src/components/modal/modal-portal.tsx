import { cx } from "emotion";
import React from "react";

import { initialState, ModalContext } from "./modal-context";

export interface ModalPortalModifierProps {
  className?: string;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  innerRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
}

export type ModalPortalProps = Prefer<
  ModalPortalModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export class ModalPortal extends React.PureComponent<ModalPortalProps> {
  public static defaultProps = initialState;

  public componentDidMount() {
    const document = this.getDocument();
    if (document) {
      document.addEventListener("keydown", this.handleKeydown);
      this.setState({ document });
    }
  }

  public componentWillUnmount() {
    const document = this.getDocument();
    if (document) {
      document.removeEventListener("keydown", this.handleKeydown);
    }
  }

  public getDocument = () => {
    return typeof document !== "undefined" ? document : null;
  }

  public handleKeydown = (event: KeyboardEvent) => {
    if (this.props.closeOnEsc && event.code === "Escape") {
      this.props.onClose();
    }
  }

  public render() {
    const { closeOnBlur, closeOnEsc, innerRef, onClose, ...rest } = this.props;
    rest.className = cx("modal", "is-active", rest.className);

    return (
      <ModalContext.Provider
        value={{
          closeOnBlur: closeOnBlur!,
          closeOnEsc: closeOnEsc!,
          onClose: onClose!,
        }}
      >
        <div ref={innerRef} {...rest} />
      </ModalContext.Provider>
    );
  }
}
