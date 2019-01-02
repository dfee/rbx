import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import {
  DropdownContextValue,
  initialValue as dropdownInitialValue,
} from "../dropdown-context";
import { DropdownItem } from "../dropdown-item";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "../../../__tests__/testing";

const COMPONENT = DropdownItem;
const COMPONENT_NAME = "DropdownItem";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = "dropdown-item";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapperInDropdownContextConsumer = (
  node: JSX.Element,
  dropdownContextValue: DropdownContextValue = dropdownInitialValue,
) => {
  const dropdownContextConsumerWrapper = Enzyme.shallow(node);
  const DropdownContextConsumerChildren = dropdownContextConsumerWrapper.props()
    .children;
  const dropdownContextConsumerChildrenWrapper = Enzyme.shallow(
    <DropdownContextConsumerChildren {...dropdownContextValue} />,
  );
  return dropdownContextConsumerChildrenWrapper;
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
  dropdownContextValue: DropdownContextValue = dropdownInitialValue,
) => {
  const dropdownContextConsumerChildrenWrapper = makeShallowWrapperInDropdownContextConsumer(
    node,
    dropdownContextValue,
  );
  const themeContextConsumerWrapper = dropdownContextConsumerChildrenWrapper.dive();
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
    const { propTypes } = COMPONENT;

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => null, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      [false, true].map(hasOnClick =>
        it(`should update context ${
          hasOnClick ? "and call provided onClick" : ""
        }`, () => {
          const onClick = jest.fn();
          const setActive = jest.fn();
          const node = makeNode({ onClick: hasOnClick ? onClick : undefined });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            {
              active: true,
              setActive,
            },
          );
          wrapper.simulate("click");
          expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([false]);
        }),
      );
    });
  });
});
