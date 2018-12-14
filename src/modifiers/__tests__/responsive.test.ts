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
    // these sizes don't support the `only` prop.
    const noOnly = ["mobile", "fullhd", "desktop"];

    describe(`for ${breakpoint}`, () => {
      DISPLAYS.map(value =>
        [undefined, false, true]
          .filter(() => noOnly.includes(breakpoint))
          .map(only =>
            it(`should be display ${value} ${only ? "only" : ""}`, () => {
              const display = only === undefined ? { value } : { value, only };
              expect(
                transformResponsiveModifiers({
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
                transformResponsiveModifiers({
                  responsive: { [breakpoint]: { hide } },
                }),
              ).toEqual(
                value
                  ? {
                      className: `is-hidden-${breakpoint}${only ? "-only" : ""}`,
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
                transformResponsiveModifiers({
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
              const textSize = only === undefined ? { value } : { value, only };
              expect(
                transformResponsiveModifiers({
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
