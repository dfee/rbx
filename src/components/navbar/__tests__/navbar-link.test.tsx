import React from "react";

import { NavbarLink } from "src/components/navbar/navbar-link";
import { initialValue as navbarInitialValue } from "src/components/navbar/navbar-context";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
} from "src/__tests__/testing";

import {
  makeReactWrapperInNavbarItemContextFactory,
  makeShallowWrapperInNavbarItemContextFactory,
  getInnerReactWrapperInNavbarItemContext,
} from "./testing";

const COMPONENT = NavbarLink;
const DISPLAY_NAME = "Navbar.Link";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "navbar-link";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperInNavbarItemContextFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperInNavbarItemContextFactory(),
    makeShallowWrapper: makeShallowWrapperInNavbarItemContextFactory(),
  });

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperInNavbarItemContextFactory();

    describe("arrowless", () => {
      validateBoolPropType(propTypes, "arrowless");

      [false, true].forEach(arrowless => {
        it(`should ${arrowless ? "" : "not "}be arrowless`, () => {
          const node = <NavbarLink arrowless={arrowless} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-arrowless")).toBe(arrowless);
        });
      });
    });

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

          const makeReactWrapper = makeReactWrapperInNavbarItemContextFactory(
            getInnerReactWrapperInNavbarItemContext,
            navbarInitialValue,
            { active: false, setActive },
          );
          const node = <NavbarLink onClick={onClick} />;
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
