import { TagGroup } from "../tag-group";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "../../../__tests__/testing";

const COMPONENT = TagGroup;
const COMPONENT_NAME = "TagGroup";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "tags";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
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

    describe("size", () => {
      validateBoolPropType(propTypes, "gapless");

      [false, true].map(gapless =>
        it(`should ${gapless ? "" : "not "}be gapless`, () => {
          const node = makeNode({ gapless });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("has-addons")).toBe(gapless);
        }),
      );
    });
  });
});
