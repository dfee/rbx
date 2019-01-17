import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Column, COLUMN_DEFAULTS } from "src/grid/columns/column";
import { ColumnGroup } from "src/grid/columns/column-group";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Column;
const DISPLAY_NAME = "Column";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "column";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Group: ColumnGroup,
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
    describe("narrow", () => {
      validateBoolPropType(propTypes, "narrow");

      [false, true].map(narrow => {
        it(`should ${narrow ? "" : "not "}be narrow`, () => {
          const node = <Column narrow={narrow} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-narrow")).toBe(narrow);
        });
      });

      DEFAULTS.breakpoints.map(breakpoint => {
        describe(breakpoint, () => {
          validatePropType(propTypes, breakpoint, [
            ...[false, true].map(value => ({
              descriptor: `narrow = ${value}`,
              valid: true,
              value: { narrow: value },
            })),
            {
              descriptor: "narrow = 'string'",
              error: new RegExp(
                `Warning.+Failed prop.+ \`${breakpoint}.narrow\``,
              ),
              valid: false,
              value: { narrow: "string" },
            },
          ]);

          [false, true].map(narrow => {
            it(`should ${narrow ? "" : "not "}be narrow`, () => {
              const props = { [breakpoint]: { narrow } };
              const node = <Column {...props} />;
              const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
                node,
              );
              expect(wrapper.hasClass(`is-narrow-${breakpoint}`)).toBe(narrow);
            });
          });
        });
      });
    });

    describe("offset", () => {
      validateStringOrNumberPropType(propTypes, "offset");

      COLUMN_DEFAULTS.sizes.map(offset => {
        it(`should be ${offset}`, () => {
          const node = <Column offset={offset} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-offset-${offset}`)).toBe(true);
        });
      });

      DEFAULTS.breakpoints.map(breakpoint => {
        validatePropType(propTypes, breakpoint, [
          ...["string", 1].map(value => ({
            descriptor: `offset = ${value}`,
            valid: true,
            value: { offset: value },
          })),
          {
            descriptor: "offset = obj",
            error: new RegExp(
              `Warning.+Failed prop.+ \`${breakpoint}.offset\``,
            ),
            valid: false,
            value: { offset: {} },
          },
        ]);

        describe(breakpoint, () => {
          COLUMN_DEFAULTS.sizes.map(offset => {
            it(`should be offset ${offset}`, () => {
              const props = { [breakpoint]: { offset } };
              const node = <Column {...props} />;
              const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
                node,
              );
              expect(
                wrapper.hasClass(`is-offset-${offset}-${breakpoint}`),
              ).toBe(true);
            });
          });
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      COLUMN_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Column size={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });

      DEFAULTS.breakpoints.map(breakpoint => {
        describe(breakpoint, () => {
          validatePropType(propTypes, breakpoint, [
            ...["string", 1].map(value => ({
              descriptor: `size = ${value}`,
              valid: true,
              value: { size: value },
            })),
            {
              descriptor: "size = object",
              error: new RegExp(
                `Warning.+Failed prop.+ \`${breakpoint}.size\``,
              ),
              valid: false,
              value: { size: {} },
            },
          ]);

          COLUMN_DEFAULTS.sizes.map(size => {
            it(`should be ${size}`, () => {
              const props = { [breakpoint]: { size } };
              const node = <Column {...props} />;
              const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
                node,
              );
              expect(wrapper.hasClass(`is-${size}-${breakpoint}`)).toBe(true);
            });
          });
        });
      });
    });
  });
});
