import React from "react";

import { DropdownItem } from "src/components/dropdown/dropdown-item";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "src/__tests__/testing";

import {
  makeReactWrapperFactory,
  makeShallowWrapperFactory,
  getInnerReactWrapper,
} from "./testing";

const COMPONENT = DropdownItem;
const DISPLAY_NAME = "Dropdown.Item";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = "dropdown-item";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    displayName: DISPLAY_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeShallowWrapperFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeShallowWrapperFactory(),
    makeReactWrapper: makeReactWrapperFactory(),
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

          const makeReactWrapper = makeReactWrapperFactory(
            getInnerReactWrapper,
            { active: true, setActive },
          );
          const node = <DropdownItem onClick={onClick} />;
          const wrapper = makeReactWrapper({ node });

          wrapper.simulate("click");
          if (onClick !== undefined) {
            expect(onClick.mock.calls).toHaveLength(1);
          }
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([false]);
        });
      });
    });
  });
});
