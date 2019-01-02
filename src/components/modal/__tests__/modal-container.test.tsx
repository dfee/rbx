import Enzyme from "enzyme";
import React from "react";

import { ModalContainer, ModalContainerProps } from "../modal-container";
import { ModalContext, ModalContextValue } from "../modal-context";
import { ModalPortal } from "../modal-portal";

import { withEnzymeMount } from "../../../__tests__/testing";

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
      const initialWindow = (global as any).window;
      try {
        delete (global as any).window;
        const ref = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.shallow(
          <ModalContainer innerRef={ref} as="div" onClose={jest.fn()} active />,
        );
        wrapper.unmount();
        expect(wrapper.type()).toBeNull();
      } finally {
        (global as any).window = initialWindow;
      }
    });
  });

  describe("props", () => {
    const CONTAINER_CLASS_NAME = "modal-container";

    describe("active", () => {
      [false, true].map(active =>
        ["DEFAULT", "span"].map(as =>
          it(`should ${active ? "" : "not "}render as the ${
            as === "DEFAULT" ? "default" : "custom"
          } element when ${active ? "" : "not "}active`, () => {
            const node = makeNode({
              active,
              as: as === "DEFAULT" ? undefined : (as as React.ReactType<any>),
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
                    .is(as === "DEFAULT" ? DEFAULT_ELEMENT : as),
                ).toBe(active);
              } else {
                expect(wrapper.find(ModalPortal)).toHaveLength(0);
              }
            });
          }),
        ),
      );
    });

    describe("closeOnBlur", () => {
      [false, true].map(closeOnBlur =>
        it(`should passthrough closeOnBlur as ${closeOnBlur}`, () => {
          const node = makeNode({ active: true, closeOnBlur });
          withEnzymeMount({ node }, ({ context: { wrapper } }) => {
            const modalPortalWrapper = wrapper.find(ModalPortal);
            expect(modalPortalWrapper.props().closeOnBlur).toEqual(closeOnBlur);
          });
        }),
      );
    });

    describe("closeOnEsc", () => {
      [false, true].map(closeOnEsc =>
        it(`should passthrough closeOnEsc as ${closeOnEsc}`, () => {
          const node = makeNode({ active: true, closeOnEsc });
          withEnzymeMount({ node }, ({ context: { wrapper } }) => {
            const modalPortalWrapper = wrapper.find(ModalPortal);
            expect(modalPortalWrapper.props().closeOnEsc).toEqual(closeOnEsc);
          });
        }),
      );
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
      [false, true].map(hasOnClose =>
        it(`should ${hasOnClose ? "" : "not "}call onClose when closed`, () => {
          let contextValue: ModalContextValue | undefined;
          const onClose = jest.fn();
          const node = makeNode({
            active: true,
            children: (
              <ModalContext.Consumer>
                {context => {
                  contextValue = context;
                  return null;
                }}
              </ModalContext.Consumer>
            ),
            onClose: hasOnClose ? onClose : undefined,
          });
          withEnzymeMount({ node }, () => {
            contextValue!.close();
            if (hasOnClose) {
              expect(onClose.mock.calls).toHaveLength(1);
              expect(onClose.mock.calls[0]).toEqual([]);
            }
          });
        }),
      );
    });
  });
});
