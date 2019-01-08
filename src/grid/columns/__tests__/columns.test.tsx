import { BREAKPOINTS } from "src/base/helpers/responsive";
import { Column } from "src/grid/columns/column";
import { Columns, COLUMNS_GAP_SIZES } from "src/grid/columns/columns";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
  validatePropType,
} from "src/__tests__/testing";

const COMPONENT = Columns;
const COMPONENT_NAME = "Columns";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "columns";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Column,
    defaultProps: {
      as: DEFAULT_ELEMENT,
      multiline: true,
    },
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

    describe("breakpoints", () => {
      validateOneOfPropType(propTypes, "breakpoint", BREAKPOINTS);

      BREAKPOINTS.map(breakpoint => {
        it(`should have breakpoint ${breakpoint}`, () => {
          const node = makeNode({ breakpoint });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });

    describe("centered", () => {
      validateBoolPropType(propTypes, "centered");

      [false, true].map(centered => {
        it(`should ${centered ? "" : "not "}be centered`, () => {
          const node = makeNode({ centered });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-centered")).toBe(centered);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });

    describe("gapless", () => {
      validateBoolPropType(propTypes, "gapless");

      [false, true].map(gapless => {
        it(`should ${gapless ? "" : "not "}be gapless`, () => {
          const node = makeNode({ gapless });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-gapless")).toBe(gapless);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });

    describe("gapSize", () => {
      validateOneOfPropType(propTypes, "gapSize", COLUMNS_GAP_SIZES);

      COLUMNS_GAP_SIZES.map(gapSize => {
        it(`should have gapSize ${gapSize}`, () => {
          const node = makeNode({ gapSize });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${gapSize}`)).toBe(true);
          expect(wrapper.hasClass("is-variable")).toBe(true);
        });
      });

      BREAKPOINTS.map(breakpoint => {
        describe(breakpoint, () => {
          validatePropType(propTypes, breakpoint, [
            ...COLUMNS_GAP_SIZES.map(value => ({
              descriptor: `gapSize = ${value}`,
              valid: true,
              value: { gapSize: value },
            })),
            {
              descriptor: "gapSize = 'string'",
              error: new RegExp(
                `Warning.+Failed prop.+ \`${breakpoint}.gapSize\``,
              ),
              valid: false,
              value: { gapSize: "__UNKNOWN" },
            },
          ]);

          COLUMNS_GAP_SIZES.map(gapSize => {
            it(`should have gapSize ${gapSize}`, () => {
              const node = makeNode({ [breakpoint]: { gapSize } });
              const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
                node,
              );
              expect(wrapper.hasClass(`is-${gapSize}-${breakpoint}`)).toBe(
                true,
              );
              expect(wrapper.hasClass("is-variable")).toBe(true);
            });
          });
        });
      });
    });

    describe("multiline", () => {
      validateBoolPropType(propTypes, "multiline");

      [false, true].map(multiline => {
        it(`should ${multiline ? "" : "not "}be multiline`, () => {
          const node = makeNode({ multiline });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-multiline")).toBe(multiline);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });
  });
});
