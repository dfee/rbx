import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import { refPropType } from "../../prop-types-extensions";
import { canUseDOM } from "../../utils";
import { ModalContextValue } from "./modal-context";
import { ModalPortal } from "./modal-portal";

export type ModalContainerProps = Partial<{
  active: boolean;
  as: React.ReactType<any>;
  children: React.ReactNode;
  closeOnBlur: ModalContextValue["closeOnBlur"];
  closeOnEsc: ModalContextValue["closeOnEsc"];
  containerClassName: string;
  innerRef: React.Ref<any>;
  onClose: () => void;
}>;

const propTypes = {
  active: PropTypes.bool,
  // as: PropType checked by Generic
  closeOnBlur: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  containerClassName: PropTypes.string,
  innerRef: refPropType,
  onClose: PropTypes.func,
};

export interface ModalContainerState {
  active: boolean;
}

export class ModalContainer extends React.PureComponent<
  ModalContainerProps,
  ModalContainerState
> {
  public static propTypes = propTypes;
  public readonly state: ModalContainerState = { active: false };
  private el: HTMLDivElement | undefined;

  constructor(props: ModalContainerProps) {
    super(props);
    this.state = { active: !!this.props.active };
    if (canUseDOM()) {
      this.el = document.createElement("div");
      if (props.containerClassName) {
        this.el.className = props.containerClassName;
      }
    }
  }

  public componentDidMount() {
    if (canUseDOM()) {
      document.body.appendChild(this.el!);
    }
  }

  public componentWillUnmount() {
    if (canUseDOM()) {
      document.body.removeChild(this.el!);
    }
  }

  public render() {
    const { active, containerClassName, ...rest } = this.props;
    return this.el && this.state.active
      ? ReactDOM.createPortal(
          <ModalPortal close={this.close} {...rest} />,
          this.el,
        )
      : null;
  }

  private close = () => {
    this.setState({ active: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}
