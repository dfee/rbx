import * as React from "react";

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
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("children", () => {
      validateStringOrNumberPropType(propTypes, "children");

      it(`should have proper content`, () => {
        const node = <Divider>foo</Divider>;
        const wrapper = makeShallowWrapper({ node });
        expect(
          (wrapper.props() as React.HTMLAttributes<HTMLDivElement>)[
            "data-content"
          ],
        ).toBe("foo");
      });
    });

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.forEach(color => {
        it(`should be ${color}`, () => {
          const node = <Divider color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("vertical", () => {
      validateBoolPropType(propTypes, "vertical");

      [false, true].forEach(vertical => {
        it(`should ${vertical ? "" : "not "}be vertical`, () => {
          const node = <Divider vertical={vertical} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-divider-vertical`)).toBe(vertical);
        });
      });
    });
  });
});
