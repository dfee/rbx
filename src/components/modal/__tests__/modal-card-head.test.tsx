import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import { Delete } from "../../../elements";
import { ModalCardHead } from "../modal-card-head";
import {
  initialValue as modalInitialValue,
  ModalContextValue,
} from "../modal-context";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

const COMPONENT = ModalCardHead;
const COMPONENT_NAME = "ModalCardHead";
const DEFAULT_ELEMENT = "header";
const BULMA_CLASS_NAME = "modal-card-head";

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

  describe("props", () => {
    describe("children <delete button>", () => {
      const permutations = [
        {
          descriptor: "delete button",
          factory: (
            hasOnClick: boolean,
            onClick: React.MouseEventHandler<any>,
          ) => <Delete onClick={hasOnClick ? onClick : undefined} />,
          getDelete: (wrapper: Enzyme.ShallowWrapper<any>) =>
            wrapper.children().dive(),
        },
        {
          descriptor: "delete button in fragment",
          factory: (
            hasOnClick: boolean,
            onClick: React.MouseEventHandler<any>,
          ) => (
            <React.Fragment
              children={<Delete onClick={hasOnClick ? onClick : undefined} />}
            />
          ),
          getDelete: (wrapper: Enzyme.ShallowWrapper<any>) =>
            wrapper.children().dive(),
        },
        {
          descriptor: "compound children with delete button",
          factory: (
            hasOnClick: boolean,
            onClick: React.MouseEventHandler<any>,
          ) => [
            <Delete key={0} onClick={hasOnClick ? onClick : undefined} />,
            <div key={1} />,
          ],
          getDelete: (wrapper: Enzyme.ShallowWrapper<any>) =>
            wrapper
              .children()
              .at(0)
              .dive(),
        },
      ];

      permutations.map(({ descriptor, factory, getDelete }) => {
        [false, true].map(hasOnClick =>
          it(`should update context ${
            hasOnClick ? "and call onClick " : ""
          }for children: <${descriptor}>`, () => {
            const onClick = jest.fn();
            const setActive = jest.fn();
            const node = makeNode({ children: factory(hasOnClick, onClick) });
            const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
              node,
              themeInitialValue,
              {
                closeOnBlur: true,
                closeOnEsc: true,
                setActive,
              },
            );
            const button = getDelete(wrapper);
            button.simulate("click");
            if (hasOnClick) {
              expect(onClick.mock.calls).toHaveLength(1);
            }
            expect(setActive.mock.calls).toHaveLength(1);
            expect(setActive.mock.calls[0]).toEqual([false]);
          }),
        );
      });
    });
  });
});
