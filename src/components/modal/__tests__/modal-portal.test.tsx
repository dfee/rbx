import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import { initialValue as modalInitialValue } from "../modal-context";
import { ModalPortal, ModalPortalProps } from "../modal-portal";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

// const COMPONENT = ModalPortal;
const COMPONENT_NAME = "ModalPortal";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal";

const makeNode = (props: ModalPortalProps) => {
  return <ModalPortal {...props} />;
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const modalContextProviderWrapper = Enzyme.shallow(node);
  const forwardRefWrapper = modalContextProviderWrapper.children();
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as any)
    .children;
  const wrapper = Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
  return wrapper;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(ModalPortal, {
    defaultProps: modalInitialValue,
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
    "innerRef",
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("extra", () => {
    [false, true].map(closeOnEsc =>
      it(`should ${
        closeOnEsc ? "" : "not "
      }call the context's onClose on ESC keydown when closeOnEsc is ${closeOnEsc}`, () => {
        const close = jest.fn();
        const ref = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.mount(
          <ModalPortal closeOnEsc={closeOnEsc} innerRef={ref} close={close} />,
        );

        try {
          const escEvent = new KeyboardEvent("keydown", { code: "Escape" });
          document.dispatchEvent(escEvent);
          expect(close.mock.calls).toHaveLength(closeOnEsc ? 1 : 0);
        } finally {
          wrapper.unmount();
        }
      }),
    );
  });
});
