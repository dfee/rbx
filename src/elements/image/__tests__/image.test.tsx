import React from "react";

import { Image } from "src/elements/image/image";
import { ImageContainer } from "src/elements/image/image-container";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = Image;
const DISPLAY_NAME = "Image";
const DEFAULT_ELEMENT = "img";
const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Container: ImageContainer,
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

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = <Image rounded={rounded} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });
  });
});
