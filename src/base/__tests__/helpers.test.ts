import {
  BREAKPOINTS,
  COLORS,
  DISPLAYS,
  FLOAT_PULLED_ALIGNMENTS,
  floatHelpersPropTypes,
  helpersPropTypes,
  otherHelpersPropTypes,
  overflowHelpersPropTypes,
  overlayHelpersPropTypes,
  responsiveHelpersPropTypes,
  SHADES,
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TRANSFORMS,
  TEXT_WEIGHTS,
  transformFloatHelpers,
  TransformFunc,
  transformHelpers,
  transformOtherHelpers,
  transformOverflowHelpers,
  transformOverlayHelpers,
  transformResponsiveHelpers,
  transformTypographyHelpers,
  transformVisibilityHelpers,
  typographyHelpersPropTypes,
  visibilityHelpersPropTypes,
} from "src/base/helpers";

import {
  validateBoolPropType,
  validateOneOfPropType,
  validatePropType,
  withMockError,
} from "src/__tests__/testing";

const CNAME = "foo";
const LOC = "prop";

// tslint:disable-next-line:no-any
const testItShouldPreserveUnknown = (tfunc: TransformFunc<any>) => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(tfunc(props, CNAME, LOC)).toEqual({ className: "", ...props });
  });
};

// tslint:disable-next-line:no-any
const testItShouldNotSetClassNameOnEmpty = (tfunc: TransformFunc<any>) => {
  it("should not set className on empty", () => {
    expect(tfunc({}, CNAME, LOC)).toEqual({ className: "" });
  });
};

// tslint:disable-next-line:no-any
const testItShouldPreserveCustomClassName = (tfunc: TransformFunc<any>) => {
  it("should preserve custom className", () => {
    const className = "foo";
    expect(tfunc({ className }, CNAME, LOC)).toEqual({ className });
  });
};

const testItShouldUseDefaultLocationProp = (
  tfunc: TransformFunc<any>, // tslint:disable-line:no-any
  props: any, // tslint:disable-line:no-any
) => {
  it("should use propTypes location = 'prop' as default", () => {
    withMockError({}, ({ context: { error } }) => {
      tfunc(props, "foo");
      expect(error.mock.calls).toHaveLength(1);
      expect(error.mock.calls[0][0]).toMatch(/Warning: Failed prop type.+/);
    });
  });
};

describe("Float helpers", () => {
  const propTypes = floatHelpersPropTypes;
  const tfunc = transformFloatHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "clearfix");
    validateOneOfPropType(propTypes, "pull", FLOAT_PULLED_ALIGNMENTS);
    testItShouldUseDefaultLocationProp(tfunc, { clearfix: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(clearfix => {
      it(`should ${clearfix ? "" : "not "}be clearfix`, () => {
        expect(tfunc({ clearfix }, CNAME, LOC)).toEqual({
          className: clearfix ? "is-clearfix" : "",
        });
      });
    });

    FLOAT_PULLED_ALIGNMENTS.map(align => {
      it(`should pull ${align}`, () => {
        expect(tfunc({ pull: align }, CNAME, LOC)).toEqual({
          className: `is-pulled-${align}`,
        });
      });
    });
  });
});

describe("Overflow helpers", () => {
  const propTypes = overflowHelpersPropTypes;
  const tfunc = transformOverflowHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "clipped");
    testItShouldUseDefaultLocationProp(tfunc, { clipped: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(clipped => {
      it(`should ${clipped ? "" : "not "}be clipped`, () => {
        expect(tfunc({ clipped }, CNAME, LOC)).toEqual({
          className: clipped ? "is-clipped" : "",
        });
      });
    });
  });
});

describe("Overlay helpers", () => {
  const propTypes = overlayHelpersPropTypes;
  const tfunc = transformOverlayHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "overlay");
    testItShouldUseDefaultLocationProp(tfunc, { overlay: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(overlay => {
      it(`should ${overlay ? "" : "not "}be overlay`, () => {
        expect(tfunc({ overlay }, CNAME, LOC)).toEqual({
          className: overlay ? "is-overlay" : "",
        });
      });
    });
  });
});

describe("Typography modifiers", () => {
  const propTypes = typographyHelpersPropTypes;
  const tfunc = transformTypographyHelpers;

  describe("propTypes", () => {
    validateOneOfPropType(propTypes, "backgroundColor", [...COLORS, ...SHADES]);
    validateBoolPropType(propTypes, "italic");
    validateOneOfPropType(propTypes, "textAlignment", TEXT_ALIGNMENTS);
    validateOneOfPropType(propTypes, "textColor", [...COLORS, ...SHADES]);
    validateOneOfPropType(propTypes, "textSize", TEXT_SIZES);
    validateOneOfPropType(propTypes, "textTransform", TEXT_TRANSFORMS);
    validateOneOfPropType(propTypes, "textWeight", TEXT_WEIGHTS);
    testItShouldUseDefaultLocationProp(tfunc, { textColor: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [...COLORS, ...SHADES].map(color => {
      it(`should make background-color ${color}`, () => {
        expect(tfunc({ backgroundColor: color }, CNAME, LOC)).toEqual({
          className: `has-background-${color}`,
        });
      });
    });

    [false, true].map(italic => {
      it(`should ${italic ? "" : "not "}be italic`, () => {
        expect(tfunc({ italic }, CNAME, LOC)).toEqual({
          className: italic ? "is-italic" : "",
        });
      });
    });

    TEXT_ALIGNMENTS.map(align => {
      it(`should align ${align}`, () => {
        expect(tfunc({ textAlignment: align }, CNAME, LOC)).toEqual({
          className: `has-text-${align}`,
        });
      });
    });

    [...COLORS, ...SHADES].map(color => {
      it(`should make text-color ${color}`, () => {
        expect(tfunc({ textColor: color }, CNAME, LOC)).toEqual({
          className: `has-text-${color}`,
        });
      });
    });

    TEXT_SIZES.map(size => {
      it(`should be size ${size}`, () => {
        expect(tfunc({ textSize: size }, CNAME, LOC)).toEqual({
          className: `is-size-${size}`,
        });
      });
    });

    TEXT_TRANSFORMS.map(textTransform => {
      it(`should be ${textTransform}`, () => {
        expect(tfunc({ textTransform }, CNAME, LOC)).toEqual({
          className: `is-${textTransform}`,
        });
      });
    });

    TEXT_WEIGHTS.map(weight => {
      it(`should be ${weight}`, () => {
        expect(tfunc({ textWeight: weight }, CNAME, LOC)).toEqual({
          className: `has-text-weight-${weight}`,
        });
      });
    });
  });
});

describe("Visibility helpers", () => {
  const propTypes = visibilityHelpersPropTypes;
  const tfunc = transformVisibilityHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "hidden");
    validateBoolPropType(propTypes, "invisible");
    validateBoolPropType(propTypes, "srOnly");
    testItShouldUseDefaultLocationProp(tfunc, { hidden: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(hidden => {
      it(`should ${hidden ? "" : "not "}be hidden`, () => {
        expect(tfunc({ hidden }, CNAME, LOC)).toEqual({
          className: hidden ? "is-hidden" : "",
        });
      });
    });

    [false, true].map(invisible => {
      it(`should ${invisible ? "" : "not "}be invisible`, () => {
        expect(tfunc({ invisible }, CNAME, LOC)).toEqual({
          className: invisible ? "is-invisible" : "",
        });
      });
    });

    [false, true].map(srOnly => {
      it(`should ${srOnly ? "" : "not "}be srOnly`, () => {
        expect(tfunc({ srOnly }, CNAME, LOC)).toEqual({
          className: srOnly ? "is-sr-only" : "",
        });
      });
    });
  });
});

describe("Other helpers", () => {
  const propTypes = otherHelpersPropTypes;
  const tfunc = transformOtherHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "marginless");
    validateBoolPropType(propTypes, "paddingless");
    validateBoolPropType(propTypes, "radiusless");
    validateBoolPropType(propTypes, "shadowless");
    validateBoolPropType(propTypes, "unselectable");
    testItShouldUseDefaultLocationProp(tfunc, { marginless: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(marginless => {
      it(`should ${marginless ? "" : "not "}be marginless`, () => {
        expect(tfunc({ marginless }, CNAME, LOC)).toEqual({
          className: marginless ? "is-marginless" : "",
        });
      });
    });

    [false, true].map(paddingless => {
      it(`should ${paddingless ? "" : "not "}be paddingless`, () => {
        expect(tfunc({ paddingless }, CNAME, LOC)).toEqual({
          className: paddingless ? "is-paddingless" : "",
        });
      });
    });

    [false, true].map(radiusless => {
      it(`should ${radiusless ? "" : "not "}be radiusless`, () => {
        expect(tfunc({ radiusless }, CNAME, LOC)).toEqual({
          className: radiusless ? "is-radiusless" : "",
        });
      });
    });

    [false, true].map(shadowless => {
      it(`should ${shadowless ? "" : "not "}be shadowless`, () => {
        expect(tfunc({ shadowless }, CNAME, LOC)).toEqual({
          className: shadowless ? "is-shadowless" : "",
        });
      });
    });

    [false, true].map(unselectable => {
      it(`should ${unselectable ? "" : "not "}be unselectable`, () => {
        expect(tfunc({ unselectable }, CNAME, LOC)).toEqual({
          className: unselectable ? "is-unselectable" : "",
        });
      });
    });
  });
});

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

describe("Modifiers", () => {
  describe("propTypes", () => {
    const propTypes = helpersPropTypes;

    // verify prop from floatHelperPropTypes
    validateBoolPropType(propTypes, "clearfix");

    // verify prop from overflowHelperPropTypes
    validateBoolPropType(propTypes, "clipped");

    // verify prop from overlayHelperPropTypes
    validateBoolPropType(propTypes, "overlay");

    // verify prop from typographyHelperPropTypes
    validateBoolPropType(propTypes, "italic");

    // verify prop from visibilityHelperPropTypes
    validateBoolPropType(propTypes, "hidden");

    // verify prop from otherHelperPropTypes
    validateBoolPropType(propTypes, "unselectable");

    // verify prop from responsiveHelperPropTypes
    validatePropType(propTypes, "responsive", [
      { value: {}, valid: true },
      { value: "string", valid: false },
    ]);

    // verify className prop
    validatePropType(propTypes, "className", [
      { value: "custom", valid: true },
      { value: true, valid: false },
    ]);
  });

  describe("transform", () => {
    const tfunc = transformHelpers;
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    it("should apply float transforms", () => {
      expect(tfunc({ clearfix: true }, CNAME, LOC)).toEqual({
        className: "is-clearfix",
      });
    });

    it("should apply overflow transforms", () => {
      expect(tfunc({ clipped: true }, CNAME, LOC)).toEqual({
        className: "is-clipped",
      });
    });

    it("should apply overlay transforms", () => {
      expect(tfunc({ overlay: true }, CNAME, LOC)).toEqual({
        className: "is-overlay",
      });
    });

    it("should apply typography transforms", () => {
      expect(tfunc({ textSize: 1 }, CNAME, LOC)).toEqual({
        className: "is-size-1",
      });
    });

    it("should apply visibility transforms", () => {
      expect(tfunc({ hidden: true }, CNAME, LOC)).toEqual({
        className: "is-hidden",
      });
    });

    it("should apply other transforms", () => {
      expect(tfunc({ marginless: true }, CNAME, LOC)).toEqual({
        className: "is-marginless",
      });
    });

    it("should apply responsive transforms", () => {
      expect(
        tfunc(
          { responsive: { mobile: { textSize: { value: 1 } } } },
          CNAME,
          LOC,
        ),
      ).toEqual({
        className: "is-size-1-mobile",
      });
    });
  });
});
