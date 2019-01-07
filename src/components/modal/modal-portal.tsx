import classNames from "classnames";
import React from "react";

import { Generic } from "../../base";
import { initialValue, ModalContext, ModalContextValue } from "./modal-context";

export type ModalPortalModifierProps = Partial<{
  as: React.ReactType; // tslint:disable-line:no-reserved-keywords
  className: string;
  closeOnBlur: ModalContextValue["closeOnBlur"];
  closeOnEsc: ModalContextValue["closeOnEsc"];
  innerRef: React.Ref<HTMLElement | keyof JSX.IntrinsicElements>;
  onClose: ModalContextValue["close"];
}>;

export type ModalPortalProps = ModalPortalModifierProps;

export class ModalPortal extends React.PureComponent<ModalPortalProps> {
  public static defaultProps = {
    closeOnBlur: initialValue.closeOnBlur,
    closeOnEsc: initialValue.closeOnEsc,
  };

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
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
  }

  private readonly handleKeydown = (event: KeyboardEvent) => {
    if (this.props.closeOnEsc === true && event.code === "Escape") {
      this.close();
    }
  }
}
