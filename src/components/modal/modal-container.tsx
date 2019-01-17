import React from "react";
import ReactDOM from "react-dom";

import { canUseDOM } from "../../utils";
import { ModalContextValue } from "./modal-context";
import { ModalPortal } from "./modal-portal";

export type ModalContainerProps = Partial<{
  active: boolean;
  as: React.ReactType; // tslint:disable-line:no-reserved-keywords
  children: React.ReactNode;
  closeOnBlur: ModalContextValue["closeOnBlur"];
  closeOnEsc: ModalContextValue["closeOnEsc"];
  containerClassName: string;
  document: Document;
  innerRef: React.Ref<HTMLElement | keyof JSX.IntrinsicElements>;
  onClose(): void;
}>;

export class ModalContainer extends React.PureComponent<ModalContainerProps> {
  public static displayName = "Modal.Container";
  private readonly el: HTMLDivElement | undefined;

  constructor(props: ModalContainerProps) {
    super(props);
    if (canUseDOM()) {
      this.el = this.document.createElement("div");
      if (props.containerClassName !== undefined) {
        this.el.className = props.containerClassName;
      }
    }
  }

  public componentDidMount() {
    if (canUseDOM()) {
      /* istanbul ignore else: typescript typeguard */
      if (this.el !== undefined) {
        this.document.body.appendChild(this.el);
      }
    }
  }

  public componentWillUnmount() {
    if (canUseDOM()) {
      /* istanbul ignore else: typescript typeguard */
      if (this.el !== undefined) {
        this.document.body.removeChild(this.el);
      }
    }
  }

  public render() {
    const { active, containerClassName, document, ...rest } = this.props;

    return this.el !== undefined && active === true
      ? ReactDOM.createPortal(
          <ModalPortal document={this.document} {...rest} />,
          this.el,
        )
      : false;
  }

  private get document() {
    return this.props.document !== undefined ? this.props.document : document;
  }
}
