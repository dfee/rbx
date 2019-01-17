import React from "react";

import { Checkbox } from "src/elements/form/checkbox";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Checkbox;
const DISPLAY_NAME = "Checkbox";
const DEFAULT_ELEMENT = "input";
const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  it("should be a checkbox", () => {
    const node = <Checkbox />;
    const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
    expect(
      (wrapper.props() as React.InputHTMLAttributes<Element>).type,
    ).toEqual("checkbox");
  });
});
