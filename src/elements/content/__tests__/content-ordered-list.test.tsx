import {
  CONTENT_ORDERED_LIST_TYPES,
  ContentOrderedList,
} from "../content-ordered-list";
import { ContentOrderedListItem } from "../content-ordered-list-item";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("type", () => {
      validateOneOfPropType(propTypes, "type", CONTENT_ORDERED_LIST_TYPES);

      CONTENT_ORDERED_LIST_TYPES.map(type =>
        it(`should be ${type}`, () => {
          const node = makeNode({ type });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${type}`)).toBe(true);
        }),
      );
    });
  });
});
