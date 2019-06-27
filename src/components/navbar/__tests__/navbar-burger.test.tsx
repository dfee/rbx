import * as React from "react";

import { NavbarBurger } from "src/components/navbar/navbar-burger";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "src/__tests__/testing";

import {
  makeShallowWrapperInNavbarContextFactory,
  makeReactWrapperInNavbarContextFactory,
  getInnerReactWrapperInNavbarContext,
} from "./testing";

const COMPONENT = NavbarBurger;
const DISPLAY_NAME = "Navbar.Burger";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-burger";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperInNavbarContextFactory(),
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperInNavbarContextFactory();

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

          const makeReactWrapper = makeReactWrapperInNavbarContextFactory(
            getInnerReactWrapperInNavbarContext,
            { active: false, setActive },
          );
          const node = <NavbarBurger onClick={onClick} />;
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

    describe("role", () => {
      it("should have role: button", () => {
        const node = <NavbarBurger />;
        const wrapper = makeShallowWrapper({ node });
        expect(wrapper.prop("role")).toEqual("button");
      });
    });
  });
});
