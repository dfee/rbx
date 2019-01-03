import { Checkbox } from "src/elements/form/checkbox";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Checkbox;
const COMPONENT_NAME = "Checkbox";
const DEFAULT_ELEMENT = "input";
const BULMA_CLASS_NAME = undefined;

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  it("should be a checkbox", () => {
    const node = makeNode({});
    const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
    expect(
      (wrapper.props() as React.InputHTMLAttributes<Element>).type,
    ).toEqual("checkbox");
  });
});
