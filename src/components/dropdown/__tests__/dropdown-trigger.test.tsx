import * as React from "react";

import { DropdownTrigger } from "src/components/dropdown/dropdown-trigger";
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

const COMPONENT = DropdownTrigger;
const DISPLAY_NAME = "Dropdown.Trigger";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "dropdown-trigger";

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
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { descriptor: "func", valid: true, value: () => undefined },
        { valid: false, value: "string" },
      ]);

      [false, true].forEach(hasOnClick => {
        it(`should update context ${
          hasOnClick ? "and call provided onClick" : ""
        }`, () => {
          const onClick = hasOnClick ? jest.fn() : undefined;
          const setActive = jest.fn();

          const node = <DropdownTrigger onClick={onClick} />;
          const makeReactWrapper = makeReactWrapperFactory(
            getInnerReactWrapper,
            { active: false, setActive },
          );
          const wrapper = makeReactWrapper({ node });

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
