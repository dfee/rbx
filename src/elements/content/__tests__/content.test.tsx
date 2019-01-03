import { Content, CONTENT_SIZES } from "src/elements/content/content";
import { ContentOrderedList } from "src/elements/content/content-ordered-list";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Content;
const COMPONENT_NAME = "Content";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "content";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    OrderedList: ContentOrderedList,
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
      validateOneOfPropType(propTypes, "size", CONTENT_SIZES);

      CONTENT_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
