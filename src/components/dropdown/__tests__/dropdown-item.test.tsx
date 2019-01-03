import * as Enzyme from "enzyme";
import * as React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  DropdownContextValue,
  initialValue as dropdownInitialValue,
} from "src/components/dropdown/dropdown-context";
import { DropdownItem } from "src/components/dropdown/dropdown-item";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "src/__tests__/testing";

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
  const DropdownContextConsumerChildren = (dropdownContextConsumerWrapper.props() as {
    children: React.FC<DropdownContextValue>;
  }).children;

  return Enzyme.shallow(
    <DropdownContextConsumerChildren {...dropdownContextValue} />,
  );
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
    const { propTypes } = COMPONENT;

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => undefined, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      [false, true].map(hasOnClick => {
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
        });
      });
    });
  });
});
