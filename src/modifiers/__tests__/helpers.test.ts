import { FLOAT_PULLED_ALIGNMENTS, transformHelpersModifiers } from "../helpers";

describe("Helpers modifiers", () => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(transformHelpersModifiers(props)).toEqual(props);
  });

  it("should not set className on empty", () => {
    expect(transformHelpersModifiers({})).toEqual({});
  });

  it("should preserve custom className", () => {
    const className = "foo";
    expect(transformHelpersModifiers({ className })).toEqual({ className });
  });

  describe("float modifiers:", () => {
    [false, true].map(clearfix =>
      it(`should ${clearfix ? "" : "not "}be clearfix`, () => {
        expect(transformHelpersModifiers({ clearfix })).toEqual(
          clearfix ? { className: "is-clearfix" } : {},
        );
      }),
    );

    FLOAT_PULLED_ALIGNMENTS.map(align =>
      it(`should pull ${align}`, () => {
        expect(transformHelpersModifiers({ pull: align })).toEqual({
          className: `is-pulled-${align}`,
        });
      }),
    );
  });

  describe("spacing modifiers:", () => {
    [false, true].map(marginless =>
      it(`should ${marginless ? "" : "not "}be marginless`, () => {
        expect(transformHelpersModifiers({ marginless })).toEqual(
          marginless ? { className: "is-marginless" } : {},
        );
      }),
    );

    [false, true].map(paddingless =>
      it(`should ${paddingless ? "" : "not "}be paddingless`, () => {
        expect(transformHelpersModifiers({ paddingless })).toEqual(
          paddingless ? { className: "is-paddingless" } : {},
        );
      }),
    );
  });

  describe("other modifiers:", () => {
    [false, true].map(clipped =>
      it(`should ${clipped ? "" : "not "}be clipped`, () => {
        expect(transformHelpersModifiers({ clipped })).toEqual(
          clipped ? { className: "is-clipped" } : {},
        );
      }),
    );

    [false, true].map(hidden =>
      it(`should ${hidden ? "" : "not "}be hidden`, () => {
        expect(transformHelpersModifiers({ hidden })).toEqual(
          hidden ? { className: "is-hidden" } : {},
        );
      }),
    );

    [false, true].map(invisible =>
      it(`should ${invisible ? "" : "not "}be invisible`, () => {
        expect(transformHelpersModifiers({ invisible })).toEqual(
          invisible ? { className: "is-invisible" } : {},
        );
      }),
    );

    [false, true].map(overlay =>
      it(`should ${overlay ? "" : "not "}be overlay`, () => {
        expect(transformHelpersModifiers({ overlay })).toEqual(
          overlay ? { className: "is-overlay" } : {},
        );
      }),
    );

    [false, true].map(radiusless =>
      it(`should ${radiusless ? "" : "not "}be radiusless`, () => {
        expect(transformHelpersModifiers({ radiusless })).toEqual(
          radiusless ? { className: "is-radiusless" } : {},
        );
      }),
    );

    [false, true].map(srOnly =>
      it(`should ${srOnly ? "" : "not "}be srOnly`, () => {
        expect(transformHelpersModifiers({ srOnly })).toEqual(
          srOnly ? { className: "is-sr-only" } : {},
        );
      }),
    );

    [false, true].map(shadowless =>
      it(`should ${shadowless ? "" : "not "}be shadowless`, () => {
        expect(transformHelpersModifiers({ shadowless })).toEqual(
          shadowless ? { className: "is-shadowless" } : {},
        );
      }),
    );

    [false, true].map(unselectable =>
      it(`should ${unselectable ? "" : "not "}be unselectable`, () => {
        expect(transformHelpersModifiers({ unselectable })).toEqual(
          unselectable ? { className: "is-unselectable" } : {},
        );
      }),
    );
  });

  // [false, true].map(z =>
  //   it(`should ${z ? "" : "not "}be z`, () => {
  //     expect(transformHelpersModifiers({ z })).toEqual(
  //       z ? { className: "is-z" } : {},
  //     );
  //   }),
  // );

  // [false, true].map(clearfix =>
  //   it(`should ${clearfix ? "" : "not "}be clearfix`, () => {
  //     expect(transformHelpersModifiers({ clearfix })).toEqual(
  //       clearfix ? { className: "is-clearfix" } : {},
  //     );
  //   }),
  // );

  // [false, true].map(clearfix =>
  //   it(`should ${clearfix ? "" : "not "}be clearfix`, () => {
  //     expect(transformHelpersModifiers({ clearfix })).toEqual(
  //       clearfix ? { className: "is-clearfix" } : {},
  //     );
  //   }),
  // );
});
