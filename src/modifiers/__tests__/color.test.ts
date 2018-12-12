import { COLORS, GREY_COLORS, transformColorModifiers } from "../color";

describe("Color modifiers", () => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(transformColorModifiers(props)).toEqual(props);
  });

  it("should not set className on empty", () => {
    expect(transformColorModifiers({})).toEqual({});
  });

  it("should preserve custom className", () => {
    const className = "foo";
    expect(transformColorModifiers({ className })).toEqual({ className });
  });

  [...COLORS, ...GREY_COLORS].map(color =>
    it(`should make text-color ${color}`, () => {
      expect(transformColorModifiers({ textColor: color })).toEqual({
        className: `has-text-${color}`,
      });
    }),
  );

  [...COLORS, ...GREY_COLORS].map(color =>
    it(`should make background-color ${color}`, () => {
      expect(transformColorModifiers({ backgroundColor: color })).toEqual({
        className: `has-background-${color}`,
      });
    }),
  );
});
