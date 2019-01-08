import {
  FLOAT_PULLED_ALIGNMENTS,
  floatHelpersPropTypes,
  transformFloatHelpers,
} from "src/base/helpers/float";

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

describe("Float helpers", () => {
  const propTypes = floatHelpersPropTypes;
  const tfunc = transformFloatHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "clearfix");
    validateOneOfPropType(propTypes, "pull", FLOAT_PULLED_ALIGNMENTS);
    testItShouldUseDefaultLocationProp(tfunc, { clearfix: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(clearfix => {
      it(`should ${clearfix ? "" : "not "}be clearfix`, () => {
        expect(tfunc({ clearfix }, CNAME, LOC)).toEqual({
          className: clearfix ? "is-clearfix" : "",
        });
      });
    });

    FLOAT_PULLED_ALIGNMENTS.map(align => {
      it(`should pull ${align}`, () => {
        expect(tfunc({ pull: align }, CNAME, LOC)).toEqual({
          className: `is-pulled-${align}`,
        });
      });
    });
  });
});
