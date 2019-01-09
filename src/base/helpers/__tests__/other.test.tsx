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
    validateBoolPropType(propTypes, "shadowless");
    validateBoolPropType(propTypes, "unselectable");
    testItShouldUseDefaultLocationProp(vtfunc, { marginless: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    [false, true].map(marginless => {
      it(`should ${marginless ? "" : "not "}be marginless`, () => {
        expect(vtfunc({ marginless }, CNAME, LOC)).toEqual({
          className: marginless ? "is-marginless" : "",
        });
      });
    });

    [false, true].map(paddingless => {
      it(`should ${paddingless ? "" : "not "}be paddingless`, () => {
        expect(vtfunc({ paddingless }, CNAME, LOC)).toEqual({
          className: paddingless ? "is-paddingless" : "",
        });
      });
    });

    [false, true].map(radiusless => {
      it(`should ${radiusless ? "" : "not "}be radiusless`, () => {
        expect(vtfunc({ radiusless }, CNAME, LOC)).toEqual({
          className: radiusless ? "is-radiusless" : "",
        });
      });
    });

    [false, true].map(shadowless => {
      it(`should ${shadowless ? "" : "not "}be shadowless`, () => {
        expect(vtfunc({ shadowless }, CNAME, LOC)).toEqual({
          className: shadowless ? "is-shadowless" : "",
        });
      });
    });

    [false, true].map(unselectable => {
      it(`should ${unselectable ? "" : "not "}be unselectable`, () => {
        expect(vtfunc({ unselectable }, CNAME, LOC)).toEqual({
          className: unselectable ? "is-unselectable" : "",
        });
      });
    });
  });
});
