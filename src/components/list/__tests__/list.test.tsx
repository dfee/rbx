import { List } from "src/components/list/list";
import { ListItem } from "src/components/list/list-item";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = List;
const COMPONENT_NAME = "List";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "list";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: ListItem,
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

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");

      [false, true].map(hoverable => {
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = makeNode({ hoverable });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        });
      });
    });
  });
});
