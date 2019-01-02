import { MEDIA_ITEM_POSITIONS, MediaItem } from "../media-item";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = MediaItem;
const COMPONENT_NAME = "MediaItem";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "media-content";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      position: "content",
    },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("propTypes", () => {
    const { propTypes } = COMPONENT;

    describe("position", () => {
      validateOneOfPropType(propTypes, "position", MEDIA_ITEM_POSITIONS);

      MEDIA_ITEM_POSITIONS.map(position =>
        it(`should be ${position}`, () => {
          const node = makeNode({ position });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`media-${position}`)).toBe(true);
        }),
      );
    });
  });
});
