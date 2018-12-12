import {
  BREAKPOINTS,
  DISPLAYS,
  transformResponsiveModifiers,
} from "../responsive";
import { TEXT_ALIGNMENTS, TEXT_SIZES } from "../typography";

describe("Responsive modifiers", () => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(transformResponsiveModifiers(props)).toEqual(props);
  });

  it("should not set className on empty", () => {
    expect(transformResponsiveModifiers({})).toEqual({});
  });

  it("should preserve custom className", () => {
    const className = "foo";
    expect(transformResponsiveModifiers({ className })).toEqual({ className });
  });

  it("should preserve custom className", () => {
    const className = "foo";
    expect(transformResponsiveModifiers({ className })).toEqual({ className });
  });

  BREAKPOINTS.map(breakpoint => {
    describe(`for ${breakpoint}`, () => {
      DISPLAYS.map(value =>
        [false, true].map(only =>
          it(`should be display ${value} ${only ? "only" : ""}`, () => {
            expect(
              transformResponsiveModifiers({
                responsive: { [breakpoint]: { display: { value, only } } },
              }),
            ).toEqual(
              value
                ? {
                    className: `is-${value}-${breakpoint}${only ? "-only" : ""}`,
                  }
                : {},
            );
          }),
        ),
      );

      [false, true].map(value =>
        [false, true].map(only =>
          it(`should ${value ? "" : "not "}be hidden ${
            only ? "only" : ""
          }`, () => {
            expect(
              transformResponsiveModifiers({
                responsive: { [breakpoint]: { hide: { value, only } } },
              }),
            ).toEqual(
              value
                ? { className: `is-hidden-${breakpoint}${only ? "-only" : ""}` }
                : {},
            );
          }),
        ),
      );

      TEXT_ALIGNMENTS.map(value =>
        [false, true].map(only =>
          it(`should have text aligned ${value} ${only ? "only" : ""}`, () => {
            expect(
              transformResponsiveModifiers({
                responsive: { [breakpoint]: { textAlignment: { value, only } } },
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
        it(`should have text size ${value}`, () => {
          expect(
            transformResponsiveModifiers({
              responsive: { [breakpoint]: { textSize: { value } } },
            }),
          ).toEqual(
            value ? { className: `is-size-${value}-${breakpoint}` } : {},
          );
        }),
      );
    });
  });
});
