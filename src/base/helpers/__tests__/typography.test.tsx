import {
  makePropTypes,
  makeValidatingTransform,
} from "src/base/helpers/typography";
import { DEFAULTS } from "src/base/helpers/variables";
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
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateOneOfPropType(propTypes, "backgroundColor", [
      ...DEFAULTS.colors,
      ...DEFAULTS.shades,
    ]);
    validateBoolPropType(propTypes, "italic");
    validateOneOfPropType(propTypes, "textAlign", DEFAULTS.textAlignments);
    validateOneOfPropType(propTypes, "textColor", [
      ...DEFAULTS.colors,
      ...DEFAULTS.shades,
    ]);
    validateOneOfPropType(propTypes, "textSize", DEFAULTS.textSizes);
    validateOneOfPropType(propTypes, "textTransform", DEFAULTS.textTransforms);
    validateOneOfPropType(propTypes, "textWeight", DEFAULTS.textWeights);
    testItShouldUseDefaultLocationProp(vtfunc, { textColor: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    [...DEFAULTS.colors, ...DEFAULTS.shades].forEach(color => {
      it(`should make background-color ${color}`, () => {
        expect(vtfunc({ backgroundColor: color }, CNAME, LOC)).toEqual({
          className: `has-background-${color}`,
        });
      });
    });

    [false, true].forEach(italic => {
      it(`should ${italic ? "" : "not "}be italic`, () => {
        expect(vtfunc({ italic }, CNAME, LOC)).toEqual({
          className: italic ? "is-italic" : "",
        });
      });
    });

    DEFAULTS.textAlignments.forEach(align => {
      it(`should align ${align}`, () => {
        expect(vtfunc({ textAlign: align }, CNAME, LOC)).toEqual({
          className: `has-text-${align}`,
        });
      });
    });

    [...DEFAULTS.colors, ...DEFAULTS.shades].forEach(color => {
      it(`should make text-color ${color}`, () => {
        expect(vtfunc({ textColor: color }, CNAME, LOC)).toEqual({
          className: `has-text-${color}`,
        });
      });
    });

    DEFAULTS.textSizes.forEach(size => {
      it(`should be size ${size}`, () => {
        expect(vtfunc({ textSize: size }, CNAME, LOC)).toEqual({
          className: `is-size-${size}`,
        });
      });
    });

    DEFAULTS.textTransforms.forEach(textTransform => {
      it(`should be ${textTransform}`, () => {
        expect(vtfunc({ textTransform }, CNAME, LOC)).toEqual({
          className: `is-${textTransform}`,
        });
      });
    });

    DEFAULTS.textWeights.forEach(weight => {
      it(`should be ${weight}`, () => {
        expect(vtfunc({ textWeight: weight }, CNAME, LOC)).toEqual({
          className: `has-text-weight-${weight}`,
        });
      });
    });
  });
});
