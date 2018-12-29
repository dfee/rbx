import { Section, SECTION_SIZES } from "../section";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Section;
const COMPONENT_NAME = "Section";
const DEFAULT_ELEMENT = "section";
const BULMA_CLASS_NAME = "section";

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
      validateOneOfPropType(propTypes, "size", SECTION_SIZES);

      SECTION_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
