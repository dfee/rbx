import { IMAGE_CONTAINER_SIZES, ImageContainer } from "../image-container";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = ImageContainer;
const COMPONENT_NAME = "ImageContainer";
const DEFAULT_ELEMENT = "figure";
const BULMA_CLASS_NAME = "image";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", IMAGE_CONTAINER_SIZES);

      IMAGE_CONTAINER_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          if (typeof size === "number") {
            expect(wrapper.hasClass(`is-${size}x${size}`)).toBe(true);
          } else {
            expect(wrapper.hasClass(`is-${size}`)).toBe(true);
          }
        }),
      );
    });
  });
});
