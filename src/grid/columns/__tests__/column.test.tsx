import { BREAKPOINTS } from "../../../base/helpers";
import { Column, COLUMN_SIZES } from "../column";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
  validatePropType,
} from "../../../__tests__/testing";

const COMPONENT = Column;
const COMPONENT_NAME = "Column";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "column";

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
    describe("narrow", () => {
      validateBoolPropType(propTypes, "narrow");

      [false, true].map(narrow =>
        it(`should ${narrow ? "" : "not "}be narrow`, () => {
          const node = makeNode({ narrow });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-narrow")).toBe(narrow);
        }),
      );

      BREAKPOINTS.map(breakpoint => {
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

          [false, true].map(narrow =>
            it(`should ${narrow ? "" : "not "}be narrow`, () => {
              const node = makeNode({ [breakpoint]: { narrow } });
              const wrapper = makeShallowWrapper(node);
              expect(wrapper.hasClass(`is-narrow-${breakpoint}`)).toBe(narrow);
            }),
          );
        });
      });
    });

    describe("offset", () => {
      validateOneOfPropType(propTypes, "offset", COLUMN_SIZES);

      COLUMN_SIZES.map(offset =>
        it(`should be ${offset}`, () => {
          const node = makeNode({ offset });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-offset-${offset}`)).toBe(true);
        }),
      );

      BREAKPOINTS.map(breakpoint => {
        validatePropType(propTypes, breakpoint, [
          ...COLUMN_SIZES.map(value => ({
            descriptor: `offset = ${value}`,
            valid: true,
            value: { offset: value },
          })),
          {
            descriptor: "offset = __UNKNOWN",
            error: new RegExp(
              `Warning.+Failed prop.+ \`${breakpoint}.offset\``,
            ),
            valid: false,
            value: { offset: "__UNKNOWN" },
          },
        ]);

        describe(breakpoint, () => {
          COLUMN_SIZES.map(offset =>
            it(`should be offset ${offset}`, () => {
              const node = makeNode({ [breakpoint]: { offset } });
              const wrapper = makeShallowWrapper(node);
              expect(
                wrapper.hasClass(`is-offset-${offset}-${breakpoint}`),
              ).toBe(true);
            }),
          );
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", COLUMN_SIZES);

      COLUMN_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );

      BREAKPOINTS.map(breakpoint => {
        describe(breakpoint, () => {
          validatePropType(propTypes, breakpoint, [
            ...COLUMN_SIZES.map(value => ({
              descriptor: `size = ${value}`,
              valid: true,
              value: { size: value },
            })),
            {
              descriptor: "size = __UNKNOWN",
              error: new RegExp(
                `Warning.+Failed prop.+ \`${breakpoint}.size\``,
              ),
              valid: false,
              value: { size: "__UNKNOWN" },
            },
          ]);

          COLUMN_SIZES.map(size =>
            it(`should be ${size}`, () => {
              const node = makeNode({ [breakpoint]: { size } });
              const wrapper = makeShallowWrapper(node);
              expect(wrapper.hasClass(`is-${size}-${breakpoint}`)).toBe(true);
            }),
          );
        });
      });
    });
  });
});
