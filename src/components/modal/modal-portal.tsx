import classNames from "classNames";
import * as React from "react";

import { Generic } from "src/base";
import { initialValue, ModalContext, ModalContextValue } from "./modal-context";

export interface ModalPortalModifierProps {
  as?: React.ReactType; // tslint:disable-line:no-reserved-keywords
  className?: string;
  close: ModalContextValue["close"];
  closeOnBlur?: ModalContextValue["closeOnBlur"];
  closeOnEsc?: ModalContextValue["closeOnEsc"];
  innerRef?: React.Ref<HTMLElement | keyof JSX.IntrinsicElements>;
}

export type ModalPortalProps = ModalPortalModifierProps;

export class ModalPortal extends React.PureComponent<ModalPortalProps> {
  public static defaultProps = initialValue;

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  public render() {
    const {
      className,
      close,
      closeOnBlur,
      closeOnEsc,
      innerRef,
      ...rest
    } = this.props;

    return (
      <ModalContext.Provider
        value={{
          close,
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

  private readonly handleKeydown = (event: KeyboardEvent) => {
    if (this.props.closeOnEsc === true && event.code === "Escape") {
      this.props.close();
    }
  }
}
