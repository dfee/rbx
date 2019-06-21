import React from "react";

import { Checkbox } from "src/elements/form/checkbox";
import {
  hasProperties,
  makeShallowWrapperFactory,
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
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  it("should be a checkbox", () => {
    const makeShallowWrapper = makeShallowWrapperFactory();
    const node = <Checkbox />;
    const wrapper = makeShallowWrapper({ node });
    expect(
      (wrapper.props() as React.InputHTMLAttributes<Element>).type,
    ).toEqual("checkbox");
  });
});
