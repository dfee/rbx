import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import { initialValue as modalInitialValue } from "src/components/modal/modal-context";
import {
  ModalPortal,
  ModalPortalProps,
} from "src/components/modal/modal-portal";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = ModalPortal;
const DISPLAY_NAME = "Modal.Portal";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal";

const makeNode = (props: ModalPortalProps) => {
  const withDefaults = { document, ...props };

  return <ModalPortal {...withDefaults} />;
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const modalContextProviderWrapper = Enzyme.shallow(node);
  const forwardRefWrapper = modalContextProviderWrapper.children();
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
};

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(ModalPortal, {
    defaultProps: {
      closeOnBlur: modalInitialValue.closeOnBlur,
      closeOnEsc: modalInitialValue.closeOnEsc,
    },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeNode,
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
    refProp: "innerRef",
  });

  testThemeIntegration(COMPONENT, {
    makeNode,
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
  });

  describe("extra", () => {
    [false, true].map(closeOnEsc => {
      it(`should ${
        closeOnEsc ? "" : "not "
      }call the context's onClose on ESC keydown when closeOnEsc is ${closeOnEsc}`, () => {
        const close = jest.fn();
        const ref = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.mount(
          <ModalPortal
            document={document}
            closeOnEsc={closeOnEsc}
            innerRef={ref}
            onClose={close}
          />,
        );

        try {
          const escEvent = new KeyboardEvent("keydown", { code: "Escape" });
          document.dispatchEvent(escEvent);
          expect(close.mock.calls).toHaveLength(closeOnEsc ? 1 : 0);
        } finally {
          wrapper.unmount();
        }
      });
    });
  });
});
