import { COLORS } from "../../../base/helpers";
import { Message, MESSAGE_SIZES } from "../message";
import { MessageBody } from "../message-body";
import { MessageHeader } from "../message-header";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Message;
const COMPONENT_NAME = "Message";
const DEFAULT_ELEMENT = "article";
const BULMA_CLASS_NAME = "message";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: MessageBody,
    Header: MessageHeader,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color =>
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", MESSAGE_SIZES);

      MESSAGE_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
