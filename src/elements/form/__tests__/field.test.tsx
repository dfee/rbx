import React from "react";

import { Field, FIELD_DEFAULTS } from "src/elements/form/field";
import { FieldBody } from "src/elements/form/field-body";
import { FieldLabel } from "src/elements/form/field-label";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Field;
const DISPLAY_NAME = "Field";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "field";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: FieldBody,
    defaultProps: { as: DEFAULT_ELEMENT },
    Label: FieldLabel,
    VARIABLE_DEFAULTS: FIELD_DEFAULTS,
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

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      FIELD_DEFAULTS.alignments.forEach(align =>
        FIELD_DEFAULTS.kinds.forEach(kind => {
          it(`should be aligned ${kind}-${align}`, () => {
            const node = <Field align={align} kind={kind} />;
            const wrapper = makeShallowWrapper({ node });
            expect(
              wrapper.hasClass(
                kind === "addons"
                  ? `has-addons-${align}`
                  : `is-grouped-${align}`,
              ),
            ).toBe(true);
          });
        }),
      );
    });

    describe("expanded", () => {
      validateBoolPropType(propTypes, "expanded");

      [false, true].forEach(expanded => {
        it(`should ${expanded ? "" : "not "}be expanded`, () => {
          const node = <Field expanded={expanded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-expanded")).toBe(expanded);
        });
      });
    });

    describe("horizontal", () => {
      validateBoolPropType(propTypes, "horizontal");

      [false, true].forEach(horizontal => {
        it(`should ${horizontal ? "" : "not "}be horizontal`, () => {
          const node = <Field horizontal={horizontal} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-horizontal")).toBe(horizontal);
        });
      });
    });

    describe("kind", () => {
      validateStringOrNumberPropType(propTypes, "kind");

      FIELD_DEFAULTS.kinds.forEach(kind => {
        it(`should be kind ${kind}`, () => {
          const node = <Field kind={kind} />;
          const wrapper = makeShallowWrapper({ node });
          expect(
            wrapper.hasClass(kind === "group" ? "is-grouped" : "has-addons"),
          ).toBe(true);
        });
      });
    });

    describe("multiline", () => {
      validateBoolPropType(propTypes, "multiline");

      [false, true].forEach(multiline =>
        FIELD_DEFAULTS.kinds.forEach(kind => {
          it(`should ${
            multiline && kind === "group" ? "" : "not "
          }be multiline when kind is ${kind} and multiline is ${multiline}`, () => {
            const node = <Field kind={kind} multiline={multiline} />;
            const wrapper = makeShallowWrapper({ node });
            expect(wrapper.hasClass("is-grouped-multiline")).toBe(
              multiline && kind === "group",
            );
          });
        }),
      );
    });

    describe("narrow", () => {
      validateBoolPropType(propTypes, "narrow");

      [false, true].forEach(narrow => {
        it(`should ${narrow ? "" : "not "}be narrow`, () => {
          const node = <Field narrow={narrow} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-narrow")).toBe(narrow);
        });
      });
    });
  });
});
