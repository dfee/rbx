import { cx } from "emotion";
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import { ModalCard, ModalCardProps } from "./modal-card";
import { ModalContent } from "./modal-content";

export interface ModalModifierProps {
  className?: string;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  document?: Document;
  onClose: () => void;
  show: boolean;
  showClose?: boolean;
}

export type ModalProps = Prefer<
  ModalModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

type ModalControllerProps = ModalProps & {
  innerRef: React.Ref<HTMLDivElement>;
};

interface ModalControllerState {
  document: Document | null;
}

class ModalController extends PureComponent<
  ModalControllerProps,
  ModalControllerState
> {
  public static defaultProps = {
    closeOnBlur: false,
    closeOnEsc: true,
    document: null, // Expose mount point for testing
    showClose: true,
  };
  public readonly state: ModalControllerState = { document: null };

  private portalElement: HTMLElement | null = null;

  public componentDidMount() {
    const { closeOnEsc } = this.props;

    const document = this.getDocument();
    if (document) {
      this.portalElement = document.createElement("div");
      this.portalElement.setAttribute("class", "modal-container");
      document.body.appendChild(this.portalElement);
      if (closeOnEsc) {
        document.addEventListener("keydown", this.handleKeydown);
      }
      this.setState({ document });
    }
  }

  public componentWillUnmount() {
    const { document } = this.state;
    const { closeOnEsc } = this.props;
    if (document) {
      if (closeOnEsc) {
        document.removeEventListener("keydown", this.handleKeydown);
      }
      this.portalElement!.remove();
    }
  }

  public getDocument = () => {
    if (this.props.document) {
      return this.props.document;
    }
    return typeof document !== "undefined" ? document : null;
  }

  public handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && this.props.show) {
      this.props.onClose();
    }
  }

  public render() {
    const { innerRef, closeOnBlur, show, className } = this.props;
    if (!this.getDocument() || !this.portalElement || !show) {
      return null;
    }
    let { children } = this.props;
    let isCard;
    try {
      isCard =
        React.Children.only(children)
          .type.toString()
          .indexOf("ModalCard") !== -1;
    } catch (e) {
      isCard = false;
    }

    const showClose = !isCard && this.props.showClose;

    if (isCard && React.isValidElement<ModalCardProps>(children)) {
      children = React.cloneElement(children, {
        onClose: this.props.onClose,
      });
    }

    return ReactDOM.createPortal(
      <div
        ref={innerRef}
        className={cx("modal", className, {
          "is-active": show,
        })}
      >
        <div
          role="presentation"
          className="modal-background"
          onClick={closeOnBlur ? this.close : undefined}
        />
        {children}
        {showClose && (
          <button
            type="button"
            onClick={this.close}
            className="modal-close is-large"
            aria-label="close"
          />
        )}
      </div>,
      this.portalElement,
    );
  }

  private close = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    this.props.onClose();
  }
}

export const Modal = Object.assign(
  React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => (
    <ModalController innerRef={ref} {...props} />
  )),
  {
    Card: ModalCard,
    Content: ModalContent,
  },
);
