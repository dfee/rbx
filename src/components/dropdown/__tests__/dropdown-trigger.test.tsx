import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  DropdownContextValue,
  initialValue as dropdownInitialValue,
} from "src/components/dropdown/dropdown-context";
import { DropdownTrigger } from "src/components/dropdown/dropdown-trigger";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "src/__tests__/testing";

const COMPONENT = DropdownTrigger;
const DISPLAY_NAME = "Dropdown.Trigger";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "dropdown-trigger";

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

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    displayName: DISPLAY_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
  });

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
          const onClick = hasOnClick ? jest.fn() : undefined;
          const setActive = jest.fn();
          const node = <DropdownTrigger onClick={onClick} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            {
              active: false,
              setActive,
            },
          );
          wrapper.simulate("click");
          if (onClick !== undefined) {
            expect(onClick.mock.calls).toHaveLength(1);
          }
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([true]);
        });
      });
    });
  });
});
