import Enzyme from "enzyme";
import React from "react";

import { Modal } from "../modal";
import { ModalBackground } from "../modal-background";
import { ModalCard } from "../modal-card";
import { ModalClose } from "../modal-close";
import { ModalContainer } from "../modal-container";
import { ModalContent } from "../modal-content";
import { ModalContext } from "../modal-context";
import { ModalPortal } from "../modal-portal";

import {
  hasProperties,
  makeNodeFactory,
  validateBoolPropType,
  validatePropType,
} from "../../../__tests__/testing";

const COMPONENT = Modal;
const COMPONENT_NAME = "Modal";
const DEFAULT_ELEMENT = "div";
// const BULMA_CLASS_NAME = "modal";

const makeNode = makeNodeFactory(Modal);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Container: ModalContainer,
    Content: ModalContent,
    Context: ModalContext,
    Portal: ModalPortal,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  test("it renders a ModalContainer", () => {
    const node = makeNode({});
    const wrapper = Enzyme.shallow(node);
    expect(wrapper.is(ModalContainer)).toBe(true);
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active =>
        test(`it forwards active: ${active}`, () => {
          const node = makeNode({ active });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().active).toBe(active);
        }),
      );
    });

    describe("as", () => {
      test("it forwards", () => {
        const as = () => <div />;
        const node = makeNode({ as });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().as).toBe(as);
      });
    });

    describe("className", () => {
      test("it forwards", () => {
        const className = "foo";
        const node = makeNode({ className });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().className).toBe(className);
      });
    });

    describe("closeOnBlur", () => {
      validateBoolPropType(propTypes, "closeOnBlur");

      [false, true].map(closeOnBlur =>
        test(`it forwards closeOnBlur: ${closeOnBlur}`, () => {
          const node = makeNode({ closeOnBlur });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().closeOnBlur).toBe(closeOnBlur);
        }),
      );
    });

    describe("closeOnEsc", () => {
      validateBoolPropType(propTypes, "closeOnEsc");

      [false, true].map(closeOnEsc =>
        test(`it forwards closeOnEsc: ${closeOnEsc}`, () => {
          const node = makeNode({ closeOnEsc });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().closeOnEsc).toBe(closeOnEsc);
        }),
      );
    });

    describe("containerClassName", () => {
      test("it forwards", () => {
        const containerClassName = "foo";
        const node = makeNode({ containerClassName });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().containerClassName).toBe(containerClassName);
      });
    });

    describe("onClose", () => {
      validatePropType(propTypes, "onClose", [
        { value: () => null, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      test("it forwards", () => {
        const onClose = jest.fn();
        const node = makeNode({ onClose });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().onClose).toBe(onClose);
      });
    });

    describe("ref", () => {
      test("it forwards", () => {
        const ref = React.createRef<HTMLDivElement>();
        const node = makeNode({ ref });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().innerRef).toBe(ref);
      });
    });
  });
});
