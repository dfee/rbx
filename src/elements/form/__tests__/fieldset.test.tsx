import * as React from "react";

import { Fieldset } from "src/elements/form/fieldset";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = Fieldset;
const DISPLAY_NAME = "Fieldset";
const DEFAULT_ELEMENT = "fieldset";
// const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("disabled", () => {
      validateBoolPropType(propTypes, "disabled");

      [false, true].forEach(disabled => {
        it(`should be ${disabled}`, () => {
          const node = <Fieldset disabled={disabled} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.prop("disabled")).toEqual(disabled);
        });
      });
    });
  });
});
