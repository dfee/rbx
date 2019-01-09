import {
  CONTENT_ORDERED_LIST_DEFAULTS,
  ContentOrderedList,
} from "src/elements/content/content-ordered-list";
import { ContentOrderedListItem } from "src/elements/content/content-ordered-list-item";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = ContentOrderedList;
const COMPONENT_NAME = "ContentOrderedList";
const DEFAULT_ELEMENT = "ol";
const BULMA_CLASS_NAME = undefined;

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: ContentOrderedListItem,
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

    describe("type", () => {
      validateStringOrNumberPropType(propTypes, "type");

      CONTENT_ORDERED_LIST_DEFAULTS.types.map(isType => {
        it(`should be ${isType}`, () => {
          const node = makeNode({ type: isType });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${isType}`)).toBe(true);
        });
      });
    });
  });
});
