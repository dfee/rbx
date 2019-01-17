import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Tag, TAG_DEFAULTS } from "src/elements/tag/tag";
import { TagGroup } from "src/elements/tag/tag-group";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
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
    Group: TagGroup,
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

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <Tag color={color} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("delete", () => {
      validateBoolPropType(propTypes, "delete");

      [false, true].map(isDelete => {
        it(`should ${isDelete ? "" : "not "}be delete`, () => {
          const children = "foo";
          const node = <Tag children={children} delete={isDelete} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-delete")).toBe(isDelete);
          expect(
            (wrapper.props() as React.ComponentProps<"div">).children,
          ).toEqual(isDelete ? undefined : children);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = <Tag rounded={rounded} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TAG_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Tag size={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
