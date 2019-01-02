import { FileInput } from "../file-input";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

const COMPONENT = FileInput;
const COMPONENT_NAME = "FileInput";
const DEFAULT_ELEMENT = "input";
const BULMA_CLASS_NAME = "file-input";

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

  it("should be a file", () => {
    const node = makeNode({});
    const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
    expect(wrapper.props().type).toEqual("file");
  });
});
