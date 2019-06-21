import React from "react";

import { FileInput } from "src/elements/form/file-input";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = FileInput;
const DISPLAY_NAME = "File.Input";
const DEFAULT_ELEMENT = "input";
const BULMA_CLASS_NAME = "file-input";

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

  it("should be a file", () => {
    const node = <FileInput />;
    const makeShallowWrapper = makeShallowWrapperFactory();
    const wrapper = makeShallowWrapper({ node });
    expect(
      (wrapper.props() as React.InputHTMLAttributes<Element>).type,
    ).toEqual("file");
  });
});
