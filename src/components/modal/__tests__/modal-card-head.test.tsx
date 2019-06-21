import Enzyme from "enzyme";
import React from "react";

import { initialValue as modalInitialValue } from "src/components/modal/modal-context";
import { ModalCardHead } from "src/components/modal/modal-card-head";
import { Delete } from "src/elements";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

import {
  makeReactWrapperFactory,
  makeShallowWrapperFactory,
  getInnerReactWrapper,
} from "./testing";

const COMPONENT = ModalCardHead;
const DISPLAY_NAME = "Modal.Card.Head";
const DEFAULT_ELEMENT = "header";
const BULMA_CLASS_NAME = "modal-card-head";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperFactory(),
    makeShallowWrapper: makeShallowWrapperFactory(),
  });

  describe("props", () => {
    describe("children <delete button>", () => {
      const permutations = [
        {
          descriptor: "string",
          factory: (onClick: React.MouseEventHandler | undefined) => "string",
          getDelete: (wrapper: Enzyme.ReactWrapper<React.ReactType>) =>
            undefined,
        },
        {
          descriptor: "delete button",
          factory: (onClick: React.MouseEventHandler | undefined) => (
            <Delete onClick={onClick} />
          ),
          getDelete: (wrapper: Enzyme.ReactWrapper<React.ReactType>) =>
            wrapper.children().children(),
        },
        {
          descriptor: "delete button in fragment",
          factory: (onClick: React.MouseEventHandler | undefined) => (
            <>{<Delete onClick={onClick} />}</>
          ),
          getDelete: (wrapper: Enzyme.ReactWrapper<React.ReactType>) =>
            wrapper.children().children(),
        },
        {
          descriptor: "compound children with delete button",
          factory: (onClick: React.MouseEventHandler | undefined) => [
            <Delete key={0} onClick={onClick} />,
            <div key={1} />,
          ],
          getDelete: (wrapper: Enzyme.ReactWrapper<React.ReactType>) =>
            wrapper
              .children()
              .at(0)
              .children(),
        },
      ];

      permutations.forEach(({ descriptor, factory, getDelete }) => {
        [false, true].forEach(hasOnClick => {
          it(`should update context ${
            hasOnClick ? "and call onClick " : ""
          }for children: <${descriptor}>`, () => {
            const onClick = jest.fn();
            const close = jest.fn();

            const makeReactWrapper = makeReactWrapperFactory(
              getInnerReactWrapper,
              { ...modalInitialValue, close },
            );
            const node = (
              <ModalCardHead>
                {factory(hasOnClick ? onClick : undefined)}
              </ModalCardHead>
            );
            const wrapper = makeReactWrapper({ node });

            const button = getDelete(wrapper);
            if (button !== undefined) {
              button.simulate("click");
              if (hasOnClick) {
                expect(onClick.mock.calls).toHaveLength(1);
              }
              expect(close.mock.calls).toHaveLength(1);
              expect(close.mock.calls[0]).toEqual([]);
            }
          });
        });
      });
    });
  });
});
