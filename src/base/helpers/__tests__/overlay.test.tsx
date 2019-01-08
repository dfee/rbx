import {
  overlayHelpersPropTypes,
  transformOverlayHelpers,
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
  const propTypes = overlayHelpersPropTypes;
  const tfunc = transformOverlayHelpers;

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "overlay");
    testItShouldUseDefaultLocationProp(tfunc, { overlay: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    [false, true].map(overlay => {
      it(`should ${overlay ? "" : "not "}be overlay`, () => {
        expect(tfunc({ overlay }, CNAME, LOC)).toEqual({
          className: overlay ? "is-overlay" : "",
        });
      });
    });
  });
});
