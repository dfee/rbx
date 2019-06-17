import React from "react";

import { Title, TITLE_DEFAULTS } from "src/elements/title/title";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Title;
const DISPLAY_NAME = "Title";
const DEFAULT_ELEMENT = "h1";
const BULMA_CLASS_NAME = "title";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
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

    describe("spaced", () => {
      validateBoolPropType(propTypes, "spaced");

      [false, true].map(spaced =>
        [false, true].map(subtitle => {
          const isSpaced = spaced && !subtitle;
          it(`should ${
            isSpaced ? "" : "not "
          }be spaced when spaced ${spaced} and subtitle ${subtitle}`, () => {
            const node = <Title spaced={spaced} />;
            const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
            expect(wrapper.hasClass("is-spaced")).toBe(spaced);
          });
        }),
      );
    });

    describe("subtitle", () => {
      validateBoolPropType(propTypes, "subtitle");

      [false, true].map(subtitle => {
        it(`should ${subtitle ? "" : "not "}be subtitle`, () => {
          const node = <Title subtitle={subtitle} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass("subtitle")).toBe(subtitle);
          expect(wrapper.hasClass("title")).toBe(!subtitle);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TITLE_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Title size={size} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
