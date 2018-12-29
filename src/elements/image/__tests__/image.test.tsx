import { Image } from "../image";
import { ImageContainer } from "../image-container";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded =>
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = makeNode({ rounded });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        }),
      );
    });
  });
});
