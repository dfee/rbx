import { JSDOM } from "jsdom";
import * as React from "react";

import {
  ModalPortal,
  ModalPortalProps,
} from "src/components/modal/modal-portal";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  GetInnerShallowWrapperFunction,
  withEnzymeMount,
} from "src/__tests__/testing";

import { makeShallowWrapperFactory, makeReactWrapperFactory } from "./testing";

const COMPONENT = ModalPortal;
const DISPLAY_NAME = "Modal.Portal";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal";

const makeNode = (props: ModalPortalProps) => (
  <ModalPortal document={document} {...props} />
);

const getLeafShallowWrappper: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // ContextProvider
    .dive() //  Modal.Portal
    .dive() // ContextProvider
    .dive() // Generic
    .dive(); // Leaf ("as")

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(ModalPortal, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeNode,
    makeShallowWrapper: makeShallowWrapperFactory(getLeafShallowWrappper),
  });

  testThemeIntegration(COMPONENT, {
    makeNode,
    makeShallowWrapper: makeShallowWrapperFactory(getLeafShallowWrappper),
  });

  describe("extra", () => {
    [false, true].forEach(closeOnEsc => {
      it(`should ${
        closeOnEsc ? "" : "not "
      }call the context's onClose on ESC keydown when closeOnEsc is ${closeOnEsc}`, () => {
        const close = jest.fn();
        const ref = React.createRef<HTMLDivElement>();

        const makeReactWrapper = makeReactWrapperFactory();
        const node = (
          <ModalPortal
            ref={ref}
            closeOnEsc={closeOnEsc}
            document={document}
            onClose={close}
          />
        );
        const wrapper = makeReactWrapper({ node });
        if (wrapper === undefined) {
          throw new Error("todo: replace with teardown");
        }

        const escEvent = new KeyboardEvent("keydown", { code: "Escape" });
        document.dispatchEvent(escEvent);
        expect(close.mock.calls).toHaveLength(closeOnEsc ? 1 : 0);
      });
    });
  });

  describe("props", () => {
    describe("clipped", () => {
      [false, true].forEach(clipped => {
        ["global", "provided"].forEach(docOpt => {
          const doc =
            docOpt === "global" ? window.document : new JSDOM().window.document;
          it(`should ${
            clipped ? "" : "not "
          }set clipped on ${docOpt} document`, () => {
            const node = <ModalPortal clipped={clipped} document={doc} />;
            withEnzymeMount({ node }, () => {
              const docHtml = doc.querySelector("html");
              if (docHtml === null) {
                throw new Error("doc html should exist");
              }
              expect(docHtml.className).toBe(clipped ? "is-clipped" : "");
            });
          });
        });
      });
    });
  });
});
