import Enzyme from "enzyme";
import React from "react";

import { Modal, ModalController } from "../modal";
import { ModalBackground } from "../modal-background";
import { ModalCard } from "../modal-card";
import { ModalClose } from "../modal-close";
import { ModalContent } from "../modal-content";
import { ModalPortal } from "../modal-portal";

import {
  hasProperties,
  validateBoolPropType,
  validatePropType,
  validateStringPropType,
} from "@/__tests__/testing";

describe("Modal component", () => {
  hasProperties(Modal, {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Content: ModalContent,
    defaultProps: { as: "div" },
  });

  [false, true].map(active =>
    it(`should ${active ? "" : "not "}render as the default element when ${
      active ? "" : "not "
    }active`, () => {
      const wrapper = Enzyme.mount(
        <Modal
          active={active}
          containerClassName="modal-container"
          onClose={jest.fn()}
        />,
      );
      try {
        expect(document.getElementsByClassName("modal-container").length).toBe(
          1,
        );
        if (active) {
          expect(
            wrapper
              .find(ModalPortal)
              .children()
              .is("div"),
          ).toBe(active);
        } else {
          expect(wrapper.find(ModalPortal)).toHaveLength(0);
        }
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [false, true].map(active =>
    it(`should ${active ? "" : "not "}render as a custom component when ${
      active ? "" : "not "
    }active`, () => {
      const as = "span";
      const wrapper = Enzyme.mount(
        <Modal
          active={active}
          as={as}
          containerClassName="modal-container"
          onClose={jest.fn()}
        />,
      );
      try {
        expect(document.getElementsByClassName("modal-container").length).toBe(
          1,
        );
        if (active) {
          expect(
            wrapper
              .find(ModalPortal)
              .children()
              .is(as),
          ).toBe(active);
        } else {
          expect(wrapper.find(ModalPortal)).toHaveLength(0);
        }
      } finally {
        wrapper.unmount();
      }
    }),
  );

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Modal active ref={ref} onClose={jest.fn()} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".modal").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.mount(<Modal active onClose={jest.fn()} />);
    try {
      expect(
        wrapper
          .find(ModalPortal)
          .children()
          .hasClass("modal"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.mount(
      <Modal active onClose={jest.fn()} className={className} />,
    );
    try {
      expect(wrapper.find(ModalPortal).hasClass(className)).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should render as active", () => {
    const wrapper = Enzyme.mount(<Modal active onClose={jest.fn()} />);
    try {
      expect(wrapper.find(ModalPortal)).toHaveLength(1);
    } finally {
      wrapper.unmount();
    }
  });

  it("should passthrough props", () => {
    const props = {
      children: <div id="foo">bar</div>,
      onClose: jest.fn(),
    };

    const wrapper = Enzyme.mount(<Modal active {...props} />);
    try {
      const modalPortal = wrapper.find(ModalPortal);

      // children
      const modal = modalPortal.children();
      expect(modal.children().equals(props.children)).toBe(true);

      // onClose
      modalPortal.props().onClose();
      expect(props.onClose.mock.calls.length).toBe(1);
    } finally {
      wrapper.unmount();
    }
  });

  describe("ssr", () => {
    let initWindow: Window;

    beforeEach(() => {
      initWindow = (global as any).window;
      delete (global as any).window;
    });

    afterEach(() => {
      (global as any).window = initWindow;
    });

    it("should render without window being available (ssr)", () => {
      const ref = React.createRef<HTMLDivElement>();
      const wrapper = Enzyme.shallow(
        <ModalController innerRef={ref} as="div" onClose={jest.fn()} active />,
      );
      wrapper.unmount();
      expect(wrapper.type()).toBeNull();
    });
  });

  describe("propTypes", () => {
    const { propTypes } = Modal;
    validateBoolPropType(propTypes, "active");
    validateStringPropType(propTypes, "className");
    validateStringPropType(propTypes, "containerClassName");
    validateBoolPropType(propTypes, "closeOnBlur");
    validateBoolPropType(propTypes, "closeOnEsc");
    validatePropType(propTypes, "onClose", [
      { value: () => null, valid: true, descriptor: "func" },
      { value: "string", valid: false },
    ]);
  });
});
