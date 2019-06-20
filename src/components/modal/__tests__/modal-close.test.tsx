import React from "react";

import { ModalClose } from "src/components/modal/modal-close";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "src/__tests__/testing";

import {
  makeReactWrapperFactory,
  makeShallowWrapperFactory,
  getInnerReactWrapper,
} from "./testing";

const COMPONENT = ModalClose;
const DISPLAY_NAME = "Modal.Close";
const DEFAULT_ELEMENT = "button";
const BULMA_CLASS_NAME = "modal-close";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeShallowWrapperFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperFactory(),
    makeShallowWrapper: makeShallowWrapperFactory(),
  });

  describe("extra", () => {
    const makeShallowWrapper = makeShallowWrapperFactory();
    it("should have aria-label", () => {
      const node = <ModalClose />;
      const wrapper = makeShallowWrapper({ node });
      expect(
        (wrapper.props() as React.HTMLAttributes<Element>)["aria-label"],
      ).toEqual("close");
    });

    it("should be large", () => {
      const node = <ModalClose />;
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.hasClass("is-large")).toBe(true);
    });
  });

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
            const onClick = hasOnClick ? jest.fn() : undefined;
            const close = jest.fn();

            const makeReactWrapper = makeReactWrapperFactory(
              getInnerReactWrapper,
              {
                close,
                closeOnBlur,
                closeOnEsc: true,
              },
            );
            const node = <ModalClose onClick={onClick} />;
            const wrapper = makeReactWrapper({ node });

            wrapper.simulate("click");
            if (onClick !== undefined) {
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
