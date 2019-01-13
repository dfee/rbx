import { DEFAULTS } from "src/base/helpers/variables";
import {
  COLUMN_GROUP_DEFAULTS,
  ColumnGroup,
} from "src/grid/columns/column-group";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = ColumnGroup;
const COMPONENT_NAME = "ColumnGroup";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "columns";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
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
      validateStringOrNumberPropType(propTypes, "breakpoint");

      DEFAULTS.breakpoints.map(breakpoint => {
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
      validateStringOrNumberPropType(propTypes, "gapSize");

      COLUMN_GROUP_DEFAULTS.gapSizes.map(gapSize => {
        it(`should have gapSize ${gapSize}`, () => {
          const node = makeNode({ gapSize });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${gapSize}`)).toBe(true);
          expect(wrapper.hasClass("is-variable")).toBe(true);
        });
      });

      DEFAULTS.breakpoints.map(breakpoint => {
        describe(breakpoint, () => {
          validatePropType(propTypes, breakpoint, [
            ...["string", 1].map(value => ({
              descriptor: `gapSize = ${value}`,
              valid: true,
              value: { gapSize: value },
            })),
            {
              descriptor: "gapSize = object",
              error: new RegExp(
                `Warning.+Failed prop.+ \`${breakpoint}.gapSize\``,
              ),
              valid: false,
              value: { gapSize: {} },
            },
          ]);

          COLUMN_GROUP_DEFAULTS.gapSizes.map(gapSize => {
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
