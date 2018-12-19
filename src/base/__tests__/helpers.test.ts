import {
  BREAKPOINTS,
  COLORS,
  DISPLAYS,
  FLOAT_PULLED_ALIGNMENTS,
  floatHelpersPropTypes,
  GREY_COLORS,
  helpersPropTypes,
  otherHelpersPropTypes,
  overflowHelpersPropTypes,
  overlayHelpersPropTypes,
  responsiveHelpersPropTypes,
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TRANSFORMS,
  TEXT_WEIGHTS,
  transformFloatHelpers,
  transformHelpers,
  transformOtherHelpers,
  transformOverflowHelpers,
  transformOverlayHelpers,
  transformResponsiveHelpers,
  transformTypographyHelpers,
  transformVisibilityHelpers,
  typographyHelpersPropTypes,
  visibilityHelpersPropTypes,
} from "../helpers";

import {
  validateBoolPropType,
  validateOneOfPropType,
  validatePropType,
} from "../../__tests__/testing";

const makeItShouldPreserveUnknown = (transformer: any) =>
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(transformer(props)).toEqual(props);
  });

const makeItShouldNotSetClassNameOnEmpty = (transformer: any) =>
  it("should not set className on empty", () => {
    expect(transformer({})).toEqual({});
  });

const makeItShouldPreserveCustomClassName = (transformer: any) =>
  it("should preserve custom className", () => {
    const className = "foo";
    expect(transformer({ className })).toEqual({ className });
  });

describe("Float helpers", () => {
  describe("propTypes", () => {
    const propTypes = floatHelpersPropTypes;
    validateBoolPropType(propTypes, "clearfix");
    validateOneOfPropType(propTypes, "pull", FLOAT_PULLED_ALIGNMENTS);
  });

  describe("transform", () => {
    const transformer = transformFloatHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    [false, true].map(clearfix =>
      it(`should ${clearfix ? "" : "not "}be clearfix`, () => {
        expect(transformer({ clearfix })).toEqual(
          clearfix ? { className: "is-clearfix" } : {},
        );
      }),
    );

    FLOAT_PULLED_ALIGNMENTS.map(align =>
      it(`should pull ${align}`, () => {
        expect(transformer({ pull: align })).toEqual({
          className: `is-pulled-${align}`,
        });
      }),
    );
  });
});

describe("Overflow helpers", () => {
  describe("propTypes", () => {
    const propTypes = overflowHelpersPropTypes;
    validateBoolPropType(propTypes, "clipped");
  });

  describe("transform", () => {
    const transformer = transformOverflowHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    [false, true].map(clipped =>
      it(`should ${clipped ? "" : "not "}be clipped`, () => {
        expect(transformer({ clipped })).toEqual(
          clipped ? { className: "is-clipped" } : {},
        );
      }),
    );
  });
});

describe("Overlay helpers", () => {
  describe("propTypes", () => {
    const propTypes = overlayHelpersPropTypes;
    validateBoolPropType(propTypes, "overlay");
  });

  describe("transform", () => {
    const transformer = transformOverlayHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    [false, true].map(overlay =>
      it(`should ${overlay ? "" : "not "}be overlay`, () => {
        expect(transformer({ overlay })).toEqual(
          overlay ? { className: "is-overlay" } : {},
        );
      }),
    );
  });
});

describe("Typography modifiers", () => {
  describe("propTypes", () => {
    const propTypes = typographyHelpersPropTypes;
    validateOneOfPropType(propTypes, "backgroundColor", [
      ...COLORS,
      ...GREY_COLORS,
    ]);
    validateBoolPropType(propTypes, "italic");
    validateOneOfPropType(propTypes, "textAlignment", TEXT_ALIGNMENTS);
    validateOneOfPropType(propTypes, "textColor", [...COLORS, ...GREY_COLORS]);
    validateOneOfPropType(propTypes, "textSize", TEXT_SIZES);
    validateOneOfPropType(propTypes, "textTransform", TEXT_TRANSFORMS);
    validateOneOfPropType(propTypes, "textWeight", TEXT_WEIGHTS);
  });

  describe("transform", () => {
    const transformer = transformTypographyHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    it("should not set className on empty", () => {
      expect(transformer({})).toEqual({});
    });

    it("should preserve custom className", () => {
      const className = "foo";
      expect(transformer({ className })).toEqual({ className });
    });

    [...COLORS, ...GREY_COLORS].map(color =>
      it(`should make background-color ${color}`, () => {
        expect(transformer({ backgroundColor: color })).toEqual({
          className: `has-background-${color}`,
        });
      }),
    );

    [false, true].map(italic =>
      it(`should ${italic ? "" : "not "}be italic`, () => {
        expect(transformer({ italic })).toEqual(
          italic ? { className: "is-italic" } : {},
        );
      }),
    );

    TEXT_ALIGNMENTS.map(align =>
      it(`should align ${align}`, () => {
        expect(transformer({ textAlignment: align })).toEqual({
          className: `has-text-${align}`,
        });
      }),
    );

    [...COLORS, ...GREY_COLORS].map(color =>
      it(`should make text-color ${color}`, () => {
        expect(transformer({ textColor: color })).toEqual({
          className: `has-text-${color}`,
        });
      }),
    );

    TEXT_SIZES.map(size =>
      it(`should be size ${size}`, () => {
        expect(transformer({ textSize: size })).toEqual({
          className: `is-size-${size}`,
        });
      }),
    );

    TEXT_TRANSFORMS.map(textTransform =>
      it(`should be ${textTransform}`, () => {
        expect(transformer({ textTransform })).toEqual({
          className: `is-${textTransform}`,
        });
      }),
    );

    TEXT_WEIGHTS.map(weight =>
      it(`should be ${weight}`, () => {
        expect(transformer({ textWeight: weight })).toEqual({
          className: `has-text-weight-${weight}`,
        });
      }),
    );
  });
});

describe("Visibility helpers", () => {
  describe("propTypes", () => {
    const propTypes = visibilityHelpersPropTypes;
    validateBoolPropType(propTypes, "hidden");
    validateBoolPropType(propTypes, "invisible");
    validateBoolPropType(propTypes, "srOnly");
  });

  describe("transform", () => {
    const transformer = transformVisibilityHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    [false, true].map(hidden =>
      it(`should ${hidden ? "" : "not "}be hidden`, () => {
        expect(transformer({ hidden })).toEqual(
          hidden ? { className: "is-hidden" } : {},
        );
      }),
    );

    [false, true].map(invisible =>
      it(`should ${invisible ? "" : "not "}be invisible`, () => {
        expect(transformer({ invisible })).toEqual(
          invisible ? { className: "is-invisible" } : {},
        );
      }),
    );

    [false, true].map(srOnly =>
      it(`should ${srOnly ? "" : "not "}be srOnly`, () => {
        expect(transformer({ srOnly })).toEqual(
          srOnly ? { className: "is-sr-only" } : {},
        );
      }),
    );
  });
});

describe("Other helpers", () => {
  describe("propTypes", () => {
    const propTypes = otherHelpersPropTypes;
    validateBoolPropType(propTypes, "marginless");
    validateBoolPropType(propTypes, "paddingless");
    validateBoolPropType(propTypes, "radiusless");
    validateBoolPropType(propTypes, "shadowless");
    validateBoolPropType(propTypes, "unselectable");
  });

  describe("transform", () => {
    const transformer = transformOtherHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    [false, true].map(marginless =>
      it(`should ${marginless ? "" : "not "}be marginless`, () => {
        expect(transformer({ marginless })).toEqual(
          marginless ? { className: "is-marginless" } : {},
        );
      }),
    );

    [false, true].map(paddingless =>
      it(`should ${paddingless ? "" : "not "}be paddingless`, () => {
        expect(transformer({ paddingless })).toEqual(
          paddingless ? { className: "is-paddingless" } : {},
        );
      }),
    );

    [false, true].map(radiusless =>
      it(`should ${radiusless ? "" : "not "}be radiusless`, () => {
        expect(transformer({ radiusless })).toEqual(
          radiusless ? { className: "is-radiusless" } : {},
        );
      }),
    );

    [false, true].map(shadowless =>
      it(`should ${shadowless ? "" : "not "}be shadowless`, () => {
        expect(transformer({ shadowless })).toEqual(
          shadowless ? { className: "is-shadowless" } : {},
        );
      }),
    );

    [false, true].map(unselectable =>
      it(`should ${unselectable ? "" : "not "}be unselectable`, () => {
        expect(transformer({ unselectable })).toEqual(
          unselectable ? { className: "is-unselectable" } : {},
        );
      }),
    );
  });
});

describe("Responsive modifiers", () => {
  describe("propTypes", () => {
    const propTypes = responsiveHelpersPropTypes;

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
  });

  describe("transform", () => {
    const transformer = transformResponsiveHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    BREAKPOINTS.map(breakpoint => {
      // these sizes don't support the `only` prop.
      const noOnly = ["mobile", "fullhd", "desktop"];

      describe(`for ${breakpoint}`, () => {
        DISPLAYS.map(value =>
          [undefined, false, true]
            .filter(() => noOnly.includes(breakpoint))
            .map(only =>
              it(`should be display ${value} ${only ? "only" : ""}`, () => {
                const display =
                  only === undefined ? { value } : { value, only };
                expect(
                  transformer({
                    responsive: { [breakpoint]: { display } },
                  }),
                ).toEqual(
                  value
                    ? {
                        className: `is-${value}-${breakpoint}${
                          only ? "-only" : ""
                        }`,
                      }
                    : {},
                );
              }),
            ),
        );

        [false, true].map(value =>
          [undefined, false, true]
            .filter(() => noOnly.includes(breakpoint))
            .map(only =>
              it(`should ${value ? "" : "not "}be hidden ${
                only ? "only" : ""
              }`, () => {
                const hide = only === undefined ? { value } : { value, only };
                expect(
                  transformer({
                    responsive: { [breakpoint]: { hide } },
                  }),
                ).toEqual(
                  value
                    ? {
                        className: `is-hidden-${breakpoint}${
                          only ? "-only" : ""
                        }`,
                      }
                    : {},
                );
              }),
            ),
        );

        TEXT_ALIGNMENTS.map(value =>
          [undefined, false, true]
            .filter(() => noOnly.includes(breakpoint))
            .map(only =>
              it(`should have text aligned ${value} ${
                only ? "only" : ""
              }`, () => {
                const textAlignment =
                  only === undefined ? { value } : { value, only };
                expect(
                  transformer({
                    responsive: { [breakpoint]: { textAlignment } },
                  }),
                ).toEqual(
                  value
                    ? {
                        className: `has-text-${value}-${breakpoint}${
                          only ? "-only" : ""
                        }`,
                      }
                    : {},
                );
              }),
            ),
        );

        TEXT_SIZES.map(value =>
          [undefined, false, true]
            .filter(() => noOnly.includes(breakpoint))
            .map(only =>
              it(`should have text size ${value} ${only ? "only" : ""}`, () => {
                const textSize =
                  only === undefined ? { value } : { value, only };
                expect(
                  transformer({
                    responsive: { [breakpoint]: { textSize } },
                  }),
                ).toEqual(
                  value
                    ? {
                        className: `is-size-${value}-${breakpoint}${
                          only ? "-only" : ""
                        }`,
                      }
                    : {},
                );
              }),
            ),
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
    const transformer = transformHelpers;
    makeItShouldPreserveUnknown(transformer);
    makeItShouldNotSetClassNameOnEmpty(transformer);
    makeItShouldPreserveCustomClassName(transformer);

    it("should apply float transforms", () => {
      expect(transformer({ clearfix: true })).toEqual({
        className: "is-clearfix",
      });
    });

    it("should apply overflow transforms", () => {
      expect(transformer({ clipped: true })).toEqual({
        className: "is-clipped",
      });
    });

    it("should apply overlay transforms", () => {
      expect(transformer({ overlay: true })).toEqual({
        className: "is-overlay",
      });
    });

    it("should apply typography transforms", () => {
      expect(transformer({ textSize: 1 })).toEqual({
        className: "is-size-1",
      });
    });

    it("should apply visibility transforms", () => {
      expect(transformer({ hidden: true })).toEqual({
        className: "is-hidden",
      });
    });

    it("should apply other transforms", () => {
      expect(transformer({ marginless: true })).toEqual({
        className: "is-marginless",
      });
    });

    it("should apply responsive transforms", () => {
      expect(
        transformer({ responsive: { mobile: { textSize: { value: 1 } } } }),
      ).toEqual({
        className: "is-size-1-mobile",
      });
    });
  });
});
