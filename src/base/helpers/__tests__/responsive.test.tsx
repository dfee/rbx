import {
  BREAKPOINTS,
  responsiveHelpersPropTypes,
  transformResponsiveHelpers,
} from "src/base/helpers/responsive";
import { TEXT_ALIGNMENTS, TEXT_SIZES } from "src/base/helpers/typography";
import { DISPLAYS } from "src/base/helpers/visibility";

import { validatePropType } from "src/__tests__/testing";
import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Responsive modifiers", () => {
  const propTypes = responsiveHelpersPropTypes;
  const tfunc = transformResponsiveHelpers;

  describe("propTypes", () => {
    validatePropType(propTypes, "responsive", [
      { value: {}, valid: true },
      { value: "string", valid: false },
    ]);

    BREAKPOINTS.map(rvalue =>
      validatePropType(propTypes, "responsive", [
        ...DISPLAYS.map(value => ({
          valid: true,
          value: { [rvalue]: { display: { value } } },
        })),
        {
          error: new RegExp(
            `Warning.+Failed prop.+ \`responsive.${rvalue}.display.value\``,
          ),
          valid: false,
          value: { [rvalue]: { display: { value: "other" } } },
        },
        {
          error: new RegExp(
            `Warning.+Failed prop.+ \`responsive.${rvalue}.display.value\`.+required`,
          ),
          valid: false,
          value: { [rvalue]: { display: {} } },
        },
      ]),
    );

    ["tablet", "desktop", "widescreen"].map(rvalue =>
      validatePropType(propTypes, "responsive", [
        ...[false, true].map(value => ({
          valid: true,
          value: { [rvalue]: { display: { value: "block", only: value } } },
        })),
        {
          error: new RegExp(
            `Warning.+Failed prop.+ \`responsive.${rvalue}.display.only\``,
          ),
          valid: false,
          value: { [rvalue]: { display: { value: "block", only: "string" } } },
        },
      ]),
    );

    testItShouldUseDefaultLocationProp(tfunc, { responsive: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    // tslint:disable-next-line:max-func-body-length
    BREAKPOINTS.map(breakpoint => {
      // these sizes don't support the `only` prop.
      const noOnly = ["mobile", "fullhd", "desktop"];

      describe(`for ${breakpoint}`, () => {
        DISPLAYS.map(value =>
          [undefined, false, true]
            .filter(() => noOnly.indexOf(breakpoint) !== -1)
            .map(only => {
              const isOnly = only === true;
              it(`should be display ${value} ${isOnly ? "only" : ""}`, () => {
                const display = isOnly ? { only, value } : { value };
                expect(
                  tfunc(
                    {
                      responsive: { [breakpoint]: { display } },
                    },
                    CNAME,
                    LOC,
                  ),
                ).toEqual({
                  className: `is-${value}-${breakpoint}${isOnly ? "-only" : ""}`,
                });
              });
            }),
        );

        [false, true].map(value =>
          [undefined, false, true]
            .filter(() => noOnly.indexOf(breakpoint) !== -1)
            .map(only => {
              const isOnly = only === true;
              it(`should ${value ? "" : "not "}be hidden ${
                isOnly ? "only" : ""
              }`, () => {
                const hide = isOnly ? { only, value } : { value };
                expect(
                  tfunc({ responsive: { [breakpoint]: { hide } } }, CNAME, LOC),
                ).toEqual({
                  className: value
                    ? `is-hidden-${breakpoint}${isOnly ? "-only" : ""}`
                    : "",
                });
              });
            }),
        );

        TEXT_ALIGNMENTS.map(value =>
          [undefined, false, true]
            .filter(() => noOnly.indexOf(breakpoint) !== -1)
            .map(only => {
              const isOnly = only === true;
              it(`should have text aligned ${value} ${
                isOnly ? "only" : ""
              }`, () => {
                const textAlignment =
                  only === isOnly ? { only, value } : { value };
                expect(
                  tfunc(
                    { responsive: { [breakpoint]: { textAlignment } } },
                    CNAME,
                    LOC,
                  ),
                ).toEqual({
                  className: `has-text-${value}-${breakpoint}${
                    isOnly ? "-only" : ""
                  }`,
                });
              });
            }),
        );

        TEXT_SIZES.map(value =>
          [undefined, false, true]
            .filter(() => noOnly.indexOf(breakpoint) !== -1)
            .map(only => {
              const isOnly = only === true;
              it(`should have text size ${value} ${
                isOnly ? "only" : ""
              }`, () => {
                const textSize = only === isOnly ? { only, value } : { value };
                expect(
                  tfunc(
                    { responsive: { [breakpoint]: { textSize } } },
                    CNAME,
                    LOC,
                  ),
                ).toEqual({
                  className: `is-size-${value}-${breakpoint}${
                    isOnly ? "-only" : ""
                  }`,
                });
              });
            }),
        );
      });
    });
  });
});
