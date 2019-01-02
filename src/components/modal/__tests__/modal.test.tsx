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

import { hasProperties, makeNodeFactory } from "../../../__tests__/testing";

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
    describe("ref", () => {
      test("it forwards", () => {
        const ref = React.createRef<HTMLDivElement>();
        const node = makeNode({ ref });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().innerRef).toBe(ref);
      });
    });

    describe("as", () => {
      test("it forwards", () => {
        const as = () => <div />;
        const node = makeNode({ as });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().as).toBe(as);
      });
    });
  });
});
