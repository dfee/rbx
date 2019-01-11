import React from "react";

import { Button } from "src/elements/button";
import { Omit } from "src/types";
import { Modal, ModalProps } from "../modal";

interface SimpleModalManagerProps {
  modalProps: Omit<ModalProps, "onClose" | "active">;
  children: React.ReactNode;
}

interface SimpleModalManagerState {
  active: boolean;
}

export class SimpleModalManager extends React.Component<
  SimpleModalManagerProps,
  SimpleModalManagerState
> {
  public static defaultProps = {
    modalProps: {},
  };

  public readonly state: SimpleModalManagerState = { active: false };

  public render() {
    return (
      <div>
        <Button onClick={this.open}>Open modal</Button>
        <Modal
          active={this.state.active}
          onClose={this.close}
          {...this.props.modalProps}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }

  private readonly close = () => {
    this.setState({ active: false });
  }
  private readonly open = () => {
    this.setState({ active: true });
  }
}
