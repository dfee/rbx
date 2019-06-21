import { makePropTypes, makeValidatingTransform } from "src/base/helpers/other";
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
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "marginless");
    validateBoolPropType(propTypes, "paddingless");
    validateBoolPropType(propTypes, "radiusless");
    validateBoolPropType(propTypes, "relative");
    validateBoolPropType(propTypes, "shadowless");
    validateBoolPropType(propTypes, "unselectable");
    testItShouldUseDefaultLocationProp(vtfunc, { marginless: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    [false, true].forEach(marginless => {
      it(`should ${marginless ? "" : "not "}be marginless`, () => {
        expect(vtfunc({ marginless }, CNAME, LOC)).toEqual({
          className: marginless ? "is-marginless" : "",
        });
      });
    });

    [false, true].forEach(paddingless => {
      it(`should ${paddingless ? "" : "not "}be paddingless`, () => {
        expect(vtfunc({ paddingless }, CNAME, LOC)).toEqual({
          className: paddingless ? "is-paddingless" : "",
        });
      });
    });

    [false, true].forEach(radiusless => {
      it(`should ${radiusless ? "" : "not "}be radiusless`, () => {
        expect(vtfunc({ radiusless }, CNAME, LOC)).toEqual({
          className: radiusless ? "is-radiusless" : "",
        });
      });
    });

    [false, true].forEach(relative => {
      it(`should ${relative ? "" : "not "}be relative`, () => {
        expect(vtfunc({ relative }, CNAME, LOC)).toEqual({
          className: relative ? "is-relative" : "",
        });
      });
    });

    [false, true].forEach(shadowless => {
      it(`should ${shadowless ? "" : "not "}be shadowless`, () => {
        expect(vtfunc({ shadowless }, CNAME, LOC)).toEqual({
          className: shadowless ? "is-shadowless" : "",
        });
      });
    });

    [false, true].forEach(unselectable => {
      it(`should ${unselectable ? "" : "not "}be unselectable`, () => {
        expect(vtfunc({ unselectable }, CNAME, LOC)).toEqual({
          className: unselectable ? "is-unselectable" : "",
        });
      });
    });
  });
});
