import { makeRootValidatingTransform } from "src/base/helpers";

import {
  testItShouldNotSetClassNameOnEmpty,
  testItShouldPreserveCustomClassName,
  testItShouldPreserveUnknown,
} from "./testing";

const CNAME = "foo";
const LOC = "prop";

describe("Modifiers", () => {
  describe("transform", () => {
    const rvtfunc = makeRootValidatingTransform();

    testItShouldPreserveUnknown(rvtfunc);
    testItShouldNotSetClassNameOnEmpty(rvtfunc);
    testItShouldPreserveCustomClassName(rvtfunc);

    it("should apply float transforms", () => {
      expect(rvtfunc({ clearfix: true }, CNAME, LOC)).toEqual({
        className: "is-clearfix",
      });
    });

    it("should apply overflow transforms", () => {
      expect(rvtfunc({ clipped: true }, CNAME, LOC)).toEqual({
        className: "is-clipped",
      });
    });

    it("should apply overlay transforms", () => {
      expect(rvtfunc({ overlay: true }, CNAME, LOC)).toEqual({
        className: "is-overlay",
      });
    });

    it("should apply typography transforms", () => {
      expect(rvtfunc({ textSize: 1 }, CNAME, LOC)).toEqual({
        className: "is-size-1",
      });
    });

    it("should apply visibility transforms", () => {
      expect(rvtfunc({ hidden: true }, CNAME, LOC)).toEqual({
        className: "is-hidden",
      });
    });

    it("should apply other transforms", () => {
      expect(rvtfunc({ marginless: true }, CNAME, LOC)).toEqual({
        className: "is-marginless",
      });
    });

    it("should apply responsive transforms", () => {
      expect(
        rvtfunc(
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
