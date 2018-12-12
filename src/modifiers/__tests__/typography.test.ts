import {
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TRANSFORMS,
  TEXT_WEIGHTS,
  transformTypographyModifiers,
} from "../typography";

describe("Typography modifiers", () => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(transformTypographyModifiers(props)).toEqual(props);
  });

  it("should not set className on empty", () => {
    expect(transformTypographyModifiers({})).toEqual({});
  });

  it("should preserve custom className", () => {
    const className = "foo";
    expect(transformTypographyModifiers({ className })).toEqual({ className });
  });

  [false, true].map(italic =>
    it(`should ${italic ? "" : "not "}be italic`, () => {
      expect(transformTypographyModifiers({ italic })).toEqual(
        italic ? { className: "is-italic" } : {},
      );
    }),
  );

  TEXT_ALIGNMENTS.map(align =>
    it(`should align ${align}`, () => {
      expect(transformTypographyModifiers({ textAlignment: align })).toEqual({
        className: `has-text-${align}`,
      });
    }),
  );

  TEXT_SIZES.map(size =>
    it(`should be size ${size}`, () => {
      expect(transformTypographyModifiers({ textSize: size })).toEqual({
        className: `is-size-${size}`,
      });
    }),
  );

  TEXT_TRANSFORMS.map(transform =>
    it(`should be ${transform}`, () => {
      expect(
        transformTypographyModifiers({ textTransform: transform }),
      ).toEqual({
        className: `is-${transform}`,
      });
    }),
  );

  TEXT_WEIGHTS.map(weight =>
    it(`should be ${weight}`, () => {
      expect(transformTypographyModifiers({ textWeight: weight })).toEqual({
        className: `has-text-weight-${weight}`,
      });
    }),
  );
});
