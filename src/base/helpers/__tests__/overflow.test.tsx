import {
  makePropTypes,
  makeValidatingTransform,
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
  const propTypes = makePropTypes();
  const vtfunc = makeValidatingTransform();

  describe("propTypes", () => {
    validateBoolPropType(propTypes, "clipped");
    testItShouldUseDefaultLocationProp(vtfunc, { clipped: "__UNKNOWN" });
  });

  describe("transform", () => {
    testItShouldPreserveUnknown(vtfunc);
    testItShouldNotSetClassNameOnEmpty(vtfunc);
    testItShouldPreserveCustomClassName(vtfunc);

    [false, true].forEach(clipped => {
      it(`should ${clipped ? "" : "not "}be clipped`, () => {
        expect(vtfunc({ clipped }, CNAME, LOC)).toEqual({
          className: clipped ? "is-clipped" : "",
        });
      });
    });
  });
});
