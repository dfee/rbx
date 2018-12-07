// import { mount, ReactWrapper } from "enzyme";
// import React from "react";
// import { renderToString } from "react-dom/server";

// import { getWindow, setupWindow, teardownWindow } from "@/__tests__/helpers";
// import { noop } from "@/utils";
// import { Modal, ModalProps } from "../modal";

// describe("Modal component", () => {
//   let component: ReactWrapper<ModalProps>;

//   beforeEach(() => {
//     setupWindow();
//   });

//   afterEach(() => {
//     if (component && component.exists() && component.unmount) {
//       component.unmount();
//     }
//     teardownWindow();
//   });

//   it("should exist", () => {
//     expect(Modal).toMatchSnapshot();
//   });

//   it("should expose Content and Card's types", () => {
//     expect(Modal.Content).toMatchSnapshot();
//     expect(Modal.Card).toMatchSnapshot();
//     expect(Modal.Card.Title).toMatchSnapshot();
//     expect(Modal.Card.Head).toMatchSnapshot();
//     expect(Modal.Card.Body).toMatchSnapshot();
//     expect(Modal.Card.Foot).toMatchSnapshot();
//   });

//   it("should render modal-card-head", () => {
//     const onClose = jest.fn();
//     component = mount(
//       <Modal.Card onClose={onClose}>
//         <Modal.Card.Head onClose={onClose}>
//           <Modal.Card.Title>Modal Title</Modal.Card.Title>
//         </Modal.Card.Head>
//       </Modal.Card>,
//     );
//     component.find(".delete").simulate("click");
//     expect(onClose).toHaveBeenCalledTimes(1);
//   });

//   it("should open the modal", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal document={window.document} show={false} onClose={onClose}>
//         <Modal.Card>
//           <Modal.Card.Head>
//             <Modal.Card.Title>Modal Title</Modal.Card.Title>
//           </Modal.Card.Head>
//         </Modal.Card>
//       </Modal>,
//     );
//     expect(window.document.querySelector("div.modal.is-active")).toBeNull();
//     component.setProps({ show: true });
//     expect(
//       window.document.querySelector("div.modal.is-active"),
//     ).toMatchSnapshot();
//   });

//   it("should close the modal", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal document={window.document} show onClose={onClose}>
//         <Modal.Card>
//           <Modal.Card.Head onClose={onClose}>
//             <Modal.Card.Title>Modal Title</Modal.Card.Title>
//           </Modal.Card.Head>
//         </Modal.Card>
//       </Modal>,
//     );
//     const modal = window.document.querySelector("div.modal.is-active");
//     expect(modal).toMatchSnapshot();
//     const button = (modal as Element).querySelector<HTMLButtonElement>(
//       "button.modal-close",
//     );
//     (button as HTMLButtonElement).click();
//     expect(onClose).toHaveBeenCalledTimes(1);
//     expect(window.document.querySelector("div.modal.is-active")).toBeNull();
//   });

//   it("should close the modal on ESC key press", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal document={window.document} show onClose={onClose}>
//         <Modal.Card>
//           <Modal.Card.Head>
//             <Modal.Card.Title>Modal Title</Modal.Card.Title>
//           </Modal.Card.Head>
//         </Modal.Card>
//       </Modal>,
//     );
//     const modal = window.document.querySelector("div.modal.is-active");
//     expect(modal).toMatchSnapshot();
//     const event = new window.KeyboardEvent("keydown", { code: "Escape" });
//     window.document.dispatchEvent(event);
//     expect(onClose).toHaveBeenCalledTimes(1);
//     expect(window.document.querySelector("div.modal.is-active")).toBeNull();
//   });

//   it("should not close the modal on ESC key press", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal
//         closeOnEsc={false}
//         document={window.document}
//         show
//         onClose={onClose}
//       >
//         <Modal.Card>
//           <Modal.Card.Head>
//             <Modal.Card.Title>Modal Title</Modal.Card.Title>
//           </Modal.Card.Head>
//         </Modal.Card>
//       </Modal>,
//     );
//     const modal = window.document.querySelector("div.modal.is-active");
//     expect(modal).toMatchSnapshot();
//     const event = new window.KeyboardEvent("keydown", { code: "Escape" });
//     window.document.dispatchEvent(event);
//     expect(onClose).not.toHaveBeenCalled();
//     expect(modal).not.toBe(null);
//   });

//   it("should not close the modal on other than ESC key press", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal closeOnEsc document={window.document} show onClose={onClose}>
//         <Modal.Card>
//           <Modal.Card.Head>
//             <Modal.Card.Title>Modal Title</Modal.Card.Title>
//           </Modal.Card.Head>
//           <Modal.Card.Body>Body</Modal.Card.Body>
//           <Modal.Card.Foot>Footer</Modal.Card.Foot>
//         </Modal.Card>
//       </Modal>,
//     );
//     const modal = window.document.querySelector("div.modal.is-active");
//     expect(modal).toMatchSnapshot();
//     const event = new window.KeyboardEvent("keydown", { code: "End" });
//     window.document.dispatchEvent(event);
//     expect(onClose).not.toHaveBeenCalled();
//     expect(modal).not.toBe(null);
//   });

//   it("should render any child type", () => {
//     const window = getWindow();
//     const onClose = jest.fn();
//     component = mount(
//       <Modal document={window.document} show onClose={onClose}>
//         <div>CHILDREN</div>
//         <div>CHILDREN</div>
//       </Modal>,
//     );
//     expect(
//       window.document.querySelector("div.modal.is-active"),
//     ).toMatchSnapshot();
//   });

//   it("should not try to reopen if other prop change", () => {
//     const window = getWindow();
//     const onClose = jest.fn();
//     component = mount(
//       <Modal document={window.document} show onClose={onClose}>
//         <Modal.Content>Content</Modal.Content>
//       </Modal>,
//     );
//     component.setProps({ closeOnBlur: true });
//     expect(
//       window.document.querySelector("div.modal.is-active"),
//     ).toMatchSnapshot();
//   });

//   it("should close the modal if clicked on background", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal document={window.document} show onClose={onClose} closeOnBlur>
//         <Modal.Content>Content</Modal.Content>
//       </Modal>,
//     );
//     const modal = window.document.querySelector("div.modal.is-active");
//     expect(modal).toMatchSnapshot();
//     const background = (modal as Element).querySelector<HTMLDivElement>(
//       "div.modal-background",
//     );
//     (background as HTMLDivElement).click();
//     expect(onClose).toHaveBeenCalledTimes(1);
//     expect(window.document.querySelector("div.modal.is-active")).toBeNull();
//   });

//   it("should not close the modal if clicked on background", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal
//         closeOnBlur={false}
//         document={window.document}
//         show
//         onClose={onClose}
//       >
//         <Modal.Content>Content</Modal.Content>
//       </Modal>,
//     );
//     const modal = window.document.querySelector("div.modal.is-active");
//     expect(modal).toMatchSnapshot();
//     const background = (modal as Element).querySelector<HTMLDivElement>(
//       "div.modal-background",
//     );
//     (background as HTMLDivElement).click();
//     expect(onClose).not.toHaveBeenCalled();
//     expect(
//       window.document.querySelector("div.modal.is-active"),
//     ).toMatchSnapshot();
//   });

//   it("should not show close button", () => {
//     const window = getWindow();
//     const onClose = jest.fn(() => {
//       component.setProps({ show: false });
//     });
//     component = mount(
//       <Modal
//         showClose={false}
//         document={window.document}
//         show
//         onClose={onClose}
//       >
//         <Modal.Content>Content</Modal.Content>
//       </Modal>,
//     );
//     const modal = window.document.querySelector("div.modal.is-active");
//     expect(modal).toMatchSnapshot();
//   });

//   it("should render empty because no document on scope", () => {
//     const componentString = renderToString(
//       <Modal show onClose={noop}>
//         <Modal.Content>Content</Modal.Content>
//       </Modal>,
//     );
//     expect(componentString).toMatchSnapshot();
//   });
// });
