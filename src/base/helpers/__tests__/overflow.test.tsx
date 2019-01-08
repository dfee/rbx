import {
  overflowHelpersPropTypes,
  transformOverflowHelpers,
} from "src/base/helpers/overflow";

import { validateBoolPropType } from "src/__tests__/testing";
import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Overflow helpers", () => {
  const propTypes = overflowHelpersPropTypes;
  const tfunc = transformOverflowHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "clipped");
    testItShouldUseDefaultLocationProp(tfunc, { clipped: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(clipped => {
      it(`should ${clipped ? "" : "not "}be clipped`, () => {
        expect(tfunc({ clipped }, CNAME, LOC)).toEqual({
          className: clipped ? "is-clipped" : "",
        });
      });
    });
  });
});
