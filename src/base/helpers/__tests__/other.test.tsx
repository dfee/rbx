import {
  otherHelpersPropTypes,
  transformOtherHelpers,
} from "src/base/helpers/other";

import { validateBoolPropType } from "src/__tests__/testing";
import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Other helpers", () => {
  const propTypes = otherHelpersPropTypes;
  const tfunc = transformOtherHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "marginless");
    validateBoolPropType(propTypes, "paddingless");
    validateBoolPropType(propTypes, "radiusless");
    validateBoolPropType(propTypes, "shadowless");
    validateBoolPropType(propTypes, "unselectable");
    testItShouldUseDefaultLocationProp(tfunc, { marginless: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(marginless => {
      it(`should ${marginless ? "" : "not "}be marginless`, () => {
        expect(tfunc({ marginless }, CNAME, LOC)).toEqual({
          className: marginless ? "is-marginless" : "",
        });
      });
    });

    [false, true].map(paddingless => {
      it(`should ${paddingless ? "" : "not "}be paddingless`, () => {
        expect(tfunc({ paddingless }, CNAME, LOC)).toEqual({
          className: paddingless ? "is-paddingless" : "",
        });
      });
    });

    [false, true].map(radiusless => {
      it(`should ${radiusless ? "" : "not "}be radiusless`, () => {
        expect(tfunc({ radiusless }, CNAME, LOC)).toEqual({
          className: radiusless ? "is-radiusless" : "",
        });
      });
    });

    [false, true].map(shadowless => {
      it(`should ${shadowless ? "" : "not "}be shadowless`, () => {
        expect(tfunc({ shadowless }, CNAME, LOC)).toEqual({
          className: shadowless ? "is-shadowless" : "",
        });
      });
    });

    [false, true].map(unselectable => {
      it(`should ${unselectable ? "" : "not "}be unselectable`, () => {
        expect(tfunc({ unselectable }, CNAME, LOC)).toEqual({
          className: unselectable ? "is-unselectable" : "",
        });
      });
    });
  });
});
