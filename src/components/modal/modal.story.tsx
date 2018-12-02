import { storiesOf } from "@storybook/react";
import React from "react";

import { Modal } from "@/components";
import { Button, Content, Image } from "@/elements";
import { Level, Media, Section } from "@/layout";

interface OpenModalProps {
  modal?: {};
  children: React.ReactNode;
}

interface OpenModalState {
  show: boolean;
}

class OpenModal extends React.Component<OpenModalProps, OpenModalState> {
  public static defaultProps = {
    modal: {},
  };

  public readonly state: OpenModalState = { show: false };

  public render() {
    return (
      <div>
        <Button onClick={this.open}>Open</Button>
        <Modal
          show={this.state.show}
          onClose={this.close}
          {...this.props.modal}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }

  private open = () => this.setState({ show: true });
  private close = () => this.setState({ show: false });
}

storiesOf("Components/Modal", module)
  .add("Default", () => (
    <OpenModal modal={{ closeOnEsc: false }}>
      <Modal.Content>
        <Section style={{ backgroundColor: "white" }}>
          Click on the {'"X"'} button on the top-right button to close the Modal
          (pass closeOnEsc=false to the modal to avoid closing it with the
          keyboard)
        </Section>
      </Modal.Content>
    </OpenModal>
  ))
  .add("Close with keyboard", () => (
    <OpenModal modal={{ showClose: false }}>
      <Modal.Content>
        <Section style={{ backgroundColor: "white" }}>
          Press ESC on your keyboard to close this modal, Pass showClose: false
          if you want to hide the close button
        </Section>
      </Modal.Content>
    </OpenModal>
  ))
  .add("Close on click outside", () => (
    <OpenModal modal={{ closeOnBlur: true, showClose: false }}>
      <Modal.Content>
        <Section style={{ backgroundColor: "white" }}>
          Pass closeOnBlur: true to enable to close the Modal when the user
          click outside the main modal container
        </Section>
      </Modal.Content>
    </OpenModal>
  ))
  .add("Modal Card", () => (
    <OpenModal modal={{ closeOnBlur: true }}>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Title</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Media>
            <Media.Item<"figure"> as="figure" position="left">
              <Image
                as="p"
                size={64}
                alt="64x64"
                src="http://bulma.io/images/placeholders/128x128.png"
              />
            </Media.Item>
            <Media.Item>
              <Content>
                <p>
                  <strong>Devin Fee</strong> <small>@dfee</small>{" "}
                  <small>31m</small>
                  <br />
                  If the children of the Modal is a card, the close button will
                  be on the Card Head instead than the top-right corner You can
                  also pass showClose = false to Card.Head to hide the close
                  button
                </p>
              </Content>
              <Level breakpoint="mobile">
                <Level.Side align="left">
                  <Button color="link">Like</Button>
                  <Button color="link">Share</Button>
                </Level.Side>
              </Level>
            </Media.Item>
          </Media>
        </Modal.Card.Body>
        <Modal.Card.Foot
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p>Lorem Ipsum...</p>
        </Modal.Card.Foot>
      </Modal.Card>
    </OpenModal>
  ));
