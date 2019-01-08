import { transformHelpers } from "src/base/helpers";

import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Modifiers", () => {
  describe("transform", () => {
    const tfunc = transformHelpers;
    testItShouldPreserveUnknown(tfunc);
    testItShouldNotSetClassNameOnEmpty(tfunc);
    testItShouldPreserveCustomClassName(tfunc);

    it("should apply float transforms", () => {
      expect(tfunc({ clearfix: true }, CNAME, LOC)).toEqual({
        className: "is-clearfix",
      });
    });

    it("should apply overflow transforms", () => {
      expect(tfunc({ clipped: true }, CNAME, LOC)).toEqual({
        className: "is-clipped",
      });
    });

    it("should apply overlay transforms", () => {
      expect(tfunc({ overlay: true }, CNAME, LOC)).toEqual({
        className: "is-overlay",
      });
    });

    it("should apply typography transforms", () => {
      expect(tfunc({ textSize: 1 }, CNAME, LOC)).toEqual({
        className: "is-size-1",
      });
    });

    it("should apply visibility transforms", () => {
      expect(tfunc({ hidden: true }, CNAME, LOC)).toEqual({
        className: "is-hidden",
      });
    });

    it("should apply other transforms", () => {
      expect(tfunc({ marginless: true }, CNAME, LOC)).toEqual({
        className: "is-marginless",
      });
    });

    it("should apply responsive transforms", () => {
      expect(
        tfunc(
          { responsive: { mobile: { textSize: { value: 1 } } } },
          CNAME,
          LOC,
        ),
      ).toEqual({
        className: "is-size-1-mobile",
      });
    });
  });
});
