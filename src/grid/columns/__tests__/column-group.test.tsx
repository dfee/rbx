import * as React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import {
  COLUMN_GROUP_DEFAULTS,
  ColumnGroup,
} from "src/grid/columns/column-group";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = ColumnGroup;
const DISPLAY_NAME = "Column.Group";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "columns";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    DEFAULTS: COLUMN_GROUP_DEFAULTS,
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

    describe("breakpoints", () => {
      validateStringOrNumberPropType(propTypes, "breakpoint");

      DEFAULTS.breakpoints.forEach(breakpoint => {
        it(`should have breakpoint ${breakpoint}`, () => {
          const node = <ColumnGroup breakpoint={breakpoint} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });

    describe("centered", () => {
      validateBoolPropType(propTypes, "centered");

      [false, true].forEach(centered => {
        it(`should ${centered ? "" : "not "}be centered`, () => {
          const node = <ColumnGroup centered={centered} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-centered")).toBe(centered);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });

    describe("gapless", () => {
      validateBoolPropType(propTypes, "gapless");

      [false, true].forEach(gapless => {
        it(`should ${gapless ? "" : "not "}be gapless`, () => {
          const node = <ColumnGroup gapless={gapless} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-gapless")).toBe(gapless);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });

    describe("gapSize", () => {
      validateStringOrNumberPropType(propTypes, "gapSize");

      COLUMN_GROUP_DEFAULTS.gapSizes.forEach(gapSize => {
        it(`should have gapSize ${gapSize}`, () => {
          const node = <ColumnGroup gapSize={gapSize} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${gapSize}`)).toBe(true);
          expect(wrapper.hasClass("is-variable")).toBe(true);
        });
      });

      DEFAULTS.breakpoints.forEach(breakpoint => {
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

          COLUMN_GROUP_DEFAULTS.gapSizes.forEach(gapSize => {
            it(`should have gapSize ${gapSize}`, () => {
              const props = { [breakpoint]: { gapSize } };
              const node = <ColumnGroup {...props} />;
              const wrapper = makeShallowWrapper({ node });
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

      [false, true].forEach(multiline => {
        it(`should ${multiline ? "" : "not "}be multiline`, () => {
          const node = <ColumnGroup multiline={multiline} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-multiline")).toBe(multiline);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });

    describe("vcentered", () => {
      validateBoolPropType(propTypes, "vcentered");

      [false, true].forEach(vcentered => {
        it(`should ${vcentered ? "" : "not "}be vertically centered`, () => {
          const node = <ColumnGroup vcentered={vcentered} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-vcentered")).toBe(vcentered);
          expect(wrapper.hasClass("is-variable")).toBe(false);
        });
      });
    });
  });
});
