import { COLORS } from "../../../base/helpers";
import { Icon, ICON_ALIGNMENTS, ICON_SIZES } from "../icon";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
          expect(wrapper.hasClass(`has-text-${color}`)).toBe(true);
        }),
      );
    });

    describe("align", () => {
      validateOneOfPropType(propTypes, "size", ICON_SIZES);

      ICON_ALIGNMENTS.map(align =>
        it(`should be aligned ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", ICON_SIZES);

      ICON_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
