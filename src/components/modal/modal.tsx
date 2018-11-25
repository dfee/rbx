import { cx } from "emotion";
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import ModalCard from "./components/card";
import { ModalCardProps } from "./components/card/card";
import ModalContent from "./components/content";

export interface ModalProps {
  children: React.ReactNode;
  className?: string;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  document?: Document;
  innerRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
  show: boolean;
  showClose?: boolean;
}

export interface ModalState {
  document: Document | null;
}

class Modal extends PureComponent<ModalProps, ModalState> {
  public static defaultProps = {
    closeOnBlur: false,
    closeOnEsc: true,
    document: null, // Expose mount point for testing
    showClose: true,
  };
  public readonly state: ModalState = { document: null };

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

export type ModalRefProps = Omit<ModalProps, "innerRef">;

interface ModalRef extends React.ForwardRefExoticComponent<ModalRefProps> {
  Content: typeof ModalContent;
  Card: typeof ModalCard;
}

const ModalRef: Partial<ModalRef> = React.forwardRef<
  HTMLDivElement,
  ModalRefProps
>((props, ref) => <Modal innerRef={ref} {...props} />);

ModalRef.Content = ModalContent;
ModalRef.Card = ModalCard;

export default ModalRef as ModalRef;
