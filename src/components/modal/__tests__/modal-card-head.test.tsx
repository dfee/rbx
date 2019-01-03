import * as Enzyme from "enzyme";
import * as React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import { ModalCardHead } from "src/components/modal/modal-card-head";
import {
  initialValue as modalInitialValue,
  ModalContextValue,
} from "src/components/modal/modal-context";
import { Delete } from "src/elements";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

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
    describe("children <delete button>", () => {
      const permutations = [
        {
          descriptor: "string",
          factory: (onClick: React.MouseEventHandler | undefined) => "string",
          getDelete: (wrapper: Enzyme.ShallowWrapper<React.ReactType>) =>
            undefined,
        },
        {
          descriptor: "delete button",
          factory: (onClick: React.MouseEventHandler | undefined) => (
            <Delete onClick={onClick} />
          ),
          getDelete: (wrapper: Enzyme.ShallowWrapper<React.ReactType>) =>
            wrapper.children().dive(),
        },
        {
          descriptor: "delete button in fragment",
          factory: (onClick: React.MouseEventHandler | undefined) => (
            <React.Fragment children={<Delete onClick={onClick} />} />
          ),
          getDelete: (wrapper: Enzyme.ShallowWrapper<React.ReactType>) =>
            wrapper.children().dive(),
        },
        {
          descriptor: "compound children with delete button",
          factory: (onClick: React.MouseEventHandler | undefined) => [
            <Delete key={0} onClick={onClick} />,
            <div key={1} />,
          ],
          getDelete: (wrapper: Enzyme.ShallowWrapper<React.ReactType>) =>
            wrapper
              .children()
              .at(0)
              .dive(),
        },
      ];

      permutations.map(({ descriptor, factory, getDelete }) => {
        [false, true].map(hasOnClick => {
          it(`should update context ${
            hasOnClick ? "and call onClick " : ""
          }for children: <${descriptor}>`, () => {
            const onClick = jest.fn();
            const close = jest.fn();
            const node = makeNode({
              children: factory(hasOnClick ? onClick : undefined),
            });
            const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
              node,
              themeInitialValue,
              { ...modalInitialValue, close },
            );
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
