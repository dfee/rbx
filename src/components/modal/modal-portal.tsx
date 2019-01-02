import classNames from "classnames";
import React from "react";

import { Generic } from "../../base";
import { initialValue, ModalContext, ModalContextValue } from "./modal-context";

export interface ModalPortalModifierProps {
  as?: React.ReactType<any>;
  className?: string;
  close: ModalContextValue["close"];
  closeOnBlur?: ModalContextValue["closeOnBlur"];
  closeOnEsc?: ModalContextValue["closeOnEsc"];
  innerRef?: React.Ref<HTMLDivElement>;
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
          closeOnBlur: closeOnBlur!,
          closeOnEsc: closeOnEsc!,
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

  private handleKeydown = (event: KeyboardEvent) => {
    if (this.props.closeOnEsc && event.code === "Escape") {
      this.props.close();
    }
  }
}
