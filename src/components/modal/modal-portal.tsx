import classNames from "classnames";
import React from "react";

import { Generic } from "../../base";
import { initialValue, ModalContext, ModalContextValue } from "./modal-context";

export type ModalPortalModifierProps = {
  as?: React.ReactType; // tslint:disable-line:no-reserved-keywords
  className?: string;
  clipped?: boolean;
  closeOnBlur?: ModalContextValue["closeOnBlur"];
  closeOnEsc?: ModalContextValue["closeOnEsc"];
  document: Document;
  innerRef?: React.Ref<HTMLElement | SVGElement | React.ComponentType>;
  onClose?: ModalContextValue["close"];
};

export type ModalPortalProps = ModalPortalModifierProps;

export class ModalPortal extends React.PureComponent<ModalPortalProps> {
  public static defaultProps = {
    closeOnBlur: initialValue.closeOnBlur,
    closeOnEsc: initialValue.closeOnEsc,
  };
  public static displayName = "Modal.Portal";

  public componentDidMount() {
    const { clipped, document } = this.props;
    document.addEventListener("keydown", this.handleKeydown);
    const html = document.querySelector("html");
    /* istanbul ignore else: typeguard */
    if (html !== null) {
      if (clipped === true) {
        html.classList.add("is-clipped");
      }
    }
  }

  public componentWillUnmount() {
    const { document } = this.props;
    document.removeEventListener("keydown", this.handleKeydown);
    const html = document.querySelector("html");
    /* istanbul ignore else: typeguard */
    if (html !== null) {
      html.classList.remove("is-clipped");
    }
  }

  public render() {
    const {
      className,
      closeOnBlur,
      closeOnEsc,
      innerRef,
      onClose,
      ...rest
    } = this.props;

    return (
      <ModalContext.Provider
        value={{
          close: this.close,
          closeOnBlur: closeOnBlur === true,
          closeOnEsc: closeOnEsc === true,
        }}
      >
        <Generic
          className={classNames("modal", "is-active", className)}
          ref={innerRef}
          {...rest}
        />
      </ModalContext.Provider>
    );
  }

  private readonly close = () => {
    if (this.props.onClose !== undefined) {
      this.props.onClose();
    }
  };

  private readonly handleKeydown = (event: KeyboardEvent) => {
    if (this.props.closeOnEsc === true && event.code === "Escape") {
      this.close();
    }
  };
}
