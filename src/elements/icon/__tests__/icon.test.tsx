import { DEFAULTS } from "src/base/helpers/variables";
import { Icon, ICON_DEFAULTS } from "src/elements/icon/icon";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Icon;
const COMPONENT_NAME = "Icon";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "icon";

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

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`has-text-${color}`)).toBe(true);
        });
      });
    });

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      ICON_DEFAULTS.alignments.map(align => {
        it(`should be aligned ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      ICON_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
