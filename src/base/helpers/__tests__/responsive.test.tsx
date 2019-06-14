import {
  makePropTypes,
  makeValidatingTransform,
} from "src/base/helpers/responsive";
import { DEFAULTS } from "src/base/helpers/variables";

import { validatePropType } from "src/__tests__/testing";
import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

/** these sizes support the `only` prop. */
const checkIsLimited = (breakpoint: string) =>
  (DEFAULTS.breakpointsLimited as Readonly<string[]>).indexOf(breakpoint) !==
  -1;

describe("Responsive modifiers", () => {
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validatePropType(propTypes, "responsive", [
      { value: {}, valid: true },
      { value: "string", valid: false },
    ]);

    DEFAULTS.breakpoints.map(breakpoint => {
      const isLimited = checkIsLimited(breakpoint);

      validatePropType(propTypes, "responsive", [
        ...DEFAULTS.displays.map(value => ({
          valid: true,
          value: { [breakpoint]: { display: { value } } },
        })),
        {
          error: new RegExp(
            `Warning.+Failed prop.+ \`responsive.${breakpoint}.display.value\``,
          ),
          valid: false,
          value: { [breakpoint]: { display: { value: "other" } } },
        },
        {
          error: new RegExp(
            `Warning.+Failed prop.+ \`responsive.${breakpoint}.display.value\`.+required`,
          ),
          valid: false,
          value: { [breakpoint]: { display: {} } },
        },
      ]);

      if (!isLimited) {
        validatePropType(propTypes, "responsive", [
          ...[false, true].map(value => ({
            valid: true,
            value: {
              [breakpoint]: { display: { value: "block", only: value } },
            },
          })),
          {
            error: new RegExp(
              `Warning.+Failed prop.+ \`responsive.${breakpoint}.display.only\``,
            ),
            valid: false,
            value: {
              [breakpoint]: { display: { value: "block", only: "string" } },
            },
          },
        ]);
      }
    });

    testItShouldUseDefaultLocationProp(vtfunc, { responsive: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    // tslint:disable-next-line:max-func-body-length
    DEFAULTS.breakpoints.map(breakpoint => {
      const isLimited = checkIsLimited(breakpoint);

      describe(`for ${breakpoint}`, () => {
        DEFAULTS.displays.map(value =>
          [undefined, false, true]
            .filter(() => !isLimited)
            .map(only => {
              const isOnly = only === true;
              it(`should be display ${value} ${isOnly ? "only" : ""}`, () => {
                const display = isOnly ? { only, value } : { value };
                expect(
                  vtfunc(
                    {
                      responsive: { [breakpoint]: { display } },
                    },
                    CNAME,
                    LOC,
                  ),
                ).toEqual({
                  className: `is-${value}-${breakpoint}${
                    isOnly ? "-only" : ""
                  }`,
                });
              });
            }),
        );

        [false, true].map(value =>
          [undefined, false, true]
            .filter(() => !isLimited)
            .map(only => {
              const isOnly = only === true;
              it(`should ${value ? "" : "not "}be hidden ${
                isOnly ? "only" : ""
              }`, () => {
                const hide = isOnly ? { only, value } : { value };
                expect(
                  vtfunc(
                    { responsive: { [breakpoint]: { hide } } },
                    CNAME,
                    LOC,
                  ),
                ).toEqual({
                  className: value
                    ? `is-hidden-${breakpoint}${isOnly ? "-only" : ""}`
                    : "",
                });
              });
            }),
        );

        DEFAULTS.textAlignments.map(value =>
          [undefined, false, true]
            .filter(() => !isLimited)
            .map(only => {
              const isOnly = only === true;
              it(`should have text aligned ${value} ${
                isOnly ? "only" : ""
              }`, () => {
                const textAlign = only === isOnly ? { only, value } : { value };
                expect(
                  vtfunc(
                    { responsive: { [breakpoint]: { textAlign } } },
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

        DEFAULTS.textSizes.map(value =>
          [undefined, false, true]
            .filter(() => !isLimited)
            .map(only => {
              const isOnly = only === true;
              it(`should have text size ${value} ${
                isOnly ? "only" : ""
              }`, () => {
                const textSize = only === isOnly ? { only, value } : { value };
                expect(
                  vtfunc(
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
