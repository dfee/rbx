import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Divider } from "src/layout/divider/divider";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Divider;
const DISPLAY_NAME = "Divider";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "is-divider";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      children: "",
    },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("children", () => {
      validateStringOrNumberPropType(propTypes, "children");

      it(`should have proper content`, () => {
        const node = <Divider children="foo" />;
        const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
        expect(
          (wrapper.props() as React.HTMLAttributes<HTMLDivElement>)[
            "data-content"
          ],
        ).toBe("foo");
      });
    });

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <Divider color={color} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("vertical", () => {
      validateBoolPropType(propTypes, "vertical");

      [false, true].map(vertical => {
        it(`should ${vertical ? "" : "not "}be vertical`, () => {
          const node = <Divider vertical={vertical} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-divider-vertical`)).toBe(vertical);
        });
      });
    });
  });
});
