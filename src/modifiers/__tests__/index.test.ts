import { transformModifiers } from "..";
import { transformColorModifiers } from "../color";
import { transformHelpersModifiers } from "../helpers";
import { RESPONSIVE_SIZES, transformResponsiveModifiers } from "../responsive";
import { transformTypographyModifiers } from "../typography";

describe("Transform modifiers", () => {
  test("should work on empty props", () => {
    expect(transformModifiers({})).toStrictEqual({});
  });

  test("should run all sub-modifiers", () => {
    expect(
      transformModifiers({
        backgroundColor: "info", // color
        clearfix: true, // helpers
        italic: true, // typography
        responsive: {
          mobile: {
            display: { only: true, value: "block" },
          },
        }, // responsive
      }),
    ).toMatchSnapshot();
  });

  test("should not clear out unknown props", () => {
    expect(transformModifiers({ unknowwn: true })).toMatchSnapshot();
  });
});

describe("Transform color modifiers", () => {
  test("should have class names applied", () => {
    expect(
      transformColorModifiers({
        backgroundColor: "info",
        textColor: "success",
      }),
    ).toMatchSnapshot();
  });
});

describe("Transform helpers modifiers", () => {
  test("should have class names applied", () => {
    expect(
      transformHelpersModifiers({
        clearfix: true,
        clipped: true,
        hidden: true,
        invisible: true,
        marginless: true,
        overlay: true,
        paddingless: true,
        pull: "right",
        radiusless: true,
        shadowless: true,
        unselectable: true,
      }),
    ).toMatchSnapshot();
  });
});

describe("Transform responsive modifiers", () => {
  RESPONSIVE_SIZES.map(size =>
    it(`should have class names applied for ${size}`, () => {
      expect(
        transformResponsiveModifiers({
          responsive: {
            [size]: {
              display: { only: true, value: "block" },
              hide: { only: true, value: true },
              textAlignment: { only: true, value: "centered" },
              textSize: { value: 1 },
            },
          },
        }),
      ).toMatchSnapshot();
    }),
  );
});

describe("Transform typography modifiers", () => {
  test("should have class names applied", () => {
    expect(
      transformTypographyModifiers({
        italic: true,
        textAlignment: "centered",
        textSize: 1,
        textTransform: "capitalized",
        textWeight: "light",
      }),
    ).toMatchSnapshot();
  });
});
