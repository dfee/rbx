import { COLORS } from "../../../base/helpers";
import { Tag, TAG_SIZES } from "../tag";
import { TagGroup } from "../tag-group";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Tag;
const COMPONENT_NAME = "Tag";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "tag";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Group: TagGroup,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testTransformHelpersIntegration(makeNode, makeShallowWrapper);

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

    describe("delete", () => {
      validateBoolPropType(propTypes, "delete");

      [false, true].map(isDelete =>
        it(`should ${isDelete ? "" : "not "}be delete`, () => {
          const children = "foo";
          const node = makeNode({ children, delete: isDelete });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-delete")).toBe(isDelete);
          expect(wrapper.props().children).toEqual(isDelete ? false : children);
        }),
      );
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded =>
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = makeNode({ rounded });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TAG_SIZES);

      TAG_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
