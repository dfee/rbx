import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import { ModalClose } from "../modal-close";
import {
  initialValue as modalInitialValue,
  ModalContextValue,
} from "../modal-context";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "../../../__tests__/testing";

const COMPONENT = ModalClose;
const COMPONENT_NAME = "ModalClose";
const DEFAULT_ELEMENT = "button";
const BULMA_CLASS_NAME = "modal-close";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapperInModalContextConsumer = (
  node: JSX.Element,
  modalContextValue: ModalContextValue = modalInitialValue,
) => {
  const modalContextConsumerWrapper = Enzyme.shallow(node);
  const ModalContextConsumerChildren = modalContextConsumerWrapper.props()
    .children;
  const modalContextConsumerChildrenWrapper = Enzyme.shallow(
    <ModalContextConsumerChildren {...modalContextValue} />,
  );
  return modalContextConsumerChildrenWrapper;
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
  modalContextValue: ModalContextValue = modalInitialValue,
) => {
  const modalContextConsumerChildrenWrapper = makeShallowWrapperInModalContextConsumer(
    node,
    modalContextValue,
  );
  const themeContextConsumerWrapper = modalContextConsumerChildrenWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as any)
    .children;
  const wrapper = Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
  return wrapper;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("extra", () => {
    it("should have aria-label", () => {
      const node = makeNode({});
      const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
      expect(wrapper.props()["aria-label"]).toEqual("close");
    });

    it("should be large", () => {
      const node = makeNode({});
      const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
      expect(wrapper.hasClass("is-large")).toBe(true);
    });
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => null, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      [false, true].map(hasOnClick =>
        [false, true].map(closeOnBlur => {
          it(`should ${closeOnBlur ? "" : "not "}update context ${
            hasOnClick ? "and call onClick" : ""
          }`, () => {
            const onClick = jest.fn();
            const close = jest.fn();
            const node = makeNode({
              onClick: hasOnClick ? onClick : undefined,
            });
            const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
              node,
              themeInitialValue,
              {
                close,
                closeOnBlur,
                closeOnEsc: true,
              },
            );
            wrapper.simulate("click");
            if (hasOnClick) {
              expect(onClick.mock.calls).toHaveLength(1);
            }
            if (closeOnBlur) {
              expect(close.mock.calls).toHaveLength(1);
              expect(close.mock.calls[0]).toEqual([]);
            }
          });
        }),
      );
    });
  });
});
