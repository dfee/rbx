import { mount, ReactWrapper } from "enzyme";
import { JSDOM } from "jsdom";
import React from "react";
import { renderToString } from "react-dom/server";

import { noop } from "utils";
import Modal from "..";
import { ModalRefProps } from "../modal";

type GlobalWithWindow = NodeJS.Global & { window?: JSDOM["window"] };

describe("Modal component", () => {
  let component: ReactWrapper<ModalRefProps>;

  function getWindow() {
    return (global as GlobalWithWindow).window!;
  }

  beforeEach(() => {
    (global as GlobalWithWindow).window = new JSDOM().window;
  });

  afterEach(() => {
    if (component && component.exists() && component.unmount) {
      component.unmount();
    }
    (global as GlobalWithWindow).window = undefined;
  });

  it("Should Exist", () => {
    expect(Modal).toMatchSnapshot();
  });

  it("Should expose Content and Card's types", () => {
    expect(Modal.Content).toMatchSnapshot();
    expect(Modal.Card).toMatchSnapshot();
    expect(Modal.Card.Title).toMatchSnapshot();
    expect(Modal.Card.Head).toMatchSnapshot();
    expect(Modal.Card.Body).toMatchSnapshot();
    expect(Modal.Card.Foot).toMatchSnapshot();
  });

  it("Should render modal-card-head", () => {
    const onClose = jest.fn();
    component = mount(
      <Modal.Card onClose={onClose}>
        <Modal.Card.Head onClose={onClose}>
          <Modal.Card.Title>Modal Title</Modal.Card.Title>
        </Modal.Card.Head>
      </Modal.Card>,
    );
    component.find(".delete").simulate("click");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Should open the modal", () => {
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal document={window.document} show={false} onClose={onClose}>
        <Modal.Card>
          <Modal.Card.Head>
            <Modal.Card.Title>Modal Title</Modal.Card.Title>
          </Modal.Card.Head>
        </Modal.Card>
      </Modal>,
    );
    expect(window.document.querySelector("div.modal.is-active")).toBeNull();
    component.setProps({ show: true });
    expect(
      window.document.querySelector("div.modal.is-active"),
    ).toMatchSnapshot();
  });

  it("Should close the modal", () => {
    // todo
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal document={window.document} show onClose={onClose}>
        <Modal.Card>
          <Modal.Card.Head onClose={onClose}>
            <Modal.Card.Title>Modal Title</Modal.Card.Title>
          </Modal.Card.Head>
        </Modal.Card>
      </Modal>,
    );
    const modal = window.document.querySelector("div.modal.is-active");
    expect(modal).toMatchSnapshot();
    const button = (modal as Element).querySelector<HTMLButtonElement>(
      "button.modal-close",
    );
    (button as HTMLButtonElement).click();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(window.document.querySelector("div.modal.is-active")).toBeNull();
  });

  it("Should close the modal on ESC key press", () => {
    // todo
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal document={window.document} show onClose={onClose}>
        <Modal.Card>
          <Modal.Card.Head>
            <Modal.Card.Title>Modal Title</Modal.Card.Title>
          </Modal.Card.Head>
        </Modal.Card>
      </Modal>,
    );
    const modal = window.document.querySelector("div.modal.is-active");
    expect(modal).toMatchSnapshot();
    const event = new window.KeyboardEvent("keydown", { code: "Escape" });
    window.document.dispatchEvent(event);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(window.document.querySelector("div.modal.is-active")).toBeNull();
  });

  it("Should not close the modal on ESC key press", () => {
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal
        closeOnEsc={false}
        document={window.document}
        show
        onClose={onClose}
      >
        <Modal.Card>
          <Modal.Card.Head>
            <Modal.Card.Title>Modal Title</Modal.Card.Title>
          </Modal.Card.Head>
        </Modal.Card>
      </Modal>,
    );
    const modal = window.document.querySelector("div.modal.is-active");
    expect(modal).toMatchSnapshot();
    const event = new window.KeyboardEvent("keydown", { code: "Escape" });
    window.document.dispatchEvent(event);
    expect(onClose).not.toHaveBeenCalled();
    expect(modal).not.toBe(null);
  });

  it("Should not close the modal on other than ESC key press", () => {
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal closeOnEsc document={window.document} show onClose={onClose}>
        <Modal.Card>
          <Modal.Card.Head>
            <Modal.Card.Title>Modal Title</Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>Body</Modal.Card.Body>
          <Modal.Card.Foot>Footer</Modal.Card.Foot>
        </Modal.Card>
      </Modal>,
    );
    const modal = window.document.querySelector("div.modal.is-active");
    expect(modal).toMatchSnapshot();
    const event = new window.KeyboardEvent("keydown", { code: "End" });
    window.document.dispatchEvent(event);
    expect(onClose).not.toHaveBeenCalled();
    expect(modal).not.toBe(null);
  });

  it("Should render any child type", () => {
    const window = getWindow();
    const onClose = jest.fn();
    component = mount(
      <Modal document={window.document} show onClose={onClose}>
        <div>CHILDREN</div>
        <div>CHILDREN</div>
      </Modal>,
    );
    expect(
      window.document.querySelector("div.modal.is-active"),
    ).toMatchSnapshot();
  });

  it("Should no try to reopen if other prop change", () => {
    const window = getWindow();
    const onClose = jest.fn();
    component = mount(
      <Modal document={window.document} show onClose={onClose}>
        <Modal.Content>Content</Modal.Content>
      </Modal>,
    );
    component.setProps({ closeOnBlur: true });
    expect(
      window.document.querySelector("div.modal.is-active"),
    ).toMatchSnapshot();
  });

  it("Should close the modal if clicked on background", () => {
    // todo
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal document={window.document} show onClose={onClose} closeOnBlur>
        <Modal.Content>Content</Modal.Content>
      </Modal>,
    );
    const modal = window.document.querySelector("div.modal.is-active");
    expect(modal).toMatchSnapshot();
    const background = (modal as Element).querySelector<HTMLDivElement>(
      "div.modal-background",
    );
    (background as HTMLDivElement).click();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(window.document.querySelector("div.modal.is-active")).toBeNull();
  });

  it("Should not close the modal if clicked on background", () => {
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal
        closeOnBlur={false}
        document={window.document}
        show
        onClose={onClose}
      >
        <Modal.Content>Content</Modal.Content>
      </Modal>,
    );
    const modal = window.document.querySelector("div.modal.is-active");
    expect(modal).toMatchSnapshot();
    const background = (modal as Element).querySelector<HTMLDivElement>(
      "div.modal-background",
    );
    (background as HTMLDivElement).click();
    expect(onClose).not.toHaveBeenCalled();
    expect(
      window.document.querySelector("div.modal.is-active"),
    ).toMatchSnapshot();
  });

  it("Should not show close button", () => {
    const window = getWindow();
    const onClose = jest.fn(() => {
      component.setProps({ show: false });
    });
    component = mount(
      <Modal
        showClose={false}
        document={window.document}
        show
        onClose={onClose}
      >
        <Modal.Content>Content</Modal.Content>
      </Modal>,
    );
    const modal = window.document.querySelector("div.modal.is-active");
    expect(modal).toMatchSnapshot();
  });

  it("Should render empty because no document on scope", () => {
    const componentString = renderToString(
      <Modal show onClose={noop}>
        <Modal.Content>Content</Modal.Content>
      </Modal>,
    );
    expect(componentString).toMatchSnapshot();
  });
});
