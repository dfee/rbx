import { Image } from "src/elements/image/image";
import { ImageContainer } from "src/elements/image/image-container";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = Image;
const COMPONENT_NAME = "Image";
const DEFAULT_ELEMENT = "img";
const BULMA_CLASS_NAME = undefined;

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Container: ImageContainer,
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

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = makeNode({ rounded });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });
  });
});
