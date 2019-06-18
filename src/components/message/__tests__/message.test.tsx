import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Message, MESSAGE_DEFAULTS } from "src/components/message/message";
import { MessageBody } from "src/components/message/message-body";
import { MessageHeader } from "src/components/message/message-header";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Message;
const DISPLAY_NAME = "Message";
const DEFAULT_ELEMENT = "article";
const BULMA_CLASS_NAME = "message";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: MessageBody,
    Header: MessageHeader,
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
          const node = <Message color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      MESSAGE_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Message size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
