import { makePropTypes, makeValidatingTransform } from "src/base/helpers/badge";
import { DEFAULTS } from "src/base/helpers/variables";

import {
  validateBoolPropType,
  validateOneOfPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";
import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Badge helpers", () => {
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateStringOrNumberPropType(propTypes, "badge");
    validateOneOfPropType(propTypes, "badgeColor", DEFAULTS.colors);
    validateBoolPropType(propTypes, "badgeOutlined");
    validateBoolPropType(propTypes, "badgeRounded");
    validateOneOfPropType(propTypes, "badgeSize", DEFAULTS.badgeSizes);
    testItShouldUseDefaultLocationProp(vtfunc, {
      badgeSize: "__UNKNOWN",
    });

    describe("custom", () => {
      const customBadgeSizes = ["a", "b"] as const;
      const customPropTypes = makePropTypes({
        badgeSizes: customBadgeSizes,
      });

      validateOneOfPropType(customPropTypes, "badgeSize", customBadgeSizes);
    });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    it("should should get badge className and data-badge", () => {
      expect(vtfunc({ badge: "foobar" }, CNAME, LOC)).toEqual({
        className: "badge",
        "data-badge": "foobar",
      });
    });

    DEFAULTS.colors.map(color => {
      it(`should be ${color}`, () => {
        expect(vtfunc({ badgeColor: color }, CNAME, LOC)).toEqual({
          className: `has-badge-${color}`,
        });
      });
    });

    [false, true].map(badgeOutlined => {
      it(`should ${badgeOutlined ? "" : "not "}be badgeOutlined`, () => {
        expect(vtfunc({ badgeOutlined }, CNAME, LOC)).toEqual({
          className: badgeOutlined ? "has-badge-outlined" : "",
        });
      });
    });

    [false, true].map(badgeRounded => {
      it(`should ${badgeRounded ? "" : "not "}be badgeRounded`, () => {
        expect(vtfunc({ badgeRounded }, CNAME, LOC)).toEqual({
          className: badgeRounded ? "has-badge-rounded" : "",
        });
      });
    });

    DEFAULTS.badgeSizes.map(badgeSize => {
      it(`should be size ${badgeSize}`, () => {
        expect(vtfunc({ badgeSize }, CNAME, LOC)).toEqual({
          className: `has-badge-${badgeSize}`,
        });
      });
    });
  });
});
