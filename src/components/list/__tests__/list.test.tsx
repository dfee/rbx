import { List } from "../list";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "../../../__tests__/testing";

const COMPONENT = List;
const COMPONENT_NAME = "List";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "list";

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

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");

      [false, true].map(hoverable =>
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = makeNode({ hoverable });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        }),
      );
    });
  });
});
