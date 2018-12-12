import { transformModifiers } from "..";

describe("Modifiers", () => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(transformModifiers(props)).toEqual(props);
  });

  it("should not set className on empty", () => {
    expect(transformModifiers({})).toEqual({});
  });

  it("should preserve custom className", () => {
    const className = "foo";
    expect(transformModifiers({ className })).toEqual({ className });
  });

  it("should apply color transforms", () => {
    expect(transformModifiers({ textColor: "primary" })).toEqual({
      className: "has-text-primary",
    });
  });

  it("should apply helpers transforms", () => {
    expect(transformModifiers({ clearfix: true })).toEqual({
      className: "is-clearfix",
    });
  });

  it("should apply responsive transforms", () => {
    expect(
      transformModifiers({ responsive: { mobile: { textSize: { value: 1 } } } }),
    ).toEqual({
      className: "is-size-1-mobile",
    });
  });

  it("should apply typography transforms", () => {
    expect(transformModifiers({ textSize: 1 })).toEqual({
      className: "is-size-1",
    });
  });
});
