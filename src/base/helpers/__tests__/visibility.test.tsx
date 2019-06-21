import {
  makePropTypes,
  makeValidatingTransform,
} from "src/base/helpers/visibility";
import { validateBoolPropType } from "src/__tests__/testing";

import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Visibility helpers", () => {
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "hidden");
    validateBoolPropType(propTypes, "invisible");
    validateBoolPropType(propTypes, "srOnly");
    testItShouldUseDefaultLocationProp(vtfunc, { hidden: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    [false, true].forEach(hidden => {
      it(`should ${hidden ? "" : "not "}be hidden`, () => {
        expect(vtfunc({ hidden }, CNAME, LOC)).toEqual({
          className: hidden ? "is-hidden" : "",
        });
      });
    });

    [false, true].forEach(invisible => {
      it(`should ${invisible ? "" : "not "}be invisible`, () => {
        expect(vtfunc({ invisible }, CNAME, LOC)).toEqual({
          className: invisible ? "is-invisible" : "",
        });
      });
    });

    [false, true].forEach(srOnly => {
      it(`should ${srOnly ? "" : "not "}be srOnly`, () => {
        expect(vtfunc({ srOnly }, CNAME, LOC)).toEqual({
          className: srOnly ? "is-sr-only" : "",
        });
      });
    });
  });
});
