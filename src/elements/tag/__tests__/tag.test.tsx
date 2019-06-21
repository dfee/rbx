import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Tag, TAG_DEFAULTS } from "src/elements/tag/tag";
import { TagGroup } from "src/elements/tag/tag-group";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Tag;
const DISPLAY_NAME = "Tag";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "tag";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    Group: TagGroup,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.forEach(color => {
        it(`should be ${color}`, () => {
          const node = <Tag color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("delete", () => {
      validateBoolPropType(propTypes, "delete");

      [false, true].forEach(isDelete => {
        it(`should ${isDelete ? "" : "not "}be delete`, () => {
          const children = "foo";
          const node = <Tag delete={isDelete}>{children}</Tag>;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-delete")).toBe(isDelete);
          expect(
            (wrapper.props() as React.ComponentProps<"div">).children,
          ).toEqual(isDelete ? undefined : children);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].forEach(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = <Tag rounded={rounded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TAG_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <Tag size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
