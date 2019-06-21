import {
  makePropTypes,
  makeValidatingTransform,
} from "src/base/helpers/overlay";
import { validateBoolPropType } from "src/__tests__/testing";

import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
  testItShouldUseDefaultLocationProp,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Overlay helpers", () => {
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "overlay");
    testItShouldUseDefaultLocationProp(vtfunc, { overlay: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    [false, true].forEach(overlay => {
      it(`should ${overlay ? "" : "not "}be overlay`, () => {
        expect(vtfunc({ overlay }, CNAME, LOC)).toEqual({
          className: overlay ? "is-overlay" : "",
        });
      });
    });
  });
});
