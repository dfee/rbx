import * as Enzyme from "enzyme";
import { JSDOM } from "jsdom";
import * as React from "react";

import {
  ModalContainer,
  ModalContainerProps,
} from "src/components/modal/modal-container";
import {
  ModalContext,
  ModalContextValue,
} from "src/components/modal/modal-context";
import { ModalPortal } from "src/components/modal/modal-portal";

import { withEnzymeMount, withWindow } from "src/__tests__/testing";

// const COMPONENT = ModalContainer;
const COMPONENT_NAME = "ModalContainer";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal";

const makeNode = (props: ModalContainerProps) => {
  return <ModalContainer {...props} />;
};

describe(`${COMPONENT_NAME} component`, () => {
  describe("ssr", () => {
    it("should render without window being available (ssr)", () => {
      withWindow({}, () => {
        const ref = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.shallow(
          <ModalContainer innerRef={ref} onClose={jest.fn()} active />,
        );
        wrapper.unmount();
        expect(wrapper.type()).toBeNull();
      });
    });
  });

  describe("props", () => {
    const CONTAINER_CLASS_NAME = "modal-container";

    describe("active", () => {
      [false, true].map(active =>
        ["DEFAULT", "span"].map(asType => {
          it(`should ${active ? "" : "not "}render as the ${
            asType === "DEFAULT" ? "default" : "custom"
          } element when ${active ? "" : "not "}active`, () => {
            const node = makeNode({
              active,
              as:
                asType === "DEFAULT" ? undefined : (asType as React.ReactType),
              containerClassName: CONTAINER_CLASS_NAME,
            });
            withEnzymeMount({ node }, ({ context: { wrapper } }) => {
              expect(
                document.getElementsByClassName(CONTAINER_CLASS_NAME).length,
              ).toBe(1);
              if (active) {
                expect(
                  wrapper
                    .find(ModalPortal)
                    .children() // Generic's ForwardRef
                    .children()
                    .is(asType === "DEFAULT" ? DEFAULT_ELEMENT : asType),
                ).toBe(active);
              } else {
                expect(wrapper.find(ModalPortal)).toHaveLength(0);
              }
            });
          });
        }),
      );
    });

    describe("closeOnBlur", () => {
      [false, true].map(closeOnBlur => {
        it(`should passthrough closeOnBlur as ${closeOnBlur}`, () => {
          const node = makeNode({ active: true, closeOnBlur });
          withEnzymeMount({ node }, ({ context: { wrapper } }) => {
            const modalPortalWrapper = wrapper.find(ModalPortal);
            expect(modalPortalWrapper.props().closeOnBlur).toEqual(closeOnBlur);
          });
        });
      });
    });

    describe("closeOnEsc", () => {
      [false, true].map(closeOnEsc => {
        it(`should passthrough closeOnEsc as ${closeOnEsc}`, () => {
          const node = makeNode({ active: true, closeOnEsc });
          withEnzymeMount({ node }, ({ context: { wrapper } }) => {
            const modalPortalWrapper = wrapper.find(ModalPortal);
            expect(modalPortalWrapper.props().closeOnEsc).toEqual(closeOnEsc);
          });
        });
      });
    });

    describe("document", () => {
      ["global", "provided"].map(docOpt => {
        it(`should use the ${docOpt} document`, () => {
          const ref = React.createRef<HTMLDivElement>();
          const doc =
            docOpt === "global" ? window.document : new JSDOM().window.document;
          const node = makeNode({ active: true, document: doc, innerRef: ref });
          withEnzymeMount({ node }, () => {
            if (docOpt === "provided") {
              // make sure we're doing this right.
              expect(doc).not.toBe(window.document);
            }
            if (ref.current === null) {
              throw new Error("ref should be set");
            }
            expect(ref.current.ownerDocument).toBe(doc);
          });
        });
      });
    });

    describe("innerRef", () => {
      it("should forward ref", () => {
        const ref = React.createRef<HTMLDivElement>();
        const node = makeNode({ active: true, innerRef: ref });
        withEnzymeMount({ node }, ({ context: { wrapper } }) => {
          expect(ref.current).toBe(
            wrapper.find(`${DEFAULT_ELEMENT}.${BULMA_CLASS_NAME}`).instance(),
          );
        });
      });
    });

    describe("onClose", () => {
      [false, true].map(hasOnClose => {
        it(`should ${hasOnClose ? "" : "not "}call onClose when closed`, () => {
          let contextValue: ModalContextValue | undefined;
          const onClose = jest.fn();
          const node = makeNode({
            active: true,
            children: (
              <ModalContext.Consumer>
                {context => {
                  contextValue = context;

                  return undefined;
                }}
              </ModalContext.Consumer>
            ),
            onClose: hasOnClose ? onClose : undefined,
          });
          withEnzymeMount({ node }, () => {
            if (contextValue === undefined) {
              throw new Error("should have contextValue");
            }
            contextValue.close();
            if (hasOnClose) {
              expect(onClose.mock.calls).toHaveLength(1);
              expect(onClose.mock.calls[0]).toEqual([]);
            }
          });
        });
      });
    });
  });
});
