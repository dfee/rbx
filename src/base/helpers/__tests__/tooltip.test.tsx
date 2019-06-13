import {
  makePropTypes,
  makeValidatingTransform,
} from "src/base/helpers/tooltip";
import { DEFAULTS } from "src/base/helpers/variables";
import { tuple } from "../../../utils";

import {
  validateBoolPropType,
  validateOneOfPropType,
  validatePropType,
} from "src/__tests__/testing";
import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Tooltip helpers", () => {
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "tooltipActive");
    validateOneOfPropType(propTypes, "tooltipColor", DEFAULTS.colors);
    validateBoolPropType(propTypes, "tooltipMultiline");
    validateOneOfPropType(
      propTypes,
      "tooltipPosition",
      DEFAULTS.tooltipPositions,
    );
    validatePropType(propTypes, "tooltipResponsive", [
      ...DEFAULTS.breakpoints
        .map(breakpoint =>
          DEFAULTS.tooltipPositions.map(tooltipPosition => ({
            descriptor: `${breakpoint}-${tooltipPosition}`,
            valid: true,
            value: { [breakpoint]: tooltipPosition },
          })),
        )
        .reduce((acc, cv) => [...acc, ...cv], []),
      {
        error: new RegExp(`Warning.+Failed prop.+ \`tooltipResponsive\``),
        valid: false,
        value: false,
      },
      {
        error: new RegExp(`Warning.+Failed prop.+ \`tooltipResponsive.foo\``),
        valid: false,
        value: { foo: "asdf" },
      },
    ]);
    testItShouldUseDefaultLocationProp(vtfunc, {
      tooltipPosition: "__UNKNOWN",
    });

    describe("custom", () => {
      const customTooltipPositions = tuple("a", "b");
      const customPropTypes = makePropTypes({
        tooltipPositions: customTooltipPositions,
      });

      validateOneOfPropType(
        customPropTypes,
        "tooltipPosition",
        customTooltipPositions,
      );
    });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    it("should should get tooltip className and data-tooltip", () => {
      expect(vtfunc({ tooltip: "foobar" }, CNAME, LOC)).toEqual({
        className: "tooltip",
        "data-tooltip": "foobar",
      });
    });

    [false, true].map(tooltipActive => {
      it(`should ${tooltipActive ? "" : "not "}be tooltipActive`, () => {
        expect(vtfunc({ tooltipActive }, CNAME, LOC)).toEqual({
          className: tooltipActive ? "is-tooltip-active" : "",
        });
      });
    });

    DEFAULTS.colors.map(color => {
      it(`should be ${color}`, () => {
        expect(vtfunc({ tooltipColor: color }, CNAME, LOC)).toEqual({
          className: `is-tooltip-${color}`,
        });
      });
    });

    [false, true].map(tooltipMultiline => {
      it(`should ${tooltipMultiline ? "" : "not "}be tooltipMultiline`, () => {
        expect(vtfunc({ tooltipMultiline }, CNAME, LOC)).toEqual({
          className: tooltipMultiline ? "is-tooltip-multiline" : "",
        });
      });
    });

    DEFAULTS.tooltipPositions.map(tooltipPosition => {
      it(`should be position ${tooltipPosition}`, () => {
        expect(vtfunc({ tooltipPosition }, CNAME, LOC)).toEqual({
          className: `is-tooltip-${tooltipPosition}`,
        });
      });
    });

    DEFAULTS.breakpoints.map(breakpoint => {
      DEFAULTS.tooltipPositions.map(tooltipPosition => {
        it(`should be position ${breakpoint}-${tooltipPosition}`, () => {
          expect(
            vtfunc(
              { tooltipResponsive: { [breakpoint]: tooltipPosition } },
              CNAME,
              LOC,
            ),
          ).toEqual({
            className: `is-tooltip-${tooltipPosition}-${breakpoint}`,
          });
        });
      });
    });
  });
});
