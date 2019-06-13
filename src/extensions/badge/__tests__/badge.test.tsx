import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Badge, BADGE_DEFAULTS } from "src/extensions/badge/badge";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Badge;
const DISPLAY_NAME = "Badge";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "badge";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      badgeContent: "",
    },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("badgeColor", () => {
      validateStringOrNumberPropType(propTypes, "badgeColor");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <Badge badgeColor={color} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`has-badge-${color}`)).toBe(true);
        });
      });
    });

    describe("badgeContent", () => {
      validateStringOrNumberPropType(propTypes, "badgeContent");

      it(`should have proper content`, () => {
        const node = <Badge badgeContent="foo" />;
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        expect(
          (wrapper.props() as React.HTMLAttributes<HTMLSpanElement>)[
            "data-badge"
          ],
        ).toBe("foo");
      });
    });

    describe("badgeOutlined", () => {
      validateBoolPropType(propTypes, "badgeOutlined");

      [false, true].map(outlined => {
        it(`should ${outlined ? "" : "not "}be outlined`, () => {
          const node = <Badge badgeOutlined={outlined} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`has-badge-outlined`)).toBe(outlined);
        });
      });
    });

    describe("badgeSize", () => {
      validateStringOrNumberPropType(propTypes, "badgeSize");

      BADGE_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Badge badgeSize={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`has-badge-${size}`)).toBe(true);
        });
      });
    });
  });
});
