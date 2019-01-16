import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import { ModalBackground } from "src/components/modal/modal-background";
import {
  initialValue as modalInitialValue,
  ModalContextValue,
} from "src/components/modal/modal-context";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "src/__tests__/testing";

const COMPONENT = ModalBackground;
const COMPONENT_NAME = "ModalBackground";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal-background";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapperInModalContextConsumer = (
  node: JSX.Element,
  modalContextValue: ModalContextValue = modalInitialValue,
) => {
  const modalContextConsumerWrapper = Enzyme.shallow(node);
  const ModalContextConsumerChildren = (modalContextConsumerWrapper.props() as {
    children: React.FC<ModalContextValue>;
  }).children;

  return Enzyme.shallow(
    <ModalContextConsumerChildren {...modalContextValue} />,
  );
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
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
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

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => undefined, valid: true, descriptor: "func" },
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
