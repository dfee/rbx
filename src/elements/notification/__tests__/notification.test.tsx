import React from "react";

import { DEFAULTS, Variables } from "src/base/helpers/variables";
import { Notification } from "src/elements/notification/notification";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
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

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map((color: Variables["colors"]) => {
        it(`should be ${color}`, () => {
          const node = <Notification color={color} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });
  });
});
