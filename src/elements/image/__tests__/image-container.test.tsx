import React from "react";

import {
  IMAGE_CONTAINER_DEFAULTS,
  ImageContainer,
} from "src/elements/image/image-container";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = ImageContainer;
const DISPLAY_NAME = "Image.Container";
const DEFAULT_ELEMENT = "figure";
const BULMA_CLASS_NAME = "image";

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

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      IMAGE_CONTAINER_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <ImageContainer size={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          if (typeof size === "number") {
            expect(wrapper.hasClass(`is-${size}x${size}`)).toBe(true);
          } else {
            expect(wrapper.hasClass(`is-${size}`)).toBe(true);
          }
        });
      });
    });
  });
});
