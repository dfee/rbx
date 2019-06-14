import { makePropTypes, makeValidatingTransform } from "src/base/helpers/float";
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

describe("Float helpers", () => {
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "clearfix");
    validateOneOfPropType(propTypes, "pull", DEFAULTS.floatPulledAlignments);
    testItShouldUseDefaultLocationProp(vtfunc, { clearfix: "__UNKNOWN" });

    describe("custom", () => {
      const customFloatPulledAlignments = ["a", "b"] as const;
      const customPropTypes = makePropTypes({
        floatPulledAlignments: customFloatPulledAlignments,
      });

      validateOneOfPropType(
        customPropTypes,
        "pull",
        customFloatPulledAlignments,
      );
    });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    [false, true].map(clearfix => {
      it(`should ${clearfix ? "" : "not "}be clearfix`, () => {
        expect(vtfunc({ clearfix }, CNAME, LOC)).toEqual({
          className: clearfix ? "is-clearfix" : "",
        });
      });
    });

    DEFAULTS.floatPulledAlignments.map(align => {
      it(`should pull ${align}`, () => {
        expect(vtfunc({ pull: align }, CNAME, LOC)).toEqual({
          className: `is-pulled-${align}`,
        });
      });
    });
  });
});
