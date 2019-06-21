import { JSDOM } from "jsdom";
import React, { createRef } from "react";

import { Modal } from "src/components/modal/modal";
import { ModalBackground } from "src/components/modal/modal-background";
import { ModalCard } from "src/components/modal/modal-card";
import { ModalClose } from "src/components/modal/modal-close";
import { ModalContent } from "src/components/modal/modal-content";
import {
  ModalContext,
  ModalContextValue,
} from "src/components/modal/modal-context";
import { ModalPortal } from "src/components/modal/modal-portal";
import {
  hasProperties,
  validateBoolPropType,
  validatePropType,
  validateStringPropType,
  withEnzymeMount,
} from "src/__tests__/testing";

const COMPONENT = Modal;
const DISPLAY_NAME = "Modal";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "modal";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Content: ModalContent,
    Context: ModalContext,
    defaultProps: {
      as: DEFAULT_ELEMENT,
      clipped: true,
    },
    Portal: ModalPortal,
  });

  describe("ForwardRefAsExoticComponent [integration]", () => {
    const Component = COMPONENT;
    const displayName = DISPLAY_NAME;

    it(`should have displayName: ${displayName}`, () => {
      expect(Component.displayName).toEqual(displayName);
    });
  });

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const CONTAINER_CLASS_NAME = "modal-container";

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].forEach(active =>
        ["DEFAULT", "span"].forEach(asType => {
          it(`should ${active ? "" : "not "}render as the ${
            asType === "DEFAULT" ? "default" : "custom"
          } element when ${active ? "" : "not "}active`, () => {
            const props = {
              active,
              as:
                asType === "DEFAULT" ? undefined : (asType as React.ReactType),
              containerClassName: CONTAINER_CLASS_NAME,
            };

            const node = <Modal {...props} />;
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

    describe("clipped", () => {
      validateBoolPropType(propTypes, "clipped");

      [false, true].forEach(clipped => {
        it(`should passthrough clipped as ${clipped}`, () => {
          const node = <Modal active clipped={clipped} />;
          withEnzymeMount({ node }, ({ context: { wrapper } }) => {
            const modalPortalWrapper = wrapper.find(ModalPortal);
            expect(modalPortalWrapper.props().clipped).toEqual(clipped);
          });
        });
      });
    });

    describe("closeOnBlur", () => {
      validateBoolPropType(propTypes, "closeOnBlur");

      [false, true].forEach(closeOnBlur => {
        it(`should passthrough closeOnBlur as ${closeOnBlur}`, () => {
          const node = <Modal active closeOnBlur={closeOnBlur} />;
          withEnzymeMount({ node }, ({ context: { wrapper } }) => {
            const modalPortalWrapper = wrapper.find(ModalPortal);
            expect(modalPortalWrapper.props().closeOnBlur).toEqual(closeOnBlur);
          });
        });
      });
    });

    describe("closeOnEsc", () => {
      validateBoolPropType(propTypes, "closeOnEsc");

      [false, true].forEach(closeOnEsc => {
        it(`should passthrough closeOnEsc as ${closeOnEsc}`, () => {
          const node = <Modal active closeOnEsc={closeOnEsc} />;
          withEnzymeMount({ node }, ({ context: { wrapper } }) => {
            const modalPortalWrapper = wrapper.find(ModalPortal);
            expect(modalPortalWrapper.props().closeOnEsc).toEqual(closeOnEsc);
          });
        });
      });
    });

    describe("containerClassName", () => {
      validateStringPropType(propTypes, "containerClassName");
    });

    describe("document", () => {
      validatePropType(propTypes, "document", [
        { descriptor: "obj", valid: true, value: document },
        { valid: false, value: "string" },
      ]);

      ["global", "provided"].forEach(docOpt => {
        it(`should use the ${docOpt} document`, () => {
          const ref = React.createRef<HTMLDivElement>();
          const doc =
            docOpt === "global" ? window.document : new JSDOM().window.document;
          const node = <Modal ref={ref} active document={doc} />;
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

    describe("onClose", () => {
      validatePropType(propTypes, "onClose", [
        { descriptor: "func", valid: true, value: () => undefined },
        { valid: false, value: "string" },
      ]);

      [false, true].forEach(hasOnClose => {
        it(`should ${hasOnClose ? "" : "not "}call onClose when closed`, () => {
          let contextValue: ModalContextValue | undefined;
          const onClose = jest.fn();

          const handleClose = hasOnClose ? onClose : undefined;
          const node = (
            <Modal active onClose={handleClose}>
              <ModalContext.Consumer>
                {context => {
                  contextValue = context;

                  return undefined;
                }}
              </ModalContext.Consumer>
            </Modal>
          );

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

    describe("ref", () => {
      it("should forward ref", () => {
        const ref = createRef<HTMLDivElement>();
        const node = <Modal ref={ref} active />;
        withEnzymeMount({ node }, ({ context: { wrapper } }) => {
          expect(ref.current).toBe(
            wrapper.find(`${DEFAULT_ELEMENT}.${BULMA_CLASS_NAME}`).instance(),
          );
        });
      });
    });
  });
});
