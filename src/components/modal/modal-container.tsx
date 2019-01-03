import * as React from "react";
import * as ReactDOM from "react-dom";

import { canUseDOM } from "src/utils";
import { ModalContextValue } from "./modal-context";
import { ModalPortal } from "./modal-portal";

export type ModalContainerProps = Partial<{
  active: boolean;
  as: React.ReactType; // tslint:disable-line:no-reserved-keywords
  children: React.ReactNode;
  closeOnBlur: ModalContextValue["closeOnBlur"];
  closeOnEsc: ModalContextValue["closeOnEsc"];
  containerClassName: string;
  innerRef: React.Ref<HTMLElement | keyof JSX.IntrinsicElements>;
  onClose(): void;
}>;

export interface ModalContainerState {
  active: boolean;
}

export class ModalContainer extends React.PureComponent<
  ModalContainerProps,
  ModalContainerState
> {
  public readonly state: ModalContainerState = { active: false };
  private readonly el: HTMLDivElement | undefined;

  constructor(props: ModalContainerProps) {
    super(props);
    this.state = { active: this.props.active === true };
    if (canUseDOM()) {
      this.el = document.createElement("div");
      if (props.containerClassName !== undefined) {
        this.el.className = props.containerClassName;
      }
    }
  }

  public componentDidMount() {
    if (canUseDOM()) {
      /* istanbul ignore else: typescript typeguard */
      if (this.el !== undefined) {
        document.body.appendChild(this.el);
      }
    }
  }

  public componentWillUnmount() {
    if (canUseDOM()) {
      /* istanbul ignore else: typescript typeguard */
      if (this.el !== undefined) {
        document.body.removeChild(this.el);
      }
    }
  }

  public render() {
    const { active, containerClassName, ...rest } = this.props;

    return this.el !== undefined && this.state.active
      ? ReactDOM.createPortal(
          <ModalPortal close={this.close} {...rest} />,
          this.el,
        )
      : false;
  }

  private readonly close = () => {
    this.setState({ active: false });
    if (this.props.onClose !== undefined) {
      this.props.onClose();
    }
  }
}
