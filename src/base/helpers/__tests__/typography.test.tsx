import {
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TRANSFORMS,
  TEXT_WEIGHTS,
  transformTypographyHelpers,
  typographyHelpersPropTypes,
} from "src/base/helpers/typography";
import { COLORS, SHADES } from "src/base/helpers/variables";

import {
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";
import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

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
