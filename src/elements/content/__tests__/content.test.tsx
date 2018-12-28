import { Content, CONTENT_SIZES } from "../content";
import { ContentOrderedList } from "../content-ordered-list";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testTransformHelpersIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", CONTENT_SIZES);

      CONTENT_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
