import {
  transformVisibilityHelpers,
  visibilityHelpersPropTypes,
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
  const propTypes = visibilityHelpersPropTypes;
  const tfunc = transformVisibilityHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "hidden");
    validateBoolPropType(propTypes, "invisible");
    validateBoolPropType(propTypes, "srOnly");
    testItShouldUseDefaultLocationProp(tfunc, { hidden: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(hidden => {
      it(`should ${hidden ? "" : "not "}be hidden`, () => {
        expect(tfunc({ hidden }, CNAME, LOC)).toEqual({
          className: hidden ? "is-hidden" : "",
        });
      });
    });

    [false, true].map(invisible => {
      it(`should ${invisible ? "" : "not "}be invisible`, () => {
        expect(tfunc({ invisible }, CNAME, LOC)).toEqual({
          className: invisible ? "is-invisible" : "",
        });
      });
    });

    [false, true].map(srOnly => {
      it(`should ${srOnly ? "" : "not "}be srOnly`, () => {
        expect(tfunc({ srOnly }, CNAME, LOC)).toEqual({
          className: srOnly ? "is-sr-only" : "",
        });
      });
    });
  });
});
