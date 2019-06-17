import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Notification } from "src/elements/notification/notification";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Notification;
const DISPLAY_NAME = "Notification";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "notification";

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

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <Notification color={color} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });
  });
});
